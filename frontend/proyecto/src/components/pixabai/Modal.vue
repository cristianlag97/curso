<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="500px"
      persistent
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
            @click="closeModal"
          >
            Disagree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import { Component, Prop, Vue } from 'vue-property-decorator';

export default Vue.extend({
  props: [
    "img", "dialog"
  ],
  methods: {
    closeModal(): void{
      this.dialog = !this.dialog
    }
  },
})
// @Component
// export default class Imagen extends Vue {
//   @Prop() private dialog:boolean
//   @Prop() private img:object

//   valor:boolean = this.dialog

//   closeModal(){
//     this.dialog = !this.dialog
//   }
// }
</script>