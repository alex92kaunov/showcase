const SORT_ASC = "asc"
const SORT_DESC = "desc"
const SORT_NAME_DESC = "name_desc"
const SORT_NAME_ASC = "name_asc"

export const state = () => ({
  products: {}
})
export const mutations = {
  updateProducts (state, products) {
    state.products = products
    localStorage.setItem('products', JSON.stringify(products))
  },
}
export const actions = {
  async fetchProducts ({ commit }) {
    let products = JSON.parse(localStorage.getItem('products'))

    if (products) {
      commit('updateProducts', products)
    } else {
      products = mockData
      localStorage.setItem('products', JSON.stringify(products))
      commit('updateProducts', products)
    }
  },
  async removeProduct(context, id) {
    let products = [...context.state.products]
    products = products.filter(function(item) { return item.id !== id })
    context.commit('updateProducts', products)
  },

  async addProduct(context, newItem) {
    if (newItem) {
      newItem.id = Date.now() // в качестве id взяли текущий таймстамп
      let products = [...context.state.products] // создаем новый массив из state
      products.push(newItem)

      context.commit('updateProducts', products)
    }
  },
  async defaultStore(context) {
    localStorage.setItem('products', JSON.stringify(mockData))
    context.commit('updateProducts', mockData)
  },

  async sortFetchedProducts (context, sortType) {
    let products = [...context.state.products]
    if (products) {
      const sorted = products.sort((a, b) => {
        let aPrice = Number(a.price.replaceAll(" ", ""))
        let bPrice = Number(b.price.replaceAll(" ", ""))

        switch (sortType) {
          case SORT_ASC:
            return aPrice > bPrice ? 1 : -1
          case SORT_DESC:
            return aPrice < bPrice ? 1 : -1
          case SORT_NAME_DESC:
            return a.name < b.name ? 1 : -1
          case SORT_NAME_ASC:
            return a.name > b.name ? 1 : -1
        }
        return false
      })
      context.commit('updateProducts', sorted)
    }
  },
}

export const getters = {
  getProducts (state) {
    return state.products
  }
}

const mockData = [
  {
    id: 1,
    title: "Наименование товара 1",
    description: "Довольно таки интересное описание товара в несколько строк. Довольно таки интересное описание товара в несколько строк. Довольно таки интересное описание товара в несколько строк.",
    image: "",
    price: "1000"
  }, {
    id: 2,
    title: "Наименование товара 2",
    description: "Довольно таки интересное описание товара в несколько строк. Довольно таки интересное описание товара в несколько строк. Довольно таки интересное описание товара в несколько строк.",
    image: "https://on-desktop.com/wps/_Olympus_camera_on_the_table_097579_.jpg",
    price: "2000"
  },{
    id: 3,
    title: "Наименование товара 3",
    description: "Довольно таки интересное описание товара в несколько строк. Довольно таки интересное описание товара в несколько строк. Довольно таки интересное описание товара в несколько строк.",
    image: "https://99px.ru/sstorage/53/2013/05/tmb_16765_6107.jpg",
    price: "3000"
  }, {
    id: 4,
    title: "Наименование товара 4",
    description: "Довольно таки интересное описание товара в несколько строк. Довольно таки интересное описание товара в несколько строк. Довольно таки интересное описание товара в несколько строк.",
    image: "https://million-wallpapers.ru/wallpapers/2/72/419754474677791/vintazhnyj-fotoapparat-i-rozy-na-stole.jpg",
    price: "5000"
  },{
    id: 5,
    title: "Наименование товара 5",
    description: "Довольно таки интересное описание товара в несколько строк. Довольно таки интересное описание товара в несколько строк. Довольно таки интересное описание товара в несколько строк.",
    image: "https://99px.ru/sstorage/53/2013/05/tmb_16765_6107.jpg",
    price: "4000"
  },{
    id: 6,
    title: "Наименование товара 6",
    description: "Довольно таки интересное описание товара в несколько строк. Довольно таки интересное описание товара в несколько строк. Довольно таки интересное описание товара в несколько строк.",
    image: "https://w-dog.ru/wallpapers/0/0/502937658028822/kamera-canon-makro.jpg",
    price: "7000"
  },
]
