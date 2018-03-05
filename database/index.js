const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/soloweek')

let db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

let imageSchema = mongoose.Schema({
  url: String,
  title: String,
  location: String,
  description: String,
  comments: [String],
  uploadDate: Date,
  likes: Number,
  tags: [String]
})

let Image = mongoose.model('Image', imageSchema)

module.exports.save = (img) => {
  console.log('queried database', img)
  return Image.create({
    url: img.url,
    title: img.title,
    location: img.location,
    description: img.description,
    comments: img.comments,
    uploadDate: img.uploadDate,
    likes: img.likes,
    tags: img.tags
  })
}

module.exports.getAll = () => {
  return Image.find({}).exec()
}

module.exports.getDetails = (imageId) => {
  return Image.find({_id: imageId}).exec()
}

module.exports.addLike = (imageId) => {
  return Image.update(
    {_id: imageId},
    {$inc: {likes: 1}}
  ).exec()
}

module.exports.addComment = (imageId, comment) => {
  return Image.update(
    {_id: imageId},
    {$push: {comments: comment}}
  ).exec()
}