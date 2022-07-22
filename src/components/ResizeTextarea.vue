<script>
import { nextTick } from 'vue'

/**
 * Resize textarea
 * @author Dinesh Paradesi Vadamodula
 * @displayName Resize Textarea
 */
export default {
  name: 'ResizeTextarea',
  props: {
    /**
     * Placeholder text
     */
    placeholder: {
      type: String,
      default: '',
    },
    /**
     * Number of rows
     */
    rows: {
      type: Number,
      default: 1,
    },
    /**
     * Number of columns
     */
    cols: {
      type: Number,
      default: 0,
    },
    /**
     * Mininum height of the textarea
     */
    minHeight: {
      type: Number,
      default: 50,
    },
    /**
     * Maximum height of the textarea
     */
    maxHeight: {
      type: Number,
      default: null,
    },
    /**
     * The textarea value
     */
    modelValue: {
      type: [String, Number],
      default: '',
    },
    /**
     * The resize handle is disabled by default
     */
    autoResize: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      textareaContent: '',
      height: '',
      isScrollEnabled: false,
    }
  },
  computed: {
    styles() {
      return {
        resize: this.autoResize ? 'none !important' : '',
        height: this.height,
        overflow: `${this.isScrollEnabled ? 'scroll' : 'hidden'} !important`,
      }
    },
    unit() {
      return 'px'
    },
  },
  watch: {
    textareaContent() {
      /**
       * update modelValue event.
       *
       * @event update:modelValue
       * @type {string}
       */
      this.$emit('update:modelValue', this.textareaContent)
      this.resize()
    },
  },
  created() {
    nextTick(() => {
      this.textareaContent = this.modelValue
    })
  },
  mounted() {
    this.resize()
  },
  methods: {
    resize() {
      const element = this.$refs.textarea
      this.height = 'auto !important'
      nextTick(() => {
        if (this.minHeight)
          this.height = `${element.scrollHeight < this.minHeight ? this.minHeight : element.scrollHeight}${this.unit}`

        if (this.maxHeight) {
          if (element.scrollHeight > this.maxHeight) {
            this.height = `${this.maxHeight}${this.unit}`
            this.isScrollEnabled = true
          }
          else {
            this.isScrollEnabled = false
          }
        }
      })
    },
    focus() {
      this.$refs.textarea.focus()
    },
  },
}
</script>

<template>
  <textarea
    ref="textarea"
    v-model="textareaContent"
    :style="styles"
    :rows="rows"
    :cols="cols"
    :placeholder="placeholder"
    wrap="hard"
    @input="resize"
    @focus="resize"
    @change="resize"
  />
</template>
