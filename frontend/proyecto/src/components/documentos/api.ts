import axios from 'axios'

const SERVER_URL =  'http://127.0.0.1:8000/api/v1/'
const DOCS_URL =  SERVER_URL + 'docs/'
const TOKEN_URL = SERVER_URL + 'token/'
const USUARIO = 'prueba'
const PASSWORD = '1234567.'
const credenciales = {"username": USUARIO, "password": PASSWORD}

// const getToken = async () => {
//   const r = await axios.post(TOKEN_URL, credenciales)
//   const token = r
//   return token
// }

// export default{
//   getAll: async () => {
//     const token = await getToken()
//     const res = await axios.get(DOCS_URL)
//   }
// }

export default{
  getAll: async () => {
    const res = await axios.get(DOCS_URL)
    console.log(res.data);
    return res.data
  },

  insert: async (doc:object) => {
    const dato = await axios.post(DOCS_URL, doc)
    if (dato.statusText !== 'OK'){
      return dato.statusText
    }
    return dato
  },

  update: async (doc) =>  {
    const dato = await axios.put(DOCS_URL + doc.id + '/', doc)
    if (dato.statusText !== 'OK'){
      return dato.statusText
    }
    return dato
  },

  delete: (id:number) => {
    axios.delete(DOCS_URL + id + '/')
    .catch(error => console.log(error))
  }
}