<template>
    <div class="relative">
        <navbar></navbar>
        <div class="flex flex-col max-w-screen-md min-h-full mx-auto p-4 pt-20">
            <img v-if="!post"
                class="max-w-screen-sm mx-auto"
                src="https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/loading.svg">
            <template v-else>
                <div class="bg-white border border-gray-300 mb-4 px-4 py-1 rounded-md w-full">
                    <router-link class="prose text-xs"
                        to="/timeline">
                        &lt; Back to Timeline
                    </router-link>
                </div>

                <bleep v-if="post.type === 'bleep'"
                    :id="post.id"
                    :created="post.date_created"
                    :body="post.body"
                    :tag="post.tag">
                </bleep>

                <blog v-if="post.type === 'blog'"
                    :id="post.id"
                    :created="post.date_created"
                    :updated="post.date_updated"
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
    </div>
</template>

<script>
import Bleep from './Type/Bleep/Bleep.vue'
import Blog from '../Post/Type/Blog.vue'
import ImagePost from '../Post/Type/Image/Image.vue'
import { useRoute } from 'vue-router'
import meta from './../../AppMeta.js'
import markdown from 'markdown-it'
import Navbar from './../../component/navbar.vue'

export default {
    props: {
        id: String
    },
    components: {
        Bleep,
        Blog,
        ImagePost,
        Navbar
    },
    data: () => ({
        post: undefined,
        route: useRoute(),
        meta: {
            title: undefined,
            tags: undefined
        }
    }),
    async created() {
        fetch(`${process.env.VUE_APP_API_ENDPOINT}post/${this.id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Post ID not found')
                }
                return response.json()
            })
            .then(response => {
                this.post = response.data
            })
            .catch(() => {
                this.$router.push('/not-found')
            })
            .finally(() => {
                this.buildMetaTags()
                if (this.route.path.includes('/post/')) {
                    meta.update(this.meta)
                }
            })
    },
    methods: {
        buildMetaTags() {
            const imageDefault = 'https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/m.jpg'
            let title = this._formatTitle()
            let description = this._formatDescription()
            let image = this._extractImage()
            let tags = [
                {
                    property: 'og:title',
                    content: title
                }, {
                    property: 'og:url',
                    content: 'https://marvinisaac.com' + this.route.path
                }, {
                    name: 'description',
                    content: description || title
                }, {
                    property: 'og:description',
                    content: description || title
                }, {
                    property: 'og:image',
                    content: image || imageDefault
                }
            ]
            this.meta.title = title
            this.meta.tags = tags
        },
        _capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1)
        },
        _extractImage() {
            const md = new markdown()
            let bodyParsed = md.render(this.post.body)
            if (!this._hasImage(bodyParsed)) {
                return null
            }

            let domContent = new DOMParser().parseFromString(bodyParsed, 'text/html')
            return domContent.getElementsByTagName('img')[0].getAttribute('src')
        },
        _formatDescription() {
            if (this.post.description !== '') {
                return this.post.description
            }

            return null
        },
        _formatTitle() {
            if (this._isUuid(this.post.id)) {
                let postTypeFormatted = this._capitalize(this.post.type)
                return `${postTypeFormatted} | Marvin Isaac`
            }

            return `${this.post.title} | Marvin Isaac`
        },
        _hasImage(html) {
            let domTemporary = new DOMParser().parseFromString(html, 'text/html')
            return domTemporary.getElementsByTagName('img')[0] !== undefined
        },
        _isUuid(string) {
            const pattern = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
            return pattern.test(string)
        }
    }
}
</script>
