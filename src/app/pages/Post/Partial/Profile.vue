<template>
    <div class="flex items-center p-4"
        :class="{
            'border-t-8': isFuture,
            'border-red-500': isFuture,
        }">
        <router-link class="h-10 mr-2 overflow-hidden rounded-full w-10"
            to="/timeline">
            <img class="h-full"
                src="https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/marvinisaac-100.jpg">
        </router-link>
        <div>
            <span class="font-bold">
                <router-link to="/timeline">Marvin Isaac</router-link>
            </span>
            <span class="text-gray-500 text-xs">
                    · 
                <router-link :to="`/post/${id}`">
                    {{ timeAgo }}
                </router-link>
            </span>
        </div>
    </div>
</template>

<script>
import { format } from 'timeago.js'

export default {
    props: {
        id: String,
        published: String
    },
    data: () => ({
        timeAgo: null,
        isFuture: undefined
    }),
    async created() {
        this.timeAgo = format(this.published)
        this.isFuture = Date.parse(this.published) > new Date()
    }
}
</script>
