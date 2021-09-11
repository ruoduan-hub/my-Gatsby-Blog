---
title: "flutter-route实践"
date: 2021-09-11
tags: Flutter
comments: true
categories: 《Flutter》
---

> `Flutter`中的路由和`React`很相似通常指一个页面跳转到另一个页面；在这里面我们称之为`路由栈`

flutter 路由通常有三种方式：👇🏻


### Navigator.push

```dart
Navigator.push( context,
    MaterialPageRoute(builder: (context) {
        return Page1();
}));
```

这段代码用到了2个 `API` 分别是：

- **Navigator**
- **MaterialPageRoute**

#### Navigator
> 第一种方法 ✅

> `Navigator`是一个路由管理的组件，它提供了打开和退出路由页方法。`Navigator`通过一个栈来管理活动路由集合。通常当前屏幕显示的页面就是栈顶的路由。`Navigator`提供了一系列方法来管理路由栈，在此我们只介绍其最常用的两个方法

- **Future push(BuildContext context, Route route)**

> 将给定的路由入栈（即打开新的页面），返回值是一个`Future`对象，用以接收新路由出栈（即关闭）时的返回数据。

- **bool pop(BuildContext context, [ result ])**
> 将栈顶路由出栈，`result`为页面关闭时返回给上一个页面的数据。

`Navigator` 还有很多其它方法，如`Navigator.replace`、`Navigator.popUntil`等，详情请参考[API文档](https://api.flutter-io.cn/flutter/widgets/Navigator/Navigator.html)或SDK源码注释，在此不再赘述。下面我们还需要介绍一下路由相关的另一个概念“命名路由”。


<br />

#### MaterialPageRoute
> `MaterialPageRoute`继承自`PageRoute`类，`PageRoute`类是一个抽象类，表示占有整个屏幕空间的一个模态路由页面，它还定义了路由构建及切换时过渡动画的相关接口及属性。`MaterialPageRoute` 是Material组件库提供的组件，它可以针对不同平台，实现与平台页面切换动画风格一致的路由切换动画：

- 入参
```dart
MaterialPageRoute({
    WidgetBuilder builder,
    RouteSettings settings,
    bool maintainState = true,
    bool fullscreenDialog = false,
  })
```

- `builder` 是一个WidgetBuilder类型的回调函数，它的作用是构建路由页面的具体内容，返回值是一个widget。我们通常要实现此回调，返回新路由的实例。

-   `settings` 包含路由的配置信息，如路由名称、是否初始路由（首页）。

-   `maintainState`：默认情况下，当入栈一个新路由时，原来的路由仍然会被保存在内存中，如果想在路由没用的时候释放其所占用的所有资源，可以设置`maintainState`为false。

-   `fullscreenDialog`表示新的路由页面是否是一个全屏的模态对话框，在iOS中，如果`fullscreenDialog`为`true`，新页面将会从屏幕底部滑入（而不是水平方向）。

---

### RoutesMap
> 第二种方法 ✅

> 顾名思义 `路由表`的方式，和我们`Vue`\`React` 很相似
> 直接在 `MaterialApp` 中注册路由表, 我们给每一个路由定义一个路径，这种方式称之为 `命名路由`

```dart
MaterialApp(
  title: 'Flutter Demo',
  theme: ThemeData(
    primarySwatch: Colors.blue,
  ),
  //注册路由表
  routes: {
    "/":(context) => MyHomePage(title: 'Flutter Demo Home Page'), //注册首页路由
    'page1': (context) => Page1(),
    'page2': (context) => Page2()
  },
);

```

- 打开方式：

```dart
onPressed: () {
  Navigator.pushNamed(context, "new_page");
  // 对比之前的方式
  //Navigator.push(context,
  //  MaterialPageRoute(builder: (context) {
  //  return NewRoute();
  //}));  
},
```


### onGenerateRoute
> 第三种方法✅
> 这个方式，我们称之为`钩子路由`，其实就是在执行页面跳转的时候执行一个方法来判断 类似 `拦截器`的意思

> `MaterialApp`有一个`onGenerateRoute`属性，它在打开命名路由时可能会被调用，之所以说可能，是因为当调用`Navigator.pushNamed(...)`打开命名路由时，如果指定的路由名在路由表中已注册，则会调用路由表中的`builder`函数来生成路由组件；如果路由表中没有注册，才会调用`onGenerateRoute`来生成路由。`onGenerateRoute`回调签名如下：

```dart
Route<dynamic> Function(RouteSettings settings)
```

很简单举个例子🌰

```dart
 MaterialApp(
    // ... 省略无关代码

    onGenerateRoute: (RouteSettings settings) {
      String routeName = settings.name;
      print(settings);
      switch (routeName) {
        case '/':
          return MaterialPageRoute(builder: (context) {
            return MyHomePage(title: 'Flutter Demo Home Page');
          });

        case 'page1':
          return MaterialPageRoute(builder: (context) {
            return Page1(ps: settings.arguments);
          });
        case 'page2':
          return MaterialPageRoute(builder: (context) {
            return Page2(text: settings.arguments);
          });
        // 路由不匹配默认返回首页
        default:
          return MaterialPageRoute(builder: (context) {
            return MyHomePage(title: 'Flutter Demo Home Page');
          });
      }
    });
  
```

> 有了这个方法我们可以有很选择，当然也可以和 `RouteMap` 结合起来做，因为只有路径匹配不到路由表的时候才会执行 `onGenerateRoute` 匹配


### 传参
> 有了路由跳转当然少不了传参 🤖

`if`

如果使用第一种方式的话，我们可以通过`ModalRoute` 直接拿到传递的参数

```dart
// 获取路由参数
var  params = ModalRoute.of(context).settings.arguments as Map;
```

`else`

否则的话,`命名路由`可以直接定义接收

举个例子🌰

```dart
class Page2 extends StatelessWidget {
  const Page2({Key key, this.text}) : super(key: key);
  final String text; // 定义接收 text 参数

  @override
  Widget build(BuildContext context) {
    // 获取路由参数
    var params = ModalRoute.of(context).settings.arguments;

    if (params == null) {
      // 当路由参数为空的时候，使用 props 参数
      params = text;
    }

    return Scaffold(
      appBar: AppBar(
        title: Text("page2"),
      ),
      body: Center(
        child: Text('page2 路由参数：$params'),
      ),
    );
  }

}
```

### 小结
> 上面三种方式，使用命名路由是最推荐的，因为:

1. 语义明确
2. 代码集中好维护、管理
3. 可通过`onGenerateRoute`做一些拦截处理

---

### demo code
> 完整的代码

main.dart

```dart
import "package:flutter/material.dart";

// 导入路由页面
import './Page/Page1.dart';
import './Page/Page2.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
        title: 'Flutter Demo',
        initialRoute: '/',
        theme: new ThemeData(
          primarySwatch: Colors.blue,
        ),

        // 注册路由表
        // routes: {
        //   "/":(context) => MyHomePage(title: 'Flutter Demo Home Page'), //注册首页路由
        //   'page1': (context) => Page1(),
        //   'page2': (context) => Page2()
        // },
        onGenerateRoute: (RouteSettings settings) {
          String routeName = settings.name;
          print(settings);
          switch (routeName) {
            case '/':
              return MaterialPageRoute(builder: (context) {
                return MyHomePage(title: 'Flutter Demo Home Page');
              });

            case 'page1':
              return MaterialPageRoute(builder: (context) {
                return Page1(ps: settings.arguments);
              });
            case 'page2':
              return MaterialPageRoute(builder: (context) {
                return Page2(text: settings.arguments);
              });
            // 路由不匹配默认返回首页
            default:
              return MaterialPageRoute(builder: (context) {
                return MyHomePage(title: 'Flutter Demo Home Page');
              });
          }

          // return MaterialPageRoute(builder: (context) {
          //   return MyHomePage(title: 'Flutter Demo Home Page')
          // });
        });
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _ct = 1;

  void addCt() {
    setState(() {
      _ct++;
    });
  }

  void reCt() {
    setState(() {
      _ct = 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
      ),
      body: new Center(
        child: new Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            new Text(
              '这里是首页',
            ),
            new Text(
              '$_ct',
              style: Theme
                  .of(context)
                  .textTheme
                  .headline4,
            ),
            ElevatedButton(onPressed: reCt, child: Text('复位')),
            ElevatedButton(
                onPressed: () {
                  Navigator.pushNamed(context, 'page1',
                      arguments: {'index': _ct, 'add': addCt});
                },
                child: Text('打开页面1')),
            ElevatedButton(
                onPressed: () {
                  Navigator.pushNamed(context, 'page2',
                      arguments: '传给页面2的参数 嘻嘻嘻爱');
                },
                child: Text('打开页面2'))
          ],
        ),
      ),
      floatingActionButton: new FloatingActionButton(
        onPressed: this.addCt,
        tooltip: 'Increment',
        child: new Icon(Icons.add),
      ),
    );
  }
}

```

Page1.dart

```dart
import 'package:flutter/material.dart';

class Page1 extends StatelessWidget {
  const Page1({Key key, this.ps}) : super(key: key);
  final Map ps;

  @override
  Widget build(BuildContext context) {
    // 获取路由参数
    var  params = ModalRoute.of(context).settings.arguments as Map;

    if (params == null) {
      params = ps;
    }

    return Scaffold(
      appBar: AppBar(
        title: Text("page1"),
      ),
      body: Center(
       child: new Column(
         children: [
           new Text(params['index'].toString()),
           new ElevatedButton(onPressed: (){
             params['add']();
           }, child: Text('调用路由传递的方法-增加'))
         ],
       ),
      ),
    );
  }

}
```

Page2.dart

```dart
import 'package:flutter/material.dart';

class Page2 extends StatelessWidget {
  const Page2({Key key, this.text}) : super(key: key);
  final String text;

  @override
  Widget build(BuildContext context) {
    // 获取路由参数
    var params = ModalRoute.of(context).settings.arguments;

    if (params == null) {
      // 当路由参数为空的时候，使用 props 参数
      params = text;
    }

    return Scaffold(
      appBar: AppBar(
        title: Text("page2"),
      ),
      body: Center(
        child: Text('page2 路由参数：$params'),
      ),
    );
  }

}
```

