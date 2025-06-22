// app/controllers/guest_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import Category from '#models/category'

export default class GuestController {
  public async home({ view, request }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = 9
    const search = request.input('search', '').trim()
    const categoryId = request.input('category')

    const query = Product.query().preload('category')

    if (search) {
      query.whereRaw('LOWER(name) LIKE ?', [`%${search.toLowerCase()}%`])
    }

    if (categoryId) {
      query.where('category_id', categoryId)
    }

    const paginator = await query.paginate(page, perPage)
    paginator.baseUrl('/')

    const categories = await Category.all()

    return view.render('components/home', {
      products: paginator.all(),
      pagination: paginator,
      categories,
      search,
      categoryId,
    })
  }

  public async show({ params, view, request }: HttpContext) {
    const csrfToken = request.csrfToken
    const product = await Product.query()
      .where('id', params.id)
      .preload('category')
      .firstOrFail()

    return view.render('pages/product_details', {
      product,
      csrfToken,
    })
  }
}
