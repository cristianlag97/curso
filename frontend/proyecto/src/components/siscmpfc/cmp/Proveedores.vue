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
                <v-toolbar-title>Proveedores</v-toolbar-title>
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

                  <v-form ref="form" v-model="formValido" lazy-validation>
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
                              <v-text-field v-model="editedItem.nombre" :rules="textRules" label="Nombre" ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col >
                              <v-text-field v-model="editedItem.telefono" label="Teléfono" ></v-text-field>
                            </v-col>
                            <v-col>
                              <v-text-field v-model="editedItem.email" :rules="emailRules" label="E-mail" ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                        <v-btn color="pink accent-3" :disabled="!formValido" text @click="save">Guardar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-form>
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
import Vue from 'vue';
import {ApiCmp} from './ApiCmp';

export default Vue.extend({
  data() {
    return {
      items: [],
      api: new ApiCmp,
      loading: false,
      search: '',
      headers: [
        {text: 'ID', value:'id'},
        {text: 'Nombre', sortable: true, value: 'nombre'},
        {text: 'Teléfono', value: 'telefono', sortable: true},
        {text: 'E-mail', value: 'email', sortable: false},
        {text: 'Acciones', value: 'actions', sortable: false}
      ],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        id:-1,
        nombre: '',
        telefono: '',
        email: ''
      },
      defaultItem: {
        id:-1,
        nombre: '',
        telefono: '',
        email: ''
      },
      emailRules: [
        v => !! v || "E-mail is requerido",
        v => /.+@+/.test(v) || "E-mail debe ser valido"
      ],
      textRules: [
        v => !! v || "requerido"
      ],
      formValido: true
    }
  },

  computed: {
    formTitle(){
      return (this.editedIndex === -1 ? 'Nuevo' : 'Editar') + ' Proveedor'
    }
  },

  methods: {
    async iniciar(){
      try{
        this.loading = true
        let r = await this.api.getProveedores()
        this.items = r.results
      } catch(error){
        this.$swal({
          title: 'Error!',
          text: error.toString(),
          icon:'error'
        })
      } finally{
        this.loading = false
      }
    },

    close(): void{
      this.dialog = false
      // $nextTick = este metodo garantiza que cuando se cierre el modal lo elementos que contiene se actualicen
      this.$nextTick(() => {
        // Object.assign = con esto le asignamos al editedItem para poderle asignar el defaultItem es como (a = b)
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save(){

      const obj = this.editedItem

      if(obj.nombre.length<=3){
        this.$swal({
          title: 'Error!',
          text: "Nombre proveedor debe tener al menos 4 caracteres",
          icon:'error'
        })
        return false
      }

      try {
        this.loading = true
        await this.api.saveProveedor(obj)
        this.close()
        this.iniciar()
        this.$swal({
          text: 'Guardado correctamente',
          icon:'success'
        })
      } catch (error) {
        this.$swal({
          title: 'Error!',
          text: error.toString(),
          icon:'error'
        })
      }finally{
        this.loading = false
      }
    },

    editItem(item): void{
      this.editedIndex = this.items.indexOf(item)
      // this.$refs.modal.show()
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async deleteItem(item){
      this.$swal({
        title: '¿Estas seguro?',
        html: `Borrar el proveedor <br><b>${item.nombre}</b>`,
        type: 'danger',
        icon:'question',
        showCancelButton: true,
        confirmButtonText:'si, Borrarlo',
        cancelButtonText: 'No, mantenerlo',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then( async(result) => {
        if(result.value){
          await this.api.delProveedor(item.id)
          this.iniciar()
          this.$swal("Borrado", "Se borró correctamente el producto", "success")
        } else {
          this.$swal("Cancelado", "Se mantiene correctamente el producto", "info")
        }
      })
        this.iniciar()
    }
  },

  //se ejecuta cuando se crea el componente
  created() {
    this.iniciar()
  }
})
</script>