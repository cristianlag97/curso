<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            :loading="loading"
            loading-text='Cargando...'
            :search="search"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Categoría</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="warning" dark class="mb-2" @click="iniciar"><v-icon>mdi-cached</v-icon></v-btn>
                <v-btn color="primary" dark class="mb-2" @click="abrirModal"><v-icon>mdi-plus-thick</v-icon></v-btn>
              </v-toolbar>
            </template>
            <template v-slot:no-datañ>
              <v-btn color="primary" @click="iniciar">Reiniciar</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <Modal ref="modal"/>
    </v-container>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {ApiInv} from './ApiInv';
import Modal from './Modal.vue'


@Component({
  components:{
    Modal
  }
})
export default class Categoria extends Vue {

  items:Array<any> = []
  api:any = new ApiInv
  loading:boolean = false
  search:string = ''
  headers:Array<any> = [
    {text: 'ID', value:'id'},
    {text: 'Descripcion', sortable: true, value: 'descripcion'}
  ]


  async iniciar(){
    try{
      this.loading = true
      let r = await this.api.getCategorias()
      this.items = r
    } catch(error){
      alert('Error')
    } finally{
      this.loading = false
    }
  }
  abrirModal(){
    this.$refs.modal.show()
  }
  //se ejecuta cuando se crea el componente
  created() {
    this.iniciar()
  }

}
</script>