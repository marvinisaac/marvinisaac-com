<template>
    <div class="flex items-center p-4
        md:px-16">
        <span v-for="tagName in tag"
            @click="tagAdd(tagName)"
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
        tagAdd(tag) {
            this.$store.commit('tagAdd', tag)
        }
    }
}
</script>
