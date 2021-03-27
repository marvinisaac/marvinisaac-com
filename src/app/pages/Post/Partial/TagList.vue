<template>
    <div class="flex items-center p-4
        md:px-16">
        <router-link v-for="tagName in tag"
            :to="`/timeline?tag=${tagName}`"
            :key="tagName"
            class="inline-block italic mx-1 text-xs text-gray-500
                hover:underline">
            #{{ tagName }}
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        tag: Array
    }
}
</script>
