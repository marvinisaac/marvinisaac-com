<template>
    <div class="bg-white border border-gray-300 mb-4 overflow-hidden rounded-md">
        <profile
            :id="id"
            :created="created">
        </profile>
        <div class="container-body
            px-4 py-0
            md:px-16">
            <div v-html="text"
                class="container-text prose">
            </div>
            <div v-if="hasImage"
                class="container-image
                    mt-4 rounded-md relative shadow-md w-full">
                <bleep-image
                    :id="id"
                    :url="url">
                </bleep-image>
            </div>
        </div>
        <tag-list :tag="tag"></tag-list>
    </div>
</template>

<script>
import markdown from 'markdown-it'
import BleepImage from './BleepImage.vue'
import Profile from './../../Partial/Profile.vue'
import TagList from './../../Partial/TagList.vue'
import { emojify } from 'node-emoji'

export default {
    props: {
        id: String,
        body: String,
        created: String,
        tag: Array
    },
    components: {
        BleepImage,
        Profile,
        TagList
    },
    data: () => ({
        hasImage: false,
        text: undefined,
        url: undefined
    }),
    async created() {
        const md = new markdown()
        let bodyParsed = md.render(this.body)
        bodyParsed = emojify(bodyParsed)
        this.text = bodyParsed
        if (this._hasImage(bodyParsed)) {
            this.hasImage = true
            this.url = this._extractImage(bodyParsed)
        }
    },
    methods: {
        _extractImage(html) {
            let domContent = new DOMParser().parseFromString(html, 'text/html')
            return domContent.getElementsByTagName('img')[0].getAttribute('src')
        },
        _hasImage(html) {
            let domTemporary = new DOMParser().parseFromString(html, 'text/html')
            return domTemporary.getElementsByTagName('img')[0] !== undefined
        }
    }
}
</script>

<style scoped>
.container-body .container-text :deep(p) {
    @apply leading-relaxed mb-4;
}

.container-body .container-text :deep(p:last-of-type) {
    @apply mb-0;
}

/* TODO Remove image instead of just hiding it */
.container-body .container-text :deep(p img) {
    @apply hidden;
}

.container-body .container-text :deep(s) {
    @apply text-xs;
}

.container-body .container-image {
    padding-top: 56.25%;
}
</style>
