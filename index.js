const express = require('express');

const app = express()
const port = 3001

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'juliaj',
  password : '1234',
  database : 'jyv',
  port: 3306
});


app.get('/emprestimos', (req, res) => {

 
  connection.query('SELECT * FROM emprestimos order by status = 0, status = 2 desc;', function (error, results, fields) {
      if (error) throw error;
     res.send(results);

  });

});



  app.post('/emprestimos', (req, res) => {

    const parcelamento = req.body.parcelamento;
    const email = req.body.email;
    const cpf_cnpj = req.body.cpf_cnpj;
    const valor = req.body.valor;
    const nascimento = req.body.nascimento;
    const status = 2;
    const banco = req.body.banco;

    const query =`insert into emprestimos
      (parcelamento, email, cpf_cnpj, valor, nascimento, status, banco)
      values
      ( "${parcelamento}", "${email}", "${cpf_cnpj}", ${valor}, "${nascimento}", ${status}, "${banco}" )`;

     
    connection.query( query, function (error, results, fields) {
      if (error){
        res.send(error)
        res.status(500)
        return
      };
      res.send(results);
    });
     
  
  })


  app.put('/emprestimos/:id_emprestimos/:status', (req, res) => {

    const id_emprestimos = req.params.id_emprestimos;
    const status = req.params.status;

    const query =`update emprestimos set status = ${status} where id_emprestimos = ${id_emprestimos};`;

     
    connection.query( query, function (error, results, fields) {
      if (error){
        res.send(error)
        res.status(500)
        return
      };
      res.send(results);
    });
     
  
  })

 app.listen(port, () => {
  console.log(`A API está rodando em localhost: ${port}`)
 
});
