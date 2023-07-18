<template>
  <div class="min-h-screen bg-white">
    <header class="flex items-center justify-between px-4 py-2">
      <h1 class="text-sm text-slate-600 max-w-xs sm:max-w-full overflow-hidden whitespace-nowrap overflow-ellipsis">Write like <span class="pl-1 pr-1 bg-green-200 rounded text-green-800">a</span> native</h1>

      <a
        href="https://twitter.com/deepnavy"
        target="_blank"
        rel="noopener noreferrer"
        :class="{
          'bg-blue-600': true,
          'text-white': true,
          'px-4': true,
          'py-2': true,
          'rounded-full': true,
          'whitespace-nowrap': true
        }"
      >
        Feedback
      </a>
    </header>
    <div class="z-50 container mx-auto px-4">

      <div class="w-full mt-14">
        <div class="text-center mb-4">
          <label for="inputText" class="block">I want to improve a:</label>
        </div>
        <div class="flex justify-center">
          <div class="flex justify-center mb-6 bg-slate-100 rounded-full">
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
        <a href="#app-description" class="text-sm text-blue-600 block text-center mb-6 md:">How does this app work?</a>
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
                v-if="!isError && outputText.length > 0"
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
    <AppDescription />
   

  </div>
  <footer class="text-center text-sm text-gray-500 mt-8 mb-8">
    &copy; {{ new Date().getFullYear() }} 
    <a href="https://petrov.substack.com/" target="_blank" class="text-blue-600">Sasha Petrov</a>
  </footer>
</template>


<script>
import createOpenaiInstance from "@/openai";
import AppDescription from "./components/AppDescription.vue";

export default {
  components: {
    AppDescription
  },
  data() {
    return {
      showModal: false,
      inputText: "",
      outputText: "",
      selectedPrompt: "blog",
      loading: false,
      copied: false,
      showMore: false,
      isError: false
    };
  },
  computed: {
    isInputEmpty() {
      return this.inputText.trim().length === 0;
    },
    formattedCharacterCount() {
      return `${this.inputText.length}/1500`;
    },
    disableImproveButton() {
      return this.loading || this.inputText.length === 0 || this.inputText.length > 1500;
    },
  },
  watch: {
    inputText(newValue) {
      if (newValue.length > 1500) {
        this.outputText = "Text exceeds 1500 character limit";
      }
    }
  },
  methods: {
    async improveText() {

      this.loading = true;
      this.isError = false;

      const openai = createOpenaiInstance();

      const payload = {
        selectedPrompt: this.selectedPrompt,
        inputText: this.inputText,
      };

      try {
        const response = await openai.post("/improve_text", payload);
        this.outputText = response.data.trim();
      } catch (error) {
        this.outputText = "Error: Unable to fetch results";
        this.isError = true;
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
      this.$nextTick(() => {
        if (window.innerWidth >= 768) {
          const inputHeight = this.$refs.inputTextArea.scrollHeight;
          const outputHeight = this.$refs.outputTextArea.scrollHeight;

          const maxHeight = Math.max(inputHeight, outputHeight);

          this.$refs.inputTextArea.style.height = maxHeight + "px";
          this.$refs.outputTextArea.style.height = maxHeight + "px";
        } else {
          this.$refs.outputTextArea.style.height = this.$refs.outputTextArea.scrollHeight + "px";
        }
      });
    },
    clearOutputText(){
      this.outputText = "";
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

