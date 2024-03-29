async function initDB(_model){

    await _model.role.count().then(async (count) => {
        console.log('-----------: roles count : ',count)
        if(count == 0 ){
            await _model.role.create({
                id:1,
                name:'admin'
            });
            await _model.role.create({
                id:2,
                name:'employee'
            });
            console.log('-----------: role admin and employee created')
    }});

    await _model.user.count().then( async (count) => {
        console.log('-----------: users count : ',count)
        if(count == 0 ){
            await _model.user.create({
                id:1,
                name:'admin',
                password:'admin',
                roleId:1
            });
            console.log('-----------: user admin created')
    }});

    await _model.authorization.count().then( (count) => {
        console.log('-----------: authorizations count : ',count)
        if(count == 0 ){
            const arrayAuthorization = initArrayAuthorization()
            arrayAuthorization.forEach(async (_authorization)=>{
                await _model.authorization.create(_authorization)
            })
            console.log('-----------: authorizations created')
    }});

}


function initArrayAuthorization(){
    arrayAuthorization = []
    _arrayOfArraysAuth.forEach((_array)=> {
        arrayAuthorization.push({
            operation:_array[0],
            roles:_array[1],
            args_required:_array[2],
            attributes_forbidden:_array[3]
        })
    })
    return  arrayAuthorization
}


var _arrayOfArraysAuth=[
    //operation , roles, args_required , attributes_forbidden
    ['execute_cmd','admin','command',null],

    ['todo_get','admin,employee',null,null],
    ['todo_create','admin,employee','name',null],
    ['todo_update','admin,employee','id',null],
    ['todo_delete','admin','id',null],
    ['todo_images_get','admin,employee','id',null],
    ['todo_image_upload','admin,employee','id,file',null],
    ['todo_image_delete','admin,employee','id,fileNmae',null],
    
    ['user_get','admin',null,null],
    ['user_get','employee',null,'password'],
    ['user_signin',null,'name,password',null],
    ['user_create',null,'name,password',null],
    ['user_update','admin,employee','id',null],
    ['user_delete','admin','id',null],
    ['user_image_upload','admin,employee','id,file',null],
    ['user_image_delete','admin,employee','id,fileNmae',null],
    ['notification_sender','admin,employee','receiver_id,title,content',null]
]


module.exports = {initDB}

