<template>
    <div class="bg-white mb-4 rounded-sm shadow-2xl">
        <profile
            :id="id"
            :created="created">
        </profile>
        <div class="mx-auto prose px-4 py-0
            md:px-8">
            <h1>
                <router-link :to="`/post/${id}`">
                    {{ title }}
                </router-link>
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

.container-body :deep(hr) {
    @apply my-4;
}

.container-body :deep(img) {
    @apply rounded-md shadow-md;
}

.container-body :deep(pre) {
    @apply whitespace-pre-wrap;
}
</style>
