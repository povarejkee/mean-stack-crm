const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

// (get) localhost:5000/api/order?offset=2&limit=5
module.exports.getAll = async function(request, response) {
  const query = {
    user: request.user.id
  }

  // Дата старта
  if (request.query.start) {
    query.date = {
      // Больше или равно
      $gte: request.query.start
    }
  }

  if (request.query.end) {
    if (!query.date) {
      query.date = {}
    }

    query.date['$lte'] = request.query.end
  }

  if (request.query.order) {
    query.order = Number(request.query.order)
  }

  try {
    const orders = await Order
      .find(query)
      .sort({ date: -1 })
      .skip(Number(request.query.offset))
      .limit(Number(request.query.limit))

    response.status(200).json(orders)

  } catch(error) {
    errorHandler(response, error)
  }
}

module.exports.create = async function(request, response) {
  try {
      /** Нужно получить последний заказ и на его основе сформировать
       * порядковый номер для нового заказа */
    const lastOrder = await Order.findOne({ user: request.user.id }).sort({ date: -1 })
    const newOrderNumber = lastOrder ? lastOrder.order + 1 : 0

    const order = await new Order({
      list: request.body.list,
      user: request.user.id,
      order: newOrderNumber
    })

    await order.save()
    response.status(201).json(order)
  } catch(error) {
    errorHandler(response, error)
  }
}
