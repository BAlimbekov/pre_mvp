const exp = require('constants');
const { query } = require('express');
const express = require('express')
const app = express()
const port = 4000;
const cors = require('cors');
app.use(cors());
const { Client } = require('pg');
const { stringify } = require('querystring');
const connectionString = 'postgresql://postgres:docker@127.0.0.1:5432/familycar_db';
const client = new Client({
    connectionString: connectionString
});
client.connect();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/family', (req, res) => {
    client.query('SELECT * FROM family')
        .then((result) => {
            res.status(200).send(result.rows)
        })
        .catch((err) => console.error(err.stack))
});

app.get('/van', (req, res) => {
    client.query('SELECT * FROM van')
        .then((result) => {
            res.status(200).send(result.rows)
        })
        .catch((err) => console.error(err.stack))
});

app.get('/api/family/:id', (req, res) => {
    const id = req.params.id;
    client.query(`SELECT * FROM family WHERE id=${id}`)
        .then((result) => {
            res.status(200).send(result.rows)
        })
        .catch((err) => console.error(err.stack))
});

// app.get('/api/van/:id', (req, res) => {
//     const id = req.params.id;
//     console.log(id)
//     client.query(`SELECT * FROM van WHERE id=${id}`)
//         .then((result) => {
//             res.status(200).send(result.rows)
//         })
//         .catch((err) => console.error(err.stack))
// });

app.post('/api/family', (req, res)=>{
    const member = req.body;
    const member_name= member.member_name;
    const driver_license = member.driver_license;
    const van_id = member.van_id;
    const id = req.params.id;
    const queryString = "INSERT INTO family(member_name, driver_license, van_id)VALUES($1, $2, $3)"
    client.query(queryString,[member_name, driver_license, van_id])
    .then((result)=>{
        res.status(200).send("added")
    })
    .catch((err)=> console.error(err.stack))
});

app.post('/api/van', (req, res)=>{
    const car = req.body;
    const make= car.make;
    const license_plate = car.license_plate;
    const id = req.params.id;
    const queryString = "INSERT INTO van(make, license_plate)VALUES($1, $2)"
    client.query(queryString,[make, license_plate])
    .then((result)=>{
        res.status(200).send("added")
    })
    .catch((err)=> console.error(err.stack))
});


app.delete('/api/family/:id', (req, res)=> {
    const id = req.params.id;
    client.query(`DELETE FROM family WHERE id=${id}`)
    .then((result)=>{
        res.status(200).send("deleted")
    })
    .catch((err)=> console.error(err.stack))
});

app.delete('/api/van/:id', (req, res)=> {
    const id = req.params.id;
    client.query(`DELETE FROM van WHERE id=${id}`)
    .then((result)=>{
        res.status(200).send("deleted")
    })
    .catch((err)=> console.error(err.stack))
});


app.patch('/api/family/:id', (req, res)=> {
    const member = req.body;
    const member_name= member.member_name;
    const driver_license = member.driver_license;
    const van_id = member.van_id;
    const id = req.params.id;
    client.query(`UPDATE family SET member_name='${member_name}' WHERE id=${id}`)
    .then((result)=> {
        res.status(200).send('patched')
    })
    .catch((err)=>console.error(err.stack))
});

app.patch('/api/van/:id', (req, res)=> {
    const car = req.body;
    const make= car.make;
    const license_plate = car.license_plate;
    const id = req.params.id;
    client.query(`UPDATE van SET make='${make}', license_plate='${license_plate}' WHERE id=${id}`)
    .then((result)=> {
        res.status(200).send('patched')
    })
    .catch((err)=>console.error(err.stack))
});


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})