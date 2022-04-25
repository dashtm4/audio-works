const multer = require('multer');
const mongodb = require('mongodb');
const ObjectID = require('mongodb').ObjectID;
const { Readable } = require('stream');

const database = require('../config/database');

const BUCKET_NAME = 'audio';

const fetchList = (req, res) => {
  console.log(database);
  database
    .collection('audio.files')
    .find({})
    .project({ _id: 1, filename: 1 })
    .toArray((err, result) => {
      res.send([...result]);
    });
};

const downstream = (req, res) => {
  const id = req.params.id;
  let audioID = '';
  try {
    audioID = new ObjectID(id);
  } catch (err) {
    return res.status(400).json({
      message: 'Invalid ID'
    });
  }
  res.set('content-type', 'audio/mp3');
  res.set('accept-ranges', 'bytes');

  const bucket = new mongodb.GridFSBucket(database.db, {
    bucketName: BUCKET_NAME
  });

  const downloadStream = bucket.openDownloadStream(audioID);
  downloadStream.on('data', (chunk) => {
    res.write(chunk);
  });
  downloadStream.on('error', () => {
    res.sendStatus(404);
  });
  downloadStream.on('end', () => {
    res.end();
  });
};

const upstream = (req, res) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }
  });

  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'Validation Failed' });
    } else if (!req.body.name) {
      return res.status(400).json({ message: 'No file name' });
    }

    const fileName = req.body.name;
    const file = req.file;

    const readableTrackStream = new Readable();
    readableTrackStream.push(file.buffer);
    readableTrackStream.push(null);

    const bucket = new mongodb.GridFSBucket(database.db, {
      bucketName: BUCKET_NAME
    });

    const uploadStream = bucket.openUploadStream(fileName);
    readableTrackStream.pipe(uploadStream);
    uploadStream.on('error', () => {
      return res.status(500).json({ message: 'Failed to upload' });
    });
    uploadStream.on('finish', () => {
      const _id = uploadStream.id;
      const filename = fileName;
      return res.status(201).json({ message: 'Uploaded successfully', uploadedAudio: { filename, _id } });
    });
  });
};

module.exports = {
  fetchList,
  downstream,
  upstream
};
