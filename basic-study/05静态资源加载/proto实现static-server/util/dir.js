const
  fs = require('fs')


/**
 * 
 * @param {string} realPath 目录的绝对路径
 * @param {string} url 用于构建a标签
 * @return 返回当前目录下的所有文件or文件夹，html形式可点击的a链接
 */
function dir(realPath, url) {
  const files = fs.readdirSync(realPath)
  console.log('url;', url)
  let html = `<ul>`
  for (const [index, item] of files.entries()) {
    if (url === '/') {
      html += `<li><a href="${url}${item}">${item}</a></li>`
    } else {
      html += `<li><a href="${url}/${item}">${item}</a></li>`
    }
  }
  html += `</ul>`
  return html
}

module.exports = dir