const path = require('path');
const express = require('express');
const hbs = require('hbs'); /* not needed if using handlebars just to render whole 
                               dynamic web pages like help.hbs,about.hbs */
const request = require('postman-request');    
const geocode = require('../utils/geocode');    
const weatherinfo = require('../utils/weatherinfo');                        

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine, views location and partials location
app.set('view engine','hbs');
/* below app.set('views',viewsPath); is important so that node looks for templates inside <root>/templates folder, 
 otherwise node will look for a views folder which is now renamed to templates folder.
 A lot of these settings(similar to below) used in this program file can be found and extended referring to the website,
  expressjs.com -> API reference page*/
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

/*app.get('', (req,res) => {
    res.send('Home Page (root).');
});*/


app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Weather information.',
        createdBy: 'Sea Turtle'
    });
});

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About page title',
        name: 'About page name',
        createdBy: 'Sea Turtle'
    });
});

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help page title',
        msg_from_prgm: 'Message passed in from the Main() to help.hbs template. The template will display it based on whether the template script uses this input variable(like displaying) or not.'
        + 'If not, this message is just sent to the template and not used just like an input variable passed to a function but the function code doesnt use it.',
        createdBy: 'Sea Turtle'
    });
});

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({        
            error: 'Please provide the address of the location you want to view the weather forecast for.'
        }); 
    }    

    geocode(req.query.address,(err, geodata) =>{
        if (!err) {
            weatherinfo(geodata.latitude, geodata.longitude, (w_err, weather_data) => {
                if (!w_err) {
                    //console.log('Current temperature at '+ geodata.location +' is ' + weather_data);
                    return res.send({
                        address: req.query.address,
                        forecast: 'Current temperature at '+ geodata.location +' is ' + weather_data.temperature + ' degrees celcius and humidity is ' + weather_data.humidity + '.',
                        location: geodata.location + ' - it is coming from response and should match with that coming from request that is address'
                    });
                }        
                else {
                    //console.log('Error while fetching weather information for specified location: '+ w_err);
                    return res.send({        
                        error: 'Error while fetching weather information for specified location: '+ w_err
                    }); 
                }
            });
        }
        else {
            //console.log('Error while fetching the location whose weather is expected: '+ err);
            return res.send({        
                error: 'Error while fetching the location whose weather is expected: '+ err
            }); 
        }
    });


    /*
    -- hardcoded response for no error
    res.send({
        address: req.query.address,
        forecast:'It is raining',
        location:'Philadelphia - it is coming from response and should match with that coming from request that is address'
    });*/
});

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({        
            error: 'You must provide the product name to search for.'
        }); 
    }
    
    console.log(req.query.search);
    res.send({        
        products:[]
    });
});

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Help not found.',
        createdBy: 'Sea Turtle'
    });
});

app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        errorMessage: '404 Error.',
        createdBy: 'Sea Turtle'
    });
});

// setting up server to keep listening
app.listen(port, () => {
    console.log('Server is up and running on port ' + port + '.' );
});
