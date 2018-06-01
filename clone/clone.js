(function () {
  var typeJudgment = {}
  var types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ');
  types.forEach((element) => {
    typeJudgment['is' + element] = function (obj) {
      if (type(obj) === element) {
        return true
      } else {
        return false
      }
    }
  })

  window.typeJudgment = typeJudgment
  window.typeJudgment.get = type

  function type(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1)
  }
})()

function copy(obj, deep) {
  if (obj === null || (typeof obj !== 'object' && !typeJudgment.isFunction(obj))) {
    return obj
  }

  if (typeJudgment.isFunction(obj)) {
    return new Function('return ' + obj.toString())()
  }

  let temp = typeJudgment.isArray(obj) ? [] : {},
    key, value
  for (key in obj) {
    value = obj[key]
    if (value === obj) {
      continue
    }
    if (deep) {
      if (typeJudgment.isObject(value) || typeJudgment.isArray(value)) {
        temp[key] = copy(value)
      } else if (typeJudgment.isFunction(value)) {
        temp[key] = new Function('return ' + value.toString())()
      } else {
        temp[key] = value
      }
    } else {
      temp[key] = value
    }
  }
  return temp
}