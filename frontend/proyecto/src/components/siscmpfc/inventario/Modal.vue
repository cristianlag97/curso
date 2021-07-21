// <!--<template>
//   <div>
//     <v-dialog v-model="dialog" persistent max-width="500px">
//       <!-- <template v-slot:activator="{on, attrs}">
//         <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"><v-icon>mdi-add_box</v-icon></v-btn>
//       </template> -->
//         <v-card>

//           <v-card-title primary-title>
//             <span class="headline">{{ formTitle }}</span>
//           </v-card-title>

//           <v-card-text>
//             <v-container>
//               <v-row>
//                 <v-col cols="2" sm="2" md="2">
//                   <v-text-field v-model="editedItem.id" label="ID" disabled></v-text-field>
//                 </v-col>
//                 <v-col cols="10" sm="10" md="10">
//                   <v-text-field v-model="editedItem.descripcion" label="Descripción" ></v-text-field>
//                 </v-col>
//               </v-row>
//             </v-container>
//           </v-card-text>

//           <v-card-actions>
//             <v-btn color="blue darken-1" dark text @click="hidden">Cancelar</v-btn>
//             <v-btn color="pink accent-3" dark text @click="save">Guardar</v-btn>
//           </v-card-actions>
//         </v-card>
//     </v-dialog>
//   </div>
// </template>-->
/*
// import { Component, Prop, Vue } from 'vue-property-decorator';
// import {ApiInv} from './ApiInv';


// @Component({
//   components:{

//   }
// })
// export default class Modal extends Vue {
//   @Prop() private items

//   api:any = new ApiInv

//   dialog:boolean = false
//   editedIndex:number = -1
//   editedItem:object = {
//     id: -1,
//     descripcion: ''
//   }
//   defaultItem:object = {
//     id: -1,
//     descripcion: ''
//   }
//   // formTitle:string = 'Titulo'

//   get formTitle(){
//     return (this.items.id === -1 ? 'Nueva' : 'Editar') + ' Categoría'
//   }

//   show(){
//     this.dialog = true
//   }

//   hidden(){
//     this.dialog = false

//     // $nextTick = este metodo garantiza que cuando se cierre el modal lo elementos que contiene se actualicen
//     this.$nextTick(() => {
//       // Object.assign = con esto le asignamos al editedItem para poderle asignar el defaultItem es como (a = b)
//       this.editedItem = Object.assign({}, this.defaultItem)
//       this.editedIndex = -1
//     })
//   }

//   async save(item){
//     this.editedItem = this.items
//     const obj = this.editedItem
//     // console.log(obj);
//     try {
//       await this.api.saveCategoria(obj)
//       this.$emit('iniciar')
//     } catch (error) {
//       alert(error);
//     }
//       this.hidden()
//   }

// }
// </script>