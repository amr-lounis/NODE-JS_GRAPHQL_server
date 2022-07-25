const glob = require( 'glob' )
const path = require( 'path' );
const fs = require("fs");

// const thisPath = path.resolve(__dirname,'./src/*.js')

// glob.sync( thisPath ).forEach( function( file ) {
//     console.log( file ," : ",getFilesizeInBytes(file));
// });


// fs.readdirSync(thisPath).forEach(file => {
//   console.log(file);
// });

const thisPath = path.resolve(__dirname,'./src/')
console.log('thisPath',thisPath)
var getDirectories = function (src, callback) {
  glob(src + '/**/*', callback);
};
getDirectories(thisPath, function (err, res) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log("nomber of file : ",res.length);
    res.forEach( function( file ) {
      var stats = fs.statSync(file);
      if(!stats.isDirectory()){
        console.log( file ," : ",stats.size);
      }

    });

    
  }
});