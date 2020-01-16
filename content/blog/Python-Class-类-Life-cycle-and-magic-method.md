---
title: Python-Class(类)生命周期和魔法方法
date: 2019-08-31
tags: Python
comments: true
categories: 《Python》
---

## 内置属性和方法
| 方法名          | 类型- | 作用                                                         |
| --------------- | ----- | ------------------------------------------------------------ |
| `__init__`      | 方法  | 类实例化时自动调用这个函数                                   |
| `__del__`       | 方法  | 对象被内存中销毁前，会被自动调用                             |
| `__str__`       | 方法  | 类的实例打印时调用这个函数(返回)用户看到的                   |
| `__repr__`      | 方法  | 和上面的str函数一样,只是这个时返回开发者看到的               |
| `__ getattr __` | 方法  | 当调用不存在的属性时访问这个方法                             |
| `__call__`      | 方法  | 如果类实现了这个方法，相当于把这个类型的对象当作函数来使用，相当于 重载了括号运算符 |

[具体参考Python3标准库](https://docs.python.org/zh-cn/3/library/index.html)
## 生命周期
- 一个对象从调用`类名（）`开始创建，生命周期开始
- 一个对象 `__del__ ` 方法一旦被调用，生命周期结束
- 在对象生命周期内可以访问，对象属性，或者让对象调用方法

例如：
```python
class Cat:
    def __init__(self, name):
        self.name = name
        print('他来了 他来了')

    def __del__(self):
        print('他走了 他走了')

#  Tom 是一个全局变量
tom = Cat('Tom')
print(tom.name)
print('-' * 50)
```
执行如下

```
他来了 他来了
Tom
--------------------------------------------------
他走了 他走了
```

现在 我们调用 del 删除 `tom`
```python
-- omit --

#  Tom 是一个全局变量
tom = Cat('Tom')
print(tom.name)
del tom
print('-' * 50)
```
```
他来了 他来了
Tom
他走了 他走了
--------------------------------------------------
```

## Class魔法方法
上面的表格以及描述的差不多了，贴一段代码来例举
```python
class Cat:
    #  类实例化时自动调用这个函数
    def __init__(self, name):
        self.name = name
        print('%s他来了 他来了' % self.name)

    #  对象被内存中销毁前，会被自动调用
    def __del__(self):
        print('他走了 他走了')

    #  类的实例打印时调用这个函数(返回)用户看到的
    def __str__(self):
        return '我是Cat的类'

    #  和上面的str函数一样,只是这个时返回开发者看到的
    def __repr__(self):
        return '__repr__'

    #  当调用不存在的属性时访问这个方法
    def __getattr__(self, item):
        item = 'A'
        print('属性不存在，默认为 %s' % item)

    #  如果类实现了这个方法，相当于把这个类型的对象当作函数来使用，相当于 重载了括号运算符
    def __call__(self, *args, **kwargs):
        print('我是 %s 通过__call__转函数实例化的' % args)


#  Tom 是一个全局变量
tom = Cat('Tom')
print(tom.name)
# del tom
print('-' * 50)
print(tom)
tom.sex
print('*' * 50)
tom('Tim')

```
懒的同学 看下面 执行结果
```
Tom他来了 他来了
Tom
--------------------------------------------------
我是Cat的类
属性不存在，默认为 A
**************************************************
我是 Tim 通过__call__转函数实例化的
他走了 他走了
```
`__call__`  如果没有定义的话 就 `tom('Tim')` 就用实例直接调用类的话会保持哟~