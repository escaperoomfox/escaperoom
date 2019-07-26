<template>
  <div>
    <div class="container bg-dark" id="pesan">
      <b-list-group  id="newchat" style="position:relative; height:300px; overflow-y:scroll;">
        <b-list-group-item class="bg-dark" v-for="(message, index) in messages" :key="index" >
          <span id='playername'>{{message.name}}  </span><br>
          <span id="textchat">{{message.text}}</span>
        </b-list-group-item>
      </b-list-group>
      <form @submit.prevent="sendMsg" class="d-flex input">
        <b-form-input v-model="msg" placeholder="say something" class="bg-transparent mr-1" style="color:white"></b-form-input>
        <b-button type="submit" variant="danger">send</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import db from '@/firebase.js'

export default {
  data () {
    return {
      msg: '',
      messages: [],
      tempMessage: []
    }
  },
  computed: {

  },
  methods: {
    sendMsg () {
      console.log(this.msg)

      let data = {
        name: localStorage.getItem('name') || 'viuty',
        text: this.msg,
        createdAt: new Date()
      }
      this.messages.push(data)
      db.collection('rooms').doc(this.$route.params.id)
        .update({ messages: this.messages })
        .then((doc) => {
          console.log('create', doc)
          let objDiv = document.getElementById('newchat')
          objDiv.scrollTop = objDiv.scrollHeight
        })
        .catch((err) => {
          console.log(err)
        })
      this.msg = ''
    }
  },
  created () {
    db.collection('rooms').doc(this.$route.params.id)
      .onSnapshot(querySnapshot => {
        let messages = []
        messages.push(querySnapshot.data().messages)
        messages.forEach(data => {
          this.messages = data
        })
        console.log(this.messages)
        // this.messages = messages
      })
  }
}
</script>

<style>
#pesan{
    /* width: 25rem; */
    text-align: left;
}
#playername{
  color: rgb(235, 76, 76);
}
#textchat{
  color: white;
}
.input{
  margin-top: 0%;
}

</style>
