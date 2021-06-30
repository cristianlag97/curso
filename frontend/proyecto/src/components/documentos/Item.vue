<template>
  <div>
      <Modal ref="modal" :item="item"/>
      <v-list-item ripple>
        <v-btn @click="borrarDocumento" text icon color="red lighten-2">
          <v-icon>mdi-delete-forever</v-icon>
        </v-btn>
        <v-btn @click="abrirModal" icon color="green lighten-2">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-list-item-content>
          <v-list-item-title class="text--primary">{{ item.nombre }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.expira }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ faltan(item.expira) }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>{{ item.id }}</v-list-item-action-text>
          <v-icon v-if="!expirado(item.expira)" color="green lighten-2">mdi-check-outline</v-icon>
          <v-icon v-else color="red lighten-1">mdi-alert</v-icon>
        </v-list-item-action>
      </v-list-item>

      <v-divider :key="`divider-${item.id}`"></v-divider>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment'
import Modal from './Modal.vue'

@Component({
  components:{
    Modal
  }
})
export default class Item extends Vue {
  @Prop() private item: any
  @Prop() private items: any

  borrarDocumento(){
    let id = this.item.id
    try {
      this.$store.commit('mostrarLoading', 'Cargando item')
      this.$store.commit('borrarDoc', this.item.id)
      this.$store.commit('setItems')
    } catch (error) {
      console.log(error);
    } finally{
      this.$store.commit('ocultarLoading')
    }
  }

  expirado(f){
    return Date.parse(f) <= Date.now() ? true: false
  }

  faltan(f){
    let vence = moment(f)
      const hoy = moment(Date.now())
      const annios = vence.diff(hoy, 'year')
      hoy.add(annios, "years")
      const meses = vence.diff(hoy, 'months')
      hoy.add(meses, "mounths")
      const dias = vence.diff(hoy, 'days')
      hoy.add(dias, "days")
      const rs = annios + ' años ' + meses + ' meses ' + dias + ' dias'
    return this.expirado(f)
      ? "Expiró hace " + rs.replace(/-/g, "")
      :"Faltan: " + rs

  }

  abrirModal(){
    this.$refs.modal.show()
  }

}
</script>