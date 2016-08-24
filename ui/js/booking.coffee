$("body").css("background-color", "#86cbc8")
selectFrameClick = ()->
  if $(@).parent().find('.select-frame').length > 1
    $(@).parent().find('.select-frame').removeClass 'select-frame-selected'
  $(@).find('.select-frame').toggleClass 'select-frame-selected'
  return
# // 当前日期
getNowDate = ()->
  current = new Date()
  fullY = current.getFullYear()
  M = current.getMonth() + 1
  D = current.getDate()
  fullY + "-" + M + "-" + D
# // 初始化预定页面(默认第一步，婚礼)
initItem = ()->
  step = GetCookie('step') or '1'
  item = GetCookie('item') or 'kids'
  select_date = GetCookie('select_date')
  showStep step, item, select_date
  return

# // 先把进度和项目记录 cookie，然后按照进度和项目的不同展示页面。
showStep = (step, item, date, infoObj)->
  SetCookie 'step', step, 3600
  SetCookie 'item', item, 3600
  if (+step isnt 2) or (+step is 2 and item is 'kids')
    if date
      SetCookie 'select_date', date, 3600
      $('#selectedDate').text date
    $('.book-term-content-container-padding').hide()
    _displayCalendar date
    if +step is 4
      _initSubmit date
    else
      $('.step').hide()
      $("#step#{step}").show()
    if +step is 2
      $(".#{item}").show()
      $('.book-term-content-container').scrollTop 0
    if +step is 5
      if infoObj
        str_select_date = infoObj['select_date']
      order_id = Date.create(str_select_date).format('{yyyy}{MM}{dd}')
      $('#order_info').text "#{enums.packageName[infoObj['book_package']]} / #{str_select_date} / #{enums.bookingTime[infoObj['book_am_pm']]}"
      $('#order_id').text "#{order_id}#{infoObj['book_am_pm']}"
  else if (+step is 2 and item is 'business')
    removeCookie 'step'
    $('.step').hide()
    $("#stepother").show()
  else
    removeCookie 'step'
    $('.step').hide()
    $("#steperror").show()
  return
_showBookingDate = (d)->
  # 已经预订过的日期，判断上午下午来选择样式
  for i in d
    if d.book_time
      if d.book_am_pm is 1
        $("li[data-date=#{d.book_time}]")
        # $('li').addClass 'am-booking'
        console.log 1
      else
        # $('li').addClass 'pm-booking'
        console.log 2
  return
# // 展示日历界面
_displayCalendar = (date)->
  obj = 
    bc : (d)->
      first_date = new Date()
      # 暂时注掉，把已选日期作为起始日期
      # if date then first_date = new Date(date)
      last_date = first_date.clone().addMonths(5)
      dateDuration = first_date.format('{yyyy}.{M}') + ' — ' + last_date.format('{yyyy}.{M}')
      $('#book-select-date-text').html dateDuration
      html = ''
      weekHtml = '<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>'
      for i in [1..6]
        _currDate = first_date.clone().addMonths(i - 1)
        _month = _currDate.getMonth() + 1
        html += '<li><p>' + _month + '月</p><div class="book-select-date-item-content-container"><table style="width:100%">' + weekHtml + '<tr>'
        daysInMonth = _currDate.daysInMonth()
        weekDay = new Date(_currDate.getFullYear() + '-' + (_currDate.getMonth() + 1) + '-1').getDay()
        for j in [(1 - weekDay)..(daysInMonth)]
          select_date_item_class = "book-select-date-item"
          if j > 0
            # 不能预订已过去的日期
            if first_date > new Date(_currDate.format('{yyyy}-{M}-' + j))
              select_date_item_class = "book-select-date-item-disabled"
            html += '<td><a class="' + select_date_item_class + '" data-date="' + _currDate.format('{yyyy}-{M}-' + j) + '"><span>' + j + '</span></a></td>'
          else
            html += '<td></td>'
          if j > 0 && (j + weekDay) % 7 is 0
            html += '</tr><tr>'
        html += '</tr></table></div></li>'

      $('#displayCalenderContainer').html html
      # $(html).find('.book-select-date-item').on('click', {step:4}, enterNext);
      $('#step3 .book-select-date-item').on 'click', {step:4}, enterNext

      _showBookingDate d
      return
  ajax 'GET', '/CGI-BIN/getDateBooking.pl', '', obj
  return

# // 从 cookie 中获取当前的进度(step)和所选的项目，按照进度和项目的不同，展示不同的页面。
enterNext = (d)->
  step = +d.data.step
  infoObj = d.data.infoObj or null
  item = $(@).data('item') or GetCookie('item') or 'kids'
  showStep step, item, $(@).data('date'), infoObj
  return
enterLastStep = (d)->
  enterNext d
  cookies = ['item','select_date']
  removeCookies cookies
  return

_initSubmit = (date)->
  obj = 
    bc : (d)->
      step = 4
      console.log d
      if d.length >= 2
        return
      else if d.length is 1
        if d[0].book_am_pm is 1
          console.log 1
        else
          console.log 2
        $('.step').hide()
        $("#step#{step}").show()
      else 
        $('.step').hide()
        $("#step#{step}").show()
      return
  ajax 'GET', '/CGI-BIN/getBookingByDate.pl', "book_time=#{date}", obj
  return

submitBookingInfo = ()->
  # 取值
  formData = {}
  select_frame_list = $('#step4 .select-frame-selected')
  for el in select_frame_list
    formData[$(el).data 'key'] = $(el).data 'val'
  formData['name'] = $('#name').val()
  formData['nickName'] = $('#nickName').val()
  formData['gender'] = $('#gender option:selected').val()
  formData['age'] = $('#age').val()
  formData['parentsName'] = $('#parentsName').val()
  formData['phone'] = $('#phone').val()
  formData['parentsqq'] = $('#parentsqq').val()
  formData['expressAddress'] = $('#expressAddress').val()
  formData['addressee'] = $('#addressee').val()
  formData['mark'] = $('#mark').val()
  formData['select_date'] = GetCookie 'select_date'
  # 验证
  if not (formData['select_date'] and formData['name'] and formData['gender'] and formData['age'] and formData['parentsName'] and formData['phone'] and formData['expressAddress'] and formData['book_am_pm'] and formData['book_package'] and formData['addressee'])
    $('#book-detail-error').show()
    return
  strFormData = JSON.stringify formData
  # 存 cookie
  SetCookie 'formData', strFormData, 3600
  d = 
    data : null
  d.data =
   step : 5
   infoObj : formData
  enterNext d
  return

bindBookItem = ()->
  initItem()
  # // radio绑定
  $('.label-radio').on 'click', selectFrameClick
  # // 第一步事件绑定
  $('#step1 .book-items a').on 'click', {step:2}, enterNext
  # // 第二步事件绑定
  $('#step2 #book-term-agree').on 'click', {step:3}, enterNext
  $('#step2 #book-term-reject').on 'click', {step:1}, enterNext
  # // 第三步事件绑定
  $('#step3 #book-select-date-back-a').on 'click', {step:2}, enterNext
  $('#step3 #step3_return').on 'click', {step:2}, enterNext
  # $('#step3 .book-select-date-item').on('click', {step:4}, enterNext);
  # // 第四步事件绑定
  $('#step4 #reSelectDate').on 'click', {step:3}, enterNext
  # $('#step4 #book-detail-info-submit').on 'click', {step:5}, enterNext
  $('#step4 #book-detail-info-submit').on 'click', submitBookingInfo
  $('#step4 #book-detail-info-cancel').on 'click', {step:3}, enterNext

  $('#step5 #book-confirm-agree').on 'click', {step:6}, enterLastStep
  $('#step5 #book-confirm-reject').on 'click', {step:4}, enterNext

  $('a.steperror_return').on 'click', {step:1}, enterNext
  # 关闭时提示。
  # window.onbeforeunload = ()->
  #   if document.all
  #     if event.clientY < 0
  #       return "确定要离开吗？"
  #   else
  #     return "确定要离开吗？"
  return

bindBookItem()