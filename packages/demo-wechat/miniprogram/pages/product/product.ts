// logs.ts
// const util = require('../../utils/util.js')
import { formatTime } from '../../utils/util'

Page({
  data: {
    logs: [],
  },
  onLoad() {
    console.log('onLoad - product');
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map((log: string) => {
        return {
          date: formatTime(new Date(log)),
          timeStamp: log
        }
      }),
    });
    /* const eventChannel = this.getOpenerEventChannel();
    eventChannel.emit('receiver', { id: 100 }); */
  },
  onUnload() {
    console.log('onUnload - product');
  },
})
