const
  path = require('path'),
  fs = require('fs'),
  dir = require('./dir'),
  file = require('./file')

/**
 * @param {string} path 所要读取的目录
 * @param {string} url 所请求的url
 * @return {string} 获得文件内容
 */
async function content(staticPath, url) {
  // 合成所求 文件 or 目录 的完整路径
  const realPath = path.join(staticPath, url)
  console.log(realPath)

  let content = ''
  if (!fs.existsSync(realPath)) {
    content = '404 Not Found! o(╯□╰)o！'
  } else {
    // 判断文件是目录还是文件
    const stat = fs.statSync(realPath)

    if (stat.isDirectory()) {
      // 如果是目录，就渲染读取目录内容
      content = await dir(realPath, url)
    } else {
      content = file(realPath)
    }
  }
  return content
}

module.exports = content