import Api from '../Api'

const nombreEnc = 'compras'
const nombreDet = 'compra-detalle'

export class ApiCmp extends Api{
  constructor(){
    super()
  }

  async getProveedores(id:number=-1){
    return await super.get('proveedor', id)
  }

  async saveProveedor(obj:object){
    return await super.save('proveedor', obj)
  }

  async delProveedor(id:number){
    return await super.delete('proveedor', id)
  }

  // // compras
  // async get(id:number){
  //   return await super.get(nombreEnc, id)
  // }

  // async guardarEncabezado(obj:object){
  //   return await super.save(nombreEnc, obj)
  // }

  // async guardarDetalle(obj:object){
  //   return await super.save(nombreDet, obj)
  // }

  // async borrarDetalle(id:number){
  //   return await super.delete(nombreDet, id)
  // }

}