<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-navigation-drawer
        v-model="mostrarMenu"
        expand-on-hover
        temporary
        absolute
        :mini-variant="miniVariant"
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="./assets/cristian.jpg"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="title">
                Tienda Virtual
              </v-list-item-title>
              <v-list-item-subtitle>Cristian Laguna</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav dense>
          <div v-for="m in menu" :key="m.id">
            <router-link :to="m.ruta">
              <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>{{ m.icono }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>{{m.nombre}}</v-list-item-title>
              </v-list-item>
            </router-link>
          </div>
        </v-list>
      </v-navigation-drawer>

      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Navbar from './components/Navbar.vue'

@Component({
  components:{
    Navbar
  }
})
export default class App extends Vue {

  menu:Array<any> = [
    {ruta: '/', nombre: 'Inicio', icono:'mdi-folder'},
    {ruta: '/about', nombre: 'About', icono:'mdi-folder'},
  ]

  miniVariant:boolean = true
  mostrarMenu:boolean = false


}
</script>
<style>
  a:link{
    text-decoration:none;
  }
</style>
