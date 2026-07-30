import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')


table.string('first_name', 50).notNullable()
table.string('last_name', 50).notNullable()
table.string('email', 100).notNullable().unique()
table.string('phone', 50).notNullable()
table.string('address', 100).notNullable()
table.string('city', 50).notNullable()
table.string('province', 50).notNullable()
table.string('country', 50).notNullable()

table.timestamp('created_at')
table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}