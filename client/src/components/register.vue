<template>
  <b-col>
    <b-form @submit.prevent="onSubmit" v-if="show">
      <b-row style="height:100vh">
        <b-col>
          <h1 style="font-family: Nosifer">ESCAPE ROOMMM</h1><br>   
          <b-form-group id="input-group-1" label-for="input-1">
            <img src="https://media2.giphy.com/media/4f4K0enrytXqM/source.gif" style="max-width: 350px; border-radius: 10px">
            <b-form-input
              id="input-1"
              v-model="form.name"
              required
              placeholder="Enter your name"
              style="width: 350px; margin: 10px auto; font-family: Butcherman"
            ></b-form-input>
            <b-button type="submit">Submit</b-button>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </b-col>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'register',
  data () {
    return {
      form: {
        name: '',
      },
      show: true
    }
  },
  methods: {
    onSubmit () {
      this.$store.commit('register', this.form.name);
      this.form.name = '';
      this.$router.push('/rooms');
    }
  }
}
</script>