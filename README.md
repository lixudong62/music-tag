## 基于NodeJS的mp3音频标签信息自动填充程序

### 一、使用说明

#### 1、安装Nodejs

> [NodeJS官网]: https://nodejs.org/en/download/

#### 2、命令行进入解压后的目录并创建mp3目录

~~~shell
cd C:\Users\LiXudong\Music
mkdir mp3
-- 将需要处理的mp3复制到mp3目录下
~~~

#### 3、安装依赖

~~~shell
cnpm install
~~~

#### 4、运行程序

~~~shell
node MusicTag.js
~~~

### 二、相关配置说明(可以手动修改)

~~~javascript
// 是否忽略已存在信息的歌曲
var ignoreExsit = true;
// 命令行参数
var args = process.argv;
// 指定存放音乐的目录，可选命令行参数
var musicPath = args[2];
// 默认为当前目录下的mp3目录
var defaultMusicPath = "./mp3/";
// 当前使用的目录
var currentMusicPath = musicPath ? musicPath : defaultMusicPath;
~~~

