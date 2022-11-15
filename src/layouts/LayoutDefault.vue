<template>
    <div class="layout">
        <TheNavbar class="layout__navbar" />
        <slot />
    </div>
</template>

<script setup lang="ts">
import TheNavbar from '@/components/TheNavbar.vue'
</script>

<style lang="scss" scoped>
.layout {
    height: inherit;
    min-height: 100%;
}
</style>
