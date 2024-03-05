const mongoose = require("mongoose");
const InstrumentsSchema = new mongoose.Schema(
    {
       RiskScore: {
        type: String
       },
       nigerianStocks: {
        type: String
       },
       foreignStocks:{
        type: String
       },
       techStocks:{
        type: String
       },
       emergingStocks:{
        type: String
       },
       nigerianBonds:{
        type: String
       },
       foreignBonds:{
        type: String
       },
       commodities:{
        type: String
       },
       realEstate:{
        type: String
       },
       tBills:{
        type: String
       },
       Alternative:{
        type: String
       }
    }
)

const Instruments = mongoose.model('Instruments', InstrumentsSchema)

module.exports = Instruments