import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            tags: []
        }
    },
    mutations: {
        tagAdd (state, tag) {
            if (!state.tags.includes(tag)) {
                state.tags.push(tag)
                state.tags.sort()
            }
        },
        tagRemove (state, tag) {
            const index = state.tags.indexOf(tag)
            if (index > -1) {
                state.tags.splice(index, 1)
            }
        }
    }
})

export default store
