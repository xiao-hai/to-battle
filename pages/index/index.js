//index.js

const app = getApp();
const AV = require('../../utils/av-weapp-min');
const Activity = require('../../model/activity');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    activities: []
  },

  onReady: function () {
    new AV.Query(Activity)
      .descending('createdAt')
      .find()
      .then((data) => {
        this.showActivity(data);
      });
  },

  showActivity: function (data) {
    this.setData({
      activities: data
    })
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  bindCreateTap: function () {
    wx.navigateTo({
      url: '../addActivity/addActivity'
    })
  },

  onLoad: function () {
    // console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
