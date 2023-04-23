<template>
  <div class="min-h-screen bg-gray-100">
    <header class="flex items-center justify-between px-4 py-2 bg-gray-100">
      <h1 class="text-xl font-semibold">Your App Title</h1>
      <button
        @click="showModal = true"
        :class="{
          'bg-green-600': hasApiKey && !isInvalidApiKey,
          'bg-blue-600': !hasApiKey || isInvalidApiKey,
          'text-white': true,
          'px-4': true,
          'py-2': true,
          'rounded-md': true
        }"
      >
        <template v-if="hasApiKey && !isInvalidApiKey">
          <svg
            class="inline-block h-4 w-4 mr-2 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          OpenAI API Key added
        </template>
        <template v-else>Add OpenAI API Key</template>
      </button>
    </header>
    <div class="container mx-auto px-4">
      <div
        v-if="showModal"
        class="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
            @click="showModal = false"
          ></div>
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Enter your OpenAI API Key
                </h3>
                <div class="mt-2">
                  <input
                    v-model="userAPIKey"
                    type="text"
                    class="border w-full p-2 mt-2 rounded-md"
                    placeholder="Enter your API key here"
                  />
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                @click="saveAPIKey"
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save
              </button>
              <button
                @click="showModal = false"
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full mt-8">
        <div class="text-center mb-4">
          <label for="inputText" class="block">I want to write:</label>
        </div>
        <div class="w-full flex justify-center mb-4">
          <button
            @click="selectedPrompt = 'correct'"
            :class="{ 'bg-blue-600 text-white': selectedPrompt === 'correct', 'bg-gray-200 text-gray-800': selectedPrompt !== 'correct' }"
            class="px-4 py-2 rounded-l-md"
          >
            Correct
          </button>
          <button
            @click="selectedPrompt = 'teammate'"
            :class="{ 'bg-blue-600 text-white': selectedPrompt === 'teammate', 'bg-gray-200 text-gray-800': selectedPrompt !== 'teammate' }"
            class="px-4 py-2 border-l border-r"
          >
            Teammate
          </button>
          <button
            @click="selectedPrompt = 'blog'"
            :class="{ 'bg-blue-600 text-white': selectedPrompt === 'blog', 'bg-gray-200 text-gray-800': selectedPrompt !== 'blog' }"
            class="px-4 py-2 rounded-r-md"
          >
            Blog
          </button>
        </div>
        <div class="w-full flex">
          <div class="w-1/2">
            <div class="relative">
              <textarea
                ref="inputTextArea"
                id="inputText"
                v-model="inputText"
                class="w-full p-2 border resize-none min-h-[300px]"
                placeholder="Enter text"
                @input="adjustTextAreaHeight"
              ></textarea>
              <button
                @click="clearText"
                v-show="inputText.length > 0"
                class="absolute top-2 right-2 bg-white text-gray-500 rounded-full w-6 h-6 flex items-center justify-center"
              >
                &times;
              </button>
              <button
                @click="improveText"
                :disabled="disableImproveButton"
                :class="{ 'disabled:opacity-50': disableImproveButton }"
                class="absolute top-24 left-full transform -translate-x-1/2 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center"
              >
                <span v-if="!loading">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.707 10l-5-5a1 1 0 00-1.414 1.414L9.586 10l-3.293 3.293a1 1 0 101.414 1.414l5-5a1 1 0 000-1.414z" clip-rule="evenodd"/>
                  </svg>
                </span>
                <span v-else>
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              </button>
            </div>
            <p class="mt-2 text-right text-gray-600">{{ formattedCharacterCount }}</p>
          </div>
          <div class="w-1/2 h-full">
            <textarea
              ref="outputTextArea"
              id="outputText"
              v-model="outputText"
              class="w-full p-2 border resize-none min-h-[300px]"
              placeholder="Result"
              readonly
            ></textarea>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>


<script>
import createOpenaiInstance from "@/openai";
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  data() {
    return {
      showModal: false,
      userAPIKey: '',
      inputText: "",
      outputText: "",
      selectedPrompt: "correct",
      loading: false,
    };
  },
  created() {
    const store = useStore();
    if (!store.getters.getAPIKey) {
      this.outputText = "Please provide an OpenAI API key to use the app.";
    }
    this.userAPIKey = store.getters.getAPIKey;
  },
  computed: {
    isInputEmpty() {
      return this.inputText.trim().length === 0;
    },
    formattedCharacterCount() {
      return `${this.inputText.length}/1500`;
    },
    disableImproveButton() {
      return this.loading || this.inputText.length === 0 || this.inputText.length > 1500 || !this.$store.getters.getAPIKey;
    },
    hasApiKey() {
      const store = useStore();
      return !!store.getters.getAPIKey;
    },
    isInvalidApiKey() {
      const store = useStore();
      return store.getters.isInvalidApiKey;
    },
  },
  watch: {
    inputText(newValue) {
      if (newValue.length > 1500) {
        this.outputText = "Text exceeds 1500 character limit";
      }
    },
    "$store.getters.getAPIKey": function (newAPIKey, oldAPIKey) {
      if (!newAPIKey) {
        this.outputText = "Please provide an OpenAI API key to use the app.";
      }
    },
  },
  methods: {
    async improveText() {

      this.loading = true;

      const apiKey = this.$store.getters.getAPIKey;
      const openai = createOpenaiInstance(apiKey);

      const prompts = {
        correct: "I want you to act as a spelling corrector and grammar improver. I will send you a word, sentence, or paragraph, and you’ll send me the result. Reply only with the improved text and nothing else, do not write explanations.",
        teammate: "I want you to act as an editor, spelling corrector, and grammar improver. I’m writing a message to my teammate in a messaging app or email. I want to sound like a native speaker but keep it simple, natural, and conversational. I will send you a sentence or paragraph, and you’ll send me the result. Reply only with the improved text and nothing else, do not write explanations.",
        blog: "I want you to act as an editor, spelling corrector, and grammar improver. I’m writing a blog post for Substack or an article for Medium. I want to sound more like a native speaker but keep it simple and avoid words and phrases that may sound too pretentious. I will send you a sentence or paragraph, and you’ll send me the result. Reply only with the improved text and nothing else, do not write explanations.",
      };

      const messages = [
        { role: "system", content: prompts[this.selectedPrompt] },
        { role: "user", content: this.inputText },
      ];

      const payload = {
        model: "gpt-3.5-turbo",
        messages: messages,
        // max_tokens: 200,
      };

      try {
        const response = await openai.post("", payload);
        this.outputText = response.data.choices[0].message.content.trim();
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          this.outputText = "Please check if you entered the correct API key.";
          this.$store.commit("setInvalidApiKey", true);
        } else {
          this.outputText = "Error: Unable to fetch results";
        }
      } finally {
        this.loading = false;
        this.syncTextAreaHeights();
      }
    },
    clearText() {
      this.inputText = "";
      this.outputText = "";
      this.loading = false;
      this.adjustTextAreaHeight();
    },
    adjustTextAreaHeight() {
      this.$nextTick(() => {
        this.$refs.inputTextArea.style.height = "auto";
        this.$refs.inputTextArea.style.height = this.$refs.inputTextArea.scrollHeight + "px";

        this.$refs.outputTextArea.style.height = "auto";
        this.$refs.outputTextArea.style.height = this.$refs.inputTextArea.scrollHeight + "px";
      });
    },
    syncTextAreaHeights() {
      this.$nextTick(() => {
        const inputHeight = this.$refs.inputTextArea.scrollHeight;
        const outputHeight = this.$refs.outputTextArea.scrollHeight;

        const maxHeight = Math.max(inputHeight, outputHeight);

        this.$refs.inputTextArea.style.height = maxHeight + "px";
        this.$refs.outputTextArea.style.height = maxHeight + "px";
      });
    },
    saveAPIKey() {
      if (this.userAPIKey) {
        this.$store.commit('setAPIKey', this.userAPIKey);
        this.showModal = false;
        this.outputText = "";
      }
    },
  },
  // mounted() {
  //   window.addEventListener("resize", this.syncTextAreaHeights);
  // },
  // beforeUnmount() {
  //   window.removeEventListener("resize", this.syncTextAreaHeights);
  // }
};
</script>

