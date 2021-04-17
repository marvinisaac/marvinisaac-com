<template>
    <div class="container
        flex flex-col justify-center max-w-screen-sm mx-auto my-0 p-4 h-screen">

        <div class="card-container
            bg-white border border-gray-300 mx-auto my-0 overflow-hidden relative rounded-md shadow-2xl w-full">

            <div class="card
                absolute flex flex-auto h-full items-end left-0 top-0 w-full">

                <div class="text-container
                    pb-4 pl-4 z-10
                    md:pb-6 md:pl-6">

                    <div class="flex items-center">
                        <a class="block w-6"
                            href="https://linkedin.com/in/marvinisaac">
                            <img class="w-4 inline-block"
                                src="https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/linkedin.svg">
                        </a>

                        <h1 class="leading-8 text-xl">
                            <a href="https://linkedin.com/in/marvinisaac">
                                Marvin Isaac
                            </a>
                        </h1>
                    </div>

                    <div class="flex items-center">
                        <a class="block w-6"
                            href="https://github.com/marvinisaac">
                            <img class="w-4 inline-block"
                                src="https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/github.svg">
                        </a>

                        <h1 class="text-sm">
                            <a href="https://github.com/marvinisaac">
                                Developer
                            </a>
                        </h1>
                    </div>

                    <div class="flex items-center">
                        <router-link class="block w-6"
                            to="/timeline">
                            <img class="w-4 inline-block"
                                src="https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/blog.svg">
                        </router-link>

                        <h1 class="text-sm">
                            <router-link to="/timeline">
                                Writer
                            </router-link>
                        </h1>
                    </div>
                </div>

                <div class="image-container
                    absolute bg-gradient-to-r from-transparent h-full right-0 top-0"
                    :class="backgroundColor">
                    <img class="h-full"
                        :src="`https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/marvinisaac-transparent-${imageSize}.png`">
                </div>
            </div>
        </div>
        
        <div class="p-2 text-gray-300 text-right text-xs">
            <p>
                Icons by <a href="https://www.freepik.com" title="Freepik">Freepik</a>
                from <a href="https://www.flaticon.com/" title="Flaticon">Flaticon</a>.
            </p>
        </div>
    </div>
</template>

<script>
// Source: https://www.digitalocean.com/community/tutorials/vuejs-vue-router-modify-head
import { useRoute } from 'vue-router'
import meta from './../AppMeta.js'

export default {
    data: () => ({
        route: useRoute(),
        imageSize: 400,
        backgroundColor: undefined,
        meta: {
            title: 'Marvin Isaac | Developer - Writer',
            tags: [
                {
                    property: 'og:title',
                    content: 'Marvin Isaac | Developer - Writer'
                }, {
                    property: 'og:url',
                    content: 'https://marvinisaac.com'
                }, {
                    name: 'description',
                    content: 'Marvin Isaac is a developer from the Philippines. He is also working to be a published writer.'
                }, {
                    property: 'og:description',
                    content: 'Marvin Isaac is a developer from the Philippines. He is also working to be a published writer.'
                }, {
                    property: 'og:image',
                    content: 'https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/marvinisaac-1000.jpg'
                }, {
                    property: 'twitter:card',
                    content: 'summary'
                }, {
                    property: 'twitter:site',
                    content: '@marvinisaac'
                }, {
                    property: 'twitter:title',
                    content: 'Marvin Isaac | Developer - Writer'
                }, {
                    property: 'twitter:description',
                    content: 'Marvin Isaac is a developer from the Philippines. He is also working to be a published writer.'
                }, {
                    property: 'twitter:image',
                    content: 'https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/marvinisaac-1000.jpg'
                }
            ]
        }
    }),
    created() {
        this.backgroundColor = this.setBackgroundColor()
    },
    mounted() {
        if (window.innerWidth < 480) {
            this.imageSize = 200
        }
        if (this.route.path === '/') {
            meta.update(this.meta)
        }
    },
    methods: {
        setBackgroundColor() {
            const colors = [
                'gray',
                'red',
                'yellow',
                'green',
                'blue',
                'indigo',
                'purple',
                'pink',
            ]
            let randomIndex = Math.floor(Math.random() * colors.length)
            let randomColor = colors[randomIndex]
            return `to-${randomColor}-300`
        }
    }
}
</script>

<style scoped>
.card-container {
    padding-top: 62%;
}
</style>
