<template>
    <div class="border p-2 rounded-full">
        <router-link class="block text-center"
            :to="`/post/${id}`">
                <span class="no-underline">
                    Read Post
                </span>
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        id: String
    }
}
</script>
