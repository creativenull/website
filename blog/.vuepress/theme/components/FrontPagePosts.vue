<template>
  <div class="body__color-post">
    <div v-for="(post, i) in posts" :class="'bg-' + colors[i] + '-800 text-' + colors[i] + '-100'">
      <div class="color-post__block container mx-auto font-noto">
        <h1 class="md:text-center">
          <router-link
            :to="post.permalink"
            class="text-white text-2xl md:text-3xl hover:underline"
            >
            {{ post.title }}
          </router-link>
        </h1>
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
    posts() {
      let posts = []
      let count = 0

      this.$site.pages.forEach((el) => {
        if (el.frontmatter.isPost && count < 3) {
          posts.push(el.frontmatter)
          count++
        }
      })

      posts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })

      return posts
    }
  }
}
</script>

<style lang="stylus">
.color-post__block
  padding: 75px 10px
</style>
