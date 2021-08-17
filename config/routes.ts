let routers = [
  {
    name: 'myfavorite',
    icon: 'DiffOutlined',
    path: '/myfavorite',
    component: './my-favorite',
  },
  {
    name: 'previews',
    icon: 'DiffOutlined',
    path: '/previews',
    component: './previews',
  },
  {
    name: ':id',
    icon: 'DiffOutlined',
    path: '/:id',
    component: './previews',
  },
  // 主路由
  {
    path: '/',
    component: './my-favorite',
  },
];

export default [
  {
    path: '/',
    component: './my-favorite',
    routes: routers,
  },
];
