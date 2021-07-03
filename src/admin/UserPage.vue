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
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th colspan="2"></th>
                </thead>
                <tbody v-if="users">
                  <tr
                    class="user-item"
                    v-for="(user, index) in users"
                    :key="`user-${index}`"
                    @click="userClick(user, $event)"
                  >
                    <td>{{ user.id }}</td>
                    <td>{{ user.firstName }}</td>
                    <td>{{ user.lastName }}</td>
                    <td class="edit-user">Edit</td>
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
  
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">User Information</h3>
      <div slot="body" class="info-body">
        <span>First Name:</span> {{ selectedUser.firstName }}
        <br />
        <span>Last Name:</span> {{ selectedUser.lastName }}
      </div>
      <div slot="footer">
        <button class="modal-default-button btn-delete" @click="editUser">
          Edit
        </button>
        <button
          class="modal-default-button btn-cancel"
          @click="showModal = false"
        >
          Cancel
        </button>
      </div>
    </modal>
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
            showModal: false,
            selectedUser: null
        };
    },
    components: {
        model
    },
    methods: {
         userClick: function(user, e) {
            e.srcElement.className === "edit-user"
                ? this.goToPage(`users/${user.id}/edit`)
                : this.showUserInfo(user);
        },
        showUserInfo: function(user) {
            this.selectedUser = user;
            this.showModal = true;
        },
        editUser: function() {
            this.goToPage(`users/${this.selectedUser.id}/edit`);
        }
    },
    created () {
        userService.getAll().then(users => this.users = users);
    }
};
</script>