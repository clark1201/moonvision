$("body").css("background-color", "#86cbc8");
_check = ''
_initCaptcha = (scale)->
  _check = ''
  scale = scale or 4
  _pool = ['1','2','3','4','5','6','7','8','9']
  for i in [0...scale]
    _index = 0
    _index = parseInt(Math.random()*9)
    _check += _pool[_index]
  $('#captcha-checkcode').text _check
  return

loginClick = ()->
  txtTel = $('#txtTel').val()
  txtPwd = $('#txtPwd').val()
  txtCaptcha = $('#txtCaptcha').val()
  if not (txtTel and txtPwd and txtCaptcha)
    $('#err-info').text '信息填写完整'
    return
  if txtCaptcha isnt _check
    $('#err-info').text '验证码不正确'
    _initCaptcha(4)
    return
  postData = 
    tel: txtTel
    pwd: txtPwd
    captcha: txtCaptcha
  obj = 
    contentType : 'application/x-www-form-urlencoded;charset=utf-8'
    bc : (rs)->
      # 返回 json 格式
      if rs.id and rs.username
        cookies = ['item', 'select_date', 'step']
        removeCookies cookies
        SetCookie 'account', rs.username, 3600
        SetCookie 'accountid', rs.id, 3600
        location.href = "booking.html"
      else
        $('#err-info').text '手机号码或密码错误'
        $('#txtPwd').val ''
        $('#txtCaptcha').val ''
        _initCaptcha(4)
      return
  ajax 'POST', '/CGI-BIN/login.pl', postData, obj
  return
_initCaptcha(4)
$('#btn-login').on 'click', loginClick
$('#captcha-checkcode').on 'click', ()->
  _initCaptcha 4
  return