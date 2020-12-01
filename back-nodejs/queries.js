const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
})

const getItems = (request, response) => {
    pool.query('SELECT * FROM items ORDER BY item_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
 }
 
const getItemById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM items WHERE item_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
 
const createItem = (request, response) => {
  const { name } = request.body

  pool.query('INSERT INTO items (name) VALUES ($1)', [name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Item added with ID: ${results.insertId}`)
  })
}
 
const updateAllItems = (request, response) => {
  const { name } = request.body

  pool.query(
    'UPDATE items SET name = $1',
    [name],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Items modified`)
    }
  )
}

/*const updateManyItems = (request, response) => {
  const id = parseInt(request.params.id)
  const { name } = request.body

  pool.query(
    'UPDATE items SET name = $1 WHERE item_id = $2',
    [name, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Item modified with ID: ${id}`)
    }
  )
}*/

const updateItem = (request, response) => {
  const id = parseInt(request.params.id)
  const { name } = request.body

  pool.query(
    'UPDATE items SET name = $1 WHERE item_id = $2',
    [name, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Item modified with ID: ${id}`)
    }
  )
}
 
const deleteItem = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM items WHERE item_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Item deleted with ID: ${id}`)
  })
}

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  updateAllItems,
  //updateManyItems,
  deleteItem,
}


  /*
  Run command:
  Remove-item alias:curl
  when error with Invoke-WebRequest happened
  Best tutorial: https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
  */ 