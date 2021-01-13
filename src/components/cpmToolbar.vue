<!-- Componente para navegação entre as views -->

<template>
  <div class="toolBardiv">
    <v-app-bar color="deep-purple" dark max-width="800" class="ac">
      <div class="d-flex flex-row justify-space-between mw-w-100">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
  
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item exact to="/Feed">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Feed</v-list-item-title>
          </v-list-item>

          <v-list-item exact to="/Create">
            <v-list-item-icon>
              <v-icon>mdi-book-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Novo Carro</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- </v-card> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
};
</script>