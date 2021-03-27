<template>
    <div class="bg-white mb-4 overflow-hidden rounded-sm shadow-2xl">
        <profile
            :id="id"
            :created="created">
        </profile>
        <div class="container-body"
            v-html="bodyProcessed">
        </div>
        <tag-list :tag="tag"></tag-list>
    </div>
</template>

<script>
import markdown from 'markdown-it'
import Profile from './../Partial/Profile.vue'
import TagList from '../Partial/TagList.vue'

export default {
    props: {
        id: String,
        body: String,
        created: String,
        tag: Array
    },
    components: {
        Profile,
        TagList
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

            let containerText = this._createText()
            containerBody.appendChild(containerText)

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

            let link = document.createElement('a')
            link.href = `/post/${this.id}`
            link.classList.add('link')
            sharp.appendChild(link)
            return sharp
        },
        _createText() {
            let containerText = document.createElement('div')
            containerText.classList.add('container-text')

            let text = this._extractText()
            text.forEach(t => {
                containerText.append(t)
            })
            return containerText
        },
        _extractImage() {
            let domContent = new DOMParser().parseFromString(this.bodyParsed, 'text/html')
            return domContent.getElementsByTagName('img')[0].getAttribute('src')
        },
        _extractText() {
            let domContent = new DOMParser().parseFromString(this.bodyParsed, 'text/html')
            let textArray = [...domContent.getElementsByTagName('p')]
            let textOnlyArray = []
            textArray.forEach(element => {
                if (!this._hasImage(element.innerHTML)) {
                    textOnlyArray.push(element)
                }
            })
            return textOnlyArray
        },
        _hasImage(string) {
            let domTemporary = new DOMParser().parseFromString(string, 'text/html')
            return domTemporary.getElementsByTagName('img')[0] !== undefined
        }
    }
}
</script>

<style scoped>
.container-body :deep(.container-image) {
    @apply border-b border-t overflow-hidden relative w-full;
}

.container-body :deep(.container-image-blurred) {
    @apply bg-center bg-cover left-0 top-0 w-full z-0;
    filter: blur(20px)
        brightness(120%);
    padding-top: 100%;
    transform: scale(1.2);
}

.container-body :deep(.container-image-sharp) {
    @apply absolute bg-center bg-contain bg-no-repeat left-0 top-0 w-full z-10;
    padding-top: 100%;
}

.container-body :deep(.container-image-sharp .link) {
    @apply absolute block h-full left-0 top-0 w-full;
}

.container-body :deep(.container-text) {
    @apply leading-loose p-4 pb-0 text-gray-700 text-sm
        md:px-16;
}
</style>
