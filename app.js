const AV = require('./utils/av-weapp-min');

// LeanCloud 应用的 ID 和 Key
AV.init({
  appId: '2N7Ia6VN2hS31nMzHOfqJdVL-gzGzoHsz',
  appKey: 'Q7ktNr31QKziMn5ka074ES4E',
});
console.log('AV', AV);
//app.js
App({
 onLaunch: function () {
   //调用API从本地缓存中获取数据
   var logs = wx.getStorageSync('logs') || []
   logs.unshift(Date.now())
   wx.setStorageSync('logs', logs)
 },
 getUserInfo:function(cb){
   var that = this
   if(this.globalData.userInfo){
     typeof cb == "function" && cb(this.globalData.userInfo)
   }else{
     //调用登录接口
     wx.login({
       success: function () {
         wx.getUserInfo({
           success: function (res) {
             that.globalData.userInfo = res.userInfo
             typeof cb == "function" && cb(that.globalData.userInfo)
           }
         })
       }
     })
   }
 },
 globalData:{
   userInfo:null
 }
})
