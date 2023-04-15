
<template>
  <div>
    <form @submit.prevent="generateText">
      <label>
        Enter text:
        <input v-model="userText" type="text">
      </label>
      <button type="submit">Generate</button>
    </form>
    <p v-if="generatedText">{{ generatedText }}</p>
  </div>
</template>

<script>
import axios from 'axios'

const API_KEY = 'PnmFFyqANTlfhi9qIH4LT3BlbkFJaypne1yLy5v3slCgyCKX'

export default {
  data() {
    return {
      userText: '',
      generatedText: ''
    }
  },
  methods: {
    async generateText() {
      const response = await axios.post('https://api.openai.com/v1/engine/davinci-codex/completions', {
        prompt: `Make me sound like a native: ${this.userText}`,
        max_tokens: 1024,
        n: 1
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      })
      this.generatedText = response.data.choices[0].text.trim()
    }
  }
}
</script>
