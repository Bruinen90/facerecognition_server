const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: '440f2609d58f49fb9e3fbd0e9d32e68d'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => { res.json(data) })
        .catch(err => res.status(400).json('bad image request'))
}

const handleImage = (req, res, db) => {
    const { id, facesCount } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', facesCount)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleApiCall: handleApiCall,
    handleImage: handleImage
}
