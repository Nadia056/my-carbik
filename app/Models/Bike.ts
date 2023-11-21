import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Bike extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public brand: string

  @column()
  public model: string

  @column()
  public year: number

  @column()
  public color: string

 

}
