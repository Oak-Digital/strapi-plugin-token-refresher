export default [
  {
    method: 'GET',
    path: '/token-refresher/token/:type',
    // name of the controller file & the method.
    handler: 'token.getToken',
    config: {
      policies: [],
    },
  },
];
