<template>
  <div>
    <v-dialog :v-model="dialog" max-width="500px">
      <template v-slot:activator="{on, attrs}">
        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"><v-icon>mdi-add_box</v-icon></v-btn>
      </template>
        <v-card>
          
          <v-card-title primary-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="2" sm="2" md="2">
                  <v-text-field v-model="editedItem.id" ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          
          <v-card-actions>
            <v-btn flat color="primary">text</v-btn>
            <v-btn flat color="primary">text</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {ApiInv} from './ApiInv';


@Component({
  components:{
    
  }
})
export default class Modal extends Vue {
 
  dialog:boolean = true

}
</script>