<template>
    <div class="app">
        <nav v-if="currentUser" class="navbar navbar-expand navbar-nav ml-auto navbar-dark bg-dark">
            <div class="container-fluid">
               
                <ul class="nav navbar-nav">
                    <li class="active"> <router-link to="/" class="nav-item nav-link">Result Student</router-link></li>
                    <li class=""> <router-link to="/" class="nav-item nav-link">Home</router-link></li>
                    <li class=""> <router-link v-if="isAdmin" to="/users" class="nav-item nav-link">Users</router-link></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a @click="logout" class="nav-item nav-link">Logout</a></li>
                </ul>
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
import { authenticationService } from '@/_services';
import { router, Role } from '@/_helpers';

export default {
    name: 'app',
    data () {
        return {
            currentUser: null
        };
    },
    computed: {
        isAdmin () {
            return this.currentUser && this.currentUser.role === Role.Admin;
        }
    },
    created () {
        authenticationService.currentUser.subscribe(x => this.currentUser = x);
    },
    methods: {
        logout () {
            authenticationService.logout();
            router.push('/login');
        }
    }
};
</script>