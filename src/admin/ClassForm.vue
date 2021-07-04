<template>
  <div class="row user-form">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <h3>{{ classes.id ? "Update class" : "New class" }}</h3>
        </div>
        <div class="card-body">
          <ValidationObserver ref="form" v-slot="{ passes }">
            <form
              @submit.prevent="passes(classes.id ? updateUser : createUser)"
              class="form"
            >
              <div class="row">
                <div class="col">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors }"
                    name="Class name"
                  >
                    <div class="form-group required user_name">
                      <label for="user_name" class="required">Class Name </label>
                      <input
                        class="form-control"
                        type="text"
                        name="user_name"
                        v-model="classes.name"
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
                    name="Description"
                  >
                    <div class="form-group required user_name">
                      <label for="user_name" class="required"> Description </label>
                      <input
                        class="form-control"
                        type="text"
                        name="user_name"
                        v-model="classes.description"
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
                {{ classes.id ? "Update" : "Create" }}
              </button>
              <router-link to="/classes" type="button" class="btn btn-secondary">
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
import { authenticationService, userService, subjectService, classService } from '@/_services';
import Multiselect from 'vue-multiselect';
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
    ValidationProvider,
    Multiselect
  },
  data() {
    return {
      classes:{
            name: "",
            description: "",
          }
    };
  },
  methods: {
    createUser() {
        const data = this.classes;
        classService.create(data).then(classes => {
            this.$router.push({path: '/classes'});
        })
       
    },
    limitText (count) {
      return `and ${count} other countries`
    },
    updateUser() {
        const data = this.classes;
        classService.update(data).then(() => {
            this.$router.push({path: '/classes'});
        })
    },
    init(){
        classService.getById(this.id).then(classes => {
            if(classes){
                this.classes = classes[0]
            }
        });
    }
  },
  created(){
    if(this.id){
      console.log(this.id)
      this.init();
    }
  }
};
</script>
