import api from './axios'

const API_KEY=process.env.VUE_APP_KEY;
const KEY = '20961356-6e1509a20816f8161ab291722'
class ServicioApi{
  async getImagines(data:any,pg=1){
    const encode = encodeURIComponent(data)
    const cadena = `?key=${API_KEY}&q=${encode}&lang=es&page=${pg}`
    const r = await api.get(cadena)
    return r.data
  }
}

export default new ServicioApi()