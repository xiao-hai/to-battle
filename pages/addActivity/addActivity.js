// pages/addActivity/addActivity.js
const AV = require('../../utils/av-weapp-min');
const Activity = require('../../model/activity');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      name: '',
      startDate: '2017-09-01',
      startTime: '12:01',
      endDate: '2017-09-01',
      endTime: '12:01',
      cutOffTime: '2017-09-03'
    },
    area: ['省份', '北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区', '台湾省', '香港特别行政区', '澳门特别行政区'],
    areaIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  updateName: function ({
    detail: {
      value
    }
  }) {
    console.log(value);
    // Android 真机上会诡异地触发多次时 value 为空的事件
    if (!value) return;
    this.setData({
      form: {
        name: value
      }
    });
  },

  addActivity: function () {
    const { form } = this.data;
    const name = form.name.trim();
    if (!name) {
      return;
    }
    new Activity({
      content: name
    }).save().then((activity) => {
      // this.setTodos([todo, ...this.data.todos]);
      console.log('activity', activity);
    }).catch(console.error);
    this.setData({
      draft: ''
    });
  },

  onAreaChange: function (e) {
    this.setData({
      areaIndex: e.detail.value
    });
  },

  bindDateChange: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },

  bindTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  }
})