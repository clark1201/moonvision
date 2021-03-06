// Generated by CoffeeScript 1.7.1
var regClick, _check, _initCaptcha;

$("body").css("background-color", "#86cbc8");

_check = '';

_initCaptcha = function(scale) {
  var i, _i, _index, _pool;
  _check = '';
  scale = scale || 4;
  _pool = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  for (i = _i = 0; 0 <= scale ? _i < scale : _i > scale; i = 0 <= scale ? ++_i : --_i) {
    _index = 0;
    _index = parseInt(Math.random() * 9);
    _check += _pool[_index];
  }
  $('#captcha-checkcode').text(_check);
};

regClick = function() {
  var obj, postData, txtAddress, txtCaptcha, txtPwd, txtRepwd, txtTel, txtUsername;
  txtTel = $('#txtTel').val();
  txtPwd = $('#txtPwd').val();
  txtRepwd = $('#txtRepwd').val();
  txtUsername = $('#txtUsername').val();
  txtAddress = $('#txtAddress').val();
  txtCaptcha = $('#txtCaptcha').val();
  if (!(txtTel && txtPwd && txtRepwd && txtUsername && txtCaptcha)) {
    $('#err-info').text('信息填写完整');
    return;
  }
  if (txtPwd !== txtRepwd) {
    $('#err-info').text('两次密码输入不一致');
    return;
  }
  if (txtCaptcha !== _check) {
    $('#err-info').text('验证码不正确');
    _initCaptcha(4);
    return;
  }
  postData = {
    tel: txtTel,
    pwd: txtPwd,
    username: txtUsername,
    address: txtAddress,
    captcha: txtCaptcha
  };
  obj = {
    contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
    bc: function(rs) {
      var cookies;
      if (!rs.err) {
        cookies = ['item', 'select_date', 'step'];
        removeCookies(cookies);
        $('#regStep1').hide();
        $('#regStep2').show();
      } else {
        $('#err-info').text('该手机号已被注册，请使用其他手机号注册');
        $('#txtPwd').val('');
        $('#txtRepwd').val('');
        $('#txtCaptcha').val('');
        _initCaptcha(4);
      }
    }
  };
  ajax('POST', '/CGI-BIN/reg.pl', postData, obj);
};

_initCaptcha(4);

$('#btn-register').on('click', regClick);

$('#captcha-checkcode').on('click', function() {
  _initCaptcha(4);
});
