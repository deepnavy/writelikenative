<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
      <h1 class="text-3xl font-semibold mb-6">Native Speaker Editor</h1>
      <div class="mb-4">
        <label for="yourText" class="block text-gray-700 mb-2">Your text:</label>
        <textarea id="yourText" v-model="inputText" class="resize-none w-full h-32 p-2 border rounded-md"></textarea>
      </div>
      <!-- Add this below the 'Your text' input textarea -->
      <div class="mb-4 flex">
        <div class="flex items-center mr-4">
          <input type="radio" id="correct" value="correct" v-model="selectedPrompt" class="mr-2">
          <label for="correct" class="text-gray-700">Correct</label>
        </div>
        <div class="flex items-center mr-4">
          <input type="radio" id="teammate" value="teammate" v-model="selectedPrompt" class="mr-2">
          <label for="teammate" class="text-gray-700">Teammate</label>
        </div>
        <div class="flex items-center">
          <input type="radio" id="blog" value="blog" v-model="selectedPrompt" class="mr-2">
          <label for="blog" class="text-gray-700">Blog</label>
        </div>
      </div>
      <button
        @click="improveText"
        :disabled="loading || isInputEmpty"
        :class="{ 'disabled:opacity-50': loading || isInputEmpty }"
        class="w-full bg-blue-600 text-white py-2 rounded-md mb-4 inline-flex items-center justify-center h-12"
      >
        <span v-if="!loading">Improve</span>
        <span v-else>
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      </button>
      <div>
        <label for="result" class="block text-gray-700 mb-2">Result:</label>
        <textarea id="result" v-model="outputText" readonly class="resize-none w-full h-32 p-2 border rounded-md bg-gray-100"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import openai from "./openai";

const VUE_APP_OPENAI_API_KEY = import.meta.env.VUE_APP_OPENAI_API_KEY



export default {
  data() {
    return {
      inputText: "",
      outputText: "",
      selectedPrompt: "correct",
      loading: false,
    };
  },
  computed: {
    isInputEmpty() {
      return this.inputText.trim().length === 0;
    },
  },
  methods: {
    async improveText() {

      this.loading = true;

      const prompts = {
        correct: "I want you to act as a spelling corrector and grammar improver. I will send you a word, sentence, or paragraph, and you’ll send me the result. Reply only with the improved text and nothing else, do not write explanations.",
        teammate: "I want you to act as an editor, spelling corrector, and grammar improver. I’m writing a message to my teammate in a messaging app or email. I want to sound like a native speaker but keep it simple, natural, and conversational. I will send you a sentence or paragraph, and you’ll send me the result. Reply only with the improved text and nothing else, do not write explanations.",
        blog: "I want you to act as an editor, spelling corrector, and grammar improver. I’m writing a blog post for Substack or an article for Medium. I want to sound more like a native speaker but keep it simple and avoid words and phrases that may sound too pretentious. I will send you a sentence or paragraph, and you’ll send me the result. Reply only with the improved text and nothing else, do not write explanations.",
      };

      const messages = [
        { role: "system", content: prompts[this.selectedPrompt] },
        { role: "user", content: this.inputText },
      ];

      try {
        const response = await openai.post("", {
          model: 'gpt-3.5-turbo',
          messages: messages,
        });

        this.outputText = response.data.choices[0].message.content.trim();
      } catch (error) {
        console.error(error);
        this.outputText = "Error: Unable to fetch results";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

