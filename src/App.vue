<script setup>
import { CheckCircleIcon, CogIcon, PencilAltIcon } from '@heroicons/vue/outline'
import { usePWA } from '/src/utils/pwa'

const routes = [
  { path: '/notes', name: 'Заметки', icon: PencilAltIcon },
  { path: '/todos', name: 'Задачи', icon: CheckCircleIcon },
  { path: '/settings', name: 'Настройки', icon: CogIcon },
]

const pwa = usePWA()
pwa.check()
</script>

<template>
  <div class="h-screen w-screen flex flex-row bg-stone-800 text-white">
    <div class="flex flex-col grow pb-20 sm:pb-0">
      <Suspense>
        <RouterView />
        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </div>
  </div>
</template>

<style scoped>

</style>
