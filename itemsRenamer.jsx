/*
adobe Illustrator CS6 script
Version: 1.0.0
Copyright(c) Tomohiko Namu
https://namu-ws.com
*/

// dialog
var win = new Window('dialog', 'item-renamer', [0, 0, 370, 220])

var h = 20
var m = 10
var p = 20
var w = 350
var phm = p + h + m
var phmh = phm + h
var phmhh = phmh + h
var phmhhm = phmhh + m
var phmhhmh = phmhhm + h

win.add('statictext', [p, p, w, h], 'Name + Start Number')

win.add('statictext', [p, phm, w, phmh], 'Name')
var itemName = win.add('edittext', [p, phmh, w, phmhh])

win.add('statictext', [p, phmhhm, w, phmhhmh], 'Start Number')
var startNum = win.add('edittext', [p, phmhhmh, w * 0.25, phmhhmh + h], '1')

var objGroup = win.add('group', [
  p + w * 0.25 + m,
  phmhhmh,
  p + w * 0.25 + m + w * 0.5,
  phmhhmh + h
])

var btnAsc = objGroup.add('radiobutton', [0, 0, 80, 20], 'Ascending')
objGroup.add('radiobutton', [80, 0, 160, 20], 'Descending')

btnAsc.value = true

win.add('button', [w - 120, 220 - 40, w - 70, 220 - 20], 'OK', {
  name: 'ok'
})
win.add('button', [w - 60, 220 - 40, w - 10, 220 - 20], 'Cancel', {
  name: 'cancel'
})

win.center()
var winShow = win.show()

if (winShow === 1) {
  itemsRenamer(btnAsc.value, itemName.text)
}

// rename
function renameSerial(item, btnAscVal, itemNameVal) {
  var j = item.length
  for (var i = 0; i < item.length; i++) {
    if (btnAscVal) {
      item[i].name = itemNameVal + String(i + 1 + (startNum.text - 1))
    } else {
      item[i].name = itemNameVal + String(j + (startNum.text - 1))
      j--
    }
  }
}

// rename
function renameFixed(item, btnAscVal, itemNameVal) {
  for (var i = 0; i < item.length; i++) {
    item[i].name = itemNameVal
  }
}

function itemsRenamer(btnAscVal, itemNameVal) {
  var selectedLayer = app.activeDocument.activeLayer

  try {
    var selLayObj = selectedLayer
    if (selLayObj.locked === true) {
      alert('Error: Layer is locked')
    } else if (startNum.text) {
      if (startNum.text.search(/^\d+$/) <= -1) {
        alert('Error: Start Number is String')
      } else {
        renameSerial(selLayObj.pageItems, btnAscVal, itemNameVal)
      }
    } else {
      renameFixed(selLayObj.pageItems, btnAscVal, itemNameVal)
    }
  } catch (e) {
    alert('Error')
  }
}
