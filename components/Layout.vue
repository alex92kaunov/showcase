<template>
  <div>
    <div class="header">
      <div class="header-left"><span class="header-title">Добавление товара</span></div>
      <div class="header-middle"></div>
      <div class="header-right">
        <SortTool />
      </div>
    </div>
    <div id="main">
      <div class="sidebar">
        <AddForm />
      </div>
      <div class="content-wrapper">
        <div v-if="getProducts.length > 0">
          <transition-group name="list" tag="div" class="product-list">
              <Product v-for="product in getProducts"
                       :key="product.id"
                       :id="product.id"
                       :title="product.title"
                       :description="product.description"
                       :image="product.image"
                       :price="product.price"
              />
          </transition-group>
        </div>

        <EmptyList  v-else />
      </div>
      <aside></aside>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Layout',
  methods: {
    ...mapActions('products', [
      'fetchProducts',
    ]),
  },
  async mounted () {
    this.fetchProducts()
  },
  computed: {
    ...mapGetters('products', [
      'getProducts'
    ])
  }
}
</script>

<style>



.product-list {
  display: flex;
  flex-wrap: wrap;
  padding-left: 5px;
  padding-right: 5px;
}

* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: "Source Sans Pro";
  background: #FAF9F7;
  padding-left: 20px;
  padding-right: 20px;
}
#main {
  display: flex;
  min-height: calc(100vh - 40vh);
}
#main > .content-wrapper {
  flex: 1;
}
#main > .sidebar {
  flex: 0 0 332px;
}
#main > aside {
  flex: 0 0 100px;
}
#main > .sidebar {
  order: -1;
}
header, footer, article, nav, aside {
  padding: 1em;
}
header, footer {
  height: 20vh;
}

.header {
  display: flex;
  height: 12vh;
  /*background: #fff;*/
}
.header .header-title {
  font-size: 24px;
  font-weight: bold;
}

.header-left {
  display: flex;
  align-items: flex-end;
  order: -1;
}
.header-right {
}
.header-middle {
  flex: 1;
}
.header-left, .header-right {
  flex: 0 0 20vw;
  padding: 1em;
}


.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
