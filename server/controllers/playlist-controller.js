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

deletePlaylist = async (req, res) => {
    Playlist.findById({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Playlist not found!',
            })
        }

        async function asyncFindUser(list) {
            User.findOne({ email: list.ownerEmail }, (err, user) => {
                if (user._id == req.userId) {
                    Playlist.findOneAndDelete({ _id: req.params.id }, () => {
                        return res.status(200).json({ 
                            success: true 
                        });
                    }).catch(err => console.log(err))
                }
                else {
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

getPlaylists = async (req, res) => {
    const { query, sort } = req.query;
    if(query.name) {
        query.name = { '$regex': new RegExp(`${query.name}` , 'g') };
    }
    else if(query.ownerUsername) {
        query.ownerUsername = { '$regex': new RegExp(`${query.ownerUsername}` , 'g') };
    }
    try {
        console.log(query);
        console.log(sort);
        const foundPlaylists = await Playlist.find(query).collation({locale: "en" }).sort(sort).exec();
        console.log(foundPlaylists);
        return res.status(200).json({ success: true, playlists: foundPlaylists});
    }
    catch(error) {
        return res.status(400).json({ success: false, errorMessage: error})
    }
}

updatePlaylist = async (req, res) => {
    const body = req.body
    const type = req.body.type;

    console.log(req.body);

    if (!body) {
        return res.status(400).json({
            success: false,
            errorMessage: 'You must provide a body to update'
        })
    }
    if(!type) {
        return res.status(400).jason({
            success: false,
            errorMessage: 'You must provide a reason to update'
        })
    }

    let existingPlaylist = await Playlist.findById(req.params.id).exec();
    if(!existingPlaylist) {
        return res.status(400).json({
            success: false,
            errorMessage: 'Playlist not found!',
        })
    }
    switch(type) {
        case 'rename': {
            const user = await User.findOne({ email: existingPlaylist.ownerEmail }).exec();
            if(user._id == req.userId) {

                let newName = body.newName;

                const duplicatePlaylist = await Playlist.findOne({ name: newName, ownerEmail: existingPlaylist.ownerEmail }).exec();
                if(duplicatePlaylist) {
                    const similarPlaylists = await Playlist.find({ name: { '$regex': new RegExp(`^${newName} \\([0-9]+\\)$`, 'g') }, ownerEmail: existingPlaylist.ownerEmail }).exec();
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
                
                existingPlaylist.name = newName;
                console.log(newName)
                existingPlaylist.save().then(() => {
                    return res.status(200).json({
                        success: true,
                        newName: newName,
                    })
                })
                .catch(err => {
                    return res.status(400).json({
                        success: false,
                        errorMessage: err
                    })
                })
            }
            else {
                return res.status(400).json({ 
                    success: false, errorMessage: 
                    "Authentication error" 
                });
            }
            break;
        }
        case 'overwrite': {
            const user = await User.findOne({ email: existingPlaylist.ownerEmail }).exec();
            if(user._id == req.userId) {
                existingPlaylist.songs = body.playlist.songs;
                existingPlaylist.published = body.playlist.published;
                existingPlaylist.comments = body.playlist.comments;
                existingPlaylist.listens = body.playlist.listens;
                existingPlaylist.publishedDate = body.playlist.publishedDate;
                existingPlaylist.save().then(() => {
                    return res.status(200).json({
                        success: true,
                        playlist: existingPlaylist,
                    })
                })
                .catch(err => {
                    return res.status(400).json({
                        success: false,
                        errorMessage: err
                    })
                })
            }
            else {
                return res.status(400).json({ 
                    success: false, errorMessage: 
                    "Authentication error" 
                });
            }
            break;
        }
        case 'like': {
            const user = await User.findOne({ username: body.username }).exec();
            if(user && user._id == req.userId) {
                let likes = existingPlaylist.likes;
                let dislikes = existingPlaylist.dislikes;

                if(likes.includes(body.username)) {
                    let index = likes.indexOf(body.username);
                    likes.splice(index, 1);
                }
                else {
                    likes.push(body.username)
                    if(dislikes.includes(body.username)) {
                        let index = dislikes.indexOf(body.username);
                        dislikes.splice(index, 1);
                    }
                }

                existingPlaylist.likes = likes;
                existingPlaylist.dislikes = dislikes;
                existingPlaylist.numLikes = likes.length;
                existingPlaylist.numDislikes = dislikes.length;
                existingPlaylist.save().then(() => {
                    return res.status(200).json({
                            success: true,
                            id: existingPlaylist._id,
                        })
                    })
                .catch(err => {
                    return res.status(400).json({
                        success: false,
                        errorMessage: err
                    })
                })
            }
            else {
                return res.status(400).json({ 
                    success: false, errorMessage: 
                    "Authentication error" 
                });
            }
            break;
        }
        case 'dislike': {
            const user = await User.findOne({ username: body.username }).exec();
            if(user && user._id == req.userId) {
                let likes = existingPlaylist.likes;
                let dislikes = existingPlaylist.dislikes;

                if(dislikes.includes(body.username)) {
                    let index = dislikes.indexOf(body.username);
                    dislikes.splice(index, 1);
                }
                else {
                    dislikes.push(body.username)
                    if(likes.includes(body.username)) {
                        let index = likes.indexOf(body.username);
                        likes.splice(index, 1);
                    }
                }

                existingPlaylist.likes = likes;
                existingPlaylist.dislikes = dislikes;
                existingPlaylist.numLikes = likes.length;
                existingPlaylist.numDislikes = dislikes.length;
                existingPlaylist.save().then(() => {
                    return res.status(200).json({
                            success: true,
                            id: existingPlaylist._id,
                        })
                    })
                .catch(err => {
                    return res.status(400).json({
                        success: false,
                        errorMessage: err
                    })
                })
            }
            else {
                return res.status(400).json({ 
                    success: false, errorMessage: 
                    "Authentication error" 
                });
            }
            break;
        }
        case 'comment': {
            const user = await User.findOne({ username: body.comment.username }).exec();
            if(user && user._id == req.userId) {
                existingPlaylist.comments.push(body.comment);

                existingPlaylist.save().then(() => {
                    return res.status(200).json({
                            success: true,
                            id: existingPlaylist._id,
                        })
                    })
                .catch(err => {
                    return res.status(400).json({
                        success: false,
                        errorMessage: err
                    })
                })
            }
            else {
                return res.status(400).json({ 
                    success: false, errorMessage: 
                    "Authentication error" 
                });
            }
            break;
        }
        case 'listen': {
            existingPlaylist.listens++;
            existingPlaylist.save().then(() => {
                return res.status(200).json({
                        success: true,
                        id: existingPlaylist._id,
                    })
                })
            .catch(err => {
                return res.status(400).json({
                    success: false,
                    errorMessage: err
                })
            })
        }
    }

    // const user = await User.findOne({ email: existingPlaylist.ownerEmail }).exec();
    // if(user._id == req.userId) {
    //     existingPlaylist.name = body.playlist.name;
    //     existingPlaylist.songs = body.playlist.songs;
    //     existingPlaylist.likes = body.playlist.likes;
    //     existingPlaylist.dislikes = body.playlist.dislikes;
    //     existingPlaylist.published = body.playlist.published;
    //     existingPlaylist.comments = body.playlist.comments;
    //     existingPlaylist.save().then(() => {
    //         return res.status(200).json({
    //             success: true,
    //             id: existingPlaylist._id,
    //         })
    //     })
    //     .catch(err => {
    //         return res.status(400).json({
    //             success: false,
    //             errorMessage: err
    //         })
    //     })
    // }
    // else {
    //     existingPlaylist.likes = body.playlist.likes;
    //     existingPlaylist.dislikes = body.playlist.dislikes;
    //     existingPlaylist.comments = body.playlist.comments;
    //     existingPlaylist.save().then(() => {
    //         return res.status(200).json({
    //             success: true,
    //             id: existingPlaylist._id,
    //         })
    //     })
    //     .catch(err => {
    //         return res.status(400).json({
    //             success: false,
    //             errorMessage: err
    //         })
    //     });
    //     // return res.status(400).json({ 
    //     //     success: false, errorMessage: 
    //     //     "Authentication error" 
    //     // });
}
module.exports = {
    createPlaylist,
    deletePlaylist,
    getPlaylists,
    updatePlaylist
}