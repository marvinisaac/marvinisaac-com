<template>
    <div class="relative">
        <navbar></navbar>
        <div class="max-w-screen-sm mx-auto p-4 pt-20">
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
    </div>
</template>

<script>
import Bleep from '../Post/Type/Bleep/Bleep.vue'
import Blog from '../Post/Type/Blog.vue'
import ImagePost from '../Post/Type/Image/Image.vue'
import { useRoute } from 'vue-router'
import meta from './../../../app/AppMeta.js'
import Navbar from './../../component/navbar.vue'

export default {
    components: {
        Bleep,
        Blog,
        ImagePost,
        Navbar
    },
    data: () => ({
        hasTag: false,
        posts: undefined,
        route: useRoute(),
        meta: {
            title: 'Timeline | Marvin Isaac',
            tags: [
                {
                    name: 'description',
                    content: 'Timeline | Marvin Isaac'
                }, {
                    property: 'og:description',
                    content: 'Timeline | Marvin Isaac'
                }, {
                    property: 'og:image',
                    content: 'https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/m.jpg'
                }, {
                    property: 'og:title',
                    content: 'Timeline | Marvin Isaac'
                }, {
                    property: 'og:url',
                    content: 'https://marvinisaac.com/timeline'
                }
            ]
        }
    }),
    watch: {
        '$route.params': 'getPosts'
    },
    async created() {
        this.getPosts()
    },
    mounted() {
        if (this.route.path === '/timeline') {
            meta.update(this.meta)
        }
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
