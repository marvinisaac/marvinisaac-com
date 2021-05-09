<template>
    <div class="bg-white border-b border-gray-300 h-16 fixed left-0 top-0 w-full z-50">
        <div class="flex h-full justify-between max-w-screen-md mx-auto">
            <div class="flex-shrink-0 h-full p-2">
                <router-link class="h-full"
                    to="/">
                    <img class="h-full"
                        src="https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/m-small.jpg">
                </router-link>
            </div>

            <div v-if="title !== undefined"
                class="self-center prose">
                <h3> {{ title }} </h3>
            </div>

            <div class="flex flex-shrink-0 h-full p-6 pl-0">
                <a class="h-full ml-4"
                    href="https://github.com/marvinisaac">
                    <img class="h-full"
                        src="https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/github.svg">
                </a>
                <a class="h-full ml-4"
                    href="https://linkedin.com/in/marvinisaac">
                    <img class="h-full"
                        src="https://one.sgp1.cdn.digitaloceanspaces.com/marvinisaac/linkedin.svg">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>
