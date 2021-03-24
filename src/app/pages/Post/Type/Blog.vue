<template>
    <div class="bg-white mb-4 p-4 pb-6 rounded-sm shadow-2xl">
        <div class="flex items-center">
            <img class="h-10 mr-2 rounded-full w-10"
                src="https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/marvinisaac.jpg">
            <div>
                <span class="font-bold">Marvin Isaac</span>
                <span class="text-gray-500 text-sm">
                     · 
                    <a :href="`/post/${id}`">
                        {{ timeAgo }}
                    </a>
                </span>
            </div>
        </div>
        <div class="ml-10 p-2
            md:pr-12">
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
import { format } from 'timeago.js'
import markdown from 'markdown-it'

export default {
    props: {
        id: String,
        created: String,
        title: String,
        body: String
    },
    data: () => ({
        bodyParsed: null,
        timeAgo: null
    }),
    async created() {
        const md = new markdown()
        this.bodyParsed = md.render(this.body)
        this.timeAgo = format(this.created)
    }
}
</script>

<style scoped>
.container-body >>> blockquote {
    @apply border-l-4 font-bold italic pl-4 text-xl;
}

.container-body >>> img {
    @apply rounded-sm shadow-md;
}

.container-body >>> p {
    @apply leading-relaxed my-4;
}
</style>
