<template>
    <div :style="`background-image: url('${url}')`"
        class="absolute bg-center bg-contain bg-no-repeat h-full left-0 top-0 w-full">
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
