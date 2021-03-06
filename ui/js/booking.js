// Generated by CoffeeScript 1.7.1
var bindBookItem, enterLastStep, enterNext, getNowDate, initItem, selectFrameClick, showAllBookItem, showStep, submitBookingInfo, _displayCalendar, _initSubmit, _showBookingDate;

$("body").css("background-color", "#86cbc8");

$('#modal').load("template/confirmModal.html");

selectFrameClick = function() {
  if ($(this).parent().find('.select-frame').length > 1) {
    $(this).parent().find('.select-frame').removeClass('select-frame-selected');
  }
  $(this).find('.select-frame').toggleClass('select-frame-selected');
};

getNowDate = function() {
  var D, M, current, fullY;
  current = new Date();
  fullY = current.getFullYear();
  M = current.getMonth() + 1;
  D = current.getDate();
  return fullY + "-" + M + "-" + D;
};

initItem = function() {
  var item, select_date, step;
  step = GetCookie('step') || '1';
  item = GetCookie('item') || 'kids';
  select_date = GetCookie('select_date');
  showStep(step, item, select_date);
};

showStep = function(step, item, date, infoObj) {
  var order_id, str_select_date, _checkLogin;
  _checkLogin = function() {
    var account, accountid;
    account = GetCookie('account');
    accountid = GetCookie('accountid');
    if (!(account && accountid)) {
      location.href = '/login.html';
    }
  };
  SetCookie('step', step, 3600);
  SetCookie('item', item, 3600);
  if ((+step !== 2) || (+step === 2 && item === 'kids')) {
    if (+step !== 1) {
      _checkLogin();
    }
    if (date) {
      SetCookie('select_date', date, 3600);
      $('#selectedDate').text(date);
    }
    $('.book-term-content-container-padding').hide();
    if (+step === 2) {
      $("." + item).show();
      $('.book-term-content-container').scrollTop(0);
    }
    if (+step === 3) {
      _displayCalendar(date);
    }
    if (+step === 4) {
      _initSubmit(date);
    } else {
      $('.step').hide();
      $("#step" + step).show();
    }
    if (+step === 5) {
      infoObj = JSON.parse(GetCookie('formData'));
      str_select_date = infoObj['select_date'];
      order_id = Date.create(str_select_date).format('{yyyy}{MM}{dd}');
      $('#order_info').text("" + enums.packageName[infoObj['book_package']] + " / " + str_select_date + " / " + enums.bookingTime[infoObj['book_am_pm']]);
      $('#order_id').text("" + order_id + infoObj['book_am_pm']);
    }
    if (+step === 6) {
      _checkLogin();
      showAllBookItem();
    }
  } else if (+step === 2 && item === 'business') {
    removeCookie('step');
    $('.step').hide();
    $("#stepother").show();
  } else {
    removeCookie('step');
    $('.step').hide();
    $("#steperror").show();
  }
};

showAllBookItem = function() {
  var account, accountid, obj;
  account = GetCookie('account');
  accountid = GetCookie('accountid');
  if (!(account && accountid)) {
    location.href = '/login.html';
  } else {
    obj = {
      bc: function(d) {
        var html, i, order_item, order_itemObj, _i;
        html = '';
        $('#orderCount').text((d != null ? d.length : void 0) || 0);
        if (d && d.length > 0) {
          $('.non-order').hide();
          $('.has-order').show();
          for (i = _i = d.length - 1; _i >= 0; i = _i += -1) {
            order_item = d[i];
            order_itemObj = JSON.parse(order_item.detail);
            html += "<div class='book-order-content-container'> <div class='book-order-info-item'> <label class='book-order-info-item-label'>定单号：</label> <label class='book-order-info-item-label'>" + order_item.order_id + "</label> </div> <div class='book-order-info-item'> <label class='book-order-info-item-label'>宝宝名字：</label> <label class='book-order-info-item-label'>" + order_itemObj.name + "</label> </div> <div class='book-order-info-item'> <label class='book-order-info-item-label'>拍摄时间：</label> <label class='book-order-info-item-label'>" + order_item.book_time + " " + enums.bookingTime[+order_item.book_am_pm] + "</label> </div> <div class='book-order-info-item'> <label class='book-order-info-item-label'>拍摄地址：</label> <label class='book-order-info-item-label'>" + enums.address + "</label> </div> <div class='book-order-status-item'> <label class='book-order-info-item-label'>当前状态：</label> <label class='book-order-info-item-label " + (+order_item.order_status === 0 ? 'unpay-text' : 'payed-text') + "'>" + enums.orderStatus[+order_item.order_status] + "</label> <a href='javascript:void(0)' class='order-button " + (+order_item.order_status === 0 ? 'unpay' : 'payed') + "'>" + enums.orderStatusBtnText[+order_item.order_status] + "</a> </div> </div>";
          }
          $('.has-order.book-item-container').html(html);
        } else {
          $('.non-order').show();
          $('.has-order').hide();
        }
      }
    };
    ajax('GET', '/CGI-BIN/getAllBookItem.pl', "accountid=" + accountid + "&account=" + account, obj);
  }
};

_showBookingDate = function(d) {
  var i, item, _i, _len;
  for (i = _i = 0, _len = d.length; _i < _len; i = ++_i) {
    item = d[i];
    if (item.book_time) {
      if (+item.book_am_pm === 1) {
        $("a[data-date=" + item.book_time + "]").addClass('am-booking');
      } else {
        $("a[data-date=" + item.book_time + "]").addClass('pm-booking');
      }
    }
  }
  $("a.am-booking.pm-booking").removeClass('am-booking').removeClass('pm-booking').addClass('all-booking').removeClass('book-select-date-item').addClass('book-select-date-item-disabled');
};

_displayCalendar = function(date) {
  var obj;
  obj = {
    bc: function(d) {
      var dateDuration, daysInMonth, first_date, html, i, j, last_date, select_date_item_class, weekDay, weekHtml, _currDate, _i, _j, _month, _ref, _ref1;
      first_date = new Date();
      last_date = first_date.clone().addMonths(5);
      dateDuration = first_date.format('{yyyy}.{M}') + ' — ' + last_date.format('{yyyy}.{M}');
      $('#book-select-date-text').html(dateDuration);
      html = '';
      weekHtml = '<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>';
      for (i = _i = 1; _i <= 6; i = ++_i) {
        _currDate = first_date.clone().addMonths(i - 1);
        _month = _currDate.getMonth() + 1;
        html += '<li><p>' + _month + '月</p><div class="book-select-date-item-content-container"><table style="width:100%">' + weekHtml + '<tr>';
        daysInMonth = _currDate.daysInMonth();
        weekDay = new Date(_currDate.getFullYear() + '-' + (_currDate.getMonth() + 1) + '-1').getDay();
        for (j = _j = _ref = 1 - weekDay, _ref1 = daysInMonth; _ref <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = _ref <= _ref1 ? ++_j : --_j) {
          select_date_item_class = "book-select-date-item";
          if (j > 0) {
            if (first_date > new Date(_currDate.format('{yyyy}-{M}-' + j))) {
              select_date_item_class = "book-select-date-item-disabled";
            }
            html += '<td><a class="' + select_date_item_class + '" data-date="' + _currDate.format('{yyyy}-{M}-' + j) + '"><span>' + j + '</span></a></td>';
          } else {
            html += '<td></td>';
          }
          if (j > 0 && (j + weekDay) % 7 === 0) {
            html += '</tr><tr>';
          }
        }
        html += '</tr></table></div></li>';
      }
      $('#displayCalenderContainer').html(html);
      $('#step3 .book-select-date-item').on('click', {
        step: 4
      }, enterNext);
      _showBookingDate(d);
    }
  };
  ajax('GET', '/CGI-BIN/getDateBooking.pl', '', obj);
};

enterNext = function(d) {
  var infoObj, item, step;
  if ($(this).hasClass('book-select-date-item-disabled')) {
    return;
  }
  step = +d.data.step;
  infoObj = d.data.infoObj || null;
  item = $(this).data('item') || GetCookie('item') || 'kids';
  showStep(step, item, $(this).data('date'), infoObj);
};

enterLastStep = function(d) {
  var item, jsonFormData, obj, postData, type;
  jsonFormData = JSON.parse(decodeURIComponent(GetCookie('formData')));
  type = 1;
  item = GetCookie('item');
  if (item === 'kids') {
    type = 1;
  } else if (item === 'wedding') {
    type = 2;
  } else if (item === 'marry') {
    type = 3;
  } else if (item === 'business') {
    type = 4;
  }
  postData = {
    book_time: jsonFormData['select_date'],
    book_am_pm: jsonFormData['book_am_pm'],
    order_id: $('#order_id').text(),
    account_id: GetCookie('accountid'),
    detail: decodeURIComponent(GetCookie('formData').replace(/"/g, '\\"')),
    type: type
  };
  obj = {
    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
    bc: function(rs) {
      var cookies;
      enterNext(d);
      cookies = ['item', 'select_date'];
      removeCookies(cookies);
    }
  };
  ajax('POST', '/CGI-BIN/submitBookitem.pl', postData, obj);
};

_initSubmit = function(date) {
  var obj;
  obj = {
    bc: function(d) {
      var step;
      step = 4;
      $('.book-detail-info-item-enter .spacing.select_am_pm').show();
      $(".book-detail-info-item-enter .select-frame[data-key='book_am_pm']").parent().show();
      if (d.length > 0) {
        $('.book-detail-info-item-enter .spacing.select_am_pm').hide();
        $(".book-detail-info-item-enter .select-frame[data-key='book_am_pm'][data-val=" + d[0].book_am_pm + "]").parent().hide();
      }
      $('.step').hide();
      $("#step" + step).show();
    }
  };
  ajax('GET', '/CGI-BIN/getBookingByDate.pl', "book_time=" + date, obj);
};

submitBookingInfo = function() {
  var d, el, formData, select_frame_list, strFormData, _i, _len;
  formData = {};
  select_frame_list = $('#step4 .select-frame-selected');
  for (_i = 0, _len = select_frame_list.length; _i < _len; _i++) {
    el = select_frame_list[_i];
    formData[$(el).data('key')] = $(el).data('val');
  }
  formData['name'] = $('#name').val();
  formData['nickName'] = $('#nickName').val();
  formData['gender'] = $('#gender option:selected').val();
  formData['age'] = $('#age').val();
  formData['parentsName'] = $('#parentsName').val();
  formData['phone'] = $('#phone').val();
  formData['parentsqq'] = $('#parentsqq').val();
  formData['expressAddress'] = $('#expressAddress').val();
  formData['addressee'] = $('#addressee').val();
  formData['mark'] = $('#mark').val();
  formData['select_date'] = GetCookie('select_date');
  if (!(formData['select_date'] && formData['name'] && formData['gender'] && formData['age'] && formData['parentsName'] && formData['phone'] && formData['expressAddress'] && formData['book_am_pm'] && formData['book_package'] && formData['addressee'])) {
    $('#book-detail-error').show();
    return;
  }
  strFormData = JSON.stringify(formData);
  SetCookie('formData', strFormData, 3600);
  d = {
    data: null
  };
  d.data = {
    step: 5,
    infoObj: formData
  };
  enterNext(d);
};

bindBookItem = function() {
  initItem();
  $('.label-radio').on('click', selectFrameClick);
  $('#step1 .book-items a').on('click', {
    step: 2
  }, enterNext);
  $('#step2 #book-term-agree').on('click', {
    step: 3
  }, enterNext);
  $('#step2 #book-term-reject').on('click', {
    step: 1
  }, enterNext);
  $('#step3 #book-select-date-back-a').on('click', {
    step: 2
  }, enterNext);
  $('#step3 #step3_return').on('click', {
    step: 2
  }, enterNext);
  $('#step4 #reSelectDate').on('click', {
    step: 3
  }, enterNext);
  $('#step4 #book-detail-info-submit').on('click', submitBookingInfo);
  $('#step4 #book-detail-info-cancel').on('click', {
    step: 3
  }, enterNext);
  $('#step5 #book-confirm-agree').on('click', {
    step: 6
  }, enterLastStep);
  $('#step5 #book-confirm-reject').on('click', {
    step: 4
  }, enterNext);
  $('#step6 .order-button.payed').on('click', {
    step: 3
  }, enterNext);
  $('a.steperror_return').on('click', {
    step: 1
  }, enterNext);
};

bindBookItem();
