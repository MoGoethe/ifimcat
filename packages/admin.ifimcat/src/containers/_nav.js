export default [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['统计']
  },
  {
    _tag: 'CSidebarNavItem',
    name: '概览',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['功能']
  },
  {
    _tag: 'CSidebarNavItem',
    name: '博客',
    to: '/blogs',
    icon: 'cil-notes',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '分类',
    to: '/categories',
    icon: 'cil-paperclip',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '标签',
    to: '/tags',
    icon: 'cil-tags',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '专题',
    to: '/topics',
    icon: 'cil-star',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '用户管理',
    to: '/users',
    icon: 'cil-user-follow',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '写博客',
    to: '/editor',
    icon: 'cil-pencil',
  }
]

