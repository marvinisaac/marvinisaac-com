<template>
    <div class="bg-white mb-4 p-4 pb-6 rounded-sm shadow-2xl">
        <div class="flex items-center">
            <img class="h-10 mr-2 rounded-full w-10"
                src="https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/marvinisaac.jpg">
            <div>
                <span class="font-bold">Marvin Isaac</span>
                <span class="text-gray-500 text-sm">
                     · 
                    <a :href="`/post/${id}`">
                        {{ timeAgo }}
                    </a>
                </span>
            </div>
        </div>
        <div class="ml-10 p-2">
            <span>
                {{ bleep }}
            </span>
        </div>
    </div>
</template>

<script>
import { format } from 'timeago.js'

export default {
    props: {
        id: String,
        bleep: String,
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
