<template>
  <div v-if="!isLoading" class="row" :class="layout">
    <div class="col-3"></div>
    <!-- introduction -->
    <div v-if="isIntro && !isEscaped" class="col-6" >
      <h1>
        <u>introduction</u>
      </h1>
      <marquee behavior="scroll" direction="up" scrollamount="2">
        <p style="font-size:26px; text-align:justify; color:white">
          We always greeted our guests at doors. Showing them where they can put their cloaks and than we guided them to lobby.
          After they took seats we had introduction:
          “We have prepared for you room full of puzzles. Those puzzles are scattered all around the room so look everywhere. Look for something that connects different items.
          We will start with role introduction. You will put eye masks, than I will take all of you into room. There will be thirty, forty seconds introduction after which you will take off masks and start playing.
          We have cameras installed in room, therefore if you will be stuck at puzzle more then 10 minutes we will give you a hint. This is our thumb rule because after 10 minutes in rooms like this suddenly everything becomes puzzle. Some teams starts to rip off floor or disassemble walls.
          You don’t have to move or change place of big furniture. For sure behind and under them there will not be any puzzle.
          All elements marked with red-white sticker are out of game, it’s speakers or electric plugs.
          Now, let me show you how rotary pad lock works…”
          
        </p>  
      </marquee>
      <button class="btn btn-dark" @click="goToGame">LET'S PLAY !</button>
    </div>
    <!-- game play interface -->
    <div
      v-if="!isIntro && !isEscaped"
      class="col-6"
      style="display: flex; flex-direction: column; align-content: center;"
    >
      <h1 style="margin-bottom: 10%; align-text: justify;">{{allQuestions[index].question}}</h1>
      <div class="quest">
        <button
          @click="chosen(allQuestions[index], i)"
          v-for="(answer, i) in allQuestions[index].answer._v"
          :key="i"
          type="button"
          :id="`${i}-${index}`"
          class="btn btn-warning"
          :style="green"
        >{{answer}}</button>
      </div>
    </div>
    <div v-if="isEscaped" class="col-6" :class="layout"></div>
    <div class="col-3"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapState } from "vuex";
import { setTimeout } from "timers";
export default {
  name: "Games",
  data: () => {
    return {
      green: "",
      isLoading: true,
      index: 0,
      pick: "",
      isIntro: true,
      layout: "escapeIntro",
      isEscaped: false
    };
  },
  components: {
    HelloWorld
  },
  computed: {
    ...mapState(["allQuestions"])
  },
  created() {
    this.$store
      .dispatch("getQuestions")
      .then(() => {
        console.log("got questions");
        this.isLoading = false;
      })
      .catch(err => {
        console.log("err: ", err);
      });
  },
  methods: {
    goToGame(){
      this.isIntro = false
      this.layout = "escape0"
    },
    chosen(data, i) {
      let pos = data.answer._v.indexOf(data.correct_answer);
      if (data.correct_answer === data.answer._v[i]) {
        console.log("bener");
        if (this.index < this.allQuestions.length - 2) {
          this.index++;
          this.layout = `escape${this.index}`
        } else {
          this.layout = `escaped`
          this.isEscaped = true 
          this.$swal({
            title: 'Congrats !',
            type: 'success',
            text: "you've been escaped"
          })
          
        }
      } else {
        console.log("salah");
        // document.getElementById(`${pos}-${this.index}`).style.backgroundColor = 'lightgreen'
        // setTimeout(() => {
        //   document.getElementById(`${pos}-${this.index}`).style.backgroundColor = ''
        //   this.index++
        // }, 500)
      }
    }
  }
};
</script>

<style>

.escapeIntro{
  background-image: url('../assets/escape.jpg');
  background-size: cover;
}
.escape0{
  background-image: url('../assets/escape-0.jpg');
  background-size: cover;
}
.escape1{
  background-image: url('../assets/escape-1.jpg');
  background-size: cover;
  background-position-y: -200px;
}
.escape2{
  background-image: url('../assets/escape-2.jpg');
  background-size: cover;
}
.escape3{
  background-image: url('../assets/escape-3.png');
  background-size: cover;
}
.escape4{
  background-image: url('../assets/escape-4.jpg');
  background-size: cover;  
}
.escaped{
  background-image: url('../assets/escaped.jpg');
  background-size: cover;  
}
.quest {
  /* background-color: black; */
  display: flex;
  flex-direction: column;

}
.quest button {
  margin: 5px;
  padding: 15px;
  background-color: rgba(245, 236, 236, 0.5);
}
.row {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* background-color: pink; */
}
.col-6 h1 {
  padding: 10px;
  background-color: rgba(245, 236, 236, 0.719);
}
</style>
