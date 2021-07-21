<template>
  <div>
    <v-card class="color-fondo">
      <v-card-title>
        <h1 class="font-wight-bold display-6 color-text">Sistema de compras y facturación</h1>
      </v-card-title>
      <v-tabs>
        <v-tab>Inventario</v-tab>
        <v-tab>Compra</v-tab>
        <v-tab>Facturación</v-tab>

        <v-tab-item><Inventario/></v-tab-item>
        <v-tab-item><Compras/></v-tab-item>
        <v-tab-item>Detalle modulo facturación</v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Inventario from './inventario/Inventario.vue'
import Compras from './cmp/Compras.vue'

@Component({
  components:{
    Inventario,
    Compras
  }
})
export default class Principal extends Vue {

}
</script>
<style>
  .color-fondo{
    background-color: #FFFBE6 !important;
  }

  .color-text{
    color: #356859 !important;
  }
</style>