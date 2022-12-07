const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true }, // QUESTIONABLE
        ownerUsername: { type: String, required: true},
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true },
        published: { type: Boolean, default: false },
        likes: { type: [String], default: [] },
        dislikes: { type: [String], default: [] }, 
        comments: { type: [{
            username: String,
            text: String
        }], default: []},
        listens: {type: Number, default: 0},
        publishedDate: {type: Date, default: null}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
