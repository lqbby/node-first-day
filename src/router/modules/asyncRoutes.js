
import Layout from '@/layout'
export const asyncRoutes = [
  // 工单管理
  {
    path: '/gdgl',
    component: Layout,
    redirect: '/gdgl/goodsType',
    name: 'gdgl',
    meta: { title: '工单管理', icon: 'skill' },
    children: [
      {
        path: '/gdgl/operating',
        component: () => import('@/views/gdgl/operating.vue'),
        meta: { title: '运营工单' }
      },
      {
        path: '/gdgl/operations',
        component: () => import('@/views/gdgl/operations.vue'),
        meta: { title: '运维工单' }
      }
    ]
  },
  // 点位管理
  {
    path: '/dwgl2',
    component: Layout,
    redirect: '/dwgl2/area',
    name: 'dwgl2',
    meta: {
      title: '点位管理',
      icon: 'list'
    },
    children: [
      {
        path: "/dwgl2/area",
        component: () => import("@/views/dwgl2/area.vue"),
        meta: { title: "区域管理" },
      },
      {
        path: "/dwgl2/point",
        component: () => import("@/views/dwgl2/point.vue"),
        meta: { title: "点位管理" },
      },
      {
        path: "/dwgl2/partners",
        component: () => import("@/views/dwgl2/partners.vue"),
        meta: { title: "合作商管理" },
      },
    ],
  },
  // 设备管理
  {
    path: '/sbgl',
    component: Layout,
    redirect: '/sbgl/index',
    name: 'sbgl',
    meta: {
      title: '设备管理',
      icon: 'equipment'
    },
    children: [
      {
        path: 'equipment',
        component: () => import('@/views/sbgl/equipment'), // Parent router-view
        name: 'equipment',
        meta: { title: '设备管理' }
      },
      {
        path: 'equipmentState',
        component: () => import('@/views/sbgl/equipmentState'),
        name: 'equipmentState',
        meta: { title: '设备状态' }
      },
      {
        path: 'equipmentType',
        component: () => import('@/views/sbgl/equipmentType'),
        name: 'equipmentType',
        meta: { title: '设备类型管理' }
      }
    ]
  },
  // 人员管理
  {
    path: '/rygl',
    component: Layout,
    redirect: '/rygl/index',
    name: 'rygl',
    meta: {
      title: '人员管理',
      icon: 'user'
    },
    children: [
      {
        path: '/rygl/index',
        component: () => import('@/views/rygl/personnelList.vue'),
        meta: { title: '人员列表' }
      },
      {
        path: '/rygl/rygl-task-stats',
        component: () => import('@/views/rygl/workStatistics.vue'),
        meta: { title: '人效统计' }
      },
      {
        path: '/rygl/rygl-work',
        component: () => import('@/views/rygl/workList.vue'),
        meta: { title: '工作量列表' }
      }
    ]
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
        component: () => import('@/views/spgl/components/type'),
        meta: { title: '商品类型' }
      },
      {
        path: 'spglTwo',
        name: 'spglTwo',
        component: () => import('@/views/spgl/components/shooplist'),
        meta: { title: '商品管理' }
      }
    ]
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
        meta: { title: '策略管理', icon: 'tree' }
      }
    ]
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
        meta: { title: '订单管理', icon: 'form' }
      }
    ]
  },
  // 对账统计
  {
    path: "/dztj/index",
    component: Layout,
    children: [
      {
        path: "",
        component: () => import("@/views/dztj"),
        meta: { title: "对账统计", icon: "对账统计" }
      }
    ]
  }
]

export default asyncRoutes
