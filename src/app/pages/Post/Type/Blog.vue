<template>
    <div class="bg-white mb-4 p-4 pb-6 rounded-sm shadow-2xl">
        <profile
            :id="id"
            :created="created">
        </profile>
        <div class="mt-4
            md:px-12">
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
    }
}
</script>

<style scoped>
.container-body >>> blockquote {
    @apply border-l-4 font-bold italic pl-4 text-xl;
}

.container-body >>> img {
    @apply rounded-md shadow-md;
}

.container-body >>> p {
    @apply leading-relaxed mb-4;
}

.container-body >>> p:last-of-type {
    @apply mb-0;
}
</style>
