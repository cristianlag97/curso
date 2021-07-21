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
                <v-toolbar-title>Productos</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="warning" dark class="mb-2" @click="iniciar"><v-icon>mdi-cached</v-icon></v-btn>
                <!-- <v-btn color="primary" dark class="mb-2" @click="dialog=true"><v-icon>mdi-plus-thick</v-icon></v-btn> -->

                <v-dialog v-model="dialog" max-width="100%" dense persistent>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"><v-icon>mdi-plus-thick</v-icon></v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="2" >
                            <v-text-field v-model="editedItem.id" label="ID" disabled="" ></v-text-field>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field v-model="editedItem.codigo" label="Código"></v-text-field>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field v-model="editedItem.descripcion" label="Descripción"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-autocomplete
                              v-model="editedItem.subcategoria"
                              :items="subcategorias"
                              label="Sub Categorías"
                              item-text="descripcion"
                              item-value="id"
                              return-object
                            ></v-autocomplete>
                          </v-col>
                          <v-col>
                            <v-text-field v-model="editedItem.existencia" label="Existencia" disabled></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field v-model="editedItem.precio" label="Precio"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                      <v-btn color="pink accent-3" text @click="save">Guardar</v-btn>
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
export default class Producto extends Vue {

  items:Array<any> = []
  api:any = new ApiInv
  loading:boolean = false
  search:string = ''
  headers:Array<any> = [
    {text: 'ID', value:'id'},
    {text: 'Código', sortable: true, value: 'codigo'},
    {text: 'Descripcion', sortable: true, value: 'descripcion'},
    {text: 'Existencias', sortable: false, value: 'exitencias'},
    {text: 'Precio', sortable: false, value: 'precio'},
    {text: 'Sub Categoría', sortable: false, value: 'scat_descripcion'},
    {text: 'Acciones', value: 'actions', sortable: false}
  ]
  dialog:boolean = false
  editedIndex:number = -1
  editedItem: object = {
    id:-1,
    codigo:"",
    descripcion: "",
    existencia:0,
    precio:0,
    subcategoria:{id:-1, descripcion:""}
  }
  defaultItem:object = {
    id:-1,
    codigo:"",
    descripcion: "",
    existencia:0,
    precio:0,
    subcategoria:{id:-1, descripcion:""}
  }

  subcategorias:Array<Object> = []

  get formTitle(){
    return (this.editedIndex === -1 ? 'Nueva' : 'Editar') + ' Producto'
  }


  async iniciar(){
    try{
      this.loading = true
      const r = await this.api.getProductos()
      this.items = r.results

      const subcategorias = await this.api.getSubCategorias()
      this.subcategorias = subcategorias.results

    } catch(error){
      // this.$swal('Error', error.toString())
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

    const cp = this.editedItem;
    const cat = cp["subcategoria"];
    let idCat = null;

    if(cat["id"]!==undefined){
      idCat = cat["id"]
    }
    else{
      idCat = cat;
    }
    // console.log(cat);
    const obj = {
      "id":cp["id"],
      "codigo":cp["codigo"],
      "descripcion":cp["descripcion"],
      "existencia":cp["existencia"],
      precio:cp["precio"],
      "subcategoria": idCat,
      "subcategoria_id": idCat,
    }

    try {
      this.loading = true
      await this.api.saveProducto(obj)
      this.close()
      this.iniciar()
    } catch (error) {
        alert(error)
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
    // if(confirm('¿Borrar Sub categoría?')){
    //   await this.api.delProducto(item.id)
    // }

      this.$swal({
      title: '¿Estas seguro?',
      html: `Borrar producto <br><b>${item.descripcion}</b>`,
      type: 'danger',
      icon:'question',
      showCancelButton: true,
      confirmButtonText:'si, Borrarlo',
      cancelButtonText: 'No, mantenerlo',
      showCloseButton: true,
      showLoaderOnConfirm: true
    }).then( async (result) => {
        if(result.value){
          await this.api.delProducto(item.id)
          this.iniciar()
          this.$swal("Borrado", "Se borró correctamente el producto", "success")
        } else {
          this.$swal("Cancelado", "Se mantiene correctamente el producto", "info")
        }
    })
  }

  //se ejecuta cuando se crea el componente
  created() {
    this.iniciar()
  }

}
</script>