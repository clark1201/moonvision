$('#modal').load "template/infoModal.html"
$('#modal_confirm').load "template/confirmModal.html"
# 未处理订单
showDetail = (orderItem)->
  order_item = orderItem
  order_itemObj = JSON.parse order_item.detail
  title = "#{order_item.order_id}订单详情"
  content = "<div>
    <p>拍摄时间：#{order_item.book_time} #{enums.bookingTime[+order_item.book_am_pm]}</p>
    <p>拍摄套餐：#{enums.packageName[order_itemObj.book_package]}</p>
    <p>宝宝性别：#{order_itemObj.gender}</p>
    <p>宝宝姓名：#{order_itemObj.name}（小名：#{order_itemObj.nickName}）</p>
    <p>宝宝年龄：#{order_itemObj.age}</p>
    <p>下单人称呼：#{order_itemObj.parentsName}</p>
    <p>下单人手机：#{order_itemObj.phone}</p>
    <p>下单人QQ：#{order_itemObj.parentsqq}</p>
    <p>快递地址：#{order_itemObj.expressAddress}</p>
    <p>收件人姓名：#{order_itemObj.addressee}</p>
    <p>备注：#{order_itemObj.mark}</p>
    <p>#{if order_itemObj.is_family then '' else '不'}需要拍摄亲子照</p>
  </div>"
  modalId = "infoModal"
  modal 'info', modalId, title, content
  return

setStatus = (orderId, status)->
  content = "确认 #{orderId} 已付款？"
  if status is 1 
    content = "确认 #{orderId} 已付款？"
  else if status is 2
    content = "确认 #{orderId} 已拍摄？"  
  else if status is 3
    content = "确认拒绝 #{orderId}？"
  modal 'confirm', '', '确认', content, ()->
    postData = 
      order_id: orderId
      order_status: status
    obj = 
      contentType : 'application/x-www-form-urlencoded;charset=utf-8'
      bc : (rs)->
        getUndoList()
        return
    ajax 'POST', '/CGI-BIN/setOrderStatus.pl', postData, obj
    return
  return

setPay = (orderId)->
  setStatus orderId, 1
  return

setPicture = (orderId)->
  setStatus orderId, 2
  return

setReject = (orderId)->
  setStatus orderId, 3
  return

getUndoList = ()->
  obj = 
    bc : (d)->
      html = ''
      $('#orderCount').text d?.length or 0
      if d and d.length > 0
        $('.non-order').hide()
        $('.has-order').show()
        $('#undo_count').text d.length
        for order_item, i in d by -1
          order_itemObj = JSON.parse order_item.detail
          str_order_item = JSON.stringify order_item
          html += "
            <tr>
              <td>#{order_item.order_id}</td>
              <td>#{order_item.book_time} #{enums.bookingTime[+order_item.book_am_pm]}</td>
              <td>#{enums.packageName[order_itemObj.book_package]}</td>
              <td>
                <p>姓名：#{order_item.username}</p>
                <p>电话：#{order_item.tel}</p>
                <p>地址：#{order_item.address}</p>
              </td>
              <td>#{enums.address}</td>
              <td><a href='javascript:void(0)' onclick='showDetail(#{str_order_item})'>点击看详细</a></td>
              <td>#{enums.orderStatus[order_item.order_status]}</td>
              <td>
                <p><a href='javascript:void(0)' onclick='setPay(#{order_item.order_id})'>已付款</a></p>
                <p><a href='javascript:void(0)' onclick='setPicture(#{order_item.order_id})'>已拍摄</a></p>
                <p><a href='javascript:void(0)' onclick='setReject(#{order_item.order_id})'>拒绝</a></p>
              </td>
            </tr>
          "
        $('#undoList_content').html html
      else
        $('.non-order').show()
        $('.has-order').hide()
      return
  ajax 'GET', '/CGI-BIN/getUndoList.pl', null, obj
  return
# 已处理订单

# 过期订单

# 设置日期

admin_init = ()->
  getUndoList()
  return
admin_init()