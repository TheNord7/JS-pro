const express = require('express');
const { json } = require('express/lib/response');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use('/', express.static('./All'));


app.get('/api/products', (req, res) => {
    fs.readFile('./server/itemFiles/products.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else res.send(data);
    });
});

app.get('/api/cart', (req, res) => {
    fs.readFile('./server/itemFiles/userCart.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else res.send(data);
    });
});

app.post('/api/cart', (req, res) => {
    fs.readFile('./server/itemFiles/userCart.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else {
            const cart = JSON.parse(data);
            cart.contents.push(req.body);

            fs.writeFile('./server/itemFiles/userCart.json', JSON.stringify(cart), (err) => {
                if (err) res.end(JSON.stringify({ result: 0, err }));
                else res.end(JSON.stringify({ result: 1 }));
            });
        }
    });
});

app.put('/api/cart/:id', (req, res) => {
    fs.readFile('./server/itemFiles/userCart.json', 'utf-8', (err, data) => {
        const userCart = JSON.parse(data);
        const find = userCart.contents.find(good => good.id_product === Number(req.params.id));
        find.quantity += req.body.quantity;

        fs.writeFile('./server/itemFiles/userCart.json', JSON.stringify(userCart), (err) => {
            if (err) res.end(JSON.stringify({ result: 0, err }));
            else res.end(JSON.stringify({ result: 1 }));
        });
    });
});

app.delete('/api/cart', (req, res) => {
    fs.readFile('./server/itemFiles/userCart.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else {
            const cart = JSON.parse(data);


            fs.writeFile('./server/itemFiles/userCart.json', JSON.stringify(cart), (err) => {
                if (err) res.end(JSON.stringify({ result: 0, err }));
                else res.end(JSON.stringify({ result: 1 }));
            });
        }
    });
});



app.listen(7777, () => {
    console.log('Server started!');
});


