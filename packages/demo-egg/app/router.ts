import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;

  const counterMiddleware = middleware.counter();

  router.get('/', controller.home.index);
  router.get('/about', counterMiddleware, controller.about.index);
  // router.get('/getUser/:id', controller.about.getUser);
  router.get('/getMockUser/:id', controller.user.getMockUser);
  router.post('/addUser', controller.about.addUser);
  router.get('/ejs', controller.ejs.index);
  router.post('/cookie/add', controller.cookie.add);
  router.post('/session/add', controller.session.add);

  router.get('/extend/application', controller.extend.application);
  router.post('/extend/context', controller.extend.context);
  router.post('/extend/request', controller.extend.request);
  router.get('/extend/response', controller.extend.response);
  router.get('/extend/helper', controller.extend.helper);

  router.get('/mysql/addUser', controller.user.addMysqlUser);
  router.get('/mysql/deleteUser/:id', controller.user.deleteMysqlUser);
  router.get('/mysql/updateUser/:id/:name', controller.user.updateMysqlUser);
  router.get('/mysql/getUser/:id', controller.user.getMysqlUser);
};
