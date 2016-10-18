# //获取url参数
getUrlParm = (parmName)->
  reg = new RegExp("(^|\\?|&)" + parmName + "=([^&]*)(\\s|&|$)", "i")
  if reg.test(location.href)
    return unescape(RegExp.$2.replace(/\+/g, " "))
  return ""
# // 获取引入的文件的参数
getHeaderIndex = (id, par)->
  local_url = document.getElementById(id).src
  get = local_url.indexOf(par + "=")
  if(+get is -1)
    return false
  get_par = local_url.slice(par.length + get + 1)
  nextPar = get_par.indexOf("&")
  if(+nextPar isnt -1)
    get_par = get_par.slice(0, nextPar)
  return get_par
# // 设置 cookie
# // 获取cookies函数
GetCookie = (name)->
  return $.cookie(name)
# // 存放cookies函数
SetCookie = (name, value)->
  # cookie 保存一小时
  nowDate = new Date()
  return $.cookie(name, value, {expires : nowDate.addHours(1)})
# // 删除cookies函数
removeCookie = (name)->
  return $.removeCookie(name)
# // 批量删除cookies函数
removeCookies = (nameArr)->
  for i in [nameArr.length - 1..0] by -1
    removeCookie nameArr[i]
  return $.removeCookie(name)
# ajax
ajax = (_type, _url, _data, obj)->
  $.ajax
    type: _type or 'GET'
    url: _url
    data: _data
    dataType: obj?.dataType or 'text'
    contentType: obj?.contentType or 'text/plain'
    success: (d)->
      # console.log d
      json_d = JSON.parse d
      obj.bc json_d
    error: (e)->
      if e.status is 401
        obj?.errbc()
      else if e.status is 400
        obj?.errbc()
      else
        # _showAlertModal '错误', '服务器异常，请稍后再试。'
        console.log '错误', '服务器异常，请稍后再试。'
      return
  return