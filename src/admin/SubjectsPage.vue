<template>
    <div class="m-5">
    <div class="row">
      <div class="col-9">
        <h2>Classes</h2>
      </div>
      <div class="col-3 text-right">
        <router-link to="/subjects/new"  class="btn btn-primary"
          ><i class="fa fa-plus-circle"></i> New Subject</router-link
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
                  <th>Name</th>
                  <th>Description</th>
                  <th>Teacher</th>
                  <th>Archived</th>
                  <th colspan="2"></th>
                </thead>
                <tbody v-if="classes">
                  <tr
                    class="user-item"
                    v-for="(cls, index) in classes"
                    :key="`user-${index}`"
                  >
                    <td>{{ cls.id }}</td>
                    <td>{{ cls.name }}</td>
                    <td>{{ cls.description }}</td>
                    <td>{{ cls.teacher }}</td>
                    <td>{{ cls.archived ? 'Archieved' : 'Active'}}</td>
                    <td class="edit-user"><span @click="editClass(cls.id)"> Edit </span> |  <span class="text-danger" @click="deleteClass(cls.id)">  Delete</span></td>
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
import { authenticationService, subjectService } from '@/_services';
export default {
    data () {
        return {
            user: authenticationService.currentUserValue,
            classes: [],
        };
    },
    methods: {
        deleteClass: function(id){
          subjectService.deleteById(id).then(user => {
            this.classes = this.classes.filter(cls => cls.id != id);
          })
        },
        editClass: function(id) {
          this.$router.push({path: `/classes/${id}`});
        },
    },
    created () {
        subjectService.getAll().then(classes => this.classes = classes);
    }
};
</script>