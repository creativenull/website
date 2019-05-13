<template>
<div>
  <div v-for="(post, i) in posts" :class="'body__color-post bg-' + colors[i] + '-800 text-' + colors[i] + '-100'">
    <div class="color-post__block mx-auto container font-noto">
      <h2 class="md:text-center">
        <router-link class="text-white text-3xl hover:underline" :to="post.permalink">{{ post.title }}</router-link>
      </h2>

      <p class="color-post__info md:text-center font-open-light">{{ post.date }} | {{ post.author }}</p>

      <div class="color-post__content">
        {{ post.description }}... <a class="text-white underline hover:no-underline" :href="post.permalink">Read More</a>
      </div>
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

<style lang="stylus" scoped>
.color-post__block
  padding: 75px 10px

.color-post__info
  padding-top: 5px
  padding-bottom: 10px
</style>
