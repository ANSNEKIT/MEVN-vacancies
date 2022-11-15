<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import LayoutDefault from '@/layouts/LayoutDefault.vue'

const route = useRoute()

const layout = computed(() => route.meta.layout ?? LayoutDefault)
</script>

<template>
    <component :is="layout">
        <RouterView />
    </component>
</template>
