import mongoose from "mongoose";

const centreSchema = new mongoose.Schema({
    centreName : {type: String, default: ""},
    centreAddress: {type: String, default: ""},
    workingHours: {type: String, default: ""},
    isActive: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
})

const Centres = mongoose.model("Centre", centreSchema )
export default Centres;

// vaccinationSlots : [
//     {
//         slotNum: {type: Number, default: 1},
//         slotStatus: {type: Boolean, default: false},
//         userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"}

//     },
//     {
//         slotNum: {type: Number, default: 2},
//         slotStatus: {type: Boolean, default: false},
//         userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"}
//     },
//     {
//         slotNum: {type: Number, default: 3},
//         slotStatus: {type: Boolean, default: false},
//         userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"}

//     },
//     {
//         slotNum: {type: Number, default: 4},
//         slotStatus: {type: Boolean, default: false},
//         userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"}

//     },
//     {
//         slotNum: {type: Number, default: 5},
//         slotStatus: {type: Boolean, default: false},
//         userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"}

//     },
//     {
//         slotNum: {type: Number, default: 6},
//         slotStatus: {type: Boolean, default: false},
//         userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"}

//     },
//     {
//         slotNum: {type: Number, default: 7},
//         slotStatus: {type: Boolean, default: false},
//         userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"}

//     },
//     {
//         slotNum: {type: Number, default: 8},
//         slotStatus: {type: Boolean, default: false},
//         userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"}

//     },
//     {
//         slotNum: {type: Number, default: 9},
//         slotStatus: {type: Boolean, default: false},
//         userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"}

//     },
//     {
//         slotNum: {type: Number, default: 10},
//         slotStatus: {type: Boolean, default: false},
//         userId: {type: mongoose.Schema.Types.ObjectId, ref: "user"}

//     },

// ],