<template>
    <div class="flex justify-center">
        <span v-for="page in limit"
            @click="goTo(page)"
            :key="page"
            :class="{
                'current': page === current,
                'other': page !== current
            }"
            class="bg-white px-2 py-1 mx-1 rounded-md">
            {{ page }}
        </span>
    </div>
</template>

<script>
export default {
    data: () => ({
        current: undefined,
        limit: undefined
    }),
    async created() {
        this.current = this.$store.state.page.current
        this.limit = this.$store.state.page.limit
    },
    methods: {
        goTo(page) {
            if (page !== this.current) {
                this.$store.commit('pageMoveTo', page)
            }
        }
    }
}
</script>

<style scoped>
.current {
    @apply border-2 border-black cursor-default font-bold;
}

.other {
    @apply border border-gray-300 cursor-pointer
        hover:bg-gray-500 hover:text-white;
}
</style>
