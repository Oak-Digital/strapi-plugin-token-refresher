export default {
  type: 'admin',
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
    {
      method: 'POST',
      path: '/token/:type',
      // name of the controller file & the method.
      handler: 'token.setToken',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/refresh/:type',
      handler: 'token.refreshToken',
      config: {
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/token/:type',
      handler: 'token.deleteToken',
      config: {
        policies: [],
      },
    },
  ],
};
