
// 获取当前年月日
export function getDate() {
  // 获取当前日期
  const date = new Date()
  // 获取当前月份
  let nowMonth = date.getMonth() + 1
  // 获取当前是几号
  let strDate = date.getDate()
  // 添加分隔符“-”
  const seperator = '-'
  // 对月份进行处理，1-9月在前面添加一个“0”
  if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = '0' + nowMonth
  }
  // 对月份进行处理，1-9号在前面添加一个“0”
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }

  const nowDate = {
    start: '',
    end: ''
    // monday: ''
  }
  // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
  nowDate.start = date.getFullYear() + seperator + nowMonth + seperator + '01'
  nowDate.end = date.getFullYear() + seperator + nowMonth + seperator + strDate
  return nowDate
}

export function getMonday() {
  var now = new Date()
  var nowTime = now.getTime()
  var day = now.getDay()
  var oneDayTime = 24 * 60 * 60 * 1000
  // 显示周一
  var MondayTime = nowTime - (day - 1) * oneDayTime
  // 初始化日期时间
  var monday = new Date(MondayTime)

  function add0(m) { return m < 10 ? '0' + m : m }
  function format(shijianchuo) {
    // shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo)
    var y = time.getFullYear()
    var m = time.getMonth() + 1
    var d = time.getDate()
    return y + '-' + add0(m) + '-' + add0(d)
  }
  const Monday = format(monday)
  return Monday
}
