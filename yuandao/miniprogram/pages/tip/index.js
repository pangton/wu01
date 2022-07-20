// page({}); 首字母小写 错误
Page({
  data: {
    groupId: "",
    code: "",
    type: "",
    img: "1",
    g: "",
  },
  onLoad(e) {
    this.setData({
      groupId: e.groupId || "",
      code: e.code || "",
      img: String(Math.ceil(Number(e.groupId) / 30) || "1"),
      g: String(Math.ceil(Number(e.groupId) / 190) || "1"),
      type: e.type || "",
    });
  },
});
