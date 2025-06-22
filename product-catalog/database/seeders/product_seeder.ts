import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'

export default class extends BaseSeeder {
  async run () {
    await Product.createMany([
      {
        name: 'Wireless Mouse',
        price: 25.99,
        description: 'A comfortable wireless mouse with ergonomic design.',
        image_url: 'https://example.com/products/wireless-mouse.jpg',
      },
      {
        name: 'Mechanical Keyboard',
        price: 79.99,
        description: 'A mechanical keyboard with customizable RGB lighting.',
        image_url: 'https://example.com/products/mechanical-keyboard.jpg',
      },
      {
        name: 'HD Monitor',
        price: 149.99,
        description: '24-inch full HD monitor with ultra-thin bezels.',
        image_url: 'https://example.com/products/hd-monitor.jpg',
      },
      {
        name: 'USB-C Hub',
        price: 39.99,
        description: 'Multi-port USB-C hub for laptops and tablets.',
        image_url: 'https://example.com/products/usb-c-hub.jpg',
      },
      {
        name: 'Bluetooth Speaker',
        price: 59.99,
        description: 'Portable Bluetooth speaker with deep bass.',
        image_url: 'https://example.com/products/bluetooth-speaker.jpg',
      },
    ])
  }
}