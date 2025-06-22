import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Product.create({
      name: 'Sample Product',
      price: 19.99,
      description: 'This is a sample product description.',
      image_url: 'https://example.com/sample-product.jpg',
    })
    await Product.create({
      name: 'Sample Product',
      price: 19.99,
      description: 'This is a sample product description.',
      image_url: 'https://example.com/sample-product.jpg',
    })
    await Product.create({
      name: 'Sample Product',
      price: 19.99,
      description: 'This is a sample product description.',
      image_url: 'https://example.com/sample-product.jpg',
    })
  }
}