<template>
  <nav>
    <div class="left-section">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" class="logo-img">
      </div>
      <div class="site-name">
        <h1>ENCHERINO</h1>
      </div>
    </div>
    <div class="right-section">
      <div class="menu">
        <router-link to="/" class="menu-item">Home</router-link>
        <router-link to="/about" class="menu-item">About</router-link>
        <router-link to="/lots" class="menu-item">Lots</router-link>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<style>
nav {
  background-color: #333; /* Couleur de fond de la barre de menu */
  padding: 10px; /* Espacement intérieur de la barre de menu */
  display: flex; /* Affichage en ligne des éléments */
  justify-content: space-between; /* Espace égal entre les éléments */
  align-items: center; /* Centrage vertical */
}

.logo-img {
  height: 40px; /* Hauteur du logo */
  width: auto; /* Largeur automatique pour conserver les proportions */
}

.site-name {
  font-size: 24px; /* Taille de la police */
  color: #fff; /* Couleur du texte */
  margin-left: 10px; /* Ajout d'un espace entre le logo et le nom du site */
}


.left-section {
  display: flex; /* Affichage en ligne des éléments */
  align-items: center; /* Centrage vertical */
}

.right-section {
  display: flex; /* Affichage en ligne des éléments */
}

.menu {
  display: flex; /* Affichage en ligne des éléments */
}

.menu-item {
  margin: 0 20px; /* Marge entre les éléments du menu */
  font-size: 18px; /* Taille de la police */
  color: #fff; /* Couleur du texte */
  text-decoration: none; /* Suppression de la décoration du texte */
  transition: color 0.3s; /* Transition de couleur pour un effet de survol */
}

.menu-item:hover {
  color: #42b983; /* Changement de couleur au survol */
}
</style>
