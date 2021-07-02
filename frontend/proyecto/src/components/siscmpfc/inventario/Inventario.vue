<template>
  <div>
    <v-row>
      <v-col>
        <v-app-bar
          :collapse="!collapseOnScroll"
          :collapse-on-scroll="collapseOnScroll"
          absolute
          dark
          scroll-target="#scrolling-techniques-6"
          elevate-on-scroll
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title>Modulo de Inventario</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn icon @click="chooseOpt(1)">
            <v-icon>mdi-tab</v-icon>
          </v-btn>
          <v-btn icon @click="chooseOpt(2)">
            <v-icon>mdi-view-list-outline</v-icon>
          </v-btn>
          <v-btn icon @click="chooseOpt(3)">
            <v-icon>mdi-view-comfy</v-icon>
          </v-btn>
        </v-app-bar>
        <v-sheet id="scrolling-techniques-6" class="overflow-y-auto" max-height="600">
          <v-container style="height: 60px;"></v-container>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Categoria v-if="opt===1"/>
        <p v-if="opt===2">Sub Categoría</p>
        <p v-if="opt===3">Producto</p>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Categoria from './Categoria.vue'


@Component({
  components:{
    Categoria
  }
})
export default class Inventario extends Vue {

  collapseOnScroll:boolean = true
  opt:any=null

  chooseOpt(opt){
    this.opt = opt
  }

}
</script>