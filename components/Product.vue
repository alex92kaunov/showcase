<!-- Please remove this file from your project -->
<template>
  <div class="product-item list-item" @mouseover="toggleRemoveButton(true)" @mouseleave="toggleRemoveButton(false)">
    <div v-bind:class="(this.isVisibleRemove) ?'product-item-remove':'product-item-remove hidden'" @click="removeProduct(id)">
      <img class="trash" src="img/Vector.svg" />
    </div>

    <div class="product-img">
      <img v-if="image" :src="image" />
      <img v-else src="img/Rectangle_31.png" />
    </div>
    <div class="product-content">
      <div class="product-item-row product-title">
        {{title}}
      </div>
      <div class="product-item-row product-description">
        {{description}}
      </div>
      <div class="product-item-row product-price">{{price}} руб.</div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'Product',
  props: {
    id: Number,
    title: String,
    description: String,
    image: String,
    price: String,
  },
  data() {
    return {
      isVisibleRemove: false
    }
  },
  methods: {
    ...mapActions('products', [
      'removeProduct',
    ]),
    toggleRemoveButton(visible) {
      this.isVisibleRemove = visible
    },
  },
}
</script>

<style>
.product-item {
  width: 332px;
  height: 423px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 8px;
  position:relative;
  cursor: pointer;
}

.product-item:hover {
  box-shadow: 0 0 5px rgba(0,0,0,0.4);
}

.product-img img {
  width: 100%;
  height: 200px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}
.product-item .product-item-row {
  padding: 10px;
}

.product-price {

}

.product-title {
  font-weight: bold;
}

.product-price {
  font-weight: bold;
  font-size: 18px;
}
.product-description {
  height: 136px;
  overflow-y: auto;
}

.product-item-remove {
  background: #FF8484;
  height: 32px;
  width: 32px;
  position: absolute;
  right: -7px;
  top: -7px;
  text-align: center;
  padding: 8px;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.product-item-remove:hover {
  box-shadow: 0 0 5px rgba(0,0,0,0.4);
}
.trash {
  height: 15px;
  width: 15px;
}

.hidden {
  display: none;
}

</style>
