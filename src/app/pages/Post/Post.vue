<template>
    <div class="flex flex-col justify-center max-w-screen-sm min-h-full  mx-auto p-4">
        <div>
            <a class="block p-2 text-right text-sm"
                href="/timeline">
                &lt; Back to Timeline
            </a>
        </div>

        <bleep v-if="post && post.type === 'bleep'"
            :id="post.id"
            :created="post.date_created"
            :bleep="post.body">
        </bleep>

        <blog v-if="post.type === 'blog'"
            :id="post.id"
            :created="post.date_created"
            :updated="post.date_updated"
            :title="post.title"
            :body="post.body">
        </blog>
    </div>
</template>

<script>
import Bleep from './Type/Bleep.vue'
import Blog from '../Post/Type/Blog.vue'

export default {
    props: {
        id: String
    },
    components: {
        Bleep,
        Blog
    },
    data: () => ({
        post: undefined
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
    }
}
</script>
