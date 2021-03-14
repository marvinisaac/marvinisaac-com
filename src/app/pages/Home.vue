<template>
    <div class="container
        flex flex-col justify-center max-w-screen-sm mx-auto my-0 p-4 h-screen">

        <div class="card-container
            bg-white mx-auto my-0 relative rounded-md shadow-2xl w-full">

            <div class="card
                absolute flex flex-auto h-full items-end left-0 top-0 w-full">

                <div class="text-container
                    pb-4 pl-4
                    md:pb-6 md:pl-6">

                    <h1 class="leading-8 text-xl">
                        <a href="https://linkedin.com/in/marvinisaac">
                            <img class="h-4 inline-block"
                                src="assets/images/linkedin.svg">
                            Marvin Isaac
                        </a>
                    </h1>

                    <p class="leading-8 text-sm">
                        <span class="mr-4">
                            <a href="https://github.com/marvinisaac">
                                <img class="h-4 inline-block"
                                    src="assets/images/github.svg">
                                Developer
                            </a>
                        </span>
                    </p>

                    <p class="leading-8 text-sm">
                        <span>
                            <a href="#">
                                <img class="h-4 inline-block"
                                    src="assets/images/blog.svg">
                                Writer
                            </a>
                        </span>
                    </p>
                </div>

                <div class="image-container
                    flex-grow self-center">
                    <img src="https://hhl.sfo2.cdn.digitaloceanspaces.com/marvinisaac/brain-hemispheres.svg">
                </div>
            </div>
        </div>
        
        <div class="p-2 text-gray-600 text-right text-xs">
            <p>
                Icons by <a href="https://www.freepik.com" title="Freepik">Freepik</a>
                from <a href="https://www.flaticon.com/" title="Flaticon">Flaticon</a>.
            </p>
        </div>
    </div>
</template>

<style scoped>
.card-container {
    padding-top: 62%;
}
</style>
