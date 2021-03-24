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
        <div id="container-body"
            class="ml-10 p-2
                md:pr-12"
            v-html="bleepProcessed">
        </div>
    </div>
</template>

<script>
import { format } from 'timeago.js'
import markdown from 'markdown-it'

export default {
    props: {
        id: String,
        bleep: String,
        created: String,
        isTimeline: Boolean
    },
    data: () => ({
        timeAgo: null,
        bleepParsed: null,
        bleepProcessed: null,
    }),
    async created() {
        const md = new markdown()
        this.bleepParsed = md.render(this.bleep)
        this.bleepProcessed = this.moveImage()
        this.timeAgo = format(this.created)
    },
    methods: {
        moveImage() {
            let containerBody = document.createElement('div')
            let text = this._extractText()
            text.forEach(t => {
                containerBody.append(t)
            })

            if (this._hasImage(this.bleepParsed)) {
                let containerImage = this._createImage()
                containerBody.appendChild(containerImage)
            }

            return containerBody.innerHTML
        },
        _createImage() {
            let containerImage = document.createElement('div')
            let imageUrl = this._extractImage()
            containerImage.classList.add('container-image')
            containerImage.style.backgroundImage = `url(${imageUrl})`
            return containerImage
        },
        _extractImage() {
            let domContent = new DOMParser().parseFromString(this.bleepParsed, 'text/html')
            return domContent.getElementsByTagName('img')[0].getAttribute('src');
        },
        _extractText() {
            let domContent = new DOMParser().parseFromString(this.bleepParsed, 'text/html')
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
            console.log(string)
            let domTemporary = new DOMParser().parseFromString(string, 'text/html')
            return domTemporary.getElementsByTagName('img')[0] !== undefined
        },
    }
}
</script>

<style scoped>
#container-body >>> p {
    @apply leading-relaxed mb-4;
}

#container-body >>> .container-image {
    @apply bg-center bg-cover left-0 my-4 rounded-md shadow-md top-0 w-full;
    padding-top: 56.25%;
}
</style>
