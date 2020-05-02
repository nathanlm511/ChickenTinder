const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//DONE: notice that User has evolved and not includes 'caloriegoal' and 'minutegoal'.
const schema = new Schema({
        passcode: { type: String, unique: true, required: true },
        host: { type: String, required: true },
        users: { type: [String]},
        votes: { type: [ {id: {type: String}, name: {type: String} , numVotes: {type: Number }}] },
        started: { type: Boolean},
        winner: {type: String}
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Group', schema);
