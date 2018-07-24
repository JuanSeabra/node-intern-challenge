const router = require("express").Router()
const MongoClient = require("mongodb").MongoClient
const assert = require("assert")

// Connection URL
const url = "mongodb://localhost:27017"

// Database Name
const dbName = "biblioteca"

router.post("/create", (req, res) => {
  const { nome } = req.body
  const { id } = req.body
  if (!nome || !id) {
    res.sendStatus(400)
  }

  create(nome, id)
  res.json({ result: "created" })
})

router.post("/recover", (req, res) => {
  const { nome } = req.body
  const { id } = req.body
  if (!id) {
    lista = recoverNome(nome)
  }
  if (!nome) {
    lista = recoverId(id)
  }
  console.log("param:", nome + " " + id)
  res.json("returned")
})

router.post("/update", (req, res) => {
  const { nome_novo } = req.body
  const { id } = req.body
  if (!nome_novo || !id) {
    res.sendStatus(400)
  }

  update(id, nome_novo)
  res.json({ result: "updated" })
})

router.post("/destroy", (req, res) => {
  const { id } = req.body
  if (!id) {
    res.sendStatus(400)
  }

  destroy(id)
  res.json({ result: "destroyed" })
})

router.post("/listAll", (req, res) => {
  listAll()
  res.json({result: "listed"})
})

//----- CRUD methods -----
function create(nome_livro, id) {
  // Use connect method to connect to the server
  MongoClient.connect(
    url,
    function(err, client) {
      assert.equal(null, err)
      console.log("Connected successfully to server")

      const db = client.db(dbName)
      db.collection("livros").insertOne({ nome: nome_livro, id: id }, function(
        err,
        r
      ) {
        assert.equal(null, err)
        assert.equal(1, r.insertedCount)

        client.close()
      })
    }
  )
}

function recoverNome(nome_livro) {
  // Use connect method to connect to the server
  MongoClient.connect(
    url,
    function(err, client) {
      assert.equal(null, err)
      console.log("Connected successfully to server")

      const db = client.db(dbName)
      const collection = db.collection("livros")
      // Find some documents
      collection.find({ nome: nome_livro }).toArray(function(err, docs) {
        assert.equal(err, null)
        console.log("Found the following records")
        console.log(docs)
        client.close()
      })
    }
  )
}

function recoverId(id) {
  // Use connect method to connect to the server
  MongoClient.connect(
    url,
    function(err, client) {
      assert.equal(null, err)
      console.log("Connected successfully to server")

      const db = client.db(dbName)
      const collection = db.collection("livros")
      // Find some documents
      collection.find({ id: id }).toArray(function(err, docs) {
        assert.equal(err, null)
        console.log("Found the following records")
        console.log(docs)
        client.close()
      })
    }
  )
  return docs
}

function update(id, novo_nome) {
  // Use connect method to connect to the server
  MongoClient.connect(
    url,
    function(err, client) {
      assert.equal(null, err)
      console.log("Connected successfully to server")

      const db = client.db(dbName)
      const collection = db.collection("livros")
      // Find some documents
      collection.updateOne({ id: id }, { $set: { nome: novo_nome } }, function(
        err,
        result
      ) {
        assert.equal(err, null)
        assert.equal(1, result.result.n)
        client.close()
      })
    }
  )
}

function destroy(id) {
  // Use connect method to connect to the server
  MongoClient.connect(
    url,
    function(err, client) {
      assert.equal(null, err)
      console.log("Connected successfully to server")

      const db = client.db(dbName)
      const collection = db.collection("livros")
      // Delete document where a is 3
      collection.deleteOne({ id: id }, function(err, result) {
        assert.equal(err, null)
        assert.equal(1, result.result.n)
        client.close()
      })
    }
  )
}

function listAll() {
  // Use connect method to connect to the server
  MongoClient.connect(
    url,
    function(err, client) {
      assert.equal(null, err)
      console.log("Connected successfully to server")

      const db = client.db(dbName)
      const collection = db.collection("livros")
      collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null)
        console.log("Found the following records")
        console.log(docs)
        client.close()
        //return docs
      })
    }
  )
}

//----- CRUD methods -----

module.exports = router
