<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
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
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {
  @Prop() private drawer

  menu:Array<any> = [
    {ruta: '/', nombre: 'Inicio', icono:'mdi-folder'},
    {ruta: '/about', nombre: 'About', icono:'mdi-folder'},
  ]

  mounted() {
    console.log(this.drawer)
  }
  
}
</script>
<style>