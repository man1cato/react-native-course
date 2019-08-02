const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })
const fs = require('fs')
const UUID = require('uuid-v4')
const { Storage } = require('@google-cloud/storage')
const admin = require('firebase-admin')

const gcs = new Storage({
   projectId: 'react-native-course-a02d2',
   keyFilename: 'react-native-course-private-key.json'
}) 

admin.initializeApp({
   credential: admin.credential.cert(require('./react-native-course-private-key.json'))
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
   cors(request, response, () => {
      if(!request.headers.authorization || !request.headers.authorization.startsWith('Bearer ')) {
         console.log('No token present')
         response.status(403).json({ error: 'Unauthorized' })
         return
      }
      const idToken = request.headers.authorization.split('Bearer ')[1]
      admin.auth().verifyIdToken(idToken).then(decodedToken => {
         const body = JSON.parse(request.body)
         fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', err => {
            console.log(err)
            return response.status(500).json({ error: err })
         })
         const bucket = gcs.bucket('react-native-course-a02d2.appspot.com')
         const uuid = UUID()
   
         return bucket.upload('/tmp/uploaded-image.jpg', {
            uploadType: 'media',
            destination: '/places/' + uuid + '.jpg',
            metadata: {
               metadata: {
                  contentType: 'image/jpeg',
                  firebaseStorageDownloadTokens: uuid
               }
            }
         }, (err, file) => {
            if (!err) {
               response.status(201).json({
                  imageUrl: 'https://firebasestorage.googleapis.com/v0/b/' 
                     + bucket.name + '/o/' + encodeURIComponent(file.name)
                     + '?alt=media&token=' + uuid,
                  imagePath: '/places/' + uuid + '.jpg'
               })
            } else {
               console.log(err)
               response.status(500).json({ error: err })
            }
         })
      }).catch(err => {
         console.log('Token is invalid')
         response.status(403).json({ error: err })
      })
   })
})

exports.deleteImage = functions.database.ref('/places/{placeId}').onDelete(snapshot => {
   const imagePath = snapshot.val().imagePath
   const bucket = gcs.bucket('react-native-course-a02d2.appspot.com')
   return bucket.file(imagePath).delete()
})