console.log("加载成功");

require.config({
  paths: {
    jquery: "jquery-1.11.3",
    "jquery-cookie": "jquery.cookie",
    parabola: "parabola",
    login: 'login',
    index: 'index',
    listlist: 'listlist',
    detail: 'detail',
    shopping: 'shopping',

  },
  shim: {
    "jquery-cookie": ["jquery"],
    parabola: {
      exports: "_",
    },
  },
});

//引入模块
require(["login", "index", "listlist", "detail", "shopping"], function (login, index, listlist, detail, shopping) {
  login.download();
  login.register();
  login.relo();
  login.isYes();
  index.indexlist();
  index.navlist();
  index.navChick();
  index.banner();
  listlist.listlist();
  detail.detail();
  detail.deClick();
  detail.magnifying();
  detail.addShopping();
  shopping.check();
  shopping.rightBtnRemoveClick();
  shopping.rightGoodsAdd_subtract();
  shopping.clearBtnHandleClick();
  shopping.sc_msg();
});