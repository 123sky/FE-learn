const url = require('url')
const http = require('http')

const articleList = [{
    "title": "文章1",
    "id": 1
  },
  {
    "title": "文章2",
    "id": 2
  },
  {
    "title": "文章3",
    "id": 3
  }
]

const article = {
  "id": 1,
  "authorId": 5,
  "content": "content",
  "timestamp": "2015-08-26"
}

const author = {
  "email": "aszx87410@gmail.com",
  "name": "huli",
  "id": 5
}

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    "Content-Type": "aplication/json; charset=utf-8"
  })
  const parseUrl = url.parse(req.url)
  const query = {}
  if (parseUrl.query) {
    parseUrl.query.split("&").forEach((element) => {
      let temp = element.split('=')
      query[temp[0]] = temp[1]
    })
  }
  const pathname = parseUrl.pathname.slice(1);
  switch (pathname) {
    case 'articleList':
      res.end(JSON.stringify(articleList))
      break
    case 'article':
      console.log(JSON.stringify(article))
      res.end(JSON.stringify(article))
      break
    case 'author':
      console.log(JSON.stringify(author))
      res.end(JSON.stringify(author))
      break
    default:
      res.end('{}')
      break
  }
}).listen(3000, '127.0.0.1')

console.log('127.0.0.1:3000')