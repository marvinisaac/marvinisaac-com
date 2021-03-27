<template>
    <div :style="`background-image: url('${url}')`"
        class="container-image-blurred
            bg-center bg-cover left-0 top-0 w-full z-0">
    </div>
</template>

<script>
export default {
    props: {
        url: String
    }
}
</script>

<style scoped>
.container-image-blurred {
    filter: blur(20px)
        brightness(120%);
    padding-top: 100%;
    transform: scale(1.2);
}
</style>
