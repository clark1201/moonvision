$("body").css("background-color", "#86cbc8")
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
regClick = ()->
  txtTel = $('#txtTel').val()
  txtPwd = $('#txtPwd').val()
  txtRepwd = $('#txtRepwd').val()
  txtUsername = $('#txtUsername').val()
  txtAddress = $('#txtAddress').val()
  txtCaptcha = $('#txtCaptcha').val()
  if not (txtTel and txtPwd and txtRepwd and txtUsername and txtCaptcha)
    $('#err-info').text '信息填写完整'
    return
  if txtPwd isnt txtRepwd
    $('#err-info').text '两次密码输入不一致'
    return
  if txtCaptcha isnt _check
    $('#err-info').text '验证码不正确'
    _initCaptcha(4)
    return
  postData = 
    tel: txtTel
    pwd: txtPwd
    username: txtUsername
    address: txtAddress
    captcha: txtCaptcha
  obj = 
    contentType : 'application/x-www-form-urlencoded'
    bc : (rs)->
      # 返回 json 格式
      if not rs.err
        cookies = ['item', 'select_date', 'step']
        removeCookies cookies
        location.href = "login.html"
      else
        $('#err-info').text '该手机号已被注册，请使用其他手机号注册'
        $('#txtPwd').val ''
        $('#txtRepwd').val ''
        $('#txtCaptcha').val ''
        _initCaptcha(4)
      return
  ajax 'POST', '/CGI-BIN/reg.pl', postData, obj
  return
_initCaptcha(4)
$('#btn-register').on 'click', regClick
$('#captcha-checkcode').on 'click', ()->
  _initCaptcha 4
  return