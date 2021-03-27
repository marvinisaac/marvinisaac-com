<template>
    <router-link class="bg-white inline-block px-4 py-1 rounded-full text-gray-500 text-xs"
        :to="url">
        {{ text }}
    </router-link>
</template>

<script>
export default {
    props: {
        text: String,
        url: String
    }
}
</script>
