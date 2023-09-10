const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	uid:{
		type: String,
		required: true
	},
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
			uid: {
				type: String,
				required: true, // Assuming you want the UID to be required for each reply
			},
			text: {
				type: String,
				required: true, // Assuming you want the reply text to be required
			},
		}
	],
});

module.exports = mongoose.model('Review', reviewSchema);
