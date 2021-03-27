<template>
    <div class="bg-white mb-4 rounded-sm shadow-2xl">
        <profile
            :id="id"
            :created="created">
        </profile>
        <div class="container-body
            px-4 py-0
            md:px-16"
            v-html="bleepProcessed">
        </div>
        <tag-list :tag="tag"></tag-list>
    </div>
</template>

<script>
import markdown from 'markdown-it'
import Profile from './../Partial/Profile.vue'
import TagList from '../Partial/TagList.vue'
import { emojify } from 'node-emoji'

export default {
    props: {
        id: String,
        bleep: String,
        created: String,
        tag: Array
    },
    components: {
        Profile,
        TagList
    },
    data: () => ({
        bleepParsed: null,
        bleepProcessed: null,
    }),
    async created() {
        const md = new markdown()
        this.bleepParsed = md.render(this.bleep)
        this.bleepProcessed = this.moveImage()
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
            
            let link = document.createElement('a')
            link.href = `/post/${this.id}`
            link.classList.add('link')
            containerImage.appendChild(link)
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
                    element.innerHTML = emojify(element.innerHTML)
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
.container-body :deep(p) {
    @apply leading-relaxed mb-4;
}

.container-body :deep(p:last-of-type) {
    @apply mb-0;
}

.container-body :deep(.container-image) {
    @apply bg-center bg-cover left-0 mt-4 rounded-md relative shadow-md top-0 w-full;
    padding-top: 56.25%;
}

.container-body :deep(.container-image .link) {
    @apply absolute block h-full left-0 top-0 w-full;
}
</style>
