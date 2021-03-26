<template>
    <div class="bg-white mb-4 rounded-sm shadow-2xl">
        <profile
            :id="id"
            :created="created">
        </profile>
        <div class="p-4 pt-0
            md:px-16">
            <h1 class="font-bold leading-loose text-xl uppercase">
                <a :href="`/post/${id}`">
                    {{ title }}
                </a>
            </h1>
            <div class="container-body"
                v-html="bodyParsed">
            </div>
        </div>
    </div>
</template>

<script>
import markdown from 'markdown-it'
import Profile from './../Partial/Profile'
import { emojify } from 'node-emoji'
// List of supported emojis: https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json

export default {
    props: {
        id: String,
        created: String,
        title: String,
        body: String
    },
    components: {
        Profile
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
.container-body :deep(blockquote) {
    @apply border-l-4 font-bold italic pl-4 text-xl;
}

.container-body :deep(img) {
    @apply rounded-md shadow-md;
}

.container-body :deep(p) {
    @apply leading-relaxed mb-4;
}

.container-body :deep(p:last-of-type) {
    @apply mb-0;
}
</style>
