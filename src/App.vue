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
    <div class="z-50 container mx-auto px-4">
      <div
        v-if="showModal"
        class="fixed z-50 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
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
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full sm:p-6">
            
          <div class="text-left">
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


          <p class="mt-2 text-gray-600 text-sm">
            Follow these steps to retrieve OpenAI API key:
            <a
              href="#"
              @click.prevent="showDetails = !showDetails"
              class="text-blue-600"
            >
              {{ showDetails ? "Hide details" : "Show details" }}
            </a>
          </p>

          <div v-if="showDetails" class="mt-2 text-sm text-gray-600">
            <ol class="list-decimal list-outside pl-6">
              <li>
                Go to the OpenAI website: 
                <a
                  href="https://www.openai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600"
                >
                  https://www.openai.com/
                </a>
              </li>
              <li>Click on "Get Started" or "Sign in" if you already have an account.</li>
              <li>Create an account or sign in to your existing account.</li>
              <li>After signing in, you'll be directed to the OpenAI Dashboard.</li>
              <li>Navigate to the API section by clicking "API" in the left sidebar menu or by visiting: https://platform.openai.com/signup</li>
              <li>Follow the instructions to access or sign up for the API. If you're eligible, you'll be provided with an API key.</li>
              <li>The API key should look like a long alphanumeric string (e.g., "sk-12345abcdeABCDEfghijKLMNOP").</li>
            </ol>
          </div>

            
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              @click="saveAPIKey"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
            <button
              @click="deleteAPIKey"
              class="sm:ml-3 bg-red-600 text-white mt-3 w-full inline-flex justify-center rounded-md border px-4 py-2  text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Delete
            </button>
            <button
              @click="showModal = false"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
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
        <div class="z-10 flex flex-col md:flex-row relative">
          <div class="w-full md:w-1/2">
            <div class="relative">
              <textarea
                ref="inputTextArea"
                id="inputText"
                v-model="inputText"
                class="w-full p-2 border resize-none min-h-[13rem]"
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
              
            </div>
            <p class="mt-2 text-right text-gray-600">{{ formattedCharacterCount }}</p>
          </div>

          
          <button
            @click="improveText"
            :disabled="disableImproveButton"
            :class="{ 'disabled:opacity-50': disableImproveButton }"
            class="z-30 w-full inline-flex bg-blue-600 text-white rounded-full h-12 md:w-12 md:flex md:absolute left-1/2 md:-translate-x-1/2 md:top-24 md:-translate-y-1/2 items-center justify-center"
          >
            <span v-if="!loading">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hidden md:block" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 10l-5-5a1 1 0 00-1.414 1.414L9.586 10l-3.293 3.293a1 1 0 101.414 1.414l5-5a1 1 0 000-1.414z" clip-rule="evenodd"/>
              </svg>
              <span class="md:hidden">Improve</span>
            </span>
            <span v-else>
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          </button>
          
          <div class="z-10 w-full md:w-1/2 md:h-full">
            <div class="relative">
              <textarea
                ref="outputTextArea"
                id="outputText"
                v-model="outputText"
                class="w-full p-2 border resize-none min-h-[13rem]"
                placeholder="Result"
                readonly
              ></textarea>
              <button
                v-if="hasApiKey && outputText.length > 0 && !isInvalidApiKey"
                @click="copyOutputText"
                class="absolute top-2 right-2 w-6 h-6"
              >
              <svg v-if="!copied" class="text-gray-500 fill-current" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z" fill-rule="nonzero"/></svg>
              <svg v-else class="text-green-600 fill-current" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.25 12.321 7.27 6.491c.143.127.321.19.499.19.206 0 .41-.084.559-.249l11.23-12.501c.129-.143.192-.321.192-.5 0-.419-.338-.75-.749-.75-.206 0-.411.084-.559.249l-10.731 11.945-6.711-5.994c-.144-.127-.322-.19-.5-.19-.417 0-.75.336-.75.749 0 .206.084.412.25.56" fill-rule="nonzero"/></svg>
              </button>
              
            </div>
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
      copied: false,
      showDetails: false,
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
        if (window.innerWidth >= 768) {
          this.$refs.outputTextArea.style.height = this.$refs.inputTextArea.scrollHeight + "px";
        } else {
          this.$refs.outputTextArea.style.height = this.$refs.outputTextArea.scrollHeight + "px";
        }
      });
    },
    syncTextAreaHeights() {
      if (window.innerWidth >= 768) {
        this.$nextTick(() => {
          const inputHeight = this.$refs.inputTextArea.scrollHeight;
          const outputHeight = this.$refs.outputTextArea.scrollHeight;

          const maxHeight = Math.max(inputHeight, outputHeight);

          this.$refs.inputTextArea.style.height = maxHeight + "px";
          this.$refs.outputTextArea.style.height = maxHeight + "px";
        });
      }
    },
    saveAPIKey() {
      if (this.userAPIKey) {
        this.$store.commit('setAPIKey', this.userAPIKey);
        this.showModal = false;
        this.outputText = "";
      }
    },
    copyOutputText() {
      if (this.outputText) {
        navigator.clipboard.writeText(this.outputText).then(
          () => {
            console.log("Text copied to clipboard");
            this.copied = true;
          },
          (err) => {
            console.error("Could not copy text", err);
          }
        );
      }
    },
    deleteAPIKey() {
      sessionStorage.removeItem('openaiApiKey');
      this.$store.commit('setAPIKey', "");
      this.userAPIKey = "";
      this.showModal = false;
    },
  },
};
</script>

