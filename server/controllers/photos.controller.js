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
        .then((user) => {
            res.status(201).json({
            message:'Photo successfully created!',
            user
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
            .populate('comment')
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
        Photo
            .findById(req.params.id)
            .then((photo) => {
                if(photo) {
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
        Photo
            .findById(req.params.id)
            .then((photo) => {
                if(photo) {
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
        commentCreate: (req, res) => {
            let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);
            Photo
                .findById(req.params.id)
                .then((photo) => {
                    if(photo) {
                        photo.likes.push(decoded.id)
                        photo.save()
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
        }
    }
}