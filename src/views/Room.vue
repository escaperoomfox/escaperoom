<template>
  <div class="mt-5" style="height:100vh;">
    <div>
      <h4 style="font-family: Nosifer">Dare to join?</h4>
      <p><strong>{{playerId}}</strong></p>
      <div>
        <img
          src="https://media0.giphy.com/media/26ufaecf1f8TCqGty/giphy.gif" style="max-width: 350px; border-radius: 10px"
        >
      </div>
    </div>
    <div >
      <b-form-input v-model="roomName" placeholder="Room name. . ." style="margin: 10px auto; width: 350px; font-family: Butcherman"></b-form-input>
      <b-button @click="createRoom">Create room</b-button>
    </div>
    <div style="height:100vh; background-color:#00000">
      <div class="container">
        <div class="row">
          <Room v-for="(room,index) in rooms" :room="room" :available="available" class="col-sm-4 my-2" :key="index"></Room>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase.js'
import Room from '@/components/roomCard.vue'
export default {
  name: 'RoomPage',
  data () {
    return {
      rooms: [],
      playerId: '',
      playerName: '',
      available: null,
      roomName: ''
    }
  },
  components: { Room },
  methods: {
    createRoom () {
      db.collection('rooms').add({
        title: this.roomName,
        players: {
          [this.playerId]: {
            playerId: this.playerId,
            name: this.playerName,
            alive: true
          }
        },
        creator: this.playerId,
        status: 'pending'
      })
      this.roomName = ''
    }
  },
  created () {
    this.playerId = localStorage.getItem('playerId')
    this.playerName = localStorage.getItem('name')
    // this.bgsong.play()
    // let audio = new Audio(song)
    // console.log(audio)
    // audio.play()
    if (!localStorage.getItem('playerId')) {
      this.$router.push(`/`)
    }
    db.collection('rooms').onSnapshot(querySnapshot => {
      this.rooms = []
      querySnapshot.forEach(doc => {
        let data = doc.data()
        data.id = doc.id

        if (data.players[this.playerId]) {
          this.available = false
        } else {
          this.available = true
        }

        if (data.status === 'playing') {
          for (let i = 0; i < Object.keys(data.players).length; i++) {
            if (data.players[Object.keys(data.players)[i]].playerId === this.playerId) {
              this.$router.push(`/games/${data.id}`)
            }
          }
          console.log(data.players[this.playerThis], 'playing')
        }
        console.log(data)
        this.rooms.push(data)
      })
    })

    console.log(this.rooms)
  }
}
</script>
