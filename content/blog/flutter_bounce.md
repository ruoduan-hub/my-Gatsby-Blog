---
title: Flutter 处理 webview IOS bounce  弹簧效果
date: 2022-11-04
tags: Flutter
comments: true
categories: Flutter
---



### 缘起
> flutter 没有 类似 ios 👇🏻

<img src="https://s2.loli.net/2022/11/04/smGNQAh9URx7gbK.jpg" alt="bounce.jpeg" width="40%" />

```swift
_webView.scrollView.alwaysBounceVertical = NO;
_webView.scrollView.bounces = NO;
```

- 可以通过 `evaluateJavascript` 给 body 加 style hidden 来处理

```dart
...

onWebViewCreated: (WebViewController webViewController) {
    _webviewController = webViewController;
},

/**
 * Todo: This's a test function . WebView disable bounce on iOS 
 * issues: https://github.com/flutter/flutter/issues/57090
 */
onPageFinished: (url) {
    _webviewController?.evaluateJavascript('document.body.style.overflow = \'hidden\';');
}

...

```

- 这个方式尽管不太完美，等待官方给出解决方案吧