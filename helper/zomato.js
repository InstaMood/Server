const zomato = require('zomato.js')
//7ce8c757c527de14d185f95328de4f31 api credential
const axios = require('axios')

function foodRecom ( mood ) {
    // const dessert = 100
    const category = {
        padang : 235,
        dessert : 100,
        aceh : 237,
        bakmi : 261
    }

    
    switch (mood) {
        case 'joy':
            return axios({
                url:`https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&count=3&radius=10000&cuisines=${category.dessert}&sort=rating&order=desc`,
                method: 'GET',
                headers: {
                    "user-key" : "7ce8c757c527de14d185f95328de4f31"
                },
            })
        case 'sorrow':
            
            return axios({
                url: `https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&count=3&radius=10000&cuisines=${category.padang}&sort=rating&order=desc`,
                method: 'GET',
                headers: {
                    "user-key" : "7ce8c757c527de14d185f95328de4f31"
                },
            })
        case 'anger':
            return axios({
                url: `https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&count=3&radius=10000&cuisines=${category.aceh}&sort=rating&order=desc`,
                method: 'GET',
                headers: {
                    "user-key" : "7ce8c757c527de14d185f95328de4f31"
                },
            })
        case 'surprise':
            return axios({
                url: `https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&count=3&radius=10000&cuisines=${category.bakmi}&sort=rating&order=desc`,
                method: 'GET',
                headers: {
                    "user-key" : "7ce8c757c527de14d185f95328de4f31"
                },
            })
        case 'Wajah kurang jelas':
            return new Promise(function(resolve, reject) {
                // executor (the producing code, "singer")
                reject('No face detected')
                // throw({'msg':'no face detected'})
              });
        case 'No face detected':
            return new Promise(function(resolve, reject) {
                // executor (the producing code, "singer")
                reject('No face detected')
              });
        default:
            break;
    }
    
}

module.exports = foodRecom