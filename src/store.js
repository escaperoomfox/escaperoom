import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allQuestions: []
  },
  mutations: {
    getUser (state, payload) {
      state.name = localStorage.getItem('name')
      state.playerId = localStorage.getItem('playerId')
    },
    register (state, payload) {
      console.log('test')
      state.name = payload
      state.playerId = state.name + String(Math.floor(Math.random() * 100000))
      localStorage.setItem('name', state.name)
      localStorage.setItem('playerId', state.playerId)
    },
    FILL_QUESTIONS (state, payload) {
      state.allQuestions = payload
    }
  },
  actions: {
    shuffle (context, array) {
      var currentIndex = array.length; var temporaryValue; var randomIndex
      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = decodeURIComponent(array[randomIndex])
        array[randomIndex] = decodeURIComponent(temporaryValue)
      }
      console.log(array, '=====================')
      return array
    },
    getQuestions (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: 'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple&encode=url3986&difficulty=easy'
        })
          .then(({ data }) => {
            console.log('data: ', data)
            let array = []
            data.results.forEach(el => {
              el.incorrect_answers.push(el.correct_answer)
              console.log('el.incorrect_answers before: ', el.incorrect_answers)
              let answers = context.dispatch('shuffle', el.incorrect_answers)
              array.push({
                question: decodeURIComponent(el.question),
                answer: answers,
                correct_answer: decodeURIComponent(el.correct_answer)
              })
              console.log('el.incorrect_answers after: ', array)
            })
            context.commit('FILL_QUESTIONS', array)
            resolve(true)
          })
          .catch(err => {
            console.log('err: ', err)
            reject(false)
          })
      })
    }
  }
})
