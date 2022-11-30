
import dayjs from 'dayjs'
// 当月第一天 例2022.10.01
export const monthStart = dayjs().startOf('month').format('YYYY.MM.DD')
// 当月当前时间 例2022.10.30
export const monthEnd = dayjs().format('YYYY.MM.DD')
// 当月第一天带时分秒 例2022-10-01 00:00:00
export const monthDetailStart = dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss')
// 当月当前时间带时分秒 例2022-10-01 ：15:42:20
export const monthDetailEnd = dayjs().format('YYYY-MM-DD HH:mm:ss')
// 当月第一天-间隔 例2022-10-01
export const monthRungStart = dayjs().startOf('month').format('YYYY-MM-DD')
// 当月第一天-间隔 例2022-10-30
export const monthRungEnd = dayjs().format('YYYY-MM-DD')
// 获取本周一时间
export const weeksStart = () => {
  if (dayjs().day() === 0) {
    return dayjs().day(-6).format('YYYY-MM-DD')
  } else {
    return dayjs().day(1).format('YYYY-MM-DD')
  }
}
// 获取本周一时间带时分秒
export const weeksDetailStart = () => {
  if (dayjs().day() === 0) {
    return dayjs().day(-6).format('YYYY-MM-DD HH:mm:ss')
  } else {
    return dayjs().day(1).format('YYYY-MM-DD HH:mm:ss')
  }
}
// 获取时间对应的星期
export const weeksResult = (time) => {
  const arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const count = dayjs(time).day()
  return arr[count]
}
// 月
export const monthResult = (time) => {
  const resMonth = dayjs(time).month()
  const resDate = dayjs(time).date()
  return `${resMonth + 1}月${resDate}日`
}
// 年
export const yearStart = `${dayjs().year()}-01-01`
export const yearDetailStart = `${dayjs().year()}-01-01 00:00:00`
export const yearResult = (time) => {
  return `${dayjs(time).year()}年${dayjs(time).month() + 1}月`
}
