
var config = {
            couchdb:{
                protocol:'http',
                host: '127.0.0.1',
                port: 5984,
                proxy: 'data',
                database: 'textiles',
                userDb: 'textiles-users',
                auth:{username:'admin', password:'admin'},
                url: function (){
                   return this.protocol + '://' + this.host;
                }
            }
        }

module.exports = config;
