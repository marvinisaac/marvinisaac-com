<template>
    <div class="flex items-center">
        <img class="h-10 mr-2 rounded-full w-10"
            src="https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/marvinisaac.jpg">
        <div>
            <span class="font-bold">Marvin Isaac</span>
            <span class="text-gray-500 text-xs">
                    · 
                <a :href="`/post/${id}`">
                    {{ timeAgo }}
                </a>
            </span>
        </div>
    </div>
</template>

<script>
import { format } from 'timeago.js'

export default {
    props: {
        id: String,
        created: String
    },
    data: () => ({
        timeAgo: null
    }),
    async created() {
        this.timeAgo = format(this.created)
    }
}
</script>
