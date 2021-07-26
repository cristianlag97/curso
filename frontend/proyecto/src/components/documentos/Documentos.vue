<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <Modal ref="modal" :item="nuevo"/>
          <Mensaje/>
          <Docs/>
          <v-progress-linear
            :active="loading.estado"
            indeterminate
            rounded
            color="deep-purple accent-4"
            height="6"
          ></v-progress-linear>
          <!-- <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            bottom
            color="deep-purple accent-4"
          ></v-progress-linear> -->
          <v-btn
            @click="abrirModal"
            color="pink"
            dark
            absolute
            bottom
            right
            fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
import Mensaje from './Mensaje.vue'
import Docs from './Docs.vue'
import Modal from './Modal.vue'

export default Vue.extend({
  components:{
    Mensaje,
    Docs,
    Modal
  },
  data() {
    return {
      prueba: [],
      nuevo: {
        id: -1,
        nombre: 'Nuevo documento',
        expira: '',
        alerta1y: true,
        alerta6m: true,
        alerta3m: true,
        alerta1m: true,
      },
      items: []
    }
  },

  mounted() {
    try {
      // this.$store.commit("mostrarLoading", "Cargando datos")
      this.$store.commit("setItems")
    } catch (error) {
      console.log(error);
    }// finally{
    //   this.$store.commit("ocultarLoading")
    // }
  },

  computed: {
    allItems(){
    return this.$store.state.items
    },

    loading(){
      return this.$store.state.loading
    }
  },

  methods: {
    abrirModal(){
      this.$refs.modal.show()
      this.nuevo = {
        id: -1,
        nombre: 'Nuevo documento',
        expira: '',
        alerta1y: true,
        alerta6m: true,
        alerta3m: true,
        alerta1m: true,
      }
    }
  },

  created() {
    this.prueba.push(this.$store.state.items)
  },
})
</script>