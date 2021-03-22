<template>
    <div class="flex flex-col h-full justify-center max-w-screen-sm mx-auto p-4">
        <div>
            <a class="block p-2 text-right text-sm"
                href="/timeline">
                &lt; Back to Timeline
            </a>
        </div>
        <bleep v-if="post.type === 'bleep'"
            :id="post.id"
            :created="post.date_created"
            :bleep="post.body">
        </bleep>
    </div>
</template>

<script>
import Bleep from './Type/Bleep.vue'

export default {
    props: {
        id: String
    },
    components: {
        Bleep
    },
    data: () => ({
        post: undefined
    }),
    async created() {
        fetch(`${process.env.VUE_APP_API_ENDPOINT}post/${this.id}`)
            .then(response => {
                return response.json()
            })
            .then(response => {
                this.post = response.data
            })
    }
}
</script>
