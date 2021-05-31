import api from './axios'

const API_KEY=process.env.VUE_APP_KEY;
class ServicioApi{
  async getImagines(data:any,pg=1){
    const encode = encodeURIComponent(data)
    const cadena = `?key=${API_KEY}&q=${encode}&lang=es&page=${pg}`
    const r = await api.get(cadena)
    return r.data
  }
}

export default new ServicioApi()