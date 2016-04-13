var request = require('./utils/request'),
    config = require('./config/config.js'),
    getUser,
    createUser;
getUser = function(req, res) {
    var user_id = req.params.userId;
    if (!user_id) {
        res.status(400).send({message: "Bad Request, userId is required"});
        return;
    }
    console.log("[INFO] getting user with user id "+ user_id)
    request.getDoc({doc_id: user_id, db:  config.couchdb.userDb}, function (err, data) {
        if (!err && data && Object.keys(data).length > 0) {
            res.status(200).send(JSON.stringify(data));
        } else {
            if (data && Object.keys(data).length === 0) {
                res.status(404).send({error: 'No User Found'});
            } else {
                res.status(500).send(err);
            }
        }
    });
}
createUser = function (req, res) {
    var id = req.params.userId,
        first_name = req.body.first_name,
        last_name = req.body.last_name,
        location = req.body.location,
        address = req.body.address,
        phone = req.body.phone,
        email = req.body.email,
        favorites = req.body.favorites,
        dob = req.body.dob,
        prof_pic = req.body.prof_pic,
        doc = {};

    if (id && first_name && location && phone && email) {
        doc = {
            first_name: first_name,
            last_name : last_name,
            location : location,
            address : address,
            phone : phone,
            email : email,
            favorites : favorites,
            dob : dob,
            prof_pic : prof_pic
        }
        request.saveDoc(id, doc, config.couchdb.userDb, function (err, data) {
            if (!err) {
                res.status(200).send(JSON.stringify(data));
            } else {
                res.status(500).send({error: err});
            }
        });
    } else {
        res.status(400).send({message: "Bad Request, parameters required"});
    }
   
};


exports.getUser = getUser;
exports.createUser = createUser;

exports.ping = function(req, res){
  res.status(200).send("pong!");
};
