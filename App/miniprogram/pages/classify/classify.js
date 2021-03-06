// pages/classify/classify.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        classifies:null,
        clickClassify:null,
        data:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const db = wx.cloud.database();
        db.collection('classify').get({
            success: res=>{
              
              this.setData({
                classifies: res.data,
                clickClassify:res.data[0]._id
              })
              console.log(this.data.classifies)
              db.collection('shops')
              .where({
                  classify:this.data.clickClassify
                }).get({
                      success: res=>{
                        this.setData({
                        data: res.data
                      })
                      console.log("init :",this.data.data)
                      }
                })
            }
          })
    
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
            classify:this.data.clickClassify
        })
        .get({
          success: res=>{
            this.setData({
              data: res.data
            })
            console.log(this.data.data)
          }
        })
    }
})