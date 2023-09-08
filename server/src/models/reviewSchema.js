const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	movieID: {
		type: String,
		required: true,
	},
	Rating: {
		type: Number,
		required: true,
	},
	commentText: {
		type: String,
	},
	Replies: [
		{
			type: String,
		},
	],
});

module.exports = mongoose.model('Review', reviewSchema);
