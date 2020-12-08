<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="true"
    :offset-y="true"
  >
    <template v-slot:activator="{ on }">
      <input
        v-model="value"
        class="black--text page-text text-decoration-underline"
        :style="inputStyle"
        v-on="on"
        v-on:focus="onFocus"
        v-on:blur="onBlur"
        @mousedown.prevent
        @keydown="() => { assigned = false; }"
      >
      <span
        class="page-text text-decoration-underline"
        style="position: absolute; z-index: -100; color: rgba(255, 255, 255, 0); left:0; top:0;"
        ref="textCalc"
      >{{value}}</span>
    </template>
    <v-list class="pa-0">
      <v-list-item
        class="pa-0"
        v-for="(item, index) in selectables"
        :key="index"
        @click="() => { assignValue(item) }"
      >
        <v-list-item-title class="black--text page-text">{{ item }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>

export default {
  name: 'HoverComplete',
  data: () => ({
    value: '',
    menu: null,
    selectables: [],
    assigned: true,
    textWidth: 0,
  }),
  props: {
    searcher: Object,
    defaultValue: String,
    setValue: Function,
  },
  methods: {
    onFocus() {
      this.menu = true;
    },

    onBlur() {
      setTimeout(() => {
        this.menu = false;
        if (this.assigned) return;
        this.value = this.selectables.length > 0 ? this.selectables[0] : 'America';
        this.assigned = true;
      }, 100);
    },

    assignValue(val) {
      this.value = val;
      this.assigned = true;
    },

    onResize() {
      this.$refs.textCalc.innerHTML = this.value;
      setTimeout(() => { this.textWidth = this.$refs.textCalc.clientWidth; }, 10);
    },
  },
  computed: {
    inputStyle() {
      return `outline: none; width: ${this.textWidth}px !important;`;
    },
  },
  watch: {
    value(newV) {
      this.setValue(newV);

      this.$refs.textCalc.innerHTML = newV;
      setTimeout(() => { this.textWidth = this.$refs.textCalc.clientWidth; }, 10);
      let selects = this.searcher.search(newV).map((v) => v.item);
      if (selects.length > 5) selects = selects.slice(0, 5);
      this.selectables = selects;
    },
  },
  mounted() {
    this.value = this.defaultValue;
  },
  created() {
    window.addEventListener('resize', this.onResize);
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style scoped>
.v-menu__content {
    box-shadow: none;
}
</style>
