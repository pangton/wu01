Page({
  data: {
    groupList: [],
  },
  // onload注意大小写不一样 ,插件补全也不行  
  onLoad: function (e) {
    wx.cloud
      .callFunction({
        name: "quickstartFunctions",
        data: {
          type: "getManyGroup",
        },
      })
      .then((res) => {
        this.setData({
          groupList: res.result.groupList,
        });
      });
  },
});
