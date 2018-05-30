getArticleList().then((data1) => {
  console.log(data1)
  getArticle(data1[0].id).then((data2) => {
    console.log(data2)
    getAuthor(data2.authorId).then((data3) => {
      console.log(data3)
    })
  })
})


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