<template>
    <div :style="`background-image: url('${url}')`"
        class="container-image-sharp
            absolute bg-center bg-contain bg-no-repeat left-0 top-0 w-full z-10">
        <router-link class="absolute block h-full left-0 top-0 w-full"
            :to="`/post/${id}`">
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
        url: String
    }
}
</script>

<style scoped>
.container-image-sharp {
    padding-top: 100%;
}
</style>
