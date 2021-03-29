const meta = {
    update(meta) {
        // Remove any stale meta tags from the document using the key attribute we set below.
        Array.from(document.querySelectorAll('[vue-controlled]'))
            .map(el => el.parentNode.removeChild(el))

        document.title = meta.title
        meta.tags.map(tagDetail => {
            const tag = document.createElement('meta')

            Object.keys(tagDetail).forEach(key => {
                tag.setAttribute(key, tagDetail[key])
            })

            tag.setAttribute('vue-controlled', '')
            return tag
        })
            .forEach(tag => document.head.appendChild(tag))
    }
}

export default meta
