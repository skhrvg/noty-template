<script setup>
import { DownloadIcon } from '@heroicons/vue/outline'
import { usePWA } from '/src/utils/pwa'

const pwa = usePWA()
</script>

<template>
  <div class="max-w-screen-lg w-full grow mx-auto overflow-x-hidden px-6 space-y-6">
    <div v-if="pwa.isInstallable.value" class="border border-stone-700 bg-stone-900 p-6 flex flex-col rounded-2xl">
      <div class="flex flex-row pb-4 font-semibold">
        Установите приложение на свое устройство для более удобного использования.
      </div>
      <div class="flex flex-row md:justify-end">
        <button
          class="flex flex-row space-x-3 font-medium px-4 py-2 bg-stone-600 hover:bg-stone-700 rounded-xl shadow duration-200 grow md:grow-0 justify-center"
          @click="pwa.prompt()"
        >
          <DownloadIcon class="w-6 h-6" />
          <span class="text-stone-200">Установить<span class="hidden md:inline"> приложение</span></span>
        </button>
      </div>
    </div>
    <!-- твой код -->
  </div>
</template>

<style scoped>

</style>
