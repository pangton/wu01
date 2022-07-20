const cloud = require("wx-server-sdk");

cloud.init({
  // env: cloud.DYNAMIC_CURRENT_ENV,
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

module.exports = async (event) => {
  try {
    // 把事件数据赋给U 再由U传给数据库
    let u = event.data;
    //userId？一般自行实现，小程序提供了openid
    let wxContext = cloud.getWXContext();
    let openId = wxContext.OPENID;
    // 防止加入两个小组
    let exist = await db
      .collection("test-form")
      .where({
        _openid: openId,
      })
      .get();
    if (exist.data[0] && exist.data[0].groupId) {
      return {
        success: false,
        errorMessage: "已有小组",
      };
    }

    //   想要小组ID递增怎么办
    let res = await db.collection("test-group").count();
    let groupId = parseInt(res.total) + 1;
    //   严格事务需求，同时创建小组怎么，自行搜索

    await db.collection("test-group").add({
      data: {
        leader: u.nickname,
        region: u.region,
        code: u.code,
        age: u.age,
        info: u.info,
        member: 1,
        openId,
        groupId,
      },
    });
    await db.collection("test-form").add({
      data: {
        nickname: u.nickname,
        gender: u.gender === "nv",
        region: u.region,
        code: u.code,
        age: u.age,
        info: u.info,
        isleader: true,
        openId,
        groupId,
      },
    });
    return {
      success: true,
      groupId,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: error.message,
    };
  }
};
