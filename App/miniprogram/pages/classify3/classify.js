// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifies:null,
    clickClassify:null,
    currentClassify:null,
    current:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload")
    wx.cloud.init({
      env: "cloud1-9ggxx6c5edb92b01"
    })
    const db = wx.cloud.database();
    db.collection('classifies').get({
        success: res=>{
          this.setData({
            classifies: res.data,
            currentClassify:res.data[0].classify,
            clickClassify:res.data[0]._id
          })
          console.log("get classify is:",this.data.classifies)
          console.log("current classify is:",this.data.currentClassify)
      db.collection('shops').where({
        shop_classify:this.data.currentClassify
      }).get({
        success: res=>{
          this.setData({
            current:res.data
          })
          console.log("get current shop is:",this.data.current)
        }
      })
        }
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
      
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
  changeClassify:function(optiton){
    console.log(optiton);
    clickClassify:optiton.currentTarget.id;
    this.setData({
      clickClassify:optiton.currentTarget.id
    })

    const db = wx.cloud.database();
    db.collection('shops')
    .where({
      shop_classify: optiton.currentTarget.dataset.current
    })
    .get({
      success: res=>{
        this.setData({
          current:res.data
        })
        console.log(this.data.current)
      }
    })
  }
})