module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.deafault.home.index);
  router.get('/deafault/spider/:gid', controller.deafault.home.spider);
  router.get('/deafault/search/:gid', controller.deafault.home.search);
  router.get('/deafault/zhzs/:gid', controller.deafault.home.zhzs);
  router.get('/deafault/getZhzs/:gid', controller.deafault.home.getZhzs);
  router.post('/jk', controller.deafault.home.jk); // 监控某只股票
  router.get('/jk', controller.deafault.home.jkget); // 获取监控股票列表
};
