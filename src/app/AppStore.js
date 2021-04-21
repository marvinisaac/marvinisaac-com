import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            tags: [],
            page: {
                current: 1,
                limit: 1
            }
        }
    },
    mutations: {
        tagAdd (state, tag) {
            if (!state.tags.includes(tag) && tag !== '') {
                state.tags.push(tag)
                state.tags.sort()
            }
        },
        tagRemove (state, tag) {
            const index = state.tags.indexOf(tag)
            if (index > -1) {
                state.tags.splice(index, 1)
            }
        },
        tagClear (state) {
            state.tags = []
        },
        pageMoveTo (state, page) {
            state.page.current = parseInt(page)
        },
        pageSetLimit (state, limit) {
            state.page.limit = limit
        }
    }
})

export default store
