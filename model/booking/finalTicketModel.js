const { Schema, default: mongoose, model } = require("mongoose");

const FinalTicket = new Schema({
    Your_journey_data: {
        type: mongoose.Types.ObjectId,
        ref: "JourneyStart"
    },
    ticket_data: {
        type: mongoose.Types.ObjectId,
        ref: "TicketDetails"
    }

}, { timestamps: true })



const Final = model("FinalData", FinalTicket)
module.exports = Final;