import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CarUser extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public bike_id: number

  @column()
  public user_id: number

  static get fillable() {
    return [   'bike_id',      'user_id' ]
  }
}
