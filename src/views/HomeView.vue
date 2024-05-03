<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import itemService from "@/services/itemService.js";

export default {
    name: "HomeView",
    components: {
        HelloWorld,
    },
    data() {
        return {
            items: [],
        };
    },
    async created() {
        try {
            // Recherche des tâches et remplissage du tableau todos
            this.items = await itemService.get();
            console.log(this.items);
        } catch (error) {
            console.log("Erreur " + error);
        }
    },
};
</script>
