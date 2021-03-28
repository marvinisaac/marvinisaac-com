<template>
    <div class="h-screen">
        <router-view></router-view>
    </div>
</template>

<script>
// Source: https://www.digitalocean.com/community/tutorials/vuejs-vue-router-modify-head
export default {
    data: () => ({
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
        this._updateMeta()
    },
    methods: {
        _updateMeta() {
            // Remove any stale meta tags from the document using the key attribute we set below.
            Array.from(document.querySelectorAll('[vue-controlled]'))
                .map(el => el.parentNode.removeChild(el))

            document.title = this.meta.title
            this.meta.tags.map(tagDetail => {
                const tag = document.createElement('meta')

                Object.keys(tagDetail).forEach(key => {
                    tag.setAttribute(key, tagDetail[key])
                })

                tag.setAttribute('vue-controlled', '')
                return tag
            })
                .forEach(tag => document.head.appendChild(tag))
            console.log('> Home: Updated head')
        }
    }
}
</script>
