const NodeGeocoder = require('node-geocoder')

const options = {
    provider: process.env.GEOCODER_PROVIDER,
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null,
}
console.log('options', options)

const geocoder = NodeGeocoder(options)

export default geocoder
