const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
})

/*
I had to change 'send' to 'json' everywhere as angular doesn't accept text type of response by default
and trying tochange it costed me a lot of time, looks like options object is not equal expect options object 
though the structure is copied from official documentation...
what is more httpObserve had a bug in angular's github and disappeared from the '@angular/common/http/src/client'
but it's not documented where to find it now, I don't see it in any folder of the project and also npm 
can't install it
but anyway they require it in options 
*/

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
    // response.status(201).send(`Item added with ID: ${results.insertId}`)
    // response.status(201).send('Item added ' + results) 
    response.status(201).json(results.rows)
  })
}
 
const updateAllItems = (request, response) => {  // not used
  const { name } = request.body

  pool.query(
    'UPDATE items SET name = $1',
    [name],
    (error, results) => {
      if (error) {
        throw error
      }
      // response.status(200).send(`Items modified`)
      response.status(200).json(results.rows)
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
      // response.status(200).send(`Item modified with ID: ${id}`)
      response.status(200).json(results.rows)
    }
  )
}
 
const deleteItem = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM items WHERE item_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    // response.status(200).send(`Item deleted with ID: ${id}`)
    response.status(200).json(results.rows)
  })
}

const createTest = (request, response) => {
  //tu sprobuj json na obiekt sb zmienic i dot walkingiem sczytywac kolejne informacje
  //jak framework, feature, score
  //bo to jako json przyjdzie razem
  console.log("Request body = ", request.body)
  console.log("Request body type = ", typeof request.body)
  // const resData = JSON.parse(request.body);

  // const { framework } = resData.framework
  // const { feature } = resData.feature
  // const { score } = resData.score
  const  framework  = parseInt(request.body.framework)
  const  feature  = parseInt(request.body.feature)
  const  score  = parseFloat(request.body.score)

  pool.query('INSERT INTO tests (framework, feature, score) VALUES ($1, $2, $3)', [framework, feature, score], (error, results) => {
    if (error) {
      throw error
    }

    response.status(201).json(results.rows)
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
  createTest
}


  /*
  Run command:
  Remove-item alias:curl
  when error with Invoke-WebRequest happened
  Best tutorial: https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
  */ 