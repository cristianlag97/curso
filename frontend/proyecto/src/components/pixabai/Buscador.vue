<template>
  <v-row>
    <v-col md="6">
      <v-text-field
        class="text"
        label="Outlined"
        outlined
        dense
        v-model="buscar"
        @keypress.enter="buscarHijo"
      ></v-text-field>
    </v-col>
    <v-col  md="1">
      <v-btn @click="buscarHijo">Buscar</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Buscador extends Vue {
  //data
  buscar:string = ''

  buscarHijo(){
    this.$emit('buscarDesdeHijo', this.buscar)
    this.buscar = ''
  }
}
</script>