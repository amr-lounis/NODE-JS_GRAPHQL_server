
const cnf = require("../cnf")

const fs = require('fs');
const path = require('path');

class my_files{
    constructor() {
        console.log("-----------: my_files class constructor");
    }

    IMAGES_DIR = cnf.FILES_IMAGES_DIR ;
    PORT = cnf.FILES_PORT;
    HOST = cnf.FILES_HOST;

    _NumberPad(num, size) {
        if (num.length > size) throw new Error("max size of Number is " + size)
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }

    _mkdir(_dir_path){
        try {
            if (!fs.existsSync(_dir_path)) {
                 fs.mkdirSync(_dir_path, { recursive: true }); 
            }
        } catch (error) {
            throw new Error("error : mkdir : cant create dir : "+ _dir_path) 
        }
    }

    DirPath_Get(_table, _id) {
        var id_string = this._NumberPad(_id, 10)
        var _p = path.join(this.IMAGES_DIR, _table, id_string);
        this._mkdir(_p)
        return _p;
    }

    FileName_Generate(_fileExtension) {
        var fileNamePrifix = new Date().toISOString().replace(/[-:T.Z]/g, '')
        var string_random = this._NumberPad(Math.round(Math.random() * 1000000000));
        return fileNamePrifix + string_random + '.' + _fileExtension;
    }

    FileFullPath_Generate(_table_name, _id,_fileExtension) {
        try {
            var fileName = this.FileName_Generate(_fileExtension)
            var path_save = this.DirPath_Get(_table_name,_id)
            return path.join(path_save, fileName);
        } catch (error) {
            return null;
        }
    }

    UrlGet(_table, _id, _file) {
        var id_string = this._NumberPad(_id, 10)
        var url = 'http://' + this.HOST + ':' + this.PORT + '/' + _table + '/' + id_string + '/' + _file;
        return url
    }

    UrlListGet(_table, _id) {
        var list = []
        this.fileList_get(_table, _id).forEach(file =>{
           list.push(this.UrlGet(_table, _id, file))
        })
        return list;
    }

    fileList_get(_table, _id) {
        var _list = []
        var _dir_path = this.DirPath_Get(_table, _id) 
        // console.log(_dir_path)
        fs.readdirSync(_dir_path).forEach(file => {
            _list.push(file)
        });
        return _list;
    }

    FileDelete(_table, _id, _fileName) {
        if(! /^([A-Za-z0-9.]+)$/.test(_fileName))throw new Error("error : fileName: Use of prohibited symbols ");
        const dirPath = this.DirPath_Get(_table, _id);
        const filePath = path.join(dirPath, _fileName);
        if (!fs.existsSync(filePath)) {
            throw new Error("error : The file is not exist : "+filePath)
        }
        try { fs.unlinkSync(filePath); } catch (erro) { throw new Error("error : The file cannot be deleted .") }
    }
    
    fileWrite(readStream,_filePath,_max_file_size){
        return  new Promise((resolve, reject) => {
            const writerStream = fs.createWriteStream(_filePath);
            var downloaded = 0;
            readStream.on('data', function(chunk){
                writerStream.write(chunk)
                downloaded += chunk.length;
                if(downloaded > _max_file_size){
                    readStream.destroy();
                    writerStream.destroy();
                    fs.unlinkSync(_filePath);
                    console.log('delete file:'+_filePath)
                    downloaded = 0;
                    reject(new Error('error : reject : max file size > '+_max_file_size ))
                    return
                }
            })
            readStream.on('close', function(){
                writerStream.end()
                // console.log('readStream close')
                // console.log('console  :file : (\''+_filePath +'\') size = : '+ downloaded)
                resolve('console  :file : (\''+_filePath +'\') size = : '+ downloaded)
                return
            })
        })
    }  

    image_upload(_file,_table, _id){
        return  new Promise(async (resolve, reject) => {
            try {
                var dirPath = this.DirPath_Get(_table,_id);
                var fileNumners = fs.readdirSync(dirPath).length;
                if (fileNumners >= 5) throw new Error("You cannot upload more files : ");
                //--------------------------
                const { createReadStream, filename, mimetype, encoding } = await _file 
                var fileExtension = '';
                switch (mimetype) {
                    case 'image/jpeg': fileExtension = 'jpeg'; break;
                    case 'image/png': fileExtension = 'png'; break;
                    default: throw new Error("error support file Extension : jpeg, jpg, png only");
                }
                //--------------------------
                var full_path = this.FileFullPath_Generate(_table,_id,fileExtension)
                //--------------------------
                var max_file_size = 512*1024;
                //--------------------------
                var r =  await this.fileWrite(createReadStream(),full_path,max_file_size)
                resolve(r)
            } catch (e) {
                reject(e)
            }
        });
    }
}

module.exports = new my_files()