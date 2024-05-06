<template>
    <div class="home">
        <div class="hello-world-container">
            <HelloWorld msg="Bienvenue sur Encherino" />
        </div>
        <div class="home-content">
            <div class="content-wrapper">
                <p class="subtitle">Découvrez notre plateforme d'enchères en ligne où vous pouvez trouver une large gamme de produits passionnants à des prix compétitifs. 
                    Que vous soyez un amateur d'antiquités, un collectionneur ou simplement à la recherche de bonnes affaires, 
                    Encherino est l'endroit idéal pour vous.</p>
            </div>
        </div>
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

<style>
.hello-world-container {
    text-align: center; /* Centrage horizontal */
}

.home-content {
    display: flex;
    justify-content: center; /* Centrage horizontal */
}

.content-wrapper {
    max-width: 800px; /* Largeur maximale du contenu */
    width: 100%;
}
</style>
