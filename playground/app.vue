<script lang="ts" setup>
import { solar } from 'solarwind/presets'
</script>
<template>
  <s-app :config="solar">
    {{ solar.orientation }}
  </s-app>
</template>
