import api from '../api'

export class ApiInv extends api{
  constructor(){
    super()
  }
  // si no le pasamos un id este id será -1
  async getCategorias(id:number = -1){
    // con super invocamos el metodo dela clase padre y le pasamos los parametros de la clase padre
    return await super.get("categoria", id)
  }

  async saveCategoria(obj:object){
    return await super.save('categoria', obj)
  }

  async delCategoria(id:number){
    return await super.delete('categoria', id)
  }

}