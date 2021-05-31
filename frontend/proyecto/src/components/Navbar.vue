<template>
  <div>
    <!-- Navbar -->
    <v-toolbar dense dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Navegation drawer -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="../assets/cristian.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Cristian Laguna</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

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
    <!-- <Navegation :drawer="drawer"/> -->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Navegation from './Navegation.vue'

@Component({
  components:{
    Navegation
  }
})
export default class Navbar extends Vue {
  
  drawer:boolean = false

  menu:Array<any> = [
    {ruta: '/', nombre: 'Inicio', icono:'mdi-home'},
    {ruta: '/docs', nombre: 'Documentos', icono:'mdi-folder'},
  ]

  variaboeRandom:string = ''  
}
</script>
<style>