<template>
  <div class="body__color-post">
    <div v-for="(post, i) of posts" :class="`${colors[i]} text-white`" :key="'post'+i">
      <div class="color-post__block container mx-auto font-noto">
        <h1 class="md:text-center">
          <router-link
            :to="post.permalink"
            class="text-white text-2xl md:text-4xl hover:underline"
            >
            {{ post.title }}
          </router-link>
        </h1>
        <p class="color-post__info py-2 md:text-center font-open-light">{{ post.date }} | {{ post.author }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        "bg-blue-900",
        "bg-green-900",
        "bg-red-900"
      ]
    }
  },

  computed: {

    // Get the post, sort them by latest and get only the first 3 posts
    posts() {
      const newPosts = this.$site.pages
        .map((el) => {
          const isDraft = el.frontmatter.isDraft || false;
          return el.frontmatter.isPost && !isDraft ? el.frontmatter : undefined
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3)

      return newPosts
    }
  }
}
</script>

<style lang="stylus">
.color-post__block
  padding: 100px 10px
</style>
