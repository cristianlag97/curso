<template>
  <v-container>
    <!-- <v-row>
      <v-col md="6">
        <v-text-field
          class="text"
          label="Outlined"
          outlined
          dense
          v-model="buscar"
          @keypress.enter="buscarImagen"
        ></v-text-field>
      </v-col>
      <v-col  md="1">
        <v-btn @click="buscarImagen">Buscar</v-btn>
      </v-col>
    </v-row> -->
    <Buscador @buscarDesdeHijo="realizaBusqueda" />
    <v-row>
      <v-col v-for="img in pixaImagen" :key="img.id" md="2" class="py-5">
        <!-- <v-img
          :id="img.id" :src="img.previewURL"
        ></v-img> -->
        <Imagen :img="img"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-pagination
          v-model="currentPage"
          :length="perPage"
          @input="buscarImagen"
          v-if="rows>0"
        ></v-pagination>
        <v-alert
          v-else
          border="right"
          color="red"
          type="error"
        >Busqueda de <strong>{{ buscar }}</strong> no tiene valores</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ServicioApi from './ServicioApi'
import Imagen from './Imagen.vue'
import Buscador from './Buscador.vue'

@Component({
  components:{
    Imagen,
    Buscador
  }
})
export default class Pixabai extends Vue {
            
  //data
  pixaImagen:Array<any> = [] 
  buscar:string = ''
  
  currentPage:number=1
  rows:number=1
  perPage:number=20

  //methods
  async buscarImagen(){
    // this.buscar = buscar
    const consulta = await ServicioApi.getImagines(this.buscar, this.currentPage)
    this.pixaImagen = consulta.hits
    // console.log(consulta);
    // this.buscar = ''
    this.rows = consulta.total / this.perPage
  }

  realizaBusqueda(buscar:string=""){
    this.buscar = buscar
    this.buscarImagen()
    this.currentPage = 1
  }

  async mounted() {
    this.buscarImagen()
  }
}
</script>

<style>
  .promary--text{
    color: #0064ba !important;
  }
</style>