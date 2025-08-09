<template>
  <span
    :class="[
      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
      bgColor,
      textColor
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  bgColor: string
  textColor: string
}

defineProps<Props>()
</script>