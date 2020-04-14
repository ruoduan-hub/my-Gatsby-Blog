---
title: Shell基本指南
date: 2020-02-04
tags: Shell
categories: Shell
---

## 缘起

> 病毒肆掠 在家来无事，想着吧`shell`的知识整理一下

[源码地址](https://github.com/Chad97/My-notes/tree/master/shell) github 求点个 star ⭐️

### shell 环境

> `shell`是一门脚本语言，Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。Shell 既是一种命令语言，又是一种程序设计语言。

> 我们常见的操作系统如 mac 的 OSX 系统，打开终端就可以执行我们的`shell(Bash shell)`。windows 系统中我们的`cmd`终端也可以执行，`Linux`系统一等公民的`shell`环境

无论什么开发者，或多或少都会运用到一些`shell`的知识，这篇文章旨在帮助你完整的整理`shell`的基本知识

话不多说让我们开始吧 ！

## start

作为一门脚本语言，和其他语言一样`shell`中也存在：

- 变量
- 数据结构
- 运算符
- 流程控制
- 函数
- 内置函数

---

### 变量

```bash
    my_var='new.ruoduan.cn'
```

- 语句给变量赋值

```bash
for file in `ls /etc`
# 以上语句将 /etc 下目录的文件名循环出来
```

- 只读变量

```bash
redVar="abc"
readonly redVar
redVar="213"
```

`This variable is read only.`

- 删除变量

```
del_var='待会要删除'
unset del_var
echo $del_var
```

输出为空

- 拼接字符串

```bash
name='ruoduan'
echo "my name is ${name} !"
echo 'my name is $name !'
```

    引号里可以有变量，双引号里可以出现转义字符

- 获取字符串长度
  `echo ${#name}`

- 截取字符串 和 python 类似
  `echo ${name:3:1}`

- 查找字符串
  `echo`expr index "\$name" r`# 输出1`

### 传递参数

arguments.sh

```bash
echo "Shell 传递参数实例！";
echo "执行的文件名：$0";
echo "第一个参数为：$1";
echo "第二个参数为：$2";
echo "第三个参数为：$3";
```

终端执行 `bash arguments.sh 1 2 3`

输出：

```
Shell 传递参数实例！
执行的文件名：arguments.sh
第一个参数为：1
第二个参数为：2
第三个参数为：3
```

转义符：

| 符号 | 解释                                                                                                                       |
| ---- | -------------------------------------------------------------------------------------------------------------------------- |
| \$#  | 传递到脚本的参数个数                                                                                                       |
| \$\* | 以一个单字符串显示所有向脚本传递的参数。如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数。                      |
| \$\$ | 脚本运行的当前进程 ID 号                                                                                                   |
| \$!  | 后台运行的最后一个进程的 ID 号                                                                                             |
| \$@  | 与`$*`相同，但是使用时加引号，并在引号中返回每个参数。如"\$@"用「"」括起来的情况、以`"$1" "$2" … "$n"`的形式输出所有参数。 |
| \$-  | 显示 Shell 使用的当前选项，与 set 命令功能相同。                                                                           |
| \$?  | 显示最后命令的退出状态。0 表示没有错误，其他任何值表明有错误。                                                             |

- 栗子 🌰

```bash
echo -e "\n Shell 传递参数实例！";
echo "第一个参数为：$1";

echo "参数个数为：$#";
echo "传递的参数作为一个字符串显示：$*";
```

输出：

```
Shell 传递参数实例！
第一个参数为：1
参数个数为：3
传递的参数作为一个字符串显示：1 2 3

```

### 数组

比较容易理解，一个文本带过

arr.sh

```bash
my_array=(A B "C" D)

array_name[0]=value0
array_name[1]=value1
array_name[2]=value2

echo $array_name[1]

# 获取数组中的所有元素
# 使用@ 或 * 可以获取数组中的所有元素

echo "数组中的所有元素为${array_name[*]} "

# 获取数组的长度å
echo "数组中的长度${#array_name[*]} "

```

输出：

```
value0[1]
数组中的所有元素为value0 value1 value2
数组中的长度3
```

### 运算符

> shell 运算符分为如下几类

- 算数运算符
- 关系运算符
- 布尔运算符
- 字符串运算符
- 文件测试运算符

> 原生 bash 不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。

```bash
val=`expr 3 + 3`
echo "两数之和为 : $val"
```

`两数之和为 : 6`

算术运算

```bash
a=30
b=60

val=`expr $a + $b`
echo "a + b : $val"

val=`expr $a - $b`
echo "a - b : $val"

val=`expr $a \* $b`
echo "a * b : $val"

val=`expr $b / $a`
echo "b / a : $val"

val=`expr $b % $a`
echo "b % a : $val"

if [ $a == $b ]
then
   echo "a 等于 b"
fi
if [ $a != $b ]
then
   echo "a 不等于 b"
fi
```

输出：

```
两数之和为 : 6
a + b : 90
a - b : -30
a * b : 1800
b / a : 2
b % a : 0
a 不等于 b
```

其他的运算符 就不给出实例了详情 [源码](https://github.com/Chad97/My-notes/tree/master/shell)

### shell echo

```bash
echo '啦啦啦～ 哈哈哈'

# 显示转义字符
echo -e '啦啦啦～ \n 哈哈哈'

# 显示变量
# 有点类似于 python 中的 input
read name
echo "$name It is a test"

# 显示结果定向至文件
echo -e "显示结果定向至文件的内容\n" > myfile.log

# 显示命令执行结果
echo `date`
```

比较简单

### shell printf

语法：
printf format-string [arguments...]

- format-string: 为格式控制字符串
- arguments: 为参数列表。

```bash
echo "Hello, Shell"
printf "Hello, Shell\n"

# 格式化打印
printf "%-10s %-8s %-4s\n" 姓名 性别 体重kg
printf "%-10s %-8s %-4.2f\n" 小米 男 66.1234
printf "%-10s %-8s %-4.2f\n" 小红 男 48.6543
printf "%-10s %-8s %-4.2f\n" 小康 女 47.9876
```

输出：

```bash
Hello, Shell
Hello, Shell
姓名     性别   体重kg
小米     男      66.12
小红     男      48.65
小康     女      47.99
```

- `%s %c %d %f`都是格式替代符

- `%-10s` 指一个宽度为 10 个字符（-表示左对齐，没有则表示右对齐），任何字符都会被显示在 10 个字符宽的字符内，如果不足则自动以空格填充，超过也会将内容全部显示出来。

- `%-4.2f` 指格式化为小数，其中.2 指保留 2 位小数。

### 流程控制

- if elif

```bash
if [ $a == $b ]
then
   echo "a 等于 b"
elif [ $a -gt $b ]
then
   echo "a 大于 b"
elif [ $a -lt $b ]
then
   echo "a 小于 b"
else
   echo "没有符合的条件"
fi
```

shell 中流程控制以`if`开始`fi`结尾

- if else
  if else 语句经常与 test 命令结合

```bash
num1=$[2*3]
num2=$[1+5]
if test $[num1] -eq $[num2]
then
    echo '两个数字相等!'
else
    echo '两个数字不相等!'
fi

# for 循环
for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done
```

输出：

```bash
The value is 1
The value is 2
The value is 3
The value is 4
The value is 5
```

- while 语句

```bash
int=1
while(( $int<=6 ))
do
    echo $int
    let "int++"
done
```

输出：

```
1
2
3
4
5
6
```

- 无限循环

```bash
while true
do
    command
done
```

or

`for (( ; ; ))`

- until 循环

```bash
until [ ! $a -lt 10 ]
do
   echo $a
   a=`expr $a + 1`
done
```

- case

```bash
echo '输入 1 到 4 之间的数字:'
echo '你输入的数字为:'
read aNum
case $aNum in
    1)  echo '你选择了 1'
    ;;
    2)  echo '你选择了 2'
    ;;
    3)  echo '你选择了 3'
    ;;
    4)  echo '你选择了 4'
    ;;
    *)  echo '你没有输入 1 到 4 之间的数字'
    ;;
esac
```

- break continue
  continue 命令与 break 命令类似，只有一点差别，它不会跳出所有循环，仅仅跳出当前循

* case ... esac

```bash
site="a"
case "$site" in
   "a") echo "is a"
   ;;
   "b") echo "is b"
   ;;
   "c") echo "is c"
   ;;
esac
```

### 函数

```bash
demoFun () {
    echo "函数执行"
}
demoFun
```

- 函数返回值

```bash
returnFun () {
    echo '返回2数相加'
    echo '输入第一个数字'
    read aNum
    echo '输入第二个数字'
    read bNum
    echo "$aNum 加 $bNum"
    return $(($aNum+$bNum))
}

returnFun
echo "输入的两个数字之和为 $? !"

```

函数返回值在调用该函数后通过 \$? 来获得
注意：所有函数在使用前必须定义。这意味着必须将函数放在脚本开始部分，直至 shell 解释器首次发现它时，才可以

- 函数参数

  和前面的传递参数大致相同

```bash
funWithParam(){
    echo "第一个参数为 $1 !"
    echo "第二个参数为 $2 !"
    echo "err：第十个参数为 $10 !"
    echo "第十个参数为 ${10} !"
    echo "第十一个参数为 ${11} !"
    echo "参数总数有 $# 个!"
    echo "作为一个字符串输出所有参数 $* !"
}

funWithParam 1 2 3 4 5 6 7 8 9 66 99
```

输出:

```
第一个参数为 1 !
第二个参数为 2 !
err：第十个参数为 10 !
第十个参数为 66 !
第十一个参数为 99 !
参数总数有 11 个!
作为一个字符串输出所有参数 1 2 3 4 5 6 7 8 9 66 99 !
```

**_当 n>=10 时，需要使用\${n}来获取参数_**

- 参数符

| 符号 | 说明                                                           |
| ---- | -------------------------------------------------------------- |
| \$#  | 传递到脚本或函数的参数个数                                     |
| \$\* | 以一个单字符串显示所有向脚本传递的参数                         |
| \$\$ | 脚本运行的当前进程 ID 号                                       |
| \$!  | 后台运行的最后一个进程的 ID 号                                 |
| \$@  | 与\$\*相同，但是使用时加引号，并在引号中返回每个参数。         |
| \$-  | 显示 Shell 使用的当前选项，与 set 命令功能相同。               |
| \$?  | 显示最后命令的退出状态。0 表示没有错误，其他任何值表明有错误。 |

### shell 文件模块

和 JavaScript ECma5 差不多

test1.sh

```bash
file_name='test1文件数据'
```

test2.sh

```bash
. ./test1.sh
# or
# source ./test1.sh

echo $file_name
```

输出: `test1文件数据`

---

到这里 shell 的基本知识也差不多了[本指南源码](https://github.com/Chad97/My-notes/tree/master/shell)

码字不易 求点个 star ⭐️

vim 图

![vim图](./shell基本指南/vi-vim-cheat-sheet-sch.png)
