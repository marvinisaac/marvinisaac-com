<template>
    <div class="max-w-screen-sm mx-auto pt-4">
        <template v-for="post in posts" :key="post.id">
            <bleep v-if="post.type === 'bleep'"
                :created="post.date_created"
                :bleep="post.body">
            </bleep>
        </template>
    </div>
</template>

<script>
import Bleep from './Post/Bleep.vue'

export default {
    components: {
        Bleep
    },
    data: () => ({
        posts: undefined
    }),
    async created() {
        fetch(process.env.VUE_APP_API_ENDPOINT + 'post/')
            .then(response => {
                return response.json()
            })
            .then(response => {
                this.posts = response.data
            })
    }
}
</script>
