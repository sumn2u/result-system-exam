<template>
    <div style="padding: 2rem">
        <h1>Home</h1>
        <p>You're logged in with Vue.js & JWT!!</p>
        <p>Your role is: <strong>{{currentUser.role}}</strong>.</p>
    </div>
</template>

<script>
import { userService, authenticationService } from '@/_services';

export default {
    data () {
        return {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        };
    },
    created () {
        userService.getById(this.currentUser.id).then(user => this.userFromApi = user);
    }
};
</script>