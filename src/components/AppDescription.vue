<template>
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
        <p class="mb-6">If you're looking to improve your writing skills and create high-quality content, AI-powered writing assistants can be game-changers. From enhancing blog posts and articles to crafting clear and concise messages, artificial intelligence offers a wide range of tools to elevate your writing. We'll discuss how AI-based writing aids can help you achieve better communication, whether for personal or professional purposes.</p>
        <h3 class="text-xl font-semibold mb-2">Artificial Intelligence for Clear and Concise Messages</h3>
        <p class="mb-6">AI-driven message clarity helpers, like "Write like a native," can assist you in crafting natural and conversational messages. These tools focus on email drafting assistance, improving grammar and spelling, and ensuring your written communication is simple yet effective. By acting as an editor, spelling corrector, and grammar improver, AI writing aids help you sound like a native speaker in any messaging app or email.</p>
        <h3 class="text-xl font-semibold mb-2">AI-Powered Blog Post and Article Enhancement</h3>
        <p class="mb-6">Intelligent blog post editors and AI-based content optimization tools, such as "Write like a native," are designed to improve the quality and readability of your content on platforms like Substack or Medium. These AI-powered writing assistants work by refining your text paragraph by paragraph, ensuring your content is engaging, informative, and free of pretentious language.</p>
        <h3 class="text-xl font-semibold mb-2">Error-Free Text Generation with AI</h3>
        <p class="mb-6">AI-assisted proofreading tools and punctuation and style checkers, like "Write like a native," focus on correcting grammar, spelling, and punctuation to produce polished, error-free text. By simply providing a word, sentence, or paragraph, you'll receive the improved text without any additional explanations. This advanced writing support can be especially beneficial for non-native speakers aiming to improve their writing quality.</p>
        <p>In conclusion, AI-driven writing tools offer a wide range of assistance to elevate your written communication skills. From AI-powered writing assistants for blog posts and articles to tools that improve message clarity and error-free texts, the possibilities for better writing are endless. Embrace the power of AI-based writing aids and experience the difference in your writing today.</p>
      </div>
    </div>
</template>

<script>
export default {
    data() {
    return {
      showMore: false,
    };
  },
};
</script>