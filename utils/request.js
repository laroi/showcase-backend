var config = require('../config/config.js'),
    cradle = require('cradle');
    console.log(config.couchdb.url(), config.couchdb.port, config.couchdb.auth)
 var connection = new(cradle.Connection)(config.couchdb.url(), config.couchdb.port, {
      auth: config.couchdb.auth
  });
  var database;
  var getDoc = function(options, callback) {
      var db = options.db || config.couchdb.database,
        doc_id = options.doc_id || null;
        console.log(JSON.stringify(options))
        database = connection.database(db);
        database.get(doc_id, function(err, data) {
            if (err) {
                console.log(JSON.stringify(err), JSON.stringify(data));
            }
            callback(err, data);
        });
  };
    var saveDoc = function(id, doc, db, callback) {
        var db = db || config.couchdb.database,
            database = connection.database(db);
        database.save(id, doc, function (err, res) {
            console.log( JSON.stringify(res), JSON.stringify(err));
            callback(err, res);
        });
    };
  var getView = function(viewname, db, callback) {};
  
exports.getDoc = getDoc;
exports.saveDoc = saveDoc;
