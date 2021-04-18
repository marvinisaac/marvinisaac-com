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
                <timeline-tags v-if="tags.length > 0"
                    :tags="tags">
                </timeline-tags>
                <template v-for="post in posts" :key="post.id">

                    <bleep v-if="post.type === 'bleep'"
                        :id="post.id"
                        :published="post.date_published"
                        :body="post.body"
                        :tag="post.tag">
                    </bleep>

                    <blog v-if="post.type === 'blog'"
                        :id="post.id"
                        :published="post.date_published"
                        :title="post.title"
                        :body="post.body"
                        :tag="post.tag">
                    </blog>

                    <image-post v-if="post.type === 'image'"
                        :id="post.id"
                        :published="post.date_published"
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
import TimelineTags from './TimelineTags.vue'

export default {
    components: {
        Bleep,
        Blog,
        ImagePost,
        Navbar,
        TimelineTags
    },
    data: () => ({
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
                }, {
                    property: 'twitter:card',
                    content: 'summary_large_image'
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
    computed: {
        tags () {
            return this.$store.state.tags
        }
    },
    watch: {
        tags: {
            handler() {
                this.getPosts()
                let routeOptions = {
                    path: 'timeline'
                }
                if (this.tags.length > 0) {
                    routeOptions.query = {
                        tag: this.tags.join(',')
                    }
                }
                this.$router.push(routeOptions)
            },
            deep: true,
            flush: 'post'
        }
    },
    async created() {
        let tag = this.route.query.tag || {}
        if (Object.entries(tag).length !== 0) {
            const tags = tag.split(',')
            tags.forEach(tag => {
                this.$store.commit('tagAdd', tag)
            })
        }
        this.getPosts()
    },
    mounted() {
        if (this.route.path === '/timeline') {
            meta.update(this.meta)
        }
    },
    methods: {
        getPosts() {
            this.posts = undefined
            let url = this._buildUrl()
            fetch(url)
                .then(response => {
                    return response.json()
                })
                .then(response => {
                    this.posts = response.data.post
                })
        },
        _buildUrl() {
            let url = process.env.VUE_APP_API_ENDPOINT + 'post'
            if (this.tags.length > 0) {
                url = url + '?tag=' + this.tags.join(',')
            }

            return url
        }
    }
}
</script>
