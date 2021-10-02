const request = require('postman-request');

/*request({ url: url }, (error, response) => {
    console.log('----------- (1) ------------- : ');
    console.log('current property of response body is : ');
    console.log(JSON.parse(response.body).current);
    console.log('-------------------------------------');
    console.log('error is : ');
    console.log(error);
});*/

const weatherinfo = (lat, lon, weather_callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=acb9745f865f7949d2f00f27f17336e5&query=' + lat + ',' + lon;

    request({ url: url, json: true }, (error, response) => {
        
        if (error) {
            weather_callback('Something went wrong while accessing the weather data.', undefined);
        }
        else if (response.body.error){
            weather_callback('Unable to find location.', undefined);
        }
        else
        {
            weather_callback(undefined, response.body.current.temperature);
        }   
        
        
    });
}

module.exports = weatherinfo;

