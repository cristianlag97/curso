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
                <!-- <v-btn color="primary" dark class="mb-2" @click="dialog=true"><v-icon>mdi-plus-thick</v-icon></v-btn> -->

                <v-dialog v-model="dialog" persistent max-width="500px">
                <template v-slot:activator="{on, attrs}">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"><v-icon>mdi-plus-thick</v-icon></v-btn>
                </template>
                  <v-card>

                    <v-card-title primary-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="2" sm="2" md="2">
                            <v-text-field v-model="editedItem.id" label="ID" disabled></v-text-field>
                          </v-col>
                          <v-col cols="10" sm="10" md="10">
                            <v-text-field v-model="editedItem.descripcion" label="Descripción" ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-btn color="blue darken-1" dark text @click="close">Cancelar</v-btn>
                      <v-btn color="pink accent-3" dark text @click="save">Guardar</v-btn>
                    </v-card-actions>
                  </v-card>
              </v-dialog>

              </v-toolbar>
            </template>
            <template v-slot:item.actions="{item}">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:no-datañ>
              <v-btn color="primary" @click="iniciar">Reiniciar</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <!-- <Modal ref="modal" @iniciar="iniciar" :items="nuevo"/> -->
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

  items:Array<object> = []
  api:object = new ApiInv
  loading:boolean = false
  search:string = ''
  headers:Array<object> = [
    {text: 'ID', value:'id'},
    {text: 'Descripcion', sortable: true, value: 'descripcion'},
    {text: 'Acciones', value: 'actions', sortable: false}
  ]
  dialog:boolean = false
  editedIndex:number = -1
  editedItem: object = {
    id:-1,
    descripcion: ''
  }
  defaultItem:object = {
    id: -1,
    descripcion: ''
  }

  get formTitle(){
    return (this.editedIndex === -1 ? 'Nueva' : 'Editar') + ' Categoría'
  }

  async iniciar(){
    try{
      this.loading = true
      const r = await this.api.getCategorias()
      // if (Array.isArray(r) ) {
      //   // this.items = r.results
      // }
      this.items = r.results
    } catch(error){
      alert('Error')
    } finally{
      this.loading = false
    }
  }

  close(){
    this.dialog = false
    // $nextTick = este metodo garantiza que cuando se cierre el modal lo elementos que contiene se actualicen
    this.$nextTick(() => {
      // Object.assign = con esto le asignamos al editedItem para poderle asignar el defaultItem es como (a = b)
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    })
  }

  async save(){
    const obj = this.editedItem
    try {
      this.loading = true
      await this.api.saveCategoria(obj)
      this.close()
      this.iniciar()
    } catch (error) {
        alert(error)
    }finally{
      this.loading = false
    }
  }

  editItem(item:object){
    this.editedIndex = this.items.indexOf(item)
    // this.$refs.modal.show()
    this.editedItem = Object.assign({}, item)
    this.dialog = true

  }



  async deleteItem(item:object){
    this.$swal({
      title: '¿Estas seguro?',
      html: `Borrar categoría <br><b>${item.descripcion}</b>`,
      type: 'danger',
      icon:'question',
      showCancelButton: true,
      confirmButtonText:'si, Borrarlo',
      cancelButtonText: 'No, mantenerlo',
      showCloseButton: true,
      showLoaderOnConfirm: true
    }).then( async(result) => {
      if(result.value){
        await this.api.delCategoria(item.id)
        this.iniciar()
        this.$swal("Borrado", "Se borró correctamente la categoría", "success")
      } else {
        this.$swal("Cancelado", "Se mantiene correctamente la categoría", "info")
      }
    })
      this.iniciar()
  }

  //se ejecuta cuando se crea el componente
  created() {
    this.iniciar()
  }

}
</script>