---
title: Flutter web bridge 通信总结
date: 2023-01-22
tags: Flutter
categories: Flutter
---

![image](https://s2.loli.net/2023/01/23/8JPjSBiZuqKzncl.png)


## 缘起
> 公司医疗业务人手比较少【小而美】的团队~ 较少采用的前端技术架构是：
> 
> toC：小程序 
> toB2C: Flutter + H5(SPA - React)【build 👉🏻 Android + IOS】 Flutter web + H5 【企业微信服务商应用】
> 
> toB: 后台端、 数据大屏 Vue 
> 
> 边缘业务：社区 平台 等 使用的 原生  

- 虽然团队不大但是技术挺杂的，至于为什么要在flutter 中加入 混合开发是因为想通过微架构模式拆分业务，达到资源最大程度的复用；通过 Flutter 解决平台间的复用；微架构的 单页面应用程序解决 业务间的复用。这个暂且不谈，本期整理一下 flutter 中的 bridge 通信；

**架构图大致如下** 👇🏻

![Flutter-web 2 H5.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe8cef58055d489d91745e2181b3adb1~tplv-k3u1fbpfcp-watermark.image?)


bridge 部分解决各端的

1. 兼容性和平台差异
2. 不同操作系统之间的处理
3. 各端之间跨端通信
4. 第三方 SDK 调用整合 
5. 各端业务复用
6. 解决各端之间 Auth 的授权整合
7.  ...
---


## 通信方式
> 老生常谈了 其实就是 JS 和 dart 之间的相互调用和注入方法

### APP 中 JS & dart call

- APP 中
> app中主要是通过 webview 来通信和混合开发的方式大同小异；都是 H5 & App 各自注册通过 postmessage | urlchange 来触发调用

**主要代码：**

- 通过 Flutter webview中注入 flutter 的方法

- Flutter端
```dart
javascriptChannels: <JavascriptChannel>[
                  JavascriptChannel(
                    name: 'xxBridge',
                    onMessageReceived: (JavascriptMessage jsMessage) {
                      Map messageMap = json.decode(jsMessage.message);
                      print(messageMap);
                      if (messageMap['type'] == 'appPagePop') {
                        Navigator.pop(context, messageMap['value']);
                        return;
                      }
                      if (messageMap['type'] == 'navigateTo') {
                        Map params = messageMap['params'];
                        String patientCode = params['code'];
                        Routes.navigateTo(context, messageMap['url'],
                            params: {'id': UserUtil.transferCodeToId(patientCode)});
                        return;
                      }
                    },
                  ),
                ].toSet()
```

- H5端


```ts
export default class xxBridge {
  isApp: boolean;
  constructor() {
    /**
     *  receipt app  message callback func
     * @param message
     * @returns boolean
     */
    window.flutterMessage = (message: string) => {
      console.log(message, ' receipt app message');

      return true;
    };
  }

  appPagePop = (value = false) => {
    if (!this.isApp) {
      console.log('当前不是app环境，或者没有Bridge 运行时哦 ~ ！');
      window.history.back();
      return;
    }

    window.xxBridge.postMessage(
      JSON.stringify({
        type: 'appPagePop',
        value: value,
      }),
    );
  };
}
```

- Flutter 中调用 H5 在window 注册的方法

```dart
onPageFinished: (url) {
                  print(url + '加载完成');

                  Map data = {
                    'doctorCode': UserUtil.doctorCode(),
                    'doctorName': SpUtil.getString(DOCTOR_NAME_KEY),
                  };
                  var dataJson = json.encode(data);
                  print(dataJson);

                  _webviewController?.evaluateJavascript("getAppLoginInfo('$dataJson')").then((res) {
                    print("evaluateJavascript-res: ${res}"); // evaluateJavascript-res: true
                  });

                  // print('加载结束');
                },

```


1. `xxBridge` 是 `Flutter JavascriptChannel` 注入通信对象
2. `onMessageReceived` 接收 web端 postmessage 触发 dart 方法
3. web 端中 `window.flutterMessage` 注册方法给 Flutter 在 app 中调用

---

**至此 Flutter APP 和 H5 通信 基本是以上方式拓展，当然还有 Url 的方式 和 Storage 的方式这里不表；**



### Flutter web 中 JS & dart call

#### dart 调用 js

> 有2种方式

**1. Promise js文件的方式被调用**

定义方法

```js
function print(msg) {
  return new Promise((resolve, reject) => {
     resolve('code : xxxxx')
    alert(msg)
  });
}

```

调用

```dart
import 'dart:js' as js;

@JS()
external print(String msg);

var wxScanPromise = print('123');
String code = await jsUtil.promiseToFuture(wxScanPromise)

```

**2. 通过 js.context 获取上下文来调用**


- 首先在 init 中注入方法

webapp main.dart

```dart
class Application {
  static Future init(ui.VoidCallback callback) async {
    DarttoJS().into();
   
  }

  ...
}
```


```dart
//  This's a test dart to js func
class DarttoJS {
  // js call dart
  static void myalert(String text) {
    Fluttertoast.showToast(
        msg: "This's JS pass on test ！：$text",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.CENTER,
        timeInSecForIosWeb: 1,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 16.0);
  }


  void into() {
    js.context["myalert"] = myalert;
    js.context.callMethod('onLogin');
  }
}

```

webaapp index 文件中添加 `onLogin`
```js
const onLogin = () => {
    ...
}

export { onLogin }
```


1. 在 init 中注入方法调用类
2. `js.context` 来给 js 注入window下的全局方法


#### js 调用 dart
1. 通过 `js.context["myalert"] = myalert` 注册了方法

2. 直接在js文件中调用 

---

## summary
> 之后我们可以在 xxBridge 中不断的继承 WeChat SDK、dingdingSDK、等等 和一些业务方法 通过 `rollup` 等一些工具 打包发布NPM包整合自己的工具




