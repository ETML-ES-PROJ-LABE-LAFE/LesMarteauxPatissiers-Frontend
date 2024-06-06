import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";

// Import FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//createApp(App).use(router).mount("#app");

// Ajouter l'icône à la bibliothèque
library.add(faHandPointer);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon) // Enregistrer le composant FontAwesome
  .use(router)
  .mount("#app");
