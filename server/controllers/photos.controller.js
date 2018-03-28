const Photo = require('../models/Photo')
const Comment = require('../models/Comment')
const jwt = require('jsonwebtoken')

module.exports = {
    photoCreate: (req, res) => {
        let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);
        new Photo ({
            imageUrl: req.file.cloudStoragePublicUrl,
            user: decoded.id,
            caption: req.body.caption,
        }).save()
        .then((photo) => {
            res.status(201).json({
            message:'Photo successfully created!',
            photo
            })
        })
        .catch((err) => {
            res.status(500).json({
            message:'Error creating new Photo!',
            err
            })
        })
    },

    photoReadAll: (req, res) => {
        Photo
            .find()
            .populate({
                path:'comments',
                select: 'user createdAt comment',
                populate: {
                    path: 'user',
                    select: 'name'
                }
            })
            .populate({
                path:'like',
                select: 'name'
            })
            .populate({
                path:'user',
                select: 'name email'
            })
            .exec()
            .then((photos) => {
                res.status(200).json({
                    photos
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: `Error getting photos`,
                    err
                })
            })
    },

    captionUpdate: (req, res) => {
        let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);
        Photo
            .findById(req.params.id)
            .then((photo) => {
                if(photo) {
                    if (String(photo.user) === decoded.id) {
                        photo.caption = req.body.caption
                        photo
                            .save()
                            .then((Response) => {
                                res.status(200).json({
                                    message: `Caption successfully updated`,
                                    photo
                                })
                            })
                    } else {
                        res.status(500).json({
                            message: `You cannot update someone else photo`
                        })
                    }
                } else {
                    res.status(500).json({
                        message: `Photo not exist`,
                        err
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    message: `Error getting photos`,
                    err
                })
            })
    },

    photoDelete: (req, res) => {
        let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);
        Photo
            .findById(req.params.id)
            .then((photo) => {
                if (photo) {
                    if (String(photo.user) === decoded.id) {
                        photo
                            .remove()
                            .then((Response) => {
                                res.status(200).json({
                                    message: `Photo successfully deleted`,
                                    photo
                                })
                            })
                    } else {
                        res.status(500).json({
                            message: `You cannot delete someone else photo`
                        })
                    }
                } else {
                    res.status(500).json({
                        message: `Photo not exist`,
                        err
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    message: `Error getting photos`,
                    err
                })
            })
    },

    photoComment: (req, res) => {
        let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);
        Photo
            .findById(req.params.id)
            .then((photo) => {
                if(photo) {
                    new Comment ({
                        comment: req.body.comment,
                        user: decoded.id,
                        photo: photo._id
                    }).save()
                    .then((comment) => {
                        photo.comments.push(comment._id)
                        photo.save()
                        res.status(201).json({
                            message:'Comment successfully added!',
                            photo,
                            comment
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message:'Error creating new Comment!',
                            err
                        })
                    })
                } else {
                    res.status(500).json({
                        message: `Photo not exist`,
                        err
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    message: `Error adding comment`,
                    err
                })
            })
    },

    photoLike: (req, res) => {
        let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);
        Photo
            .findById(req.params.id)
            .then((photo) => {
                if(photo) {
                    if(String(photo.user) !== decoded.id) {
                        let liked = photo.likes.indexOf(decoded.id)
                        if(liked < 0) {
                            photo.likes.push(decoded.id)
                            photo.save()
                            res.status(201).json({
                                message:'Photo successfully liked!',
                                photo
                            })
                        } else {
                            res.status(500).json({
                                message:'You cannot like same photo fro twice!'
                            })
                        }
                    } else {
                        res.status(500).json({
                            message:'You cannot like your own photo!'
                        })
                    }
                } else {
                    res.status(500).json({
                        message: `Photo not exist`,
                        err
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    message: `Error liking photos`,
                    err
                })
            })
    },

    photoUnlike: (req, res) => {
        let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);
        Photo
            .findById(req.params.id)
            .then((photo) => {
                if(photo) {
                    let index = photo.likes.indexOf(decoded.id)
                    if(index >= 0) {
                        photo.likes.splice(index, 1)
                        photo.save()
                        res.status(200).json({
                            message: `Photo successfully unliked!`,
                            photo
                        })
                    } else {
                        res.status(500).json({
                            message:'You must like to unlike this photo!'
                        })
                    }
                } else {
                    res.status(500).json({
                        message: `Photo not exist`,
                        err
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    message: `Error liking photos`,
                    err
                })
            })
    }
}