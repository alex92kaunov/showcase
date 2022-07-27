<template>
  <div class="sort-wrapper">
    <select class="form-select" v-model="selected" @change="changeSortType">
      <option value="name_asc">По умолчанию</option>
      <option value="asc">По возрастанию цены</option>
      <option value="desc">По убыванию цены</option>
      <option value="name_desc">По названию</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SortTool',
  data() {
    return {
      selected: "name_asc"
    }
  },
  methods: {
    changeSortType() {
      this.$store.dispatch('products/sortFetchedProducts', this.selected);
    }
  },
}
</script>

<style>
.sort-wrapper {
  width: 165px;
}
.form-select {
  display: block;
  width: 100%;
  padding: 11px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  -moz-padding-start: calc(0.75rem - 3px);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-image: url("//localhost:3000/img/Rectangle.svg");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
