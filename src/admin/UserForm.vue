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
              @submit.prevent="
                passes(user.id ? updateUser : createUser)
              "
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
                      <label for="user_name" class="required">Name </label>
                      <input
                        class="form-control"
                        type="text"
                        name="user_name"
                        v-model="user.forename"
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
                    rules="required|email"
                    v-slot="{ errors }"
                    name="User email"
                  >
                    <div class="form-group required user_email">
                      <label for="user_email" class="required"
                        >Email <abbr title="required">*</abbr></label
                      >
                      <input
                        class="form-control"
                        type="text"
                        name="user_email"
                        v-model="user.email"
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
                </div>
              </div>

              <button type="submit" name="commit" class="btn btn-primary">
                {{ user.id ? "Update" : "Create" }}
              </button>
              <router-link to="/users"
                type="button"
                class="btn btn-secondary"
              >
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
            forename: "",
            surname: "",
            username:"",
            password:"",
            role: null
          },
      alerts: []
    };
  },
  methods: {
    createUser() {
    //   let that = this;
    //   const { name , email } = this.user;
    //   const body = {
    //     user: {
    //       name,
    //       email
    //     }
    //   };
    //   const api = new Api(`/admin/users.json`);
    //   api
    //     .post(body)
    //     .then(() => {
    //       this.$router.push({path: '/admin/users'});
    //     })
    //     .catch(error => {
    //       if (error.response.status == 422) {
    //         const { errors } = error.response.data;
    //         errors.map(error => {
    //           that.addAlert("danger", `${error.id} ${error.title}`);
    //         });
    //       } else {
    //         that.addAlert("danger", "Server error");
    //       }
    //     });
    },
    updateUser() {
    //   let that = this;
    //   const { name , email } = this.user;
    //   const body = {
    //     user: {
    //       name,
    //       email
    //     }
    //   };
    //   const api = new Api(`/admin/users/`);
    //   api
    //     .update(this.user.id, body)
    //     .then(() => {
    //       this.$router.push({path: '/admin/users'});
    //     })
    //     .catch(error => {
    //       if (error.response.status == 422) {
    //         const { errors } = error.response.data;
    //         errors.map(error => {
    //           that.addAlert("danger", `${error.id} ${error.title}`);
    //         });
    //       } else {
    //         that.addAlert("danger", "Server error");
    //       }
    //     });
    },
    addAlert: function(kind, message) {
      this.alerts.push({ kind: kind, message: message });
    },
    init(){
      fetch(`/admin/users/${this.id}.json`).then((response) => {
        response.json().then((json) => {
          this.user = json;
        });
      });
    }
  },
  created(){
    if(this.id){
    //   this.init();
    }
  }
};
</script>