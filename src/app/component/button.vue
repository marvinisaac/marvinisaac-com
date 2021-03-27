<template>
    <a class="bg-white inline-block px-4 py-1 rounded-full text-gray-500 text-xs"
        :href="url">
        {{ text }}
    </a>
</template>

<script>
export default {
    props: {
        text: String,
        url: String
    }
}
</script>
