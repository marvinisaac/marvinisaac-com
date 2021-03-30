<template>
    <div class="relative">
        <navbar></navbar>
        <div class="max-w-screen-sm mx-auto p-4 pt-20">
            <div v-if="!posts"
                class="bg-gray-500 border border-gray-300 mb-4 p-4 rounded-md w-full">
                <img class="max-w-screen-sm mx-auto"
                    src="https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/loading.svg">
            </div>
            <template v-else>
                <div v-if="hasTag"
                    class="bg-white border border-gray-300 mb-4 p-4 rounded-md w-full">
                    <span class="mr-2 prose text-xs">
                        Filtered by tag:
                    </span>
                    <router-link class="mr-2 prose text-xs"
                        to="/timeline">
                        <span class="bg-blue-100 border border-blue-500 rounded-full px-2 py-1 text-blue-500
                            hover:bg-red-100 hover:border-red-500 hover:text-red-500">
                            #{{ tag }}
                        </span>
                    </router-link>
                </div>
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
        tag: undefined,
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
                }, {
                    property: 'twitter:card',
                    content: 'summary'
                }, {
                    property: 'twitter:site',
                    content: '@marvinisaac'
                }, {
                    property: 'twitter:title',
                    content: 'Timeline | Marvin Isaac'
                }, {
                    property: 'twitter:description',
                    content: 'Timeline | Marvin Isaac'
                }, {
                    property: 'twitter:image',
                    content: 'https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/m.jpg'
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
                this.tag = tag
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
