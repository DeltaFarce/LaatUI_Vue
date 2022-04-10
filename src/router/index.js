import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '性能大盘'
                },
                component: () => import (
                /* webpackChunkName: "dashboard" */
                "../views/Dashboard.vue")
            }, {
                path: "/caseComponents",
                name: "caseComponents",
                meta: {
                    title: '用例组件'
                },
                component: () => import (
                /* webpackChunkName: "table" */
                "../views/CaseComponents.vue")
            }, {
                path: "/report",
                name: "report",
                meta: {
                    title: '测试报告'
                },
                component: () => import (
                /* webpackChunkName: "charts" */
                "../views/Reports.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: () => import (
                /* webpackChunkName: "form" */
                "../views/BaseForm.vue")
            }, {
                path: "/testCase",
                name: "testCase",
                meta: {
                    title: '测试用例'
                },
                component: () => import (
                /* webpackChunkName: "tabs" */
                "../views/TestCase.vue")
            },  {
                path: "/configuration",
                name: "configuration",
                meta: {
                    title: '项目配置'
                },
                component: () => import (
                /* webpackChunkName: "tabs" */
                "../views/ProjectConfigurations.vue")
            }, {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '使用展示'
                },
                component: () => import (
                /* webpackChunkName: "donate" */
                "../views/Donate.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import (
                /* webpackChunkName: "permission" */
                "../views/Permission.vue")
            }, {
                path: "/project",
                name: "project",
                meta: {
                    title: '项目列表'
                },
                component: () => import (
                /* webpackChunkName: "i18n" */
                "../views/Projects.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import (
                /* webpackChunkName: "upload" */
                "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标'
                },
                component: () => import (
                /* webpackChunkName: "icon" */
                "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */
                '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (/* webpackChunkName: "403" */
                '../views/403.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import (
        /* webpackChunkName: "login" */
        "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to) => {
    document.title = `${to.meta.title} | LaatUI`;
    // const role = localStorage.getItem('ms_username');
    // if (!role && to.path !== '/login') {
    //     next('/login');
    // } else if (to.meta.permission) {
    //     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    //     role === 'admin'
    //         ? next()
    //         : next('/403');
    // } else {
    //     next();
    // }
});

export default router;