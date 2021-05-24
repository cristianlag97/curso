<template>
  <div>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-img
          @click="showModal"
          v-bind="attrs"
          v-on="on"
          :id="img.id" :src="img.previewURL"
        ></v-img>
      </template>
      <span>{{ img.tags }}</span>
    </v-tooltip>

    <!-- <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline" href>
          {{img.tags}}
        </v-card-title>

        <v-card-text>
          <v-img
            :id="img.id" :src="img.previewURL"
          ></v-img>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <Modal :img="img" :dialog.sync="dialog"/>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Modal from './Modal.vue'

@Component({
  components:{
    Modal
  }
})
export default class Imagen extends Vue {
  @Prop() private img

  dialog:boolean = false

  showModal(){
    this.dialog = true
  }
}
</script>
