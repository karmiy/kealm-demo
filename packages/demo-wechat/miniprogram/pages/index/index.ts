/* import { add } from '../../shared/utils';
console.log('add 4 + 5 = ', add(4, 5)); */
// index.ts
// 获取应用实例
const app = getApp<IAppOption>();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    input1: 'basic1',
    input2: 'basic2',
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
      success(e) {
        e.eventChannel.on('receiver', (params) => {
          console.log('接收到的参数：', params);
        });
      }
    });
    /* wx.reLaunch({
      url: '../logs/logs',
    }); */
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  transitionend() {
    console.log("transitionend..");
  },
  animationstart() {
    console.log("animationstart..");
  },
  animationiteration() {
    console.log("animationiteration..");
  },
  animationend() {
    console.log("animationend..");
  },
  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    console.log('onLoad - index');
    /* console.log('....')
    console.log(wx.createSelectorQuery().select('.user-motto'));
    wx.createSelectorQuery().select('.user-motto').boundingClientRect(function(rect) {
      console.log('onLoad', rect);
    }).exec(); */
    /* setTimeout(() => {
      const animation = wx.createAnimation({
        delay: 0,
        duration: 600,
        timingFunction: "ease"
      });
      animation.translateY(-90).opacity(0.1).step();
      this.setData({
        animationData: animation.export()
      });
    }, 1000); */

    /* wx.createIntersectionObserver(this, {
      thresholds: [0.2, 0.5]
    }).relativeToViewport().observe('.intersection', (res) => {
      console.log(
        res.intersectionRatio, // 相交区域占目标节点的布局区域的比例
        res.intersectionRect, // 相交区域
        res.intersectionRect.left, // 相交区域的左边界坐标
        res.intersectionRect.top, // 相交区域的上边界坐标
        res.intersectionRect.width, // 相交区域的宽度
        res.intersectionRect.height, // 相交区域的高度
      )
    }); */
    
    /* this.createSelectorQuery().selectViewport().boundingClientRect(rect => {
      console.log(rect);
    }).exec(); */
    this.animate(
      '.animation-wrap', 
      [
        { offset: 0, opacity: 1, rotate: 0, backgroundColor: 'pink' },
        { offset: 0.5, opacity: 0.5, rotate: 45, backgroundColor: 'skyblue' },
        { offset: 1, opacity: 0, rotate: 90, backgroundColor: 'yellowgreen' },
      ],
      2000,
      () => {
        // 不一定比 transitionend 晚触发，可以会在最后的多个 transitionend 之间
        // console.log('animate end');
        this.clearAnimation('.animation-wrap', () => {
          console.log('clear animate success');
        });
        /* this.clearAnimation('.animation-wrap', { opacity: true, rotate: true, backgroundColor: true }, () => {
          console.log('clear animate success');
        }); */
      }
    );
  },
  onShow() {
    console.log('onShow - index');
    /* wx.createSelectorQuery().select('.user-motto').boundingClientRect(function(rect) {
      console.log('onShow', rect);
    }).exec(); */
  },
  onReady() {
    /* wx.createSelectorQuery().select('.user-motto').boundingClientRect(function(rect) {
      console.log('onReady', rect);
    }).exec(); */
  },
  onPageScroll(options) {
    // console.log(options.scrollTop);
  },
  onResize(res) {
    // console.log('onResize', res);
  },
  onTabItemTap(item) {
    console.log(item);
  }
})
