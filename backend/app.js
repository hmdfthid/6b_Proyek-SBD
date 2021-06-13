const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'libra',
  password: 'password',
  port: 5432,
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
})

pool.query('ALTER DATABASE libra SET datestyle TO "ISO, MDY";');

app.use(bodyParser.json())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/buku', (req, res) => {
  pool.query('SELECT * FROM buku', (error, results) => {
    if (error) {
      res.status(400).send(error.detail+" "+error.hint)
	    console.log(error)
      return 0
    }
    res.status(200).json(results.rows)
  })
})

app.get('/buku/:id', (req, res) => {
  const id = req.params.id
  pool.query('SELECT * FROM buku WHERE kode = $1', [id], (error, results) => {
    if (error) {
      res.status(400).send(error.detail+" "+error.hint)
	    console.log(error)
      return 0
    }
    res.status(200).json(results.rows)
  })
})

app.post('/buku', (req, res) => {
  const { kode, nama, tahun_terbit, pengarang, genre, penerbit } = req.body

  pool.query('INSERT INTO buku ("kode", "nama", "tahun_terbit", "pengarang", "genre", "penerbit") VALUES ($1, $2, $3, $4, $5, $6)', [kode, nama, tahun_terbit, pengarang, genre, penerbit], (error, results) => {
    if (error) {
      res.status(400).send(error.detail+" "+error.hint)
	    console.log(error)
      return 0
    }
    res.status(201).send("Success")
  })
})

app.put('/buku/:id', (req, res) => {
  const id = req.params.id
  const { nama, tahun_terbit, pengarang, genre, penerbit } = req.body

  pool.query(
    'UPDATE buku SET nama = $2, tahun_terbit = $3, pengarang = $4, genre = $5, penerbit = $6 WHERE kode = $1',
    [id, nama, tahun_terbit, pengarang, genre, penerbit],
    (error, results) => {
      if (error) {
        res.status(400).send(error.detail+" "+error.hint)
  	    console.log(error)
        return 0
      }
      res.status(200).send("Success")
    }
  )
})

app.delete('/buku/:id', (req, res) => {
  const id = req.params.id

  pool.query('DELETE FROM buku WHERE kode = $1', [id], (error, results) => {
    if (error) {
      res.status(400).send(error.detail+" "+error.hint)
	    console.log(error)
      return 0
    }
    res.status(200).send("Success")
  })
})

app.get('/peminjam', (req, res) => {
  pool.query('SELECT * FROM peminjam ORDER BY id ASC', (error, results) => {
    if (error) {
      res.status(400).send(error.detail+" "+error.hint)
	    console.log(error)
      return 0
    }
    res.status(200).json(results.rows)
  })
})

app.get('/peminjam/:id', (req, res) => {
  const id = req.params.id
  pool.query('SELECT * FROM peminjam WHERE id = $1', [id], (error, results) => {
    if (error) {
      res.status(400).send(error.detail+" "+error.hint)
	    console.log(error)
      return 0
    }
    res.status(200).json(results.rows)
  })
})

app.post('/peminjam', (req, res) => {
  const { nama, jenis_kelamin, nomor_telepon, alamat } = req.body

  pool.query('INSERT INTO peminjam ("nama", "jenis_kelamin", "nomor_telepon", "alamat") VALUES ($1, $2, $3, $4)', [nama, jenis_kelamin, nomor_telepon, alamat], (error, results) => {
    if (error) {
      res.status(400).send(error.detail+" "+error.hint)
	    console.log(error)
      return 0
    }
    res.status(201).send("Success")
  })
})

app.put('/peminjam/:id', (req, res) => {
  const id = req.params.id
  const { nama, jenis_kelamin, nomor_telepon, alamat } = req.body

  pool.query(
    'UPDATE peminjam SET nama = $2, jenis_kelamin = $3, nomor_telepon = $4, alamat = $5 WHERE id = $1',
    [id, nama, jenis_kelamin, nomor_telepon, alamat],
    (error, results) => {
      if (error) {
        res.status(400).send(error.detail+" "+error.hint)
  	    console.log(error)
        return 0
      }
      res.status(200).send("Success")
    }
  )
})

app.delete('/peminjam/:id', (req, res) => {
  const id = req.params.id

  pool.query('DELETE FROM peminjam WHERE id = $1', [id], (error, results) => {
    if (error) {
      res.status(400).send(error.detail+" "+error.hint)
	    console.log(error)
      return 0
    }
    res.status(200).send("Success")
  })
})

app.get('/peminjaman', (req, res) => {
  pool.query('SELECT * FROM peminjaman ORDER BY id ASC', (error, results) => {
    if (error) {
      res.status(400).send(error.detail+" "+error.hint)
	    console.log(error)
      return 0
    }
    res.status(200).json(results.rows)
  })
})

app.get('/peminjaman/:id', (req, res) => {
  const id = req.params.id
  pool.query('SELECT * FROM peminjaman WHERE id = $1', [id], (error, results) => {
    if (error) {
      res.status(400).send(error.detail+" "+error.hint)
	    console.log(error)
      return 0
    }
    res.status(200).json(results.rows)
  })
})

app.post('/peminjaman', (req, res) => {
  const { kode_buku, id_peminjam, tanggal_peminjaman, tanggal_pengembalian, status_peminjaman } = req.body

  pool.query('INSERT INTO peminjaman ("kode_buku", "id_peminjam", "tanggal_peminjaman", "tanggal_pengembalian", "status_peminjaman") VALUES ($1, $2, $3, $4, $5)', [kode_buku, id_peminjam, tanggal_peminjaman, tanggal_pengembalian, status_peminjaman], (error, results) => {
    if (error) {
      res.status(400).send(error.detail+" "+error.hint)
	    console.log(error)
      return 0
    }
    res.status(201).send("Success")
  })
})

app.put('/peminjaman/:id', (req, res) => {
  const id = req.params.id
  const { kode_buku, id_peminjam, tanggal_peminjaman, tanggal_pengembalian, status_peminjaman } = req.body

  pool.query(
    'UPDATE peminjaman SET kode_buku = $2, id_peminjam = $3, tanggal_peminjaman = $4, tanggal_pengembalian = $5, status_peminjaman = $6 WHERE id = $1',
    [id, kode_buku, id_peminjam, tanggal_peminjaman, tanggal_pengembalian, status_peminjaman],
    (error, results) => {
      if (error) {
        res.status(400).send(error.detail+" "+error.hint)
  	    console.log(error)
        return 0
      }
      res.status(200).send("Success")
    }
  )
})

app.delete('/peminjaman/:id', (req, res) => {
  const id = req.params.id

  pool.query('DELETE FROM peminjaman WHERE id = $1', [id], (error, results) => {
    if (error) {
      res.status(400).send(error.detail+" "+error.hint)
	    console.log(error)
      return 0
    }
    res.status(200).send("Success")
  })
})

app.listen(port, () => {
  console.log(`Rest API listening at http://localhost:${port}`)
})
