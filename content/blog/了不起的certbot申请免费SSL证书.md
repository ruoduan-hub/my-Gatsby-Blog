---
title: "了不起的certbot申请免费SSL证书"
date: 2020-10-12
tags: 记
comments: true
categories: 记
---

## 缘起
> 最近 阿里云的SSL 到期了。需要重新申请一个，调研后目前免费的就是`certbot`比较好用，特此记录 流程和坑

![封面](https://user-gold-cdn.xitu.io/2020/7/13/17348ae85e207c40?w=474&h=237&f=jpeg&s=13292)

[官网地址](https://certbot.eff.org/lets-encrypt/centosrhel7-nginx)

> certbot是基于letsencrypt.org的一个自动化工具🔧

- 话不多说直接开始

## start

### 1. 去官网选择你的操作系统和静态资源服务器


### 2. 安装依赖包
```shell
sudo yum install certbot python2-certbot-nginx
```
> 这个地方你可能会安装失败，我们可以把二进制包下载下来 然后在安装

`ImportError: No module named 'requests.packages.urllib3'`

有这么一个报错，不要慌

```shell
yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
```
> 然后执行上面👆步骤

### 3. 执行certbot安装SSL证书

```shell
# 一键配置
sudo certbot --nginx
or
# 只获取证书手动来配置nginx
sudo certbot certonly --nginx
```
ps： 这个地方有几个坑

#### one、可能会遇到 `urllib3` 报错 你需要 👇 重新安装一下

```python
pip uninstall urllib3
pip install urllib3
```

#### tow、他是基于python2的，如果你电脑里面像我一样同时安装了 py2 和py3，你需要用python2 来执行

```
python2 -m pip urllib3
```

#### three、到这里你可能还是有问题，还有一个坑他是👇
```shell
trypip install --upgrade --force-reinstall 'requests==2.6.0' urllib3 , I've had the same problem https://niuhp.com/other/https-certbot.html
```
你需要锁定🔒版本 2.6.0 

- 然后会让你输入你的邮箱账号 当然你可以选择跳过，然后是否同意协议和接受他们的推送 `y`就行了

### 自动续签

```shell 
echo "0 0,12 * * * root python -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew -q" | sudo tee -a /etc/crontab > /dev/null
```

之后你就该配置nginx的配置nginx就好了

直接以 `https` 访问你的网站就可以了。



---



> 更新内容：



### 更新续签

```shell
certbot certonly --cert-name xxx.com
```

> 忘了证书名的话

> `certbot certificates` // 查看已安装的证书



### 证书增加新域名

```shell
certbot --cert-name xxx.com -d aa.xx.com,bb.xxx.com,www.xxx.com
```



