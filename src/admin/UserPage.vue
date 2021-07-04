<template>
    <div class="m-5">
    <div class="row">
      <div class="col-9">
        <h2>Users</h2>
      </div>
      <div class="col-3 text-right">
        <router-link to="/users/new"  class="btn btn-primary"
          ><i class="fa fa-plus-circle"></i> New User</router-link
        >
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card-body">
          <div class="row">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <th>Id</th>
                  <th>User Name</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Role</th>
                  <th colspan="2"></th>
                </thead>
                <tbody v-if="users">
                  <tr
                    class="user-item"
                    v-for="(user, index) in users"
                    :key="`user-${index}`"
                  >
                    <td>{{ user.id }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.forname }}</td>
                    <td>{{ user.lastname }}</td>
                    <td>{{ getUserType(user.usertype) }}</td>
                    <td class="edit-user"><span @click="editUser(user.id)"> Edit </span> |  <span class="text-danger" @click="deleteUser(user.id)">  Delete</span></td>
                  </tr>
                </tbody>
                <tbody v-else class="no-data-container">
                  <div class="no-data">No data</div>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authenticationService, userService } from '@/_services';
import  model from "../common/Modal.vue";
export default {
    data () {
        return {
            user: authenticationService.currentUserValue,
            users: [],
            selectedUser: null
        };
    },
    components: {
        model
    },
    methods: {
        showUserInfo: function(user) {
            this.selectedUser = user;
        },
        deleteUser: function(id){
          userService.deleteById(id).then(user => {
            this.users = this.users.filter(user => user.id != id);
          })
        },
        editUser: function(id) {
          this.$router.push({path: `/users/${id}`});
        },
        getUserType: function(type){
          let role = 'Admin';
          if(type === 2){
            role = 'Teacher'
          }else if(type === 3){
            role = 'Pupil'
          }
          return role;
        }
    },
    created () {
        userService.getAll().then(users => this.users = users);
    }
};
</script>