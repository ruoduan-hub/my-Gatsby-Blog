// 生成随机颜色
const randomColor = () => {
  let r = Math.floor(Math.random() * 256)
  let g = Math.floor(Math.random() * 256)
  let b = Math.floor(Math.random() * 256)
  let color = '#' + r.toString(16) + g.toString(16) + b.toString(16)
  return color
}

// 随机图片地址
const randomImg = {
  unsplash: 'https://unsplash.it/1600/900?random', //（国内加载略慢）
  biying:
    'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture', //【返回必应图片】
  baidu: 'http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1', //（必应返回JSON数据，具体百度
}

// 打开网页
const openPage = (uri) => {
  window.open(uri)
}

/**
 * 防抖函数
 * @param fn  要执行的函数
 * @param delay 延迟的时间
 */
const debounce = (fn, delay) => {
  let timer = null
  return (...rest) => {
    clearTimeout(timer)
    setTimeout(() => {
      fn.apply(this, rest)
    }, delay)
  }
}

/**
 * 节流函数
 * @param fn  要执行的函数
 * @param delay 延迟的时间
 */
const throttle = (fn, delay) => {
  let lastTime = 0
  return (...rest) => {
    let nowTime = Date.now()
    if (nowTime - lastTime > delay) {
      fn.apply(this, rest)
      lastTime = nowTime
    }
  }
}

export { randomColor, randomImg, openPage, debounce, throttle }
