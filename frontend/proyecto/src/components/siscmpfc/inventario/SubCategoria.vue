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
                <v-toolbar-title>Sub-Categoría</v-toolbar-title>
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
                          <v-col cols="2">
                            <v-text-field v-model="editedItem.id" label="ID" disabled></v-text-field>
                          </v-col>
                          <v-col cols='5'>
                            <v-autocomplete
                              v-model="editedItem.categoria"
                              :items="categorias"
                              label="Categorías"
                              item-text="descripcion"
                              item-value="id"
                              return-object
                            ></v-autocomplete>
                          </v-col>
                          <v-col cols="5">
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
            <template v-slot:no-data>
              <v-btn color="primary" @click="iniciar">Reiniciar</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <p>DATOS:</p>
      <p>{{items}}</p>
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
export default class SubCategoria extends Vue {

  items:Array<object> = []
  api:any = new ApiInv
  loading:boolean = false
  search:string = ''
  headers:Array<any> = [
    {text: 'ID', value:'id'},
    {text: 'Categoría', sortable: true, value: 'cat_descripcion'},
    {text: 'Descripcion', sortable: true, value: 'descripcion'},
    {text: 'Acciones', value: 'actions', sortable: false}
  ]
  dialog:boolean = false
  editedIndex:number = -1
  editedItem: object = {
    id:-1,
    categoria:{id:-1, descripcion:''},
    descripcion: ''
  }
  defaultItem:object = {
    id: -1,
    categoria:{id:-1, descripcion:''},
    descripcion: ''
  }

  categorias:Array<any> = []

  get formTitle(){
    return (this.editedIndex === -1 ? 'Nueva' : 'Editar') + ' Sub Categoría'
  }

  async iniciar(){
    try{
      this.loading = true
      const r = await this.api.getSubCategorias()
      if (Array.isArray(r) ) {
        // this.items = r.results
        console.log('Holaq')
      }
        this.items = r.results
        console.log(this.items)

      this.categorias = await this.api.getCategorias()

    } catch(error){
      this.$swal('Error', error.toString())
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

    const cp = this.editedItem
    const cat = cp["categoria"]
    let idCat = null

    if(cat["id"]!==undefined){
      idCat = cat["id"]
    } else{
      idCat = cat
    }

    // const obj = this.editedItem

    const obj = {
      id: cp["id"],
      categoria: idCat,
      descripcion: cp["descripcion"]
    }

    try {
      this.loading = true
      await this.api.saveSubCategoria(obj)
      this.close()
      this.iniciar()
    } catch (error) {
        this.$swal('Error', error.toString())
    }finally{
      this.loading = false
    }
  }

  editItem(item){
    this.editedIndex = this.items.indexOf(item)
    // this.$refs.modal.show()
    this.editedItem = Object.assign({}, item)
    this.dialog = true

  }



  async deleteItem(item){
    this.$swal({
      title: '¿Estas seguro?',
      html: `Borrar subcategoría <br><b>${item.descripcion}</b>`,
      type: 'danger',
      icon:'question',
      showCancelButton: true,
      confirmButtonText:'si, Borrarlo',
      cancelButtonText: 'No, mantenerlo',
      showCloseButton: true,
      showLoaderOnConfirm: true
    }).then( async(result) => {
      if(result.value){
        await this.api.delSubCategoria(item.id)
        this.iniciar()
        this.$swal("Borrado", "Se borró correctamente la subcategoria", "success")
      } else {
        this.$swal("Cancelado", "Se mantiene correctamente la subcategoria", "info")
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