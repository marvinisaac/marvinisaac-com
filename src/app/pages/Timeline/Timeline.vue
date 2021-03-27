<template>
    <div class="max-w-screen-sm mx-auto p-4">
        <div class="mb-4 mx-auto overflow-hidden rounded-full w-24">
            <a class="block" href="/">
                <img src="https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/m.jpg">
            </a>
        </div>
        <template v-for="post in posts" :key="post.id">
            <bleep v-if="post.type === 'bleep'"
                :id="post.id"
                :created="post.date_created"
                :bleep="post.body"
                :tag="post.tag">
            </bleep>

            <blog v-if="post.type === 'blog'"
                :id="post.id"
                :created="post.date_created"
                :title="post.title"
                :body="post.body"
                :tag="post.tag">
            </blog>

            <image-post v-if="post.type === 'image'"
                :id="post.id"
                :created="post.date_created"
                :title="post.title"
                :body="post.body"
                :tag="post.tag">
            </image-post>
        </template>
    </div>
</template>

<script>
import Bleep from '../Post/Type/Bleep.vue'
import Blog from '../Post/Type/Blog.vue'
import ImagePost from '../Post/Type/Image.vue'
import { useRoute } from 'vue-router'

export default {
    components: {
        Bleep,
        Blog,
        ImagePost
    },
    data: () => ({
        posts: undefined
    }),
    async created() {
        const route = useRoute()
        const tag = route.query.tag || ''
        let url = process.env.VUE_APP_API_ENDPOINT + 'post/'
        if (tag !== '') {
            url += `?tag=${tag}`
        }
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(response => {
                this.posts = response.data
            })
    }
}
</script>
