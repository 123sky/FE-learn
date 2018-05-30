/* 回调函数形式 */
getArticleList((data1) => {
  console.log(data1)
  getArticle(data1[0].id, (data2) => {
    console.log(data2)
    getAuthor(data2.authorId, (data3) => {
      console.log(data3)
    })
  })
})


function getArticleList(callback) {
  get('http://127.0.0.1:3000/articleList').then((data) => {
    callback(data)
  })
}

function getArticle(id, callback) {
  get('http://127.0.0.1:3000/article?id=' + id).then((data) => {
    callback(data)
  })
}

function getAuthor(id, callback) {
  get('http://127.0.0.1:3000/author?id=' + id).then((data) => {
    callback(data)
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