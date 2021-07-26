import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import api from '@/components/documentos/api'

export default new Vuex.Store({
  state: {
    items: [],
    mensaje:{
      mostrar: false,
      texto: ''
    },
    loading:{
      titulo: 'Cargando',
      estado: false
    }
  },
  getters: {
    // getAllItem(state){
    //   return state.items
    // }

    getAllItem: state => {return state.items}
  },
  mutations: {
    async setItems(state){
      try {
        this.commit("mostrarLoading", "Cargando datos")
        const resul = await api.getAll()
        state.items = resul.results
        if(typeof(state.items) === 'string'){
          this.commit("mensaje", state.items)
        }
        this.commit("ocultarLoading")
      } catch (error) {
        this.commit('mensaje', error.message)
      }
    },

    async insertDoc(state, doc){
      let r = await api.insert(doc)
      this.commit('mensaje', 'Registro guardado correctamente')
      const items = await api.getAll()
      state.items = items.results
    },

    async actualizarDoc(state, doc) {
      let r = await api.update(doc)
      this.commit('mensaje', 'Registro actualizado correctamente')
      state.items = await api.getAll()
    },

    async borrarDoc(state, doc){
      let r = await api.delete(doc)
      state.items = await api.getAll()
    },

    mostrarLoading(state, payload){
      state.loading.estado = true
      if(payload!==undefined){
        state.loading.titulo = payload
      }
    },

    ocultarLoading(state): void{
      state.loading.estado = false
    },

    mensaje(state, payload): void{
      state.mensaje.mostrar = true
      state.mensaje.texto = payload
    }
  },
  actions: {
  },
  modules: {
  }
})

