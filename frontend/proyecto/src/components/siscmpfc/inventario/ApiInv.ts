import Api from '../Api'

export class ApiInv extends Api{
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

  async getSubCategorias(id:number = -1){
    // con super invocamos el metodo dela clase padre y le pasamos los parametros de la clase padre
    return await super.get("subcategoria", id)
  }

  async saveSubCategoria(obj:object){
    return await super.save('subcategoria', obj)
  }

  async delSubCategoria(id:number){
    return await super.delete('subcategoria', id)
  }

  async getProductos(id:number = -1){
    // con super invocamos el metodo dela clase padre y le pasamos los parametros de la clase padre
    return await super.get("producto", id)
  }

  async saveProducto(obj:object){
    return await super.save('producto', obj)
  }

  async delProducto(id:number){
    return await super.delete('producto', id)
  }

}