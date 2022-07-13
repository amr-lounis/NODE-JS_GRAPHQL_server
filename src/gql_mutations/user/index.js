const user_signin = require('./signin')
const user_create = require('./create')
const user_update = require('./update')
const user_delete = require('./delete')
const user_image_upload = require('./image_upload')
const user_image_delete = require('./image_delete')

module.exports = {
    user_signin,
    user_create,
    user_update,
    user_delete,
    user_image_upload,
    user_image_delete
}