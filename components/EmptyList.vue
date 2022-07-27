<template>
  <div class="products-empty">
    <div>Товаров больше нет. <br/> Добавьте товар или загрузите товары по умолчанию!</div>
    <div><button @click="clear">Почистить localStorage и загрузить дефолт</button></div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'EmptyList',
  methods: {
    clear() {
      this.$store.dispatch('products/defaultStore');
    },
  },
}
</script>

<style>
.products-empty {
  font-size: 20px;
  text-align: center;
  padding: 20%
}
</style>
