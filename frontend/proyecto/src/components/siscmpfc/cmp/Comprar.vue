<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="editedEnc.id"
            append-icon="mdi-magnify"
            label="No. compra"
            disabled=""
          ></v-text-field>
        </v-col>
        <v-col>
          <v-dialog
            ref="dialog"
            v-model="dialogFecha"
            :return-value.sync="editedEnc.fecha"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="editedEnc.fecha"
                label="Fecha Compra"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="editedEnc.fecha" scrollable color="success" locale="es"
            :disabled="editedEnc.id!=-1">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="dialogFecha = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(editedEnc.fecha)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col>
          <v-autocomplete
            v-model="editedEnc.proveedor"
            :items="proveedores"
            label="Proveedor"
            item-text="nombre"
            item-value="id"
            return-object
            prepend-icon="mdi-city"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-autocomplete
            v-model="editedDetalle.producto"
            :items="productos"
            label="Producto"
            item-text="descripcion"
            item-value="id"
            return-object
            prepend-icon="mdi-city"
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-text-field
            v-model="editedDetalle.cantidad"
            append-icon="mdi-magnify"
            label="cantidad"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="editedDetalle.precio"
            append-icon="mdi-magnify"
            label="precio"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            item-key="name"
            class="elevation-1"
            dense
            :loading="loading"
            loading-text="Cargando..."
            :items="detalle"
          >
            <template slot="headers" slot-scope="props">
              <tr>
                <th v-for="header in props.headers"
                  :key="header.text"
                  :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active': '']"
                  @click="changeSort(header.value)"
                >
                  <v-icon small>mdi-upgrade</v-icon>
                  {{header.text}}
                </th>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {ApiCmp} from './ApiCmp'
import {ApiInv} from '../inventario/ApiInv'

@Component({
  components:{
  }
})
export default class Comprar extends Vue {

  hoy:string = new Date().getFullYear() + "-" + (new  Date().getMonth() + 1) + "-" + new  Date().getDate()
  loading:boolean = false
  formValido:boolean = true
  dialogFecha: boolean = false
  search:string = ''
  headers:Array<object> = [
    {text: 'ID', value: 'id'},
    {text: 'Producto', sortable: true, value: 'producto_descripcion'},
    {text: 'Cantidad', sortable: true , value: 'cantidad'},
    {text: 'Precio', sortable: false, value: 'precio'},
    {text: 'Sub total', sortable: false, value: 'subtotal'},
    {text: 'Descuento', sortable: false, value: 'descuento'},
    {text: 'Total', sortable: false, value: 'total'},
    {text: 'Acciones', sortable: false, value: 'antions'}
  ]
  textRules:Array<any> = [
    v => !! v || "requerido"
  ]

  detalle:Array<any> = []
  productos:Array<any> = []
  proveedores:Array<any> = []

  editedEnc:object = {
    id: -1,
    proveedor:{
      id:-1,
      nombre:''
    },
    fecha: new Date().getFullYear() + "-" + (new  Date().getMonth() + 1) + "-" + new  Date().getDate()
  }
  editedDetalle:object = {
    id: -1,
    cabecera: -1,
    producto: -1,
    cantidad: 0,
    precio: 0,
    subtotal: 0,
    descuento: 0,
    total: 0
  }
  api:any = new ApiCmp
  apiInv:any = new ApiInv


  async iniciar(){
    this.loading = true
    const r = await this.api.getProveedores()
    this.proveedores = r.results
    const productos = await this.apiInv.getProductos()
    this.productos = productos.results
    this.loading = false
  }

  created(){
    this.iniciar()
  }

}
</script>