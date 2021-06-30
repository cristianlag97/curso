<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
        ></v-text-field>
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
          :loading="loading"
          loading-text='Cargando...'
          :search="search"
        >
          <template v-slot:no-data>
            <v-btn color="primary" @click="iniciar">Reiniciar</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {ApiInv} from './ApiInv';


@Component({
  components:{
    
  }
})
export default class Categoria extends Vue {

  items:Array<any> = []
  api:any = new ApiInv
  search:string = ''
  headers:Array<any> = [
    {text: 'ID', value:'id'},
    {text: 'Descripcion', value: 'descripcion'}
  ]

  async iniciar(){
    let r = await this.api.getCategorias()
    this.items = r
  }
  //se ejecuta cuando se crea el componente
  created() {
    this.iniciar()
  }
    
}
</script>