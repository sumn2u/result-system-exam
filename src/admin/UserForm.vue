<template>
  <div class="row user-form">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <h3>{{ user.id ? "Update user" : "New user" }}</h3>
        </div>
        <div class="card-body">
          <ValidationObserver ref="form" v-slot="{ passes }">
            <form
              @submit.prevent="passes(user.id ? updateUser : createUser)"
              class="form"
            >
              <div class="row">
                <div class="col">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors }"
                    name="User name"
                  >
                    <div class="form-group required user_name">
                      <label for="user_name" class="required">Username </label>
                      <input
                        class="form-control"
                        type="text"
                        name="user_name"
                        v-model="user.username"
                      />
                    </div>
                    <div
                      class="validation-text mb-3"
                      v-for="(error, index) in errors"
                      :key="`category-error-${index}`"
                    >
                      <span>{{ error }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors }"
                    name="Forename"
                  >
                    <div class="form-group required user_name">
                      <label for="user_name" class="required"> Forename </label>
                      <input
                        class="form-control"
                        type="text"
                        name="user_name"
                        v-model="user.forname"
                      />
                    </div>
                    <div
                      class="validation-text mb-3"
                      v-for="(error, index) in errors"
                      :key="`category-error-${index}`"
                    >
                      <span>{{ error }}</span>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors }"
                    name="Surname"
                  >
                    <div class="form-group required user_name">
                      <label for="user_name" class="required"> Surname </label>
                      <input
                        class="form-control"
                        type="text"
                        name="user_name"
                        v-model="user.lastname"
                      />
                    </div>
                    <div
                      class="validation-text mb-3"
                      v-for="(error, index) in errors"
                      :key="`category-error-${index}`"
                    >
                      <span>{{ error }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors }"
                    name="Password"
                  >
                    <div class="form-group required user_name">
                      <label for="user_name" class="required">Password </label>
                      <input
                        class="form-control"
                        type="password"
                        name="user_name"
                        v-model="user.password"
                      />
                    </div>
                    <div
                      class="validation-text mb-3"
                      v-for="(error, index) in errors"
                      :key="`category-error-${index}`"
                    >
                      <span>{{ error }}</span>
                    </div>
                  </ValidationProvider>

                  <div class="form-group required user_role">
                    <label for="user_role" class="required"
                      >Role <abbr title="required">*</abbr></label
                    >
                    <br />
                    <input
                      type="radio"
                      id="Admin"
                      value="1"
                      v-model="user.usertype"
                    />
                    <label for="Admin">Admin</label>
                    <br />
                    <input
                      type="radio"
                      id="Teacher"
                      value="2"
                      v-model="user.usertype"
                    />
                    <label for="Teacher">Teacher</label>
                    <br />
                    <input
                      type="radio"
                      id="Pupil"
                      value="3"
                      v-model="user.usertype"
                    />
                    <label for="Pupil">Pupil</label>
                    <br />
                  </div>
                </div>
              </div>

              <button type="submit" name="commit" class="btn btn-primary">
                {{ user.id ? "Update" : "Create" }}
              </button>
              <router-link to="/users" type="button" class="btn btn-secondary">
                Cancel
              </router-link>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vee-validate/dist/rules";
import { authenticationService, userService } from '@/_services';
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
extend("email", email);
extend("required", {
  ...required,
  message: "{_field_} is required"
});

export default {
  props:{
    id: {
      type: String
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      user:{
            forname: "",
            lastname: "",
            username:"",
            password:"",
            usertype: 1
          },
      alerts: []
    };
  },
  methods: {
    createUser() {
        const data = this.user;
        userService.create(data).then(user => {
            this.$router.push({path: '/users'});
        })
       
    },
    updateUser() {
        const data = this.user;
        userService.update(data).then(user => {
            this.$router.push({path: '/users'});
        })
    },
    addAlert: function(kind, message) {
        this.alerts.push({ kind: kind, message: message });
    },
    init(){
        userService.getById(this.id).then(user => {
            if(user){
                this.user = user[0]
            }
        });
    }
  },
  created(){
    if(this.id){
      this.init();
    }
  }
};
</script>