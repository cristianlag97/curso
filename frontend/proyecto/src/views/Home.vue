<template>
  <div>
    <Pixabai />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Pixabai from '@/components/pixabai/pixabai.vue';

@Component({
  components: {
    Pixabai
  },
})
export default class Home extends Vue {}
</script>
