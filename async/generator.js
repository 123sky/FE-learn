function* run() {
  let articleList = yield getArticleList()
  console.log(articleList)
  let article = yield getArticle(articleList[0].id)
  console.log(article)
  let author = yield getAuthor(article.authorId)
  console.log(author)
}

/* 手动执行 */
/* var gen = run()
gen.next().value.then((data1) => {
  gen.next(data1).value.then((data2) => {
    gen.next(data2).value.then((data3) => {
      gen.next(data3)
      console.log('finished')
    })
  })
}) */

/* 自动执行 */
/* co模組就是在做差不多的事情，只是做得更多了
但原理跟我們上面寫的runGenerator很類似，就是把一個generator包起來寫一個自動執行器 */
function runGenerater() {
  let gen = run()

  function go(result) {
    if (result.done) {
      return
    }
    result.value.then((data) => {
      go(gen.next(data))
    })
  }
  go(gen.next())
}

runGenerater()

function getArticleList() {
  return new Promise((resolve, reject) => {
    get('http://127.0.0.1:3000/articleList')
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        console.log(new Error(err))
      })
  })
}

function getArticle(id) {
  return new Promise((resolve, reject) => {
    get('http://127.0.0.1:3000/article?id=' + id)
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        console.log(new Error(err))
      })
  })
}

function getAuthor(id) {
  return new Promise((resolve, reject) => {
    get('http://127.0.0.1:3000/author?id=' + id)
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        console.log(new Error(err))
      })
  })
}

function get(url) {
  let promise = new Promise(function (resolve, reject) {
    let XHR = new XMLHttpRequest()
    XHR.open('GET', url, true)
    XHR.send()
    XHR.onreadystatechange = function () {
      if (XHR.readyState === 4) {
        if (XHR.status === 200) {
          try {
            var response = JSON.parse(XHR.responseText);
            resolve(response);
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error(XHR.statusText));
        }
      }
    }
  })

  return promise
}