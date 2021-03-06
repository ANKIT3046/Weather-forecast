const express = require('express');
const path =require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app =express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
// Setup handelbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
//Static Directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res) =>{
  res.render('index', {
    title: 'Weather',
    name: 'Ankit Kumar'
  });
})

app.get('/about', (req,res) =>{
  res.render('about', {
    title:'About App',
    name: 'Ankit kumar'
  });
})

app.get('/help', (req,res) =>{
  res.render('help', {
    title: 'Contact',
    name: 'Ankit Kumar'

  })
})


app.get('/weather',(req,res) =>{
  if(!req.query.address){
    return res.send({
      error: 'You must Provide an address'
    })
  }

  geocode(req.query.address, (error,{latitude, longitude,location } = {}) =>{
    if (error){
      return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData) =>{
      if (error) {
        return res.send({error});
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  });

  // res.send({
  //   forecast:'It is snowing',
  //   location: 'Bokaro',
  //   address: req.query.address
  // });
})

app.get('/products',(req,res)=>{
  if (req.query.search){
    return res.send({
      error: 'You must provide search term'
    })
  }
  res.send({
    products:[]
  })
})


app.get('/help/*', (req,res) =>{
  res.render('404', {
    title: '404',
    name: 'Ankit Kumar',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req,res) =>{
  res.render('404',{
    title: '404',
    name: 'Ankit Kumar',
    errorMessage: 'Page not found.'
  });
})

app.listen(3000, ()=>{
  console.log('Server is running on port 3000');
})
