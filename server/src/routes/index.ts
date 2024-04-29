export default [
  {
    method: 'GET',
    path: '/test',
    // name of the controller file & the method.
    handler: 'controller.index',
    config: {
      policies: [],
    },
  },
];
