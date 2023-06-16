import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    centreId: {type: mongoose.Schema.Types.ObjectId, ref: "centre"},
    isBooked: {type: Boolean, default: false},
    isActive: {type: Boolean, default: true},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
})

const Slots = mongoose.model("slot", slotSchema )
export default Slots;