const { default: mongoose } = require('mongoose')

const Schema = require('mongoose').Schema

const podSchema = new Schema({
    podName:{
        type: String,
        require: true
    },
    podFreeWeight: {
        type: Number
        },
    podTotalWeight: {
        type: Number
        },
    productRawAmount: {
        type: Number
        },
    productRawAmountRequested: {
        type: Number
    },
    numberOnTheWeighing:{
        type: Number,
        default: function() {
            return this.podTotalWeight - ((this.podTotalWeight-this.podFreeWeight)/this.productRawAmount*this.productRawAmountRequested)
        }
    }

})


const Pods = mongoose.model('pods', podSchema)

module.exports = Pods