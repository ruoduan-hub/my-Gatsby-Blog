import sha1 from 'js-sha1'
import md5 from 'js-md5'

// 生成随机颜色
const randomColor = () => {
    let r = Math.floor(Math.random()*256);
	let g = Math.floor(Math.random()*256);
	let b = Math.floor(Math.random()*256);
	let color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
	return color;
}

// 随机图片地址
const randomImg = {
	unsplash: 'https://unsplash.it/1600/900?random',//（国内加载略慢）
	biying: 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture', //【返回必应图片】
	baidu: 'http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1' //（必应返回JSON数据，具体百度
}

// 打开网页
const openPage = (uri) => {
	window.open(uri)
}

const produceMusicListKey = () => {
	let date = new Date()
	let Y = date.getFullYear()
	let M = String(date.getMonth()+ 1).length > 1 ? String(date.getMonth()+ 1): '0' + String(date.getMonth()+ 1)
	let D = date.getDate()
	let H = date.getHours()

	const $key = '523077333';
	const key = md5(md5($key)+ sha1(String(Y + M + D + H)))
	return key
}

// https://www.tjit.net/107.html
const getwyMusicListUrl = () => { 
	let key = produceMusicListKey()
	let listID = '2656366432'
	let address = `https://api88.net/api/netease/?key=${key}&cache=1&type=songlist&id=${listID}`
	return address
}

export { randomColor, randomImg, openPage, getwyMusicListUrl}
