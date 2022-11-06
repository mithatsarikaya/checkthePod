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
        type: Number,
        },
    productRawAmountRequested: {
        type: Number
    },
    numberOnTheWeighing:{
        type: Number,
        default: function() {
            return (this.podFreeWeight && this.podTotalWeight && this.productRawAmount && this.productRawAmountRequested) ? 
            this.podTotalWeight - ((this.podTotalWeight-this.podFreeWeight)/this.productRawAmount*this.productRawAmountRequested)
            : 0
        }
    }
    

})


const Pods = mongoose.model('pods', podSchema)

module.exports = Pods