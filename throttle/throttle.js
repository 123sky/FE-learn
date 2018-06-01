function throttle(method, context) {
  clearInterval(method.tId)
  method.tId = setTimeout(() => {
    method.call(context)
  }, 100)
}