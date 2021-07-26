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
        <SubCategoria v-if="opt===2"/>
        <Producto v-if="opt===3" />
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Categoria from './Categoria.vue'
import SubCategoria from './SubCategoria.vue'
import Producto from './Producto.vue'

export default Vue.extend({
  components:{
    Categoria,
    SubCategoria,
    Producto
  },
  data() {
    return {
      collapseOnScroll: true,
      opt:null
    }
  },
  methods: {
    chooseOpt(opt){
      this.opt = opt
    }
  },
})

</script>