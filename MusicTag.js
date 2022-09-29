const fs = require("fs");
const axios = require("axios");
const NodeID3 = require("node-id3");
// 是否忽略已存在信息的歌曲
var ignoreExsit = true;
// 命令行参数
var args = process.argv;
// 指定存放音乐的目录，可选参数
var musicPath = args[2];
// 默认为当前目录下的mp3目录
var defaultMusicPath = "./mp3/";
// 当前使用的目录
var currentMusicPath = musicPath ? musicPath : defaultMusicPath;
console.log(" > Current Music Path :", currentMusicPath);

fs.readdir(currentMusicPath, (err, files) => {
	if (err) {
		console.log(err)
		return;
	}
	files.forEach((file, index) => {
		var searchTags = new Object();
		if (file.toLocaleLowerCase().lastIndexOf(".mp3") == -1) {
			return;
		}
		NodeID3.read(currentMusicPath + file, (err, tags) => {
			if (err) {
				return;
			}
			// 忽略已存在信息的歌曲
			if (ignoreExsit && tags.title && tags.artist && tags.album) {
				console.log("Ignore: ", file)
				return;
			}
			doSearchTag(file.replace(".mp3", "").replace("-", ""), (data) => {
				var song = data.result.songs[0];
				searchTags.title = song.name;
				searchTags.artist = song.artists[0].name;
				searchTags.APIC = song.artists[0].img1v1Url;
				searchTags.album = song.album.name;
				// 写入标签信息
				NodeID3.write(searchTags, currentMusicPath + file, function (err) {
					if (err) console.log(err);
					console.log("Success :", searchTags)
				})
			})
		});
	})
})

/**
* 从网易云搜索标签
*/
function doSearchTag(word, callback) {
	var url = "http://music.163.com/api/search/get/web?s="
		+ encodeURI(word)
		+ "&type=1&offset=0&total=false&limit=1";
	axios.get(url)
		.then(res => {
			callback(res.data)
		}).catch((err) => {
			console.log(err)
		})
}