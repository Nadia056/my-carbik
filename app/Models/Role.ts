import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public name: string

  static get fillable() {
    return [ 'name']
  }

  
}