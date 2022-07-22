<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const isOpen = ref(false)
const title = ref('')
const message = ref('')
const buttons = ref([])

const open = (t, m, b) => {
  return new Promise((resolve) => {
    const resolvePromise = (value) => {
      isOpen.value = false
      resolve(value)
    }
    buttons.value = b.map(button => ({
      ...button,
      onClick: () => resolvePromise(button.value),
    }))
    title.value = t
    message.value = m
    isOpen.value = true
  })
}

defineExpose({ open })
</script>

<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-10">
      <TransitionChild
        as="template"
        enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity" />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0 text-white">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative bg-stone-900 border border-stone-700 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full p-6"
            >
              <div>
                <div class="mt-3 text-center">
                  <DialogTitle as="h3" class="text-xl leading-6 font-medium">
                    {{ title }}
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="opacity-75">
                      {{ message }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 grid sm:grid-cols-2 gap-3 rid-flow-row-dense">
                <button
                  v-for="(button, index) in buttons" :key="index"
                  class="font-medium px-4 py-2 rounded-xl shadow duration-200 justify-center border border-stone-600 hover:bg-stone-700 bg-stone-800"
                  :class="{ 'col-span-2': button.full, 'bg-stone-600 hover:bg-stone-700 border-transparent': button.primary }"
                  @click="button.onClick()"
                >
                  {{ button.label }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
