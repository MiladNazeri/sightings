'use strict';
var mongoose = require('mongoose');

var whaleSchema = new mongoose.Schema({
   whaleName: {
       type: String,
       unique: true
   },
   sciName: {
       type: String,
       unique: true
   },
   whaleGroup: {
       type:String
   },
   referenceImage: {
       type: String
   }
});

whaleSchema.set('toJSON', {
   transform: function(doc, ret, options) {
       var retJson = {
           id: ret._id,
           whaleName: ret.whaleName,
           sciName: ret.sciName,
           whaleGroup: ret.whaleGroup,
           referenceImage: ret.referenceImage
       };
       return retJson;
   }
});
mongoose.model('Whale', whaleSchema);