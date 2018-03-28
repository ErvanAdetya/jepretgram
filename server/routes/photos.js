const router = require('express').Router();
const {photoCreate, photoReadAll, captionUpdate, photoDelete, photoComment} = require('../controllers/photos.controller')
const {sendUploadToGCS, uploadMem} = require('../middlewares/upload')
const {authentication} = require('../middlewares/auth')

router.get('/', photoReadAll);
router.post('/', authentication, uploadMem.single('avatar'), sendUploadToGCS, photoCreate);
router.put('/:id',authentication, captionUpdate);
router.delete('/:id', authentication, photoDelete);

router.post('/:id/comment', authentication, photoComment);

module.exports = router;
