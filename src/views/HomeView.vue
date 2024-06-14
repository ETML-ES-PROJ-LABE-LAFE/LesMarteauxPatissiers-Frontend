<template>
    <div class="home">
      <div class="home-header">
        <h1>Bienvenue sur Encherino</h1>
        <p>Découvrez notre plateforme d'enchères en ligne où vous pouvez trouver une large gamme de produits passionnants à des prix compétitifs. 
            Que vous soyez un amateur d'antiquités, un collectionneur ou simplement à la recherche de bonnes affaires, 
            Encherino est l'endroit idéal pour vous.</p>
      </div>
      <div class="home-content">
        <div class="content-wrapper">
          <HelloWorld />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import HelloWorld from "@/components/HelloWorld.vue";
  import ItemService from "@/services/ItemService.js";
  
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
        this.items = await ItemService.get();
        console.log(this.items);
      } catch (error) {
        console.log("Erreur " + error);
      }
    },
  };
  </script>
  
  <style scoped>
  .home {
    padding: 20px;
  }
  
  .home-header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .home-header h1 {
    color: #333;
    font-size: 2.5em;
    margin-bottom: 10px;
  }
  
  .home-header p {
    color: #666;
    margin-top: 10px;
    font-size: 1.2em;
  }
  
  .home-content {
    display: flex;
    justify-content: center; 
  }
  
  .content-wrapper {
    max-width: 800px; 
    width: 100%;
  }
  </style>
  