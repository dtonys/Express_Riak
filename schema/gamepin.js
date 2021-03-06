/*  Schema for gamepin obj. Key: NodeflakeID
*/

var util = require('../utility');
var E = require('../customErrors');

var gamepin = function gamepin(input){
  if(Object.keys(arguments).length === 0) input = {};
  
  this.version = input.version            || '0.0.2';
  this.posterId = input.posterId          || null;
  this.posterName = input.posterName      || null;
  this.likedBy = input.likedBy            || [];
  this.repinVia = input.repinVia          || null;
  this.category = input.category          || null;
  this.sourceUrl = input.sourceUrl        || null;
  this.videoEmbed = input.videoEmbed      || null;
  this.cloudPath = input.cloudPath        || null;
  this.gameName = input.gameName          || null;
  this.publisher = input.publisher        || null;
  this.description = input.description    || null;
  this.datePosted = input.datePosted      || null;
  this.returnAll = 'y';                   //used so that we can do an ambiguous search
  this.comments = input.comments          || [];
}

gamepin.prototype.validate = function(){
  if(!this.posterId) return new E.InvalidError('gamepin posterId missing');
  if(!this.category) return new E.InvalidError('gamepin category missing');
  if(!this.gameName) return new E.InvalidError('gamepin gameName missing');
  if(!this.description) return new E.InvalidError('gamepin description missing');
  if(!this.sourceUrl && !this.videoEmbed) return new E.InvalidError('gamepin content missing');

  //logical validations
  if(this.sourceUrl && this.videoEmbed) return new E.InvalidError('gamepin content cannot be both video and image');
  return false;
}

var gamepinInstance = new gamepin();

module.exports = {
  gamepin: gamepin,
  gamepinInstance: gamepinInstance
}