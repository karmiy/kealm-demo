// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    console.log('onLaunch - app');
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
  },
  onShow() {
    console.log('onShow - app');
  },
  onError(error) {
    console.log('get error', error);
  }
})