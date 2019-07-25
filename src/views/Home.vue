<template>
  <div v-if="!isLoading" class="row">
    <div class="col-3"></div>
    <div class="col-6" style="display: flex; flex-direction: column; align-content: center;">
        <h1 style="margin-bottom: 10%; align-text: justify;">{{allQuestions[index].question}}</h1>
        <div class="quest">
          <button @click="chosen(allQuestions[index], i)" v-for="(answer, i) in allQuestions[index].answer._v" :key="i" type="button" :id="`${i}-${index}`" class="btn btn-warning" :style="green">
            {{answer}}
          </button>
        </div>
    </div>
    <div class="col-3"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from 'vuex'
import { setTimeout } from 'timers'
export default {
  name: 'home',
  data: () => {
    return {
      green: '',
      isLoading: true,
      index: 0,
      pick: ''
    }
  },
  components: {
    HelloWorld
  },
  computed: {
    ...mapState(['allQuestions'])
  },
  created () {
    this.$store
      .dispatch('getQuestions')
      .then(() => {
        console.log('got questions')
        this.isLoading = false
      })
      .catch(err => {
        console.log('err: ', err)
      })
  },
  methods: {
    chosen (data, i) {
      let pos = data.answer._v.indexOf(data.correct_answer)
      if (data.correct_answer === data.answer._v[i]) {
        console.log('bener')
        if (this.index < this.allQuestions.length - 2) {
          this.index++
        } else {
          alert("you've been passed")
        }
      } else {
        console.log('salah')
        document.getElementById(`${pos}-${this.index}`).style.backgroundColor = 'lightgreen'
        setTimeout(() => {
          document.getElementById(`${pos}-${this.index}`).style.backgroundColor = ''
          this.index++
        }, 500)
      }
    }
  }
}
</script>

<style>
.quest{
  /* background-color: black; */
  display: flex;
  flex-direction: column;
}
.quest button{
  margin:5px;
  padding:15px;
  background-color: rgba(245, 236, 236, 0.719);
}
.row {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* background-color: pink; */
}
.col-6 h1 {
  padding:10px;
  background-color: rgba(245, 236, 236, 0.719);
}
</style>
