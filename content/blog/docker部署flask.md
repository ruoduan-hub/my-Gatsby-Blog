---
title: Docker 部署 Flask
date: 2022-08-05
tags: Python
comments: true
categories:  Python
---

## Docker 部署 Flask
> 最近在用 Monorepo =>  (Flask + React)  +  (Python + TypeScript) 写一些自己东西，记于此，温故而知新





<img src="https://s2.loli.net/2022/08/05/ZJg4A6Ml39Fvu5z.png" alt="docker" style="zoom: 50%;" />







### WSGI Server 

> Python 项目不同于其他服务例如 javax.servlet.Servlet \  Go \  PHP 等 ，Python 是 **WSGI** 即 （**Python Web Server Gateway Interface**） Python Web服务器网关接口 



### Gunicorn \ Gevent

- [Gunicorn](https://gunicorn.org/) ‘Green Unicorn’ 是一个 UNIX 下的 WSGI HTTP 服务器，它是一个 移植自 Ruby 的 Unicorn 项目的 pre-fork worker 模型。它既支持 [eventlet](https://eventlet.net/) ， 也支持 [greenlet](https://greenlet.readthedocs.io/en/latest/) 
- [Gevent](http://www.gevent.org/) 是一个 Python 并发网络库，它使用了基于 [libev](http://software.schmorp.de/pkg/libev.html) 事件循环的 [greenlet](https://greenlet.readthedocs.io/en/latest/) 来提供一个高级同步 API



Gunicorn 给 WSGI 组件提供服务器功能，Gunicorn 默认使用同步阻塞的网络模型(-k sync)，对于大并发的访问可能表现不够好，Gevent来增加并发量，这就组成一个 “高性能” 服务器



> 我们利用 Gunicorn \ Gevent 来组件我们生产环境下的应用 Server



### Docker

> 这个没什么好说的 —— 容器服务 来提供 Server 的环境运行时



简单复习下 docker： 👇🏻

1. FROM

> 格式：FROM：

第一条指令必须为 FROM 指令，Dockerfile 中创建多个镜像；定义容器运行时



2. RUN

> 格式：`RUN`或 `RUN [“”, “”, “”]`

当前镜像的执行指令



3. CMD

> 格式：`CMD [“”,””,””]`

当前容器 shell



4. ENV

> `ENV`

环境变量，会被 RUN 指令使用，并在容器运行时保存



5.  COPY

> 格式：`COPY`

复制本地主机的 （ 为 Dockerfile 所在目录的相对路径）到容器中的 （当使用本地目录为源目录时，推荐使用 COPY）



6. WORKDIR

> 格式：`WORKDIR /path/to/workdir`

为后续的 RUN 、 CMD 、 ENTRYPOINT 指令配置工作目录。（可以使用多个 WORKDIR 指令，后续命令如果参数是相对路径， 则会基于之前命令指定的路径）



....

[Docker Doc info 📃](https://docs.docker.com/engine/reference/builder/#from)

---



- 下面让我们开始吧~





### 安装使用 Gunicorn + Gevent

```shell
pip3 install gunicorn gevent
```

Root 下新建文件 `/gunicorn.conf.py` 文件

```
touch gunicorn.conf.py

vim gunicorn.conf.py
```



```python
workers = 5    # 定义同时开启的处理请求的进程数量，根据网站流量适当调整
worker_class = "gevent"   # 采用gevent库，支持异步处理请求，提高吞吐量
bind = "0.0.0.0:5000"
```



这时候我们可以测试一下 



```
gunicorn app:app -c gunicorn.conf.py
```



正常启动的话我们可以看到  启动了一个 服务员我们可以正常 访问它 http://localhost:5000/



![image-20220805150930322](https://s2.loli.net/2022/08/05/S24ZUdXbChOxJ71.png)



**如若报错，则根据错误提示修复即可。**



---



下面我们用 Docker 制作 Flask 的镜像和容器从而在服务器上面部署它们



### 制作镜像



#### requirements.txt

> 首先我们需要为该应用创建一个 requirements.txt 文件，以便容器里面 python 环境的安装：`/requirements.txt`



```
pip3 install -r requirements.txt
```



or pipreqs 来生成，pipreqs 可以只生成当前项目使用的依赖 推荐使用这种方式



```bash
pip3 install pipreqs

pipreqs ./ --encoding=utf-8
```





#### 创建 Dockerfile 文件

```dockerfile
FROM python:3.9
WORKDIR ~/docker-project/

COPY requirements.txt ./
RUN pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

COPY . .

CMD ["gunicorn", "app:app", "-c", "./gunicorn.conf.py"]
```

- 下面我们构建镜像 

```bash
sudo docker build -t testflask:0.1 .
```

> 期间要等待一段时间

- 查看镜像

```bash
sudo docker images
```

> 这时候在列表里面我们就可以看到我们刚刚构建的镜像 `testflask`



在本地临时启动它试一试



```bash
sudo docker run -it --rm -p 5000:5000 testflask:0.1
```



容器正常运行，我们现在要做的就是上传镜像然后再服务器上安装启动容器



#### 上传镜像



- [登录Docker-Hub](https://hub.docker.com/)

- 创建 Project

<img src="https://s2.loli.net/2022/08/05/kZYfbNTSPHOonME.png" alt="image-20220805154622541" style="zoom: 50%;" />



<img src="https://s2.loli.net/2022/08/05/NFqZxKmMsfWk4Gb.png" alt="image-20220805154727853" style="zoom:50%;" />

- 重新定义tag

> 格式：docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]



```bash
docker tag testflask:0.1 youName/testflask:0.1 
```



注意在上传镜像的时候要求 tag 前缀是你的用户名，在创建project的时候上面会有说明



- 上传镜像

> 格式：docker push [OPTIONS] NAME[:TAG]

```bash
docker push youName/testflask:0.1 
```



---





### 服务器安装容器

> 前提是服务器上面安装了 Docker 

```bash
sudo apt-get install docker.io
```

> 其他操作系统自行按照教程安装

[Docker install  📃](https://docs.docker.com/desktop/install/linux-install/)



- 拉取镜像

```bash
docker pull youName/testflask:0.1 
```



- 安装容器



```bash
docker run -d  -p 80:5000  youName/testflask:0.1 
```



> 把操作系统的 80 端口 映射到了容器 5000 端口 上面，这时候去开发安全组就可以正常访问了















