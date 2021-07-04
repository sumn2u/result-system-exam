<template>
  <div class="row user-form">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <h3>{{ subject.id ? "Update subject" : "New subject" }}</h3>
        </div>
        <div class="card-body">
          <ValidationObserver ref="form" v-slot="{ passes }">
            <form
              @submit.prevent="passes(subject.id ? updateUser : createUser)"
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
                      <label for="user_name" class="required">Subject Name </label>
                      <input
                        class="form-control"
                        type="text"
                        name="user_name"
                        v-model="subject.name"
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
                        v-model="subject.description"
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

                  <div>
                    <label class="typo__label" for="ajax">Select Teacher</label>
                    <multiselect v-model="selectedTeacher" id="ajax" label="username" track-by="username" placeholder="Type to search" open-direction="bottom" :options="subjects" :multiple="false" :searchable="true" :loading="isLoading" :internal-search="false" :clear-on-select="false" :close-on-select="false" :options-limit="300" :limit="3" :limit-text="limitText" :max-height="600" :show-no-results="false" :hide-selected="true" @search-change="asyncTeacherFind">
                      <template slot="tag" slot-scope="{ option, remove }"><span class="custom__tag"><span>{{ option.username }}</span><span class="custom__remove" @click="remove(option)">❌</span></span></template>
                      <template slot="clear" slot-scope="props">
                        <div class="multiselect__clear" v-if="selectedTeacher.length" @mousedown.prevent.stop="clearSelectedTeacher(props.search)"></div>
                      </template><span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
                    </multiselect>
                    <br/>
                    
                  </div>
                  <div>
                  <label class="typo__label" for="ajax">Select Class</label>
                  <multiselect v-model="selectedClass" id="ajax" label="name" track-by="name" placeholder="Type to search" open-direction="bottom" :options="classes" :multiple="false" :searchable="true" :loading="isLoading" :internal-search="false" :clear-on-select="false" :close-on-select="false" :options-limit="300" :limit="3" :limit-text="limitText" :max-height="600" :show-no-results="false" :hide-selected="true" @search-change="asyncFind">
                    <template slot="tag" slot-scope="{ option, remove }"><span class="custom__tag"><span>{{ option.name }}</span><span class="custom__remove" @click="remove(option)">❌</span></span></template>
                    <template slot="clear" slot-scope="props">
                      <div class="multiselect__clear" v-if="selectedClass.length" @mousedown.prevent.stop="clearAll(props.search)"></div>
                    </template><span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
                  </multiselect>
                  <br/>
                  
                </div>
                </div>
              </div>

              <button type="submit" name="commit" class="btn btn-primary">
                {{ subject.id ? "Update" : "Create" }}
              </button>
              <router-link to="/subjects" type="button" class="btn btn-secondary">
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
import { authenticationService, userService, subjectService, classService, teacherService} from '@/_services';
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
      subject:{
            name: "",
            description: "",
            teacher: "",
            classval: "",
            archived: false
          },
        selectedTeacher: [],
        subjects: [],
        selectedClass: [],
        classes: [],
        isLoading: false,
        isClassLoading: false
    };
  },
  methods: {
    createUser() {
        const data = this.subject;
        data.classval = this.selectedClass.id;
        data.teacher = this.selectedTeacher.id;
        subjectService.create(data).then(classes => {
            this.$router.push({path: '/subjects'});
        })
       
    },
    limitText (count) {
      return `and ${count} other countries`
    },
    clearAll () {
      this.selectedClass = []
    },
    asyncFind (query) {
      this.isClassLoading = true
      classService.getAll().then(response => {
        this.classes = response;
        this.isClassLoading = false
      })
    },
    asyncTeacherFind(query) {
      this.isLoading = true
      teacherService.getAll().then(response => {
        this.subjects = response
        this.isLoading = false
      })
    },
    clearSelectedTeacher () {
      this.selectedTeacher = []
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
