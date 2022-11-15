# Shell

Shell精简教程

**1.1终端打印**

echo命令

```bash
echo WelCome to Bash
WelCome to Bash
# echo -e 包含转义字符的字符串
# 设置颜色 经常使用的颜色码 重置=0， 黑色=30，红色=31，绿色=32， 黄色=33，
# 蓝色=34，洋红=35，青蛇=36，白色=37
	echo -e '\e[1;31m this is red text \e[0m'
# 变量赋值
	#!/bin/bash
	fruit=apple
	count=5
	echo "We have $count $fruit(s)"
```

printf命令

```bash
# 格式化输出
	printf '%-5s %-10s %4s\n' NO Name Mark 
		NO    Name       Mark
```

cat命令

```bash
# 查看运行的端口
	pgrep docker 
	11767
	32403
# 查看对应进程的环境变量
	cat /proc/11767/environ | tr '\0' '\n'
	LANG=en_US.UTF-8
	PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
	NOTIFY_SOCKET=/run/systemd/notify
	LISTEN_PID=11767
	LISTEN_FDS=1
```

**1.2Shell进行数学运算**

let命令

```bash
#!/bin/bash
no1=4
no2=5
let result=no1+no2
echo $result
# 自加 / 自减
let result++
let reuslt--
```

其他方法

```bash
result=$[no1 + no2]
# 或者使用
reslut=$((no1 + no2))

result='expr 3+4'
result=$(expr no1 + 5)
```

以上只支持整数

bc可以执行浮点数运算并运用一些高级函数

```bash
echo "4 * 0.56" | bc
# 设置计算到小数点后两位
	echo "scale=2; 3/8" | bc
# 进制转换
	#!/bin/bash
	no=100
	echo "obase=2; $no" | bc
	no= 1100100
	echo "obase=10; ibase=2; $no" | bc
	# 计算平方根
	echo "sqrt(100)" | bc
	echo "10^10" | bc
```

**1.3文件描述符和重定向**

- 标准输入—（stdin）
- 标准输出—  (stdout）
- 标准错误 — (stderr)

```bash
# 将输出的文本存储到temp.txt中，原temp.txt内容会被清空
	echo "This is a sample text" > temp.txt
# 将文本追加到temp.txt
	echo "This is a samole text" >> temp.txt
# 向一个文件写入头部数据
	#!/bin/bash
	cat <<EOF>log.txt
	LOG FILE HEADER
	This is a test log file
	Function: System statistios
	EOF

```

**1.4获取终端信息**

tput和stty终端处理工具

```bash
# 获取当前终端行数和列数
	tput cols
	tput lines
# 获取当前终端名
	tput longname
# -echo禁止将输出发送到终端，
	#!/bin/bash
	echo -e "Enter password: "
	stty -echo
	read password
	stty echo
	echo
	echo Password read.
```

**1.5获取日期**

```bash
# 打印纪元时
	date
# 打印总秒数
	date + %s
# 按照对应格式打印日期
	date "+%d %B %Y"
# 列 计算脚本所花的时间
#!/bin/bash
start=$(date +%s)
commands;
statements;
end=$(date +%s)
difference=$(end -start)
echo Time taken execute commands iss $difference seconds.
dsad
```

![Untitled](Shell%200e1a0c0f871c4cd39a449d2705b5e063/Untitled.png)

**1.6调试脚本**

- -x :在执行时显示参数和命令
- +x: 禁止调试
- -v:当命令进行读取时显示输入
- +v:禁止打印输入

```bash
sh -x name.sh
# 补充read命令
# 显示提示信息
# -t指定多少秒内输入 -d 结束输入行
	read -p "Enter input:" var
	read -t 2 -p "Enter input:" -d ":" var
```

**1.7分隔符和迭代器**

 内部字段分隔符(Internal Field Separator，IFS)

 IFS是存储定界符的环境变量。它是当前shell环境使用的默认定界字符串

```bash
#!/bin/bash
data="name,sex,rollno,location"
oldIFS=$IFS
IFS=,
for item in $data;
do
echo Item: $item
done
IFS=$oldIFS
```

算数比较对照表

| code | mean |
| --- | --- |
| -gt | 大于 |
| -lt | 小于 |
| -ge | 大于或等于 |
| -le | 小于或等于 |
|  |  |

文件系统相关

| code | mean |
| --- | --- |
| [-f $file_var] | 如果给定的变量包含正常点的文件路劲或文件名则返回真 |
| [-x $var] | 如果给定的变量包含的文件可执行，则返回真 |
| [-d $var] | 如果给定的变量包含的是目录，则返回真 |
| [-e $var] | 如果给定的变量包含的文件存在，则返回真 |
| [-c $var] | 如果给定的变量包含的是一个字符设备文件的路径，则返回真 |
| [-b $var] | 如果给定的变量包含的是一个块设备文件的路径，则返回真 |
| [-w $var] | 如果给定的变量包含的文件可写，则返回真 |
| [-r $var] | 如果给定的变量包含的文件可读，则返回真 |
| [-L $var] | 如果给定的变量包含的是一个符号链接，则返回真 |

字符串比较

| code | mean |
| --- | --- |
| [[ $str1 = $str2 ]] | 字符串比较 |
| [[ $str1 == $str2 ]] | 另一种写 |
| [[ $str1 != $str2 ]] | 不等于 |
| [[ $str1 > $str2 ]] | 如果str1的字母序比str2大，则返回真 |
| [[ $str1 < $str2 ]] | 如果str1的字母序比str2小，则返回真 |
| [[ -z $str1 ]] | 如果str1是空字符，则返回真 |
| [[ -n $str1 ]] | 如果str1是非空字符串，则返回真 |

**2.1命令之乐**

cat命令

```bash
# 压缩连续的空白行
	cat -s filename
# 用tr移除空白行
	cat filename | tr -s '\n'
# 显示行号
	cat -n filename
# 逆序输出
	tac -n filename
```

**2.2录制与回放终端会话**

```bash
# 打开两个终端
# terminal1
	mkfifo scriptfifo
# teminal2
	cat scriptfifo
# 退出会话 exit
```

**2.3文件的查找与文件列表**

```bash
# 当前目录下的所有.sh文件
	find /root -name "*.sh" -print
# 忽略大小写
	find /root -iname "zkcli.sh" -print
# 匹配多个条件的中的一个
	find /root \( -name "*.sh" -o  -name "*.txt" \) -print
# 不包含 否定参数 |
	find /root | -name "*.sh" -print

# 基于目录深度搜索
# -maxdepth和 -mindepth
	find . -maxdepth 1 -name  "*.sh" -print
# 至少两个子目录以下的文件
	find . -mindepth 2 -name "*.sh" -print
# 根据文件时间进行搜索
# 单位天
# -atime 用户最近一次访问文件的时间
# -mtime 文件内容最后一次被修改的时间
# -ctime 文件元数据最后一次改变的时间
	find . -type f -atime -7 -print
# 单位分钟
# -amin 访问时间 
# -mmin 修改时间
# -cmin 变化时间
# 打印访问时间超过七分钟的所有文件
	find . -type f -amin +7 -print
# 基于文件大小搜索
# 文件大小单元
# b -- 块（512字节）
# c -- 字节
# w -- 字(2字节)
# k -- 千字节
# M -- 兆字节
# G -- G字节
	find . -type f -size +2k
# 删除匹配的文件 -delete
	find . -type f -size -2k -delete
# 与 exec结合
	find . -type f -user root -exec chown ss {} \;
# -prune 跳过特定的目录
	find /root \( -name "*.sh" -prune \) -o \( -tyoe -f -print\)
```

![文件类型对照](Shell%200e1a0c0f871c4cd39a449d2705b5e063/Untitled%201.png)

文件类型对照

**2.4玩转xargs**

```bash
# 将多行转成单行输出
	cat date.sh | xargs
# 按每行参数最大量
	cat date.sh | xargs -n 3
# 定界符
# 以字符X作为（IFS）
	cat date.sh | xatgs -d X -n 2
# 统计.sh文件的总行数
	find . -type f -name "*.sh" -maxdepth 1  -print0 | xargs -0 wc
```

**2.5tr命令**

```bash
# 将所有的小写文字转为大写
	cat date.sh | tr 'a-z' 'A-Z'
# 简易的数字加密和解密
	echo 12345 | tr '0-9' '987654321'
	echo 87654 | tr '987654321' '0-9'
# 删除指定字符-d
	cat date.sh | tr -d '0-9'
# 字符串补集
	cat date.sh | tr -d -c '0-9 \n'
# 字符类
# alnum -- 字母和数字
# alpha -- 字母
# cntrl -- 控制（非打印）字符
# digit -- 数字
# graph -- 图形字符
# lower -- 小写字母
# print -- 可打印字符
# punct -- 标点符号
# space -- 空白字符
# upper -- 大写字母
# xdigit -- 十六进制字符
	cat date.sh | tr '[:lower:]' '[:lower:]'
```

2.6 校验和核实

```bash
# 校验一个文件的完整性
# md5sum和sha1sum
	md5sum filename > filname.md5
	sha1sum filename > filename.sha1
```

**2.7排序、单一与重复**

```bash
# sort命令文件名排序
	find . -type f -maxdepth 1 -name '*.sh'|sort
# 按数字进行排序
  sort -n
# 按逆序排序
	sort -r 
# 按月份进行排序
	sort -M
# uniq命令消除重复的内容
  uniq filename
	sort -u filename
  sort filename | uniq -u
# 统计各行出现的次数
  sort filename | uniq -c
```

**2.7分割文件和数据**

```bash
# -a指定分割的长度
	split -b 10k filename -d -a 4
# -l 按行分割
	split -l 10 filename
# 根据扩展名切分文件名
	#!/bin/bash
	file="sample.jpq"
	name=${file%.*}
	echo Filename: $name
# 贪婪模式获取符合条件的最长字符串
	name=${file%%.*}
# 移除最左边的内容
	name=${file#*.}
# 贪婪模式从左开始匹配到最右边*。移除
  name=${file##*.}
```

**2.8文件权限、所有权和沾滞位**

- -  —— 普通文件
- d —— 目录
- c —— 字符设备
- b —— 块设备
- I ——— 符号链接
- s ——— 套接字
- p ———- 管道

```bash
# r 目录的读权限允许读取目录中的问及那和子目录的列表
# w 目录的写权限允许在目录中创建或删除文件或目录
# x 目录的执行权限 指明是否可以访问目录中的文件和子目录
# 读、写、执行权限都有与之对应的唯一八进制数
# r-- = 4
# -w- = 2
# --x = 1
# 权限序列：
# rwx = 4 + 2 + 1=7
# rw- = 4 + 2 =6
# r-- = 4
# u=制定用户权限 g=制定用户组权限 o=指定其他实体权限
	 chmod u=rwx g=rw o=r filename
# 当前目录递归设置所有权
	chown 775 . -R
```

**2.9创建不可修改的文件**

```bash
# 设置文件不可修改
	chattr +i file
# 取消不可修改
  chattr -i file
```

**3.0diff命令**

```bash
# 获取两个文件的不同内容
	diff filename1 filename2
# 一体化输出
  diff -u filename1 filename2
# patch 将一个修改应用于任何一个文件
# -N 将所有缺失的文件视为空文件
# -a 将所有的文件视为文本文件
# -u 生成一体化输出
# -r 遍历目录下的所有文件
```

**3.1head命令**

```bash
# 默认获取前十行
 cat filename | head
# 指定行数 -n 
 cat filename | head -n 10
# 出路N行之外的所有行
 cat filename | head -n -10
```

**3.1tail命令**

```bash
# 默认取最后十行
	tail filename
# 打印最后五行
  tail  -n 5 filename
# 打印出路前4行之外的所有的行
  tail -n +4
```

**3.2ls命令**

```bash
# 只列出当前路径下的目录
  ls -d */
	ls -l | grep "^d"
```

**3.3wc命令**

```bash
# 统计行数
	wc -l filename
# 单词数
	wc -w filename
# 字符数
  wc -c filename
# 默认打印行数 单词数 字符数
  wc filename
# 打印最长行
  wc filename -L
```

**3.4tree命令**

- -a	打印所有文件,包括隐藏文件、目录
- -C	在文件和目录清单上加上色彩，便于区分文件类型
- -d	仅列出目录名称，而非内容
- -D	列出文件或目录更改时间
- -L	目录树的最大显示深度
- -p	打印结构同时打印文件权限
- -l	跟随目录的符号链接，就像它们是目录一样。 避免了导致递归循环的链接
- -f	打印每个文件的完整路径前缀
- -F	在每个条目后加上文件类型的指示符(如目录是/)
- -h     打印每个文件打大小

```bash
tree filename
# 生成html输出
	tree filename -H http://localhost -o out.html
```

**3.5cut命令**

- b ：以字节为单位进行分割。这些字节位置将忽略多字节字符边界，除非也指定了 -n 标志。
- c ：以字符为单位进行分割。
- d ：自定义分隔符，默认为制表符。
- f ：与-d一起使用，指定显示哪个区域。
- n ：取消分割多字节字符。仅和 -b 标志一起使用。如果字符的最后一个字节落在由 -b 标志的 List 参数指示的范围之内，该字符将被写出；否则，该字符将被排除

```bash
# 提取第一个字段或列
	cut -f FIELD_LIST filename

```

**3.6awk命令**

```bash
# NR 表示记录数量，在执行过程中对应于当前的行号
# NF 表示字段数量，在执行过程中对应于当前行的字段数
# $0 这个变量包含执行过程中当前行的文本内容
# $1 这个变量包含第一个字段的文本内容
	cat date.sh |   awk '{print "Line no: "NR", No of fields: " NF, "$0="$0}'
```

**3.7paste命令**

```bash
# 将每一个文件内容作为单独的一列进行拼接
	paste file1 file2 file3
```

**3.8egrep命令**

```bash
# 解析文本中的电子邮件地址和URL
	egrep -o "http://[a-zA-Z0-9.] + \.[a-zA-Z](2,3)" filename
# 打印"text"之后的行
	grep -A 3 "text" filename
# 打印匹配行的极其前3行
	grep -B 3 "text" filename
# 打印匹配行前后2两行
	grep -C 2 "text" filename
```

**3.9用 awk实现head、tail、tac**

```bash
# 读取文件前10行
 awk 'NR <=10' filename
# 打印后十行
	awk '{ buffer[NR % 10] = $0; } END {for(i=1; i <11; i++){print buffer[i%10]}}' filename
# 逆序输出
	awk '{buffer[NR] = $0;} END {for(i=NR; i>0; i--) {print buffer[i]}}' date.sh
```

**4.0wget命令**

```bash
# wget URL
	wget http://aldd
# 用 -t指定重试次数
	wget -t 4 URL
# -c 可下载之前被中断的文件
	wget -c URL
# --mirror下载网页的所有页面
	wget --mirror URL
# --user和 -- password访问提供认证信息
	wget --user username --password pass URL
# 限速下载
	wget --limit-rate 30k URL
```

**4.1curl命令**

```bash
# curl执行下载将数据输出到终端
	curl　URL --slient
#  -o 将写入文件
	curl URL --slient -o
# --progress显示进度条
	curl URL --progress 
# -C断点续传
	curl -C -URL
# 设置cookies
	curl URL --cookie-agent ""
# 设置用户代理
	curl URL --uset-agent ""
# -H设置头部信息
	curl URL -H ""
# --max--filesize 指定可下载文件的最大大小
	curl URL --max-filesize bytes
# 发送post请求-data 请求参数 也可缩写 -d
	curl URL -d "host=host&user=ss"

```

**4.2tar命令**

```bash
# -c创建文件 -f 指定文件名
	tar -cf output.tar file1 file2
# -r向已归档的文件中添加内容
	tar -rvf output.tar file1
# -tf 列出归档文件中的内容
	tar -tf output.tar
# -v 列出文件的更多信心
	tar -tvvf output.tar
#  -xf 提取文件中的内容到当前目录
	tar -xf output.tar
# -C 指定文件
	tar -xf -output.tar -C /root/
# 提取指定的内容
	tar -xvf output.tar file1 file2
# -A合并多个tar文件
	tar -Af file1.tar file2.tar
# -delete从文件中删除内容
	tar -f output.tar --delete file1 file2
# -j指定压缩格式为bunzip2
# -z指定gzip格式
# --lzma指定lzma格式
# exclude排除指定文件
	tar -cf output.tar * --exlude "*.txt"
# -totals打印总规党字节数
	tar -czvvf output.tar.gz file1 file2
# zcat 直接读取压缩文件中的内容
	zcat output.tar
```

**4.3lzma命令**

```bash
Lzma filename
# 解压.lzma文件会删除源文件
	unlzma filename
# -k保留源文件
	lzma filename -k
# 可指定压缩率
	lzma -9 filename

```

**4.4zip压缩与归档**

```bash
zip output.zip file1 file2
# 解压文件
	unzip output.zip
# -d删除压缩文件中指定的文件
	unzip -d output.zip file1
# -l列出压缩文件的文件
	unzip -l output.zip
```

**4.5加密工具与散列**

```bash
crypt filename
# 解密
	crypt PASSWORD  -d filename > outputfilename
# gpg
	gpg -c filename
# 解密
	gpg filename
# base64
	base64filename > outputfilename
# 解码
	base64 -d filename > outputfilename
```

4.6统计磁盘使用情况

```bash
# du 和 df
# 递归地输出指定目录的所有文件的统计结果
	du -a dir
# -h 带单位的输出
	du -h dir
# -c统计该目录总文件大小
	du -h -c dir
# -sh打印一行
	du -sh dir
# -b 比特大小
# -k KB单位
# -m MB
# -B
```

**4.7计算执行时间**

```bash
time ls
```

**4.8ps命令**

```bash
# pcpu表示CPU占用率
ps -eo comm,pcpu | head
```

![Untitled](Shell%200e1a0c0f871c4cd39a449d2705b5e063/Untitled%202.png)

**4.9wall命令**

```bash
wall向当前登录用户发送广播消息
```

**5.0uname命令**

```bash
# 打印当前系统的主机名
	uname -n
# -a打印内核版本、硬件架构等
	uname -a
# -r打印内核发型版本
	uname -r
# -m打印CPU的相关信息
	uname -m
# 打印cpu的相关信息
	cat /proc/cpuinfo
```