const {model, Schema} = require('mongoose')

const AccountSchema = new Schema({
    username : {type: String}, // for strings
    funds : {type: Number}, // for numbers
})

module.exports = model('Account', AccountSchema);