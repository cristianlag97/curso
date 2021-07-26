import axios from 'axios'
export default class Api{
  SERVER_URL:string = ''
  constructor(){
    this.SERVER_URL = 'http://127.0.0.1:8000/api/v1/'
    // this.TOKEN_URL = this.SERVER_URL + 'token'
    // this.USUARIO = 'prueba'
    // this.PASSWORD = '1234567.'
    // this.credenciales = {username:this.USUARIO, password:this.PASSWORD}
  }

  // async getToken(){
  //   const r = await axios.post(this.TOKEN_URL, this.credenciales)
  //   const token = await r
  //   return token.data
  // }

  async get(nombre:string, id:number){
    let url = this.SERVER_URL + nombre + "/"
    if(id !== -1){
      url += id + "/"
    }

    const res = await axios.get(url)
    const items = res

    if(items.data === undefined){
      return items
    }
    return items.data
  }

  async save(nombre:string, obj){
    let url = this.SERVER_URL + nombre + "/"

    // console.log(obj, 'Esto se pasa en save()');

    if(obj.id !== -1){
      // console.log('Hola estoy dentro de la condición if');
      url += obj.id + "/"
      let r = await axios.put(url, obj)
      const result = r
      if(result.statusText == 'OK'){
        // console.log('OK');
        return result.data
      }else{
        console.log('Error');
      }
    } else {
      // console.log('Hola estoy dentro de la condición else');
      let r = await axios.post(url, obj)
      const result = r
      // console.log('Hola esto es:', result);
      if(result.statusText == 'Created'){
        // console.log('Created');
        return result.data
      }else{
        console.log('Error');
      }
    }
  }

  async delete(nombre:string, id:number){

    let url = this.SERVER_URL + nombre + "/" + id + "/"
    console.log(url, 'Url de borrar');

    axios.delete(url)
    .catch(error => console.error('Error', error))
  }

}