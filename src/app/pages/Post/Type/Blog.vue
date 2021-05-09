<template>
    <div class="bg-white border border-gray-300 mb-4 overflow-hidden rounded-md">
        <profile
            :id="id"
            :published="published">
        </profile>
        <div class="mx-auto prose px-4 py-0
            md:px-16">
            <h1>
                <router-link :to="`/post/${id}`">
                    {{ title }}
                </router-link>
            </h1>
            <div class="container-body mx-auto"
                v-html="bodyParsed">
            </div>
            <read-post-button v-if="timeline"
                :id="id">
            </read-post-button>
        </div>
        <tag-list :tag="tag"></tag-list>
    </div>
</template>

<script>
import markdown from 'markdown-it'
import Profile from './../Partial/Profile.vue'
import { emojify } from 'node-emoji'
// List of supported emojis: https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json
import TagList from '../Partial/TagList.vue'
import ReadPostButton from '../Partial/ReadPostButton.vue'

export default {
    props: {
        id: String,
        published: String,
        title: String,
        body: String,
        tag: Array,
        timeline: Boolean
    },
    components: {
        Profile,
        TagList,
        ReadPostButton
    },
    data: () => ({
        bodyParsed: null,
    }),
    async created() {
        const md = new markdown()
        this.bodyParsed = md.render(this.body)
        this.bodyParsed = emojify(this.bodyParsed)
    }
}
</script>

<style scoped>
.container-body {
    @apply max-w-prose;
}

.container-body :deep(hr) {
    @apply border -mx-2 my-4;
}

.container-body :deep(hr + hr) {
    @apply -mt-2;
}

.container-body :deep(img) {
    @apply rounded-md shadow-md;
}

.container-body :deep(pre) {
    @apply whitespace-pre-wrap;
}
</style>
