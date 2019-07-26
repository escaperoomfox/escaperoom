import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import db from './firebase.js'
import firebase from 'firebase'
import route from './router.js'

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
      return array
    },
    getQuestions (context, payload) {
      console.log(payload, 'params')
      return new Promise((resolve, reject) => {
        axios({
          url: 'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple&encode=url3986&difficulty=easy'
        })
          .then(({ data }) => {
            let listQuestions = []
            data.results.forEach(el => {
              el.incorrect_answers.push(el.correct_answer)
              console.log(el.incorrect_answers)
              let answers = context.dispatch('shuffle', el.incorrect_answers)
              let arrAnswer = []
              el.incorrect_answers.forEach( (answer) => {
                arrAnswer.push(answer._v)
              })
              listQuestions.push({
                question: decodeURIComponent(el.question),
                answer: el.incorrect_answers,
                correct_answer: decodeURIComponent(el.correct_answer)
              })
            })
            console.log(listQuestions)

            return db.collection('rooms').doc(payload).update({
              questions: JSON.stringify(listQuestions)
            })
              // .then(doc => {
              //   console.log(doc.data(), '====')
              // })
            // return db.collection('rooms').doc(payload).update({questions: array})
          })
          .then( (response) => {
            console.log(response, 'dapet response')
            db.collection('rooms').doc(payload).onSnapshot( (querySnapshot) => {
              console.log('query snapshot')
              console.log(JSON.parse(querySnapshot.data().questions))
              context.commit('FILL_QUESTIONS', JSON.parse(querySnapshot.data().questions))
              resolve(true)
            })
            // context.commit('FILL_QUESTIONS', array)
          })
          .catch(err => {
            console.log('err: ', err)
            reject(false)
          })
      })
    }
  }
})
