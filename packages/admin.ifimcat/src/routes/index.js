import React from 'react';

const Dashboard = React.lazy(() => import('../views/dashboard'));
const Blog = React.lazy(() => import('../views/blog'));
const Category = React.lazy(() => import('../views/category'));
const Tag = React.lazy(() => import('../views/tag'));
const Topic = React.lazy(() => import('../views/topic'));
const Edit = React.lazy(() => import('../views/edit'));
const Admin = React.lazy(() => import('../views/admin'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/blogs', name: 'Blog', component: Blog },
  { path: '/tags', name: 'Tag', component: Tag},
  { path: '/categories', name: 'Category', component: Category },
  { path: '/topics', name: 'Topic', component: Topic },
  { path: '/editor', name: 'Edit', component: Edit },
  { path: '/users', name: 'Admin', component: Admin },
];

export default routes;
