import { createStore } from "vuex";

const store = createStore({
  state: {
    openaiApiKey: sessionStorage.getItem("openaiApiKey") || "",
  },
  mutations: {
    setAPIKey(state, apiKey) {
      state.openaiApiKey = apiKey;
      sessionStorage.setItem("openaiApiKey", apiKey);
    },
    setInvalidApiKey(state, value) {
        state.invalidApiKey = value;
    },
  },
  getters: {
    getAPIKey: (state) => state.openaiApiKey,
    isInvalidApiKey(state) {
        return state.invalidApiKey;
      },
  },
});

export default store;