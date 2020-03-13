<template>
  <div class="body__color-post">
    <div v-for="(post, i) of posts" :class="'bg-' + colors[i] + '-800 text-' + colors[i] + '-100'">
      <div class="color-post__block container mx-auto font-noto">
        <h1 class="md:text-center">
          <router-link
            :to="post.permalink"
            class="text-white text-2xl md:text-3xl hover:underline"
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
      colors: ["blue", "green", "red"]
    }
  },

  computed: {

    // Get the post, sort them by latest and get only the first 3 posts
    posts() {
      const newPosts = this.$site.pages
        .map((el) => el.frontmatter.isPost ? el.frontmatter : undefined)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3)

      return newPosts
    }
  }
}
</script>

<style lang="stylus">
.color-post__block
  padding: 75px 10px
</style>
