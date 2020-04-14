---
title: React-Native 打包Android.APK
date: 2019-06-17
tags: React
categories: React
---

## React-Native 打包 Android.APK

### 1. 生成签名秘钥

```
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

- 输入一些必要信息
- name
- password
  ...

### 1.1 直接使用 Android studio 进行签名

`傻瓜式 next 不做赘述`

### 2、设置 gradle 变量：

- 修改 android/gradle.properties 文件，增加如下

```shell
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=xx
MYAPP_RELEASE_KEY_PASSWORD=xx
[注意替换xx为你自己设置的密钥和存储密码]
```

### 3、添加签名到应用的 gradle 配置中：

- 编辑你项目目录下的 android/app/build.gradle，添加如下的签名配置：

```js
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...

```

### 4.打包离线 Bundle

- 参数

```
h, --help                   输出如何使用的信息
    --entry-file <path>          RN入口文件的路径, 绝对路径或相对路径
    --platform [string]          ios 或 andorid
    --transformer [string]       Specify a custom transformer to be used
    --dev [boolean]              如果为false, 警告会不显示并且打出的包的大小会变小
    --prepack                    当通过时, 打包输出将使用Prepack格式化
    --bridge-config [string]     使用Prepack的一个json格式的文件__fbBatchedBridgeConfig 例如: ./bridgeconfig.json
    --bundle-output <string>     打包后的文件输出目录, 例: /tmp/groups.bundle
    --bundle-encoding [string]   打离线包的格式 可参考链接https://nodejs.org/api/buffer.html#buffer_buffer.
    --sourcemap-output [string]  生成Source Map，但0.14之后不再自动生成source map，需要手动指定这个参数。例: /tmp/groups.map
    --assets-dest [string]       打包时图片资源的存储路径
    --verbose                    显示打包过程
    --reset-cache                移除缓存文件
    --config [string]            命令行的配置文件路径
```

```
react-native bundle --entry-file index.js --platform android --dev false --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res/
```

- 安卓的

```
react-native unbundle --entry-file index.js --platform android --dev false --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res/

```

### 5.打包

- 然后进入 android 目录执行如下：
  `gradlew assembleRelease` --生成包
  `gradlew assembleDebug` --测试包
