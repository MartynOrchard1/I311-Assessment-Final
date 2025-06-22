import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public async run () {
    await Category.createMany([
      { name: 'Electronics' },
      { name: 'Books' },
      { name: 'Clothing' },
      { name: 'Toys' }
    ])
  }
}
