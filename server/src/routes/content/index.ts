export default {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/token/:type',
      // name of the controller file & the method.
      handler: 'token.getToken',
      config: {
        policies: [],
      },
    },
  ],
};
