<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <h5 style="color: red">Solve the puzzle together here!</h5>
        <chatroom />
      </div>
      <div class="col-md-9">
        play
      </div>
    </div>
  </div>
</template>

<script>
import chatroom from '@/components/chatroom.vue'
export default {
  components: {
    chatroom
  }
}
</script>

<style>

</style>
