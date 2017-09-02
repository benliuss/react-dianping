var app = require('koa')();
var router = require('koa-router')();



var homeAdData = require('./home/ad.js');
router.get('/api/homead', function *(next) {
    this.body = homeAdData;
});

var homeListData = require('./home/list.js');
router.get('/api/homelist/:city/:page', function *(next) {
    const params = this.params;
    const paramsCity = params.city;
    const paramsPage = params.page;

    console.log('当前城市:' + paramsCity);
    console.log('当前页数:' + paramsPage);

    this.body = homeListData;
});


var searchListData = require('./search/list');
router.get('/api/search/:page/:city/:category/:keyword', function *(next) {
    const params = this.params;
    const paramsPage = params.page;
    const paramsCity = params.city;
    const paramsCategory = params.category;
    const paramsKeyword = params.keyword;

    console.log('当前页数:' + paramsPage);
    console.log('当前城市:' + paramsCity);
    console.log('当前类别:' + paramsCategory);
    console.log('关键字:' + paramsKeyword);

    this.body = searchListData;
});

router.get('/api/search/:page/:city/:category', function *(next) {
    const params = this.params;
    const paramsPage = params.page;
    const paramsCity = params.city;
    const paramsCategory = params.category;


    console.log('当前页数:' + paramsPage);
    console.log('当前城市:' + paramsCity);
    console.log('当前类别:' + paramsCategory);

    this.body = searchListData;
});


const detailInfo = require('./detail/info');
router.get('/api/detail/info/:id', function *(next) {
    console.log('详情页 - 商户信息');
    const params = this.params;
    const id = params.id;
    console.log('商户id: ' + id);
    this.body = detailInfo;
});

const detailComment = require('./detail/comment');
router.get('/api/detail/comment/:page/:id', function *(next) {
    console.log('详情页 - 用户点评');
    const params = this.params;
    const page = params.page;
    const id = params.id;
    console.log('商户id: ' + id);
    console.log('当前页数: ' + page);
    this.body = detailComment;
});


const orderList = require('./orderList/orderList');
router.get('/api/orderlist/:username', function *(next) {
    console.log('订单列表');
    const params = this.params;
    const username = params.username;
    console.log('用户名: ' + username);
    this.body = orderList;
});

router.post('/api/submitComment', function *(next) {
    console.log('提交评论');
    this.body = {
        error: 0,
        msg: 'ok'
    }
});


app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000);