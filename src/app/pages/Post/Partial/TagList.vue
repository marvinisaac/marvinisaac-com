<template>
    <div class="flex items-center p-4
        md:px-16">
        <span v-for="tagName in tag"
            @click="goToTimeline(tagName)"
            :key="tagName"
            class="cursor-pointer inline-block italic mx-1 text-xs text-gray-500
                hover:underline">
            #{{ tagName }}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        tag: Array
    },
    methods: {
        goToTimeline(tag) {
            this.$store.commit('tagAdd', tag)
            let tags = this.$store.state.tags
            let routeOptions = {
                path: '/timeline'
            }
            if (tags.length > 0) {
                routeOptions.query = {
                    tag: tags.join(',')
                }
            }
            this.$router.push(routeOptions)
        }
    }
}
</script>
