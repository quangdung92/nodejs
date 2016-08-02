'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true},
    username: {type: 'string', unique: true},
    password : {type: 'string'},
    email : {type: 'string', unique: true},
    userid : {type: 'string', unique: true},
    location : {type: 'string'},
    quote : {type: 'string'},
    avatar : {type: 'string'},
    status : {type: 'boolean'},
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('users', callback);
};
