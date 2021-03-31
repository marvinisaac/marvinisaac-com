<template>
    <div class="bg-white border border-gray-300 mb-4 overflow-hidden rounded-md">
        <profile
            :id="id"
            :published="published">
        </profile>
        <div class="container-body">
            <div class="container-image">
                <image-blurred :url="url"></image-blurred>
                <image-sharp
                    :id="id"
                    :url="url">
                </image-sharp>
            </div>
            <div v-html="caption"
                class="container-text
                    leading-loose p-4 pb-0 text-gray-700 text-sm
                    md:px-16">
            </div>
        </div>
        <tag-list :tag="tag"></tag-list>
    </div>
</template>

<script>
import markdown from 'markdown-it'
import ImageBlurred from './ImageBlurred.vue'
import ImageSharp from './ImageSharp.vue'
import Profile from './../../Partial/Profile.vue'
import TagList from './../../Partial/TagList.vue'
import { emojify } from 'node-emoji'

export default {
    props: {
        id: String,
        body: String,
        published: String,
        tag: Array
    },
    components: {
        ImageBlurred,
        ImageSharp,
        Profile,
        TagList
    },
    data: () => ({
        url: undefined,
        caption: undefined
    }),
    async created() {
        const md = new markdown()
        let bodyParsed = md.render(this.body)
        bodyParsed = emojify(bodyParsed)
        this.caption = bodyParsed
        this.url = this._extractImage(bodyParsed)
    },
    methods: {
        _extractImage(html) {
            let domContent = new DOMParser().parseFromString(html, 'text/html')
            return domContent.getElementsByTagName('img')[0].getAttribute('src')
        }
    }
}
</script>

<style scoped>
.container-body :deep(.container-image) {
    @apply border-b border-t overflow-hidden relative w-full;
}

/* TODO Remove image instead of just hiding it */
.container-body :deep(.container-text p img) {
    @apply hidden;
}
</style>
