<template>
  <div>
    <v-alert 
      v-model="mensaje.mostrar"
      dismissible
      close-icon="mdi-delete"
      color="pink"
      dark
      border="top"
      icon="mdi-shield-lock-outline"
      transition="scale-transition"
    >
      {{mensaje.texto}}
    </v-alert>
    <v-snackbar
      v-model="mensaje.mostrar"
      shaped
      color="red"
    >
      {{ mensaje.texto }}
      <v-btn icon @click.native="mensaje.mostrar = false"><v-icon>mdi-delete-clock</v-icon></v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Documentos extends Vue {
  name:'Mensaje'

  get mensaje(){
    return this.$store.state.mensaje
  }

}
</script>