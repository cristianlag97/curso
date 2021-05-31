<template>
  <div class="about">
    <Documentos/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Documentos from '@/components/documentos/Documentos.vue'

@Component({
  components:{
    Documentos
  }
})
export default class About extends Vue {

}
</script>