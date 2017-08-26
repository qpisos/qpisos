const express = require('express');
const cloudinary = require('cloudinary')
const multer  = require('multer');
const async = require('async');
const Listing = require('../models/listing');
const router = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const constants = require('../lib/constants')
const {
  authorizeListing,
  checkOwnership
} = require('../middleware/listing-auth');
let upload = multer({ dest: './uploads/tmp/' });


router.get('/new', ensureLoggedIn('/login'), (req, res) => {
  res.render('listings/new', { home_type: constants.home_type });
});

router.post('/', ensureLoggedIn('/login'), upload.array('image', 9), (req, res, next) => {
  console.log(req.body);
  const tasks = req.files.map(image => uploadToCloudinary(image.path));

  async.parallel(tasks, (error, results) => {
    console.log(req.body.longitude)
    const newListing = new Listing({
      title: req.body.title,
      description: req.body.description,
      home_type: req.body.home_type,
      price: req.body.price,
      _owner: req.user._id,
      size: req.body.size,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      location: {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude]
      },
      images: results.map(i => i.url)
    });

    newListing.save((err) => {
    if (err) {
      console.log('ERROR ' + err);
      res.render('listings/new', { home_type: constants.home_type });
    } else {
      res.redirect(`/listings/${newListing._id}`);
    }
    });
  });
});

function uploadToCloudinary(imagePath) {
  return (callback) => {
    cloudinary.uploader.upload(imagePath, (result) => {
      if (result.error) {
        callback(result.error);
      }
      callback(null, result);
    })
  }
}


router.get('/:id', checkOwnership, (req, res, next) => {
  Listing.findById(req.params.id, (err, listing) => {
    if (err) { return next(err); }

    listing.populate('_owner', (err, listing) => {
      if (err) { return next(err); }
      return res.render('listings/show', { listing });
    });
  });
});


router.get('/:id/edit',
  [
    ensureLoggedIn('/login'),
    authorizeListing,
  ],
  (req, res, next) => {
    Listing.findById(req.params.id, (err, listing) => {
      if (err) { return next(err) }
      if (!listing) { return next(new Error("404")) }
      return res.render('listings/edit', { listing, home_type: constants.home_type })
    });
  });


router.post('/:id',
  [
    ensureLoggedIn('/login'),
    authorizeListing
  ],
  (req, res, next) => {
  const updates = {
    title: req.body.title,
    description: req.body.description,
    home_type: req.body.home_type,
    price: req.body.price,
    _owner: req.user._id,
    size: req.body.size,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    location: {
      type: 'Point',
      coordinates: [req.body.longitude, req.body.latitude]
    }
  };

  Listing.findByIdAndUpdate(req.params.id, updates, (err, listing) => {
    if (err)       { return res.render('listings/edit', { listing, errors: listing.errors }); }
    if (!listing) { return next(new Error("404")); }
    return res.redirect(`/listings/${listing._id}`);
  });
});

module.exports = router;
