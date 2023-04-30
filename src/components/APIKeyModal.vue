<template>
     <div
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
                type="text"
                :value="userAPIKey"
                @input="($event) => updateAPIKey($event.target.value)"
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
            @click="$emit('close')"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
          </div>
        </div>
      </div>
  </template>
  
  <script>
  import { useStore } from "vuex";
  export default {
    data() {
        return {
            userAPIKey: '',
            tempUserAPIKey: '',
            showDetails: false,
        };
    },
    created() {
        const store = useStore();
        this.userAPIKey = store.getters.getAPIKey;
    },
    methods: {
        closeModal() {
            this.$emit("update:showModal", false);
        },
        updateAPIKey(tempUserAPIKey){
            this.userAPIKey = tempUserAPIKey;
        },
        saveAPIKey() {
            if (this.userAPIKey) {
                this.$store.commit('setAPIKey', this.userAPIKey);
                this.$emit('clear-output-text');
                this.$emit('close');
            }
        },
        deleteAPIKey() {
            sessionStorage.removeItem('openaiApiKey');
            this.$store.commit('setAPIKey', "");
            this.userAPIKey = "";
            this.$emit('close');
        },
    },
  };
  </script>