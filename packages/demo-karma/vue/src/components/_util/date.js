/* 格式化日期 */
export const formatDate = function (date = new Date(), fmt) {
  const o = {
    "M+": date.getMonth() + 1, //月份
    "D+": date.getDate(), //日
    "H+": date.getHours(), //小时
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/* 比较日期是否相同，像2019-01-01和2019-1-01得出的getTime()不同 */
export const compareWithoutTimer = (date, cDate) => {
  const yearSame = date.getFullYear() === cDate.getFullYear(),
    monthSame = date.getMonth() === cDate.getMonth(),
    dateSame = date.getDate() === cDate.getDate();
  return yearSame && monthSame && dateSame;
}

/* 获取相对时间，Date，差值、类型（second, minute, hour, day, month, year）、之后 */
export const getRelativeDate = (date = new Date(), dValue, type, after) => {
  let rDate = date,
    time = '',
    cloneDate = null;
  switch (type) {
    case 'second':
      time = date.valueOf() + (after ? (dValue * 1000) : -(dValue * 1000));
      rDate = new Date(time);
      break;
    case 'minute':
      time = date.valueOf() + (after ? (dValue * 60 * 1000) : -(dValue * 60 * 1000));
      rDate = new Date(time);
      break;
    case 'hour':
      time = date.valueOf() + (after ? (dValue * 60* 60 * 1000) : -(dValue * 60* 60 * 1000));
      rDate = new Date(time);
      break;
    case 'day':
      time = date.valueOf() + (after ? (dValue * 24 * 60* 60 * 1000) : -(dValue * 24 * 60* 60 * 1000));
      rDate = new Date(time);
      break;
    case 'month':
      cloneDate = new Date(date.valueOf());
      cloneDate.setMonth(cloneDate.getMonth() + (after ? dValue : -dValue));
      rDate = cloneDate;
      break;
    case 'year':
      cloneDate = new Date(date.valueOf());
      cloneDate.setFullYear(cloneDate.getFullYear() + (after ? dValue : -dValue));
      rDate = cloneDate;
      break;
  }
  return rDate;
}