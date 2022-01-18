const mongoose = require ('mongoose');

const schema = mongoose.Schema;

const exerciseSchema = new schema({

    username: {type: String,required:true},
    description:{type: String, required:true},
    duration: { type: Number, required: true},
    date: {type: Date, required: true},

},{
    timestamps: true,
});

const exercise = mongoose.model('exercise',exerciseSchema);

module.exports = exercise;