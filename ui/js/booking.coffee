$("body").css("background-color", "#86cbc8")
selectFrameClick = ()->
  $(@).find('.select-frame').toggleClass('select-frame-selected')
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
  item = GetCookie('item') or 'wedding'
  select_date = GetCookie('select_date')
  showStep step, item, select_date
  return

# // 先把进度和项目记录 cookie，然后按照进度和项目的不同展示页面。
showStep = (step, item, date, infoObj)->
  SetCookie 'step', step, 3600
  SetCookie 'item', item, 3600
  if +step is 1 or item is 'kids'
    if date
      SetCookie 'select_date', date, 3600
      $('#selectedDate').text date
    if infoObj
      console.log infoObj
    $('.book-term-content-container-padding').hide()
    $(".#{item}").show()
    _displayCalendar date
    $('.step').hide()
    $("#step#{step}").show()
  else if +step is 1 or (item is 'wedding' or item is 'marry')
    removeCookie 'step'
    $('.step').hide()
    $("#steperror").show()
  else
    removeCookie 'step'
    $('.step').hide()
    $("#steperror").show()
  return
# // 展示日历界面
_displayCalendar = (date)->
  first_date = new Date()
  if date then first_date = new Date(date)
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
      if j > 0
        html += '<td><a class="book-select-date-item" data-date="' + _currDate.format('{yyyy}-{M}-' + j) + '">' + j + '</a></td>'
      else
        html += '<td></td>'
      if j > 0 && (j + weekDay) % 7 is 0
        html += '</tr><tr>'    
    html += '</tr></table></div></li>'

  $('#displayCalenderContainer').html html
  # $(html).find('.book-select-date-item').on('click', {step:4}, enterNext);
  $('#step3 .book-select-date-item').on 'click', {step:4}, enterNext

# // 从 cookie 中获取当前的进度(step)和所选的项目，按照进度和项目的不同，展示不同的页面。
enterNext = (d)->
  step = +d.data.step
  item = $(@).data('item') or GetCookie('item') or 'wedding'
  showStep step, item, $(@).data('date')
  return
enterLastStep = (d)->
  enterNext d
  cookies = ['item','select_date']
  removeCookies cookies
  return

bindBookItem = ()->
  initItem()
  # // radio绑定
  $('.label-radio').on 'click', selectFrameClick
  # // 第一步时间绑定
  $('#step1 .book-items a').on 'click', {step:2}, enterNext
  # // 第二步时间绑定
  $('#step2 #book-term-agree').on 'click', {step:3}, enterNext
  $('#step2 #book-term-reject').on 'click', {step:1}, enterNext
  # // 第三步时间绑定
  $('#step3 #book-select-date-back-a').on 'click', {step:2}, enterNext
  $('#step3 #step3_return').on 'click', {step:2}, enterNext
  # $('#step3 .book-select-date-item').on('click', {step:4}, enterNext);
  # // 第四步时间绑定
  $('#step4 #reSelectDate').on 'click', {step:3}, enterNext
  $('#step4 #book-detail-info-submit').on 'click', {step:5}, enterNext
  $('#step4 #book-detail-info-cancel').on 'click', {step:3}, enterNext

  $('#step5 #book-confirm-agree').on 'click', {step:6}, enterLastStep
  $('#step5 #book-confirm-reject').on 'click', {step:4}, enterNext

  $('#steperror a#steperror_return').on 'click', {step:1}, enterNext
  
  return

bindBookItem()