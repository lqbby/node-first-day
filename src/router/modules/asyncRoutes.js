
import Layout from '@/layout'
export const asyncRoutes = [
  // 工单管理
  {
    path: '/gdgl',
    component: Layout,
    redirect: '/gdgl/gdglOne',
    name: 'gdgl',
    meta: { title: '工单管理', icon: 'skill' },
    children: [
      {
        path: 'gdglOne',
        name: 'gdglOne',
        component: () => import('@/views/gdgl/components/gdglOne'),
        meta: { title: '运营工单' },
      },
      {
        path: 'gdglTwo',
        name: 'gdglTwo',
        component: () => import('@/views/gdgl/components/gdglTwo'),
        meta: { title: '运维工单' },
      },
    ],
  },
  // 点位管理
  {
    path: '/dwgl',
    component: Layout,
    redirect: '/dwgl/dwglOne',
    name: 'dwgl',
    meta: {
      title: '点位管理',
      icon: 'list',
    },
    children: [
      {
        path: 'dwglOne',
        component: () => import('@/views/dwgl/components/dwglOne'), // Parent router-view
        name: 'dwglOne',
        meta: { title: '区域管理' },
      },
      {
        path: 'dwglTwo',
        component: () => import('@/views/dwgl/components/dwglTwo'), // Parent router-view
        name: 'dwglTwo',
        meta: { title: '点位管理' },
      },
      {
        path: 'dwglThree',
        component: () => import('@/views/dwgl/components/dwglThree'),
        name: 'dwglThree',
        meta: { title: '合作商管理' },
      },
    ],
  },
  // 设备管理
  {
    path: '/sbgl',
    component: Layout,
    redirect: '/sbgl/sbglOne',
    name: 'sbgl',
    meta: {
      title: '设备管理',
      icon: 'link',
    },
    children: [
      {
        path: 'sbglOne',
        component: () => import('@/views/sbgl/components/sbglOne'), // Parent router-view
        name: 'sbglOne',
        meta: { title: '设备管理' },
      },
      {
        path: 'sbglTwo',
        component: () => import('@/views/sbgl/components/sbglTwo'), // Parent router-view
        name: 'sbglTwo',
        meta: { title: '设备状态' },
      },
      {
        path: 'sbglThree',
        component: () => import('@/views/sbgl/components/sbglThree'),
        name: 'sbglThree',
        meta: { title: '设备类型管理' },
      },
    ],
  },
  // 人员管理
  {
    path: '/rygl',
    component: Layout,
    redirect: '/rygl/ryglOne',
    name: 'rygl',
    meta: {
      title: '人员管理',
      icon: 'user',
    },
    children: [
      {
        path: 'ryglOne',
        component: () => import('@/views/rygl/components/ryglOne'), // Parent router-view
        name: 'ryglOne',
        meta: { title: '人员列表' },
      },
      {
        path: 'ryglTwo',
        component: () => import('@/views/rygl/components/ryglTwo'), // Parent router-view
        name: 'ryglTwo',
        meta: { title: '人效统计' },
      },
      {
        path: 'ryglThree',
        component: () => import('@/views/rygl/components/ryglThree'),
        name: 'ryglThree',
        meta: { title: '工作量列表' },
      },
    ],
  },
  // 商品管理
  {
    path: '/spgl',
    component: Layout,
    redirect: '/spgl/spglOne',
    name: 'spgl',
    meta: { title: '商品管理', icon: 'table' },
    children: [
      {
        path: 'spglOne',
        name: 'spglOne',
        component: () => import('@/views/spgl/components/spglOne'),
        meta: { title: '商品类型' },
      },
      {
        path: 'spglTwo',
        name: 'spglTwo',
        component: () => import('@/views/spgl/components/spglTwo'),
        meta: { title: '商品管理' },
      },
    ],
  },
  // 策略管理
  {
    path: '/clgl',
    component: Layout,
    children: [
      {
        path: 'clgl',
        name: 'clgl',
        component: () => import('@/views/clgl'),
        meta: { title: '策略管理', icon: 'tree' },
      },
    ],
  },
  // 订单管理
  {
    path: '/ddgl',
    component: Layout,
    children: [
      {
        path: 'ddgl',
        name: 'ddgl',
        component: () => import('@/views/ddgl'),
        meta: { title: '订单管理', icon: 'form' },
      },
    ],
  },
  // 对账统计
  {
    path: '/dztj',
    component: Layout,
    children: [
      {
        path: 'dztj',
        name: 'dztj',
        component: () => import('@/views/dztj'),
        meta: { title: '对账统计', icon: 'money' },
      },
    ],
  },
]

export default asyncRoutes
