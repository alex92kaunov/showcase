<template>
  <div class="add-form">
    <div class="form-row">
      <label>Наименование товара<span class="red-star">*</span></label>
      <input :class="(getErrorByKey('title'))?'form-input error':'form-input'" type="text" v-model="form.title" name="title" @input="removeError('title')" placeholder="Введите наименование товара" />
      <div class="add-form-error" v-if="getErrorByKey('title')">{{ getErrorByKey('title').message }}</div>
    </div>
    <div class="form-row">
      <label>Описание товара</label>
      <textarea class="form-input description" v-model="form.description" placeholder="Введите описание товара"></textarea>
    </div>
    <div class="form-row">
      <label>Ссылка на изображение товара<span class="red-star">*</span></label>
      <input :class="(getErrorByKey('image'))?'form-input error':'form-input'" type="text" v-model="form.image"
             name="image"  placeholder="Введите ссылку" @input="removeError('image')" @focusout="validateImage()"

      />
      <div class="add-form-error" v-if="getErrorByKey('image')">{{ getErrorByKey('image').message }}</div>
    </div>
    <div class="form-row">
      <label>Цена товара<span class="red-star">*</span></label>
      <input :class="(getErrorByKey('price'))?'form-input error':'form-input'" type="text" v-model="form.price" name="price" placeholder="Введите цену" @input="inputPrice" />
      <div class="add-form-error" v-if="getErrorByKey('price')">{{ getErrorByKey('price').message }}</div>

    </div>
    <div class="form-row">
      <button :class="(checkActive()) ? 'button':'button inactive'" @click="addItem()">Добавить товар</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'AddForm',

  data() {
    return {
      errors: [],
      form: {
        title: null,
        description: null,
        image: null,
        price: null
      }
    }
  },
  methods: {
    addItem() {
      if (this.validateRequiredFields()) {
        this.$store.dispatch('products/addProduct', {...this.form});
        this.form = {title: null, description: null, image: null, price: null}
        this.errors = [];
      }
    },
    validateRequiredFields() {
      if (!this.form.title) {
        this.errors.push({key: 'title', message: 'Укажите название товара'});
      }
      if (!this.form.image) {
        this.errors.push({key: 'image', message: 'Укажите ссылку на изображние'});
      }
      if (!this.form.price) {
        this.errors.push({key: 'price', message: 'Укажите цену'});
      }

      if (this.form.price ) {
        let val = this.form.price.replaceAll(" ", "")
        if (isNaN(val))
          this.errors.push({key: 'price', message: 'Цена должна быть числом'});
      }

      if (this.errors.length > 0) {
        return false
      }
      return true
    },
    validateImage() {
      if(this.form.image) {
        const img = new Image();
        img.src = this.form.image;
        img.onerror = () => {
          this.$data.errors.push({key: 'image', message: 'Ссылка на изображение битая'});
        }
      }
    },
    checkActive() {
      return this.form.title && this.form.image && this.form.price && this.errors.length === 0
    },
    getErrorByKey(key) {
      return this.errors.find((item) => {
        return item.key === key
      })
    },
    removeError(key){
      this.errors = this.errors.filter(function(item) { return item.key !== key })
    },
    inputPrice(e) { // TODO::!!!
      let val = e.target.value.replaceAll(" ", "")
      let num = parseFloat(e.target.value)

      if (!isNaN(num)) {
        this.form.price = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }


      // console.log('val : ', e.target.value)
      // this.form.price value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      //

      this.removeError('price')
    }

},
}
</script>

<style>
.add-form {
  padding: 24px;
  background: #fff;
  border-radius: 6px;
}
.add-form .form-input {
  width: 100%;
  padding: 11px;
  margin-top: 10px;
  border: 0;
  border-radius: 4px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
.form-row {
  padding-bottom: 10px;
}
.add-form label {
  font-family: "Source Sans Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 13px;
  letter-spacing: -0.02em;
  color: #49485E;
}
.add-form .red-star {
  color: red;
}
.add-form .button {
  width: 100%;
  border-radius: 8px;
  padding:10px;
  border: 0;
  margin-top:10px;
  background: #7BAE73;
  color: white;
  font-weight: 600;
}
.add-form .inactive {
  background: #EEEEEE;
  color: #B4B4B4;
}
.add-form .description {
  max-height: 200px;
  height: 200px;
}
.add-form  .add-form-error {
  padding-top:2px;
  font-size: 11px;
  color: #ad0c0c;
}
.add-form .error {
  border: 1px solid red;
}
</style>
