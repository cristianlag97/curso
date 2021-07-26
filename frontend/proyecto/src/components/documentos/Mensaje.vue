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
import Vue from 'vue'

export default Vue.extend({
  name:'Mensaje',

  mounted() {
    return this.$store.state.mensaje
  }
})

</script>