<template>
  <div class="min-h-screen bg-white">
    <header class="flex items-center justify-between px-4 py-2">
      <h1 class="text-sm text-slate-600 max-w-xs sm:max-w-full overflow-hidden whitespace-nowrap overflow-ellipsis">Write like <span class="pl-1 pr-1 bg-green-200 rounded text-green-800">a</span> native</h1>
      <button
        @click="showModal = true"
        :class="{
          'bg-green-600': hasApiKey && !isInvalidApiKey,
          'bg-blue-600': !hasApiKey || isInvalidApiKey,
          'text-white': true,
          'px-4': true,
          'py-2': true,
          'rounded-full': true,
          'whitespace-nowrap': true
        }"
      >
        <template v-if="hasApiKey && !isInvalidApiKey">
          <svg  class="text-white inline-block h-4 w-4 mr-1 fill-current" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.25 12.321 7.27 6.491c.143.127.321.19.499.19.206 0 .41-.084.559-.249l11.23-12.501c.129-.143.192-.321.192-.5 0-.419-.338-.75-.749-.75-.206 0-.411.084-.559.249l-10.731 11.945-6.711-5.994c-.144-.127-.322-.19-.5-.19-.417 0-.75.336-.75.749 0 .206.084.412.25.56" fill-rule="nonzero"/></svg>
          
          API Key added
        </template>
        <template v-else>Add API Key</template>
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

      <div class="w-full mt-14">
        <div class="text-center mb-4">
          <label for="inputText" class="block">I want to improve a:</label>
        </div>
        <div class="flex justify-center">
          <div class="flex justify-center mb-8 bg-slate-100 rounded-full">
            <button
              @click="selectedPrompt = 'blog'"
              :class="{ 'bg-blue-600 text-white': selectedPrompt === 'blog', 'text-gray-800': selectedPrompt !== 'blog' }"
              class="px-4 py-2 rounded-full"
            >
              Blog
            </button>
            <button
              @click="selectedPrompt = 'teammate'"
              :class="{ 'bg-blue-600 text-white': selectedPrompt === 'teammate', 'text-gray-800': selectedPrompt !== 'teammate' }"
              class="px-4 py-2 rounded-full"
            >
              Message
            </button>
            <button
              @click="selectedPrompt = 'correct'"
              :class="{ 'bg-blue-600 text-white': selectedPrompt === 'correct', 'text-gray-800': selectedPrompt !== 'correct' }"
              class="px-4 py-2 rounded-full"
            >
              Just correct
            </button>
          </div>
        </div>
        <!-- <a href="#app-description" class="text-sm text-blue-600 block text-center mb-6 md:">How does it work?</a> -->
        <div class="z-10 flex flex-col md:flex-row relative drop-shadow-md">
          <div class="w-full md:w-1/2">
            <div class="relative">
              <textarea
                ref="inputTextArea"
                id="inputText"
                v-model="inputText"
                class="w-full placeholder:text-slate-500 resize-none border-none rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none p-4 pr-10 pb-10 min-h-[13rem] focus:border-none focus:ring-0 focus:outline-0"
                placeholder="Enter text"
                @input="adjustTextAreaHeight"
              ></textarea>
              <button
                @click="clearText"
                v-show="inputText.length > 0"
                class="absolute top-3 right-3 w-6 h-6"
              >
                <svg class="text-gray-500 fill-current" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
              </button>
              <p 
                :class="{ 'text-red-500': inputText.length > 1500 }"  
                class="absolute bottom-4 right-3 text-sm text-right text-slate-500"
              >
                {{ formattedCharacterCount }}
              </p>
            </div>
            
          </div>

          
          <button
            @click="improveText"
            :disabled="disableImproveButton"
            :class="{ 'disabled:bg-blue-400': disableImproveButton }"
            class="-mt-[6px] md:mt-0 z-30 w-full inline-flex bg-blue-600 text-white md:rounded-full h-12 md:w-12 md:flex md:absolute left-1/2 md:-translate-x-1/2 md:top-[97px] md:-translate-y-1/2 items-center justify-center"
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
                class="w-full placeholder:text-slate-500 border-none bg-slate-50 rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none pt-4 pl-4 md:pl-10 pr-10 pb-10 resize-none min-h-[13rem] focus:border-none focus:ring-0 focus:outline-0"
                placeholder="Result"
                readonly
              ></textarea>
              <button
                v-if="hasApiKey && outputText.length > 0 && !isInvalidApiKey"
                @click="copyOutputText"
                class="absolute top-3 right-3 w-6 h-6"
              >
              <svg v-if="!copied" class="text-gray-500 fill-current" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z" fill-rule="nonzero"/></svg>
              <svg v-else class="text-green-600 fill-current" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.25 12.321 7.27 6.491c.143.127.321.19.499.19.206 0 .41-.084.559-.249l11.23-12.501c.129-.143.192-.321.192-.5 0-.419-.338-.75-.749-.75-.206 0-.411.084-.559.249l-10.731 11.945-6.711-5.994c-.144-.127-.322-.19-.5-.19-.417 0-.75.336-.75.749 0 .206.084.412.25.56" fill-rule="nonzero"/></svg>
              </button>
              
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <div id="app-description" class="bg-slate-100 px-4 py-3 mt-14 mx-4 rounded-lg sm:max-w-md sm:mx-auto">
      <h2 class="text-lg font-semibold text-slate-600 mb-4">How does this app work?</h2>
      <p class="text-sm text-slate-500">
        This app uses AI to help you improve your writing. It offers three options to cater to different cases:
      </p>
      <ul class="list-disc list-outside pl-6 mt-4 text-sm text-slate-500">
        <li class="pb-2">
          <span class="font-semibold">Blog:</span> Designed to enhance your blog posts or articles, making them more engaging and informative. Improving the text paragraph by paragraph is recommended.
        </li>
        <li class="pb-2">
          <span class="font-semibold">Message:</span> Perfect for crafting clear and concise messages, emails, or other forms of written communication.
        </li>
        <li class="pb-2">
          <span class="font-semibold">Just correct:</span> Focused on refining grammar, spelling, and punctuation for polished and error-free text.
        </li>
      </ul>
      <p class="text-sm text-slate-500 mt-4">
        Simply choose a prompt, enter your text, and let the AI work its magic to elevate your writing.
      </p>
      <a @click="showMore = !showMore" class="block mt-4 mb-4 text-blue-600 hover:cursor-pointer">
        {{ showMore ? "Learn less" : "Learn more" }}
      </a>
      <div v-if="showMore" class="text-slate-500 text-sm">
        <p class="mb-6">If you're looking to improve your writing skills and create high-quality content, AI-powered writing assistants can be game-changers. From enhancing blog posts and articles to crafting clear and concise messages, artificial intelligence offers a wide range of tools to elevate your writing. In this article, we'll discuss how AI-based writing aids can help you achieve better communication, whether for personal or professional purposes.</p>
        <h3 class="text-xl font-semibold mb-2">Artificial Intelligence for Clear and Concise Messages</h3>
        <p class="mb-6">AI-driven message clarity helpers, like "Write like a native," can assist you in crafting natural and conversational messages. These tools focus on email drafting assistance, improving grammar and spelling, and ensuring your written communication is simple yet effective. By acting as an editor, spelling corrector, and grammar improver, AI writing aids help you sound like a native speaker in any messaging app or email.</p>
        <h3 class="text-xl font-semibold mb-2">AI-Powered Blog Post and Article Enhancement</h3>
        <p class="mb-6">Intelligent blog post editors and AI-based content optimization tools, such as "Write like a native," are designed to improve the quality and readability of your content on platforms like Substack or Medium. These AI-powered writing assistants work by refining your text paragraph by paragraph, ensuring your content is engaging, informative, and free of pretentious language.</p>
        <h3 class="text-xl font-semibold mb-2">Error-Free Text Generation with AI</h3>
        <p class="mb-6">AI-assisted proofreading tools and punctuation and style checkers, like "Write like a native," focus on correcting grammar, spelling, and punctuation to produce polished, error-free text. By simply providing a word, sentence, or paragraph, you'll receive the improved text without any additional explanations. This advanced writing support can be especially beneficial for non-native speakers aiming to improve their writing quality.</p>
        <p>In conclusion, AI-driven writing tools offer a wide range of assistance to elevate your written communication skills. From AI-powered writing assistants for blog posts and articles to tools that improve message clarity and error-free texts, the possibilities for better writing are endless. Embrace the power of AI-based writing aids and experience the difference in your writing today.</p>
      </div>
    </div>

  </div>
  <footer class="text-center text-sm text-gray-500 mt-8 mb-8">
    &copy; {{ new Date().getFullYear() }} 
    <a href="https://petrov.substack.com/" target="_blank" class="text-blue-600">Sasha Petrov</a>
  </footer>
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
      selectedPrompt: "blog",
      loading: false,
      copied: false,
      showDetails: false,
      showMore: false,
    };
  },
  created() {
    const store = useStore();
    if (!store.getters.getAPIKey) {
      this.outputText = "Please provide (top-right corner) an OpenAI API key to use the app.";
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
        this.outputText = "Please add an OpenAI API key to use the app.";
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

<style>
html {
  scroll-behavior: smooth;
}
h1 {
  font-family: 'Arvo', serif;
}

</style>

