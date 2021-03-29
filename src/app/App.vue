<template>
    <div class="h-screen">
        <router-view></router-view>
    </div>
</template>

<script>
// Source: https://www.digitalocean.com/community/tutorials/vuejs-vue-router-modify-head
import { useRoute } from 'vue-router'
import meta from './../app/AppMeta.js'

export default {
    data: () => ({
        route: useRoute(),
        meta: {
            title: 'Marvin Isaac | Developer - Writer',
            tags: [
                {
                    name: 'description',
                    content: 'Marvin Isaac | Developer - Writer'
                }, {
                    property: 'og:description',
                    content: 'Marvin Isaac | Developer - Writer'
                }, {
                    property: 'og:image',
                    content: 'https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/m.jpg'
                }, {
                    property: 'og:title',
                    content: 'Marvin Isaac | Developer - Writer'
                }, {
                    property: 'og:url',
                    content: 'https://marvinisaac.com'
                }
            ]
        }
    }),
    mounted() {
        if (this.route.path === '/') {
            meta.update(this.meta)
        }
    }
}
</script>
