// Generated by CoffeeScript 1.7.1
var GetCookie, SetCookie, ajax, getHeaderIndex, getUrlParm, removeCookie, removeCookies;

getUrlParm = function(parmName) {
  var reg;
  reg = new RegExp("(^|\\?|&)" + parmName + "=([^&]*)(\\s|&|$)", "i");
  if (reg.test(location.href)) {
    return unescape(RegExp.$2.replace(/\+/g, " "));
  }
  return "";
};

getHeaderIndex = function(id, par) {
  var get, get_par, local_url, nextPar;
  local_url = document.getElementById(id).src;
  get = local_url.indexOf(par + "=");
  if (+get === -1) {
    return false;
  }
  get_par = local_url.slice(par.length + get + 1);
  nextPar = get_par.indexOf("&");
  if (+nextPar !== -1) {
    get_par = get_par.slice(0, nextPar);
  }
  return get_par;
};

GetCookie = function(name) {
  return $.cookie(name);
};

SetCookie = function(name, value) {
  var nowDate;
  nowDate = new Date();
  return $.cookie(name, value, {
    expires: nowDate.addHours(1)
  });
};

removeCookie = function(name) {
  return $.removeCookie(name);
};

removeCookies = function(nameArr) {
  var i, _i, _ref;
  for (i = _i = _ref = nameArr.length - 1; _i >= 0; i = _i += -1) {
    removeCookie(nameArr[i]);
  }
  return $.removeCookie(name);
};

ajax = function(_type, _url, _data, obj) {
  $.ajax({
    type: _type || 'GET',
    url: _url,
    data: _data,
    dataType: (obj != null ? obj.dataType : void 0) || 'text',
    contentType: (obj != null ? obj.contentType : void 0) || 'text/plain',
    success: function(d) {
      var json_d;
      json_d = JSON.parse(d);
      return obj.bc(json_d);
    },
    error: function(e) {
      if (e.status === 401) {
        if (obj != null) {
          obj.errbc();
        }
      } else if (e.status === 400) {
        if (obj != null) {
          obj.errbc();
        }
      } else {
        console.log('错误', '服务器异常，请稍后再试。');
      }
    }
  });
};
