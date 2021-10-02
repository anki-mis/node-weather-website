const request = require('postman-request');

const geocode = (address, callback_function) => {

    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5raS1taXMiLCJhIjoiY2tzeGtyeGF2MGd6NTJ4cWl5dG5iNXJxaSJ9.Do5dw_w2MDD8hNAawwmJmA&limit=1';

    request({ url: geocodeURL, json: true }, (error, response) => {
        if (error) {
            callback_function('Something went wrong while accessing the specified location information.', undefined);
        }
        else if (response.body.features.length === 0){
            callback_function('Not a valid request. Try another search.', undefined);
        }
        else
        {
            const lat = response.body.features[0].center[1];
            const lon = response.body.features[0].center[0];
            const map_rendered_loc = response.body.features[0].place_name;
            callback_function(undefined, {
                latitude: lat,
                longitude: lon,
                location: map_rendered_loc
            });
        }    
    }); 

}

module.exports = geocode;

