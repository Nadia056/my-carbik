import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'car_users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('clients').onDelete('CASCADE')
      table.integer('car_id').unsigned().references('id').inTable('cars').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
   
    
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
