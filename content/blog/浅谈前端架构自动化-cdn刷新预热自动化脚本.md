---
title: "浅谈前端架构自动化-cdn刷新预热自动化脚本"
date: 2020-05-15
tags: 记
comments: true
categories: 记
---



## 缘起

> 在每次 `master` `bulid` 后都要去阿里云 后台手动刷新｜预热，此文章旨在优化发包繁琐步骤



## 流程

![流程](https://tva1.sinaimg.cn/large/007S8ZIlly1get9wa276tj30we04g74a.jpg)

## 实现

### 1. pip install aliyun-python-sdk-cdn

> ps：这个SDK 和 下面的 代码 是基于 python2 推荐2.7.16 
>
> Mac 的话 默认版本就是 python2



1. Refresh.py 实现

[阿里云官方文档](https://help.aliyun.com/document_detail/151829.html?spm=a2c4g.11186623.6.752.c8a77880zEiQFv#title-hzq-0o9-3ui)

```python
#!/usr/bin/env python
# coding=utf-8
# __author__ = 'hanli.zyb'

'''Check Package'''

try:
    import os, sys, getopt, time, json
    from aliyunsdkcore.client import AcsClient
    from aliyunsdkcore.acs_exception.exceptions import ClientException
    from aliyunsdkcore.acs_exception.exceptions import ServerException
    from aliyunsdkcdn.request.v20180510.RefreshObjectCachesRequest import RefreshObjectCachesRequest
    from aliyunsdkcdn.request.v20180510.PushObjectCacheRequest import PushObjectCacheRequest
    from aliyunsdkcdn.request.v20180510.DescribeRefreshTasksRequest import DescribeRefreshTasksRequest
    from aliyunsdkcdn.request.v20180510.DescribeRefreshQuotaRequest import DescribeRefreshQuotaRequest
except:
    sys.exit("[Error] Please pip install aliyun-python-sdk-cdn and aliyun-java-sdk-core ，please install now......")


class Refresh(object):
    '''init func'''

    def __init__(self):

        self.lists = []
        self.param = {}

    '''
  描述：调度的主函数
  resP：检测入参结果，如果类型不是 bool 说明有报错
  '''

    def main(self, argv):
        if len(argv) < 1:
            sys.exit("\nusage: " + sys.argv[0] + " -h ")
        try:
            opts, args = getopt.getopt(argv, "hi:k:n:r:t:a:o:")
        except Exception as e:
            sys.exit("\nusage: " + sys.argv[0] + " -h ")

        for opt, arg in opts:
            if opt == '-h':
                self.helps()
                sys.exit()
            elif opt == '-i':
                self.param['-i'] = arg
            elif opt == '-k':
                self.param['-k'] = arg
            elif opt == '-r':
                self.param['-r'] = arg
            elif opt == '-t':
                self.param['-t'] = arg
            elif opt == '-a':
                self.param['-a'] = arg
            elif opt == '-o':
                self.param['-o'] = arg
            elif opt == '-n':
                self.param['-n'] = arg
            else:
                sys.exit("\nusage: " + sys.argv[0] + " -h ")

        resP = self.doCheck(self.param)
        if not isinstance(resP, bool): sys.exit(resP)

        try:
            client = AcsClient(self.param['-i'], self.param['-k'], 'cn-hangzhou')
        except NameError:
            sys.exit("[Error]: SDK module not detected")

        for g in self.doProd(self.param):
            self.lists = []
            self.doRefresh(''.join(g), self.param['-t'], client)

    '''
  描述：检测入参数
  '''

    def doCheck(self, param):

        try:
            for key1 in ('-i', '-k', '-r', '-t'):
                if not key1 in param.keys():
                    return "[Error]: {0} Must be by parameter".format(key1)

            try:
                if not param.has_key('-n'):
                    self.param['-n'] = 50
                if not (abs(int(param['-n'])) <= 100 and abs(int(param['-n'])) > 0):
                    return "[Error]: 0 < -n <= 100"
                else:
                    self.param['-n'] = int(param['-n'])
            except ValueError as e:
                return "[Error]: -n Must be int Type ,{0}".format(str(e))

            if not param['-t'] in ("push", "clear"): return "[Error]: taskType Error"
            if param.has_key('-a') and param.has_key('-o'): return "[Error]: -a and -o cannot exist at same time"

            if param.has_key('-a'):
                if not param['-a'] in ("domestic", "overseas"):
                    return "[Error]: Area value Error"
                if param['-t'] == 'clear':
                    return "[Error]: -t must be push and 'clear' -o use together"

            if param.has_key('-o'):
                if not param['-o'] in ("File", "Directory"):
                    return "[Error]: ObjectType value Error"
                if param['-t'] == 'push':
                    return "[Error]: -t must be clear and 'push' -a use together"

        except KeyError as e:
            return "[Error]: Parameter {0} error".format(str(e))
        return True

    '''
  描述：生成器切分文件，对每行文件进行处理 '\n'
  gop：每次读取 URL 数量
  '''

    def doProd(self, params):
        gop = params['-n']
        mins = 1
        maxs = 7

        with open(params['-r'], "r") as f:
            for line in f.readlines():
                if mins != maxs:
                    line = line.strip("\n") + "\n"
                else:
                    line = line.strip("\n")
                self.lists.append(line)
                if mins >= maxs:
                    yield self.lists
                    mins = maxs
                    maxs = gop + maxs - 1
                else:
                    mins += 1
            if len(self.lists) > 0: yield self.lists

    '''
  描述：刷新/预热任务
  '''

    def doRefresh(self, lists, types, client):
        try:
            if types == 'clear':
                taskID = 'RefreshTaskId'
                request = RefreshObjectCachesRequest()
                if self.param.has_key('-o'):
                    request.set_ObjectType(self.param['-o'])
            elif types == 'push':
                taskID = 'PushTaskId'
                request = PushObjectCacheRequest()
                if self.param.has_key('-a'):
                    request.set_Area(self.param['-a'])

            taskreq = DescribeRefreshTasksRequest()
            request.set_accept_format('json')
            request.set_ObjectPath(lists)
            response = json.loads(client.do_action_with_exception(request))
            print(response)

            while True:
                count = 0
                taskreq.set_accept_format('json')
                print ('------')
                print (type(response[taskID]))
                print ('------')
                taskreq.set_TaskId(int(response[taskID]))
                taskresp = json.loads(client.do_action_with_exception(taskreq))
                print("[" + response[taskID] + "]" + "is doing... ...")
                for t in taskresp['Tasks']['CDNTask']:
                    if t['Status'] != 'Complete':
                        count += 1
                if count == 0:
                    break
                else:
                    continue
                time.sleep(5)
        except Exception as e:
            sys.exit("[Error]" + str(e))

    '''
  描述：帮助信息
  '''

    def helps(self):
        print("\nscript options explain: \
            \n\t -i <AccessKey>                  访问阿里云凭证，访问控制台上可以获得； \
            \n\t -k <AccessKeySecret>            访问阿里云密钥，访问控制台上可以获得； \
            \n\t -r <filename>                   文件名称，每行一条 URL，有特殊字符先做 URLencode，以 http/https 开头； \
            \n\t -t <taskType>                   任务类型 clear 刷新，push 预热； \
            \n\t -n [int,[..100]]                可选项，每次操作文件数量，做多 100 条； \
            \n\t -a [String,<domestic|overseas>  可选项，预热范围，不传是默认是全球；\
            \n\t    domestic                     仅中国大陆； \
            \n\t    overseas                     全球（不包含中国大陆）； \
            \n\t -o [String,<File|Directory>]    可选项，刷新的类型； \
            \n\t    File                         文件刷新（默认值）； \
            \n\t    Directory                    目录刷新")


# TODO 入口

if __name__ == '__main__':
    fun = Refresh()
    fun.main(sys.argv[1:])
```



### 2. 同级目录准备 `cnd.lst` 地址文件

例如：

```js
https://xx.xxxxx.xx/
```



### 3. 编写`Shell`脚本 `re_cdn.sh`

```shell
 #!/bin/bash\
AccessKey="LTAI4G9ZsqotfEhfzWMS6UPm"
AccessKeySecret="UOBlMcMU7V6OSmCxlzM8mBcO9778VL"
# clear | push
action="clear"


echo "开始执行cdn预热刷新"
# python2 Refresh.py -i AccessKey -k AccessKeySecret -r ./cdn.lst -t action
python2 Refresh.py -i $AccessKey -k $AccessKeySecret -r ./cdn.lst -t $action
echo "刷新完成"
```

- 这只是个基本版 可以根据SDK参数来增加更多选项 参数如下⬇️



```c
\n\t -i <AccessKey>                  访问阿里云凭证，访问控制台上可以获得； \
            \n\t -k <AccessKeySecret>            访问阿里云密钥，访问控制台上可以获得； \
            \n\t -r <filename>                   文件名称，每行一条 URL，有特殊字符先做 URLencode，以 http/https 开头； \
            \n\t -t <taskType>                   任务类型 clear 刷新，push 预热； \
            \n\t -n [int,[..100]]                可选项，每次操作文件数量，做多 100 条； \
            \n\t -a [String,<domestic|overseas>  可选项，预热范围，不传是默认是全球；\
            \n\t    domestic                     仅中国大陆； \
            \n\t    overseas                     全球（不包含中国大陆）； \
            \n\t -o [String,<File|Directory>]    可选项，刷新的类型； \
            \n\t    File                         文件刷新（默认值）； \
            \n\t    Directory                    目录刷新")
```

### 4. 修改 `package.json`来 执行 脚本

> 在 script 中 增加 recdn

```json
  "scripts": {
    "serve": "vue-cli-service serve --port 8888 ",
    "build": "vue-cli-service build",
    "oss": "echo \"开始上传...\n正在上传请稍后...\" && node app.js && echo \"成功\"",
    "recdn": "bash ./re_cdn.sh"
  },
```



当然也可以直接把脚本写在oss后面

```json
"oss": "echo \"开始上传...\n正在上传请稍后...\" && node app.js && echo \"成功\"bash ./re_cdn.sh",
```



这样在我们每次构建后 都会自动执行 oss 和 cdn 刷新任务



## 完

