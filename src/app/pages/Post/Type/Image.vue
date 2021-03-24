<template>
    <div class="bg-white mb-4 p-4 pb-6 rounded-sm shadow-2xl">
        <profile
            :id="id"
            :created="created">
        </profile>
        <div id="container-body"
            class="ml-10 p-2
                md:pr-12"
            v-html="bodyProcessed">
        </div>
    </div>
</template>

<script>
import markdown from 'markdown-it'
import Profile from './../Partial/Profile'

export default {
    props: {
        id: String,
        body: String,
        created: String
    },
    components: {
        Profile
    },
    data: () => ({
        bodyParsed: null,
        bodyProcessed: null,
    }),
    async created() {
        const md = new markdown()
        this.bodyParsed = md.render(this.body)
        this.bodyProcessed = this.moveImage()
    },
    methods: {
        moveImage() {
            let containerBody = document.createElement('div')
            let containerImage = this._createImage()
            containerBody.appendChild(containerImage)

            return containerBody.innerHTML
        },
        _createImage() {
            let containerImage = document.createElement('div')
            containerImage.classList.add('container-image')

            let imageUrl = this._extractImage()
            let imageBlurred = this._createImageBlurred(imageUrl)
            let imageSharp = this._createImageSharp(imageUrl)
            containerImage.appendChild(imageBlurred)
            containerImage.appendChild(imageSharp)
            return containerImage
        },
        _createImageBlurred(imageUrl) {
            let blurred = document.createElement('div')
            blurred.classList.add('container-image-blurred')
            blurred.style.backgroundImage = `url(${imageUrl})`
            return blurred
        },
        _createImageSharp(imageUrl) {
            let sharp = document.createElement('div')
            sharp.classList.add('container-image-sharp')
            sharp.style.backgroundImage = `url(${imageUrl})`
            return sharp
        },
        _extractImage() {
            let domContent = new DOMParser().parseFromString(this.bodyParsed, 'text/html')
            return domContent.getElementsByTagName('img')[0].getAttribute('src');
        }
    }
}
</script>

<style scoped>
#container-body >>> .container-image {
    @apply border my-4 overflow-hidden relative rounded-md shadow-md w-full;
}

#container-body >>> .container-image-blurred {
    @apply bg-center bg-cover left-0 top-0 w-full z-0;
    filter: blur(20px)
        brightness(120%);
    padding-top: 100%;
    transform: scale(1.2);
}

#container-body >>> .container-image-sharp {
    @apply absolute bg-center bg-contain bg-no-repeat left-0 top-0 w-full z-10;
    padding-top: 100%;
}
</style>
