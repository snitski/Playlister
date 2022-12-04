const Playlist = require('../models/playlist-model')
const User = require('../models/user-model');

createPlaylist = (req, res) => {
    const { name, songs, ownerEmail, published, ownerUsername } = req.body;
    if (!name || !ownerEmail || !ownerUsername) {
        return res.status(400).json({
            success: false,
            errorMessage: 'Please provide a valid playlist.',
        })
    }

    User.findOne({ _id: req.userId }, async (err, user) => {
        if(err) {
            return res.status(400).json({ 
                success: false,
                errorMessage: err
            });
        }
        if(!user) {
            return res.status(400).json({ 
                success: false,
                errorMessage: "User not found" 
            });
        }
        if (user.email !== ownerEmail || user.username !== ownerUsername) {
            return res.status(400).json({ 
                success: false,
                errorMessage: "Authentication error" 
            });
        }

        let newName = name;

        const duplicatePlaylist = await Playlist.findOne({ name: name, ownerEmail: ownerEmail }).exec();
        if(duplicatePlaylist) {
            const similarPlaylists = await Playlist.find({ name: { '$regex': new RegExp(`^${name} \\([0-9]+\\)$`, 'g') }, ownerEmail: ownerEmail }).exec();
            if(similarPlaylists) {
                let lowestNum = 1;
                for(let i = 0; i < similarPlaylists.length; i++) {
                    let currentNum = similarPlaylists[i].name.match(/\([0-9]+\)$/g)[0];
                    currentNum = Number(currentNum.substring(1, currentNum.length-1));
                    if(currentNum < lowestNum && currentNum > 0) {
                        lowestNum = currentNum
                    }
                    else if(currentNum === lowestNum) {
                        lowestNum++;
                    }
                }
                newName += ` (${lowestNum})`;
            }
            else {
                newName += ' (1)';
            }
        }
        const playlist = new Playlist({ name: newName, songs, ownerEmail, ownerUsername, published });
        if (!playlist) {
            return res.status(400).json({ success: false, errorMessage: err })
        }

        user.playlists.push(playlist._id);

        await user.save();
        try {
            await playlist.save();
            return res.status(200).json({
                success: true,
                playlist: playlist
            })
        }
        catch(error) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Playlist Not Created! ' + error
            })
        }
    })
}
// NOT UPDATED
deletePlaylist = async (req, res) => {
    console.log("delete Playlist with id: " + JSON.stringify(req.params.id));
    console.log("delete " + req.params.id);
    Playlist.findById({ _id: req.params.id }, (err, playlist) => {
        console.log("playlist found: " + JSON.stringify(playlist));
        if (err) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    Playlist.findOneAndDelete({ _id: req.params.id }, () => {
                        return res.status(200).json({ success: true });
                    }).catch(err => console.log(err))
                }
                else {
                    console.log("incorrect user!");
                    return res.status(401).json({ 
                        success: false,
                        errorMessage: "authentication error" 
                    });
                }
            });
        }
        asyncFindUser(playlist);
    })
}
// NOT UPDATED
getPlaylistById = async (req, res) => {
    console.log("Find Playlist with id: " + JSON.stringify(req.params.id));

    await Playlist.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        console.log("Found list: " + JSON.stringify(list));

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            await User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    return res.status(200).json({ success: true, playlist: list })
                }
                else {
                    console.log("incorrect user!");
                    return res.status(401).json({ success: false, errorMessage: "authentication error" });
                }
            });
        }
        asyncFindUser(list);
    }).catch(err => console.log(err))
}

getPlaylists = async (req, res) => {
    console.log(req.query);
    try {
        const foundPlaylists = await Playlist.find(req.query).exec();
        return res.status(200).json({ success: true, playlists: foundPlaylists});
    }
    catch(error) {
        return res.status(400).json({ success: false, errorMessage: error})
    }
}
// getPlaylistPairs = async (req, res) => {
//     console.log("getPlaylistPairs");
//     await User.findOne({ _id: req.userId }, (err, user) => {
//         console.log("find user with id " + req.userId);
//         async function asyncFindList(email) {
//             console.log("find all Playlists owned by " + email);
//             await Playlist.find({ ownerEmail: email }, (err, playlists) => {
//                 console.log("found Playlists: " + JSON.stringify(playlists));
//                 if (err) {
//                     return res.status(400).json({ success: false, errorMessage: err })
//                 }
//                 if (!playlists) {
//                     console.log("!playlists.length");
//                     return res
//                         .status(404)
//                         .json({ success: false, errorMessage: 'Playlists not found' })
//                 }
//                 else {
//                     console.log("Send the Playlist pairs");
//                     // PUT ALL THE LISTS INTO ID, NAME PAIRS
//                     let pairs = [];
//                     for (let key in playlists) {
//                         let list = playlists[key];
//                         let pair = {
//                             _id: list._id,
//                             name: list.name
//                         };
//                         pairs.push(pair);
//                     }
//                     return res.status(200).json({ success: true, idNamePairs: pairs })
//                 }
//             }).catch(err => console.log(err))
//         }
//         asyncFindList(user.email);
//     }).catch(err => console.log(err))
// }
// getPlaylists = async (req, res) => {
//     await Playlist.find({}, (err, playlists) => {
//         if (err) {
//             return res.status(400).json({ success: false, errorMessage: err })
//         }
//         if (!playlists.length) {
//             return res
//                 .status(404)
//                 .json({ success: false, errorMessage: `Playlists not found` })
//         }
//         return res.status(200).json({ success: true, data: playlists })
//     }).catch(err => console.log(err))
// }

updatePlaylist = async (req, res) => {
    const body = req.body
    console.log("updatePlaylist: " + JSON.stringify(body));
    console.log("req.body.name: " + req.body.name);

    if (!body) {
        return res.status(400).json({
            success: false,
            errorMessage: 'You must provide a body to update',
        })
    }

    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        console.log("playlist found: " + JSON.stringify(playlist));
        if (err) {
            return res.status(404).json({
                success: false,
                errorMessage: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            await User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    console.log("req.body.name: " + req.body.name);

                    list.name = body.playlist.name;
                    list.songs = body.playlist.songs;
                    list
                        .save()
                        .then(() => {
                            console.log("SUCCESS!!!");
                            return res.status(200).json({
                                success: true,
                                id: list._id,
                            })
                        })
                        .catch(err => {
                            console.log("FAILURE: " + JSON.stringify(err));
                            return res.status(404).json({
                                success: false,
                                errorMessage: err
                            })
                        })
                }
                else {
                    console.log("incorrect user!");
                    return res.status(401).json({ success: false, errorMessage: "authentication error" });
                }
            });
        }
        asyncFindUser(playlist);
    })
}
module.exports = {
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getPlaylists,
    updatePlaylist
}