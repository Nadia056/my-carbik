import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class BikeUser extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public bike_id: number

  @column()
  public user_id: number



  
}
