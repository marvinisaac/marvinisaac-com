<template>
    <div class="flex items-center p-4
        md:px-16">
        <router-link v-for="tagName in tag"
            :key="tagName"
            :to="`${url}${tagName}`"
            class="cursor-pointer inline-block italic mx-1 text-xs text-gray-500
                hover:underline">
            #{{ tagName }}
        </router-link>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
    props: {
        tag: Array
    },
    data: () => ({
        route: useRoute()
    }),
    computed: {
        url() {
            let urlCurrent = this.route.path
            if (urlCurrent.indexOf('?tag=') > 0) {
                return '/timeline' + this.route.query.tag + ','
            } else {
                return '/timeline' + '?tag='
            }
        }
    }
}
</script>
