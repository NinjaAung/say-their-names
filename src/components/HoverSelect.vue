<template>
  <v-menu
    v-model="menu"
    :open-on-hover="true"
    :close-on-content-click="true"
    :offset-y="true"
  >
    <template v-slot:activator="{ on, attrs }">
      <a
        class="black--text page-text text-decoration-underline"
        v-bind="attrs"
        v-on="on"
      >
        {{ (value || defaultValue) }}
      </a>
    </template>
    <v-list class="pa-0">
      <v-list-item
        class="pa-0"
        v-for="(item, index) in items"
        :key="index"
        @click="() => { value = item; }"
      >
        <v-list-item-title class="black--text page-text">{{ item }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'HoverSelect',
  data: () => ({
    value: '',
    menu: null,
  }),
  props: {
    items: Array,
    defaultValue: String,
    setValue: Function,
  },
  watch: {
    value(newV) {
      this.setValue(newV);
    },
  },
};
</script>

<style scoped>
.v-menu__content {
    box-shadow: none;
}
</style>
