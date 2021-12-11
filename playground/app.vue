<script lang="ts" setup>
import type { SolarwindConfig } from 'solarwind'

const config: SolarwindConfig = {
  orientation: 'ltr',
}
</script>
<template>
  <s-app :config="config" />
</template>
