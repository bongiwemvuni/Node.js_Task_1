const http = require('node:http')

const hostname = '127.0.0.1'
const port = 3000

const express = require('express');
const path = require('path');
const fs = require('fs');
const { ensureDataFile, readData, writeData } = require('./data');

const app = express();
const PORT = 3000;

ensureDataFile();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/data', (req, res) => {
  const existingData = readData();
  existingData.push(req.body);
  writeData(existingData);
  res.status(201).json({ message: "Data saved successfully!" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, hostname, () => {
  console.log(`Server running`);
});


let movies = ['Dune', 'Perfume','Avatar', 'Titanic']
let series = ['This is us', 'The office', 'Parks and recs', 'Breaking bad', 'Supernatural', 'Will and Grace']
let songs =  ['Selfish', 'All for you', 'Things will get better', 'Addicated to you']

const handleMovisEndpoint = (req, res) => {
    if(req.method === 'POST'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({message: 'created'}))
    }else if(req.method === 'DELETE'){
        movies.splice(0,1)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({message: 'deleted', movies: movies}))
    }else if(req.method === 'PUT'){
        movies[0] = 'James Bond'
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({message: 'updated', movies: movies}))
    }else if(req.method === 'GET'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ movies: movies}))
    }else{
        res.statusCode = 404
        res.end()
    }

}

const handleSeriesEndpoint = (req, res) => {
    if(req.method === 'POST'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({message: 'created'}))
    }else if(req.method === 'DELETE'){
        series.splice(0,1)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({message: 'deleted', series: series}))
    }else if(req.method === 'PUT'){
        series[0] = 'Blackish'
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({message: 'updated', series: series}))
    }else if(req.method === 'GET'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ series: series}))
    }else{
        res.statusCode = 404
        res.end()
    }

}

const handleSongsEndpoint = (req ,res) => {
    if(req.method === 'POST'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({message: 'created'}))
    }else if(req.method === 'DELETE'){
        songs.splice(0,1)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({message: 'deleted', songs: songs}))
    }else if(req.method === 'PUT'){
        songs[0] = 'We belong together'
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({message: 'updated', songs: songs}))
    }else if(req.method === 'GET'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ songs: songs}))
    }else{
        res.statusCode = 404
        res.end()
    }

}
const server = http.createServer((req, res) => {

    console.log(req.url);
    if(req.url == '/movies'){ 
        handleMovisEndpoint(req, res)   
    }else if(req.url == '/songs'){
        handleSongsEndpoint(req, res)
    }else if (req.url == '/series'){
        handleSeriesEndpoint(req, res)
    }
})

server.listen(port, hostname, () => {
    console.log('server running');
})