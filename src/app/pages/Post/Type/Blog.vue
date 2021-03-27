<template>
    <div class="bg-white mb-4 rounded-sm shadow-2xl">
        <profile
            :id="id"
            :created="created">
        </profile>
        <div class="px-4 py-0
            md:px-8">
            <h1 class="font-bold leading-loose text-2xl uppercase">
                <a :href="`/post/${id}`">
                    {{ title }}
                </a>
            </h1>
            <div class="container-body mx-auto"
                v-html="bodyParsed">
            </div>
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

export default {
    props: {
        id: String,
        created: String,
        title: String,
        body: String,
        tag: Array
    },
    components: {
        Profile,
        TagList
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

.container-body :deep(blockquote) {
    @apply border-l-4 font-bold italic my-4 pl-4;
}

.container-body :deep(h2) {
    @apply font-bold leading-loose text-xl;
}

.container-body :deep(hr) {
    @apply my-4;
}

.container-body :deep(img) {
    @apply rounded-md shadow-md;
}

.container-body :deep(p) {
    @apply leading-relaxed my-4;
}

.container-body :deep(p code) {
    @apply bg-gray-100 p-1 text-red-500;
}

.container-body :deep(p:last-of-type) {
    @apply mb-0;
}

.container-body :deep(pre) {
    @apply bg-gray-100 p-4 whitespace-pre-wrap;
}

.container-body :deep(ul) {
    @apply list-disc ml-6;
}
</style>
