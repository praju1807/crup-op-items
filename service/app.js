const express = require('express')
const app = express()
const bodyparser = require('body-parser') 
const port = 5000
var cors = require('cors')

app.use(cors())
app.use(bodyparser.urlencoded({extended:true})) 
app.use(bodyparser.json()) 
   
var productDetails = [
  { id: 1, product_name: 'tooth Paste',sku:"colgate",price:45 },
  { id: 2, product_name: 'electronic',sku:'fan',price:500 },
  { id: 3, product_name: 'Cleaning', sku:'detol',price:400 },
];

app.get('/products', async(req, res) => {
 if( !productDetails || productDetails.length === 0)
 {
  res.status(500).send({ error: 'Empty response' })
 }
 else{
   res.send(productDetails);
 }
});

app.post('/editProduct', (req, res) => {
  if(Object.keys(req.body).length === 0)
{
  res.status(500).send({ error: 'Empty response' })

}
else{
  productDetails = productDetails.map((product) => (product.id === req.body.id ? req.body : product))
  res.send(productDetails);
}
})

app.post('/deleteProduct', (req, res) => {
  console.log(req.body);
  if(Object.keys(req.body).length === 0)
{
  res.status(500).send({ error: 'Empty response' })

}
else{

  productDetails = productDetails.filter((product) => (product.id !== req.body.id ))
  res.send(productDetails);
}
})

app.post('/createProduct', (req, res) => {
  console.log(req.body.product_name);
  if(Object.keys(req.body).length === 0)
  {
    res.status(500).send({ error: 'Empty response' })

  }
  else{
      req.body.id = productDetails.length + 1;
      productDetails = [...productDetails, (req.body)]
      res.send(productDetails);
  }
})

app.post('/getProduct', (req, res) => {
  if(Object.keys(req.body).length === 0)
  {
    res.status(500).send({ error: 'Empty response' })
  }
  else{
  var reqData = productDetails.filter((product) => product.id === req.body.id)
  res.send(reqData);
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})