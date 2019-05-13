<template>
  <div class="posts" v-if="posts.length != 0">
    <div class="post" v-for="post in posts">
      <router-link class="post__title" :to="post.permalink">
        <h1>{{ post.title }}</h1>
      </router-link>
      <div class="post__info font-open-light">
        {{ post.date }}
      </div>
      <p class="post__content">{{ post.description }}... <a :href="post.permalink">Read More</a></p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      let posts = []
      
      // select only the posts, via frontmatter
      this.$site.pages.forEach(el => {
        if (el.frontmatter.isPost)
          posts.push(el.frontmatter)
      })

      // sort array by date
      posts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })

      return posts
    }
  }
}
</script>

<style lang="stylus" scoped>
.post__content
  margin: 15px 0
  color: #222
  line-height: 1.5em

.post__title
  color: #333
  text-decoration: none

.post__title:hover
  text-decoration: underline

.post__title > h1
  font-weight: normal

.post > * > a
  color: #333
</style>
