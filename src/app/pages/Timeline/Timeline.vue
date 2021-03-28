<template>
    <div class="max-w-screen-sm mx-auto p-4">
        <div class="flex justify-end mb-2">
            <my-button v-if="hasTag"
                class="italic font-bold"
                text="Remove Filter"
                url="/timeline">
            </my-button>
            <my-button class="italic ml-2"
                text="Back to Home"
                url="/">
            </my-button>
        </div>
        <img v-if="!posts"
            class="max-w-screen-sm mx-auto"
            src="https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/loading.svg">
        <template v-else>
            <template v-for="post in posts" :key="post.id">
                <bleep v-if="post.type === 'bleep'"
                    :id="post.id"
                    :created="post.date_created"
                    :body="post.body"
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
        </template>
    </div>
</template>

<script>
import Bleep from '../Post/Type/Bleep/Bleep.vue'
import Blog from '../Post/Type/Blog.vue'
import ImagePost from '../Post/Type/Image/Image.vue'
import { useRoute } from 'vue-router'
import myButton from './../../component/button.vue'

export default {
    components: {
        Bleep,
        Blog,
        ImagePost,
        myButton
    },
    data: () => ({
        hasTag: false,
        posts: undefined,
        route: useRoute()
    }),
    watch: {
        '$route.params': 'getPosts'
    },
    async created() {
        this.getPosts()
    },
    methods: {
        getPosts() {
            let tag = this.route.query.tag || ''
            let url = process.env.VUE_APP_API_ENDPOINT + 'post/'
            if (tag !== '') {
                this.hasTag = true
                url += `?tag=${tag}`
            } else {
                this.hasTag = false
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
}
</script>
