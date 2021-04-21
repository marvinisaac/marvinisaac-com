<template>
    <div class="bg-white border border-gray-300 mb-4 p-4 sticky top-14 w-full z-40">
        <span class="mr-2 prose text-xs">
            Filtered by tag:
        </span>
        <span v-for="tagName in tags"
            @click="tagRemove(tagName)"
            :key="tagName"
            class="cursor-pointer mr-2 prose text-xs">
            <span class="bg-blue-100 border border-blue-500 rounded-full px-2 py-1 text-blue-500
                hover:bg-red-100 hover:border-red-500 hover:text-red-500">
                #{{ tagName }}
            </span>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        tags: Array
    },
    methods: {
        tagRemove(tag) {
            this.$store.commit('tagRemove', tag)
        }
    }
}
</script>
