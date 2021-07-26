<template>
  <div>
    <v-toolbar color="teal" dark>
      <v-toolbar-title>Expiración de documento</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-list two-line>
      <template v-for="item in allItems">
        <Item :key="item.id" :item="item" :items="allItems" />
      </template>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Item from './Item.vue'

export default Vue.extend({
  components:{
    Item
  },
  computed: {
    allItems(){
      return this.$store.state.items
    }
  },
})

</script>