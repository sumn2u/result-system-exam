import Vue from 'vue';
import Router from 'vue-router';

import { authenticationService } from '@/_services';
import { Role } from '@/_helpers';
import HomePage from '@/home/HomePage';
import UserPage from '@/admin/UserPage';
import ClassesPage from '@/admin/ClassesPage';
import SubjectsPage from '@/admin/SubjectsPage';
import UserLayout  from '@/admin/UserLayout';
import UserForm from '@/admin/UserForm';
import ClassForm from '@/admin/ClassForm';
import SubjectForm from '@/admin/SubjectForm';
import LoginPage from '@/login/LoginPage';

Vue.use(Router);

export const router = new Router({
    mode: 'hash',
    routes: [
        { 
            path: '/', 
            component: HomePage, 
            meta: { authorize: [] } 
        },
        { 
            path: '/users', 
            component: UserLayout, 
            meta: { authorize: [Role.Admin] },
            children: [
              { path: '', component: UserPage },
              { path: ':id', component: UserForm,
              props: (route) => {
                return {
                  ...route.params
                };
              }}
              ,{ path: 'new', component: UserForm },

            ]
        },
        { 
            path: '/classes', 
            component: UserLayout, 
            meta: { authorize: [Role.Admin] },
            children: [
              { path: '', component: ClassesPage },
              { path: ':id', component: ClassForm,
              props: (route) => {
                return {
                  ...route.params
                };
              }}
              ,{ path: 'new', component: ClassForm },

            ]
        },

        { 
            path: '/subjects', 
            component: UserLayout, 
            meta: { authorize: [Role.Admin] },
            children: [
              { path: '', component: SubjectsPage },
              { path: ':id', component: SubjectForm,
              props: (route) => {
                return {
                  ...route.params
                };
              }}
              ,{ path: 'new', component: SubjectForm },

            ]
        },
        { 
            path: '/login', 
            component: LoginPage 
        },

        // otherwise redirect to home
        { path: '*', redirect: '/' }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const { authorize } = to.meta;
    const currentUser = authenticationService.currentUserValue;

    if (authorize) {
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return next({ path: '/login', query: { returnUrl: to.path } });
        }

        // check if route is restricted by role
        if (authorize.length && !authorize.includes(currentUser.role)) {
            // role not authorised so redirect to home page
            return next({ path: '/' });
        }
    }

    next();
})