import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CarUser extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public car_id: number

  @column()
  public user_id: number

 
}
