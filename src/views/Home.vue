<template>
  <div class="home" >
    <b-container>
      <b-row class="justify-content-center">
        <register/>
      </b-row>
    </b-container>
  </div>
</template>

<style scoped>
  div .home {
    background: white;
  }
</style>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import draggable from 'vuedraggable';
import register from '@/components/register.vue'
export default {
  name: 'home',
  components: {
    register
  },
  created () {
    if (localStorage.getItem('name') && localStorage.getItem('playerId')) {
      this.$router.push('/rooms')
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

