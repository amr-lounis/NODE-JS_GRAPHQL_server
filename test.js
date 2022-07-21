
    
    
    function f(){
        return new Promise((resolve, reject) => {
            throw new Error('-------------')
           resolve('deleted');
            // reject("new Error('kll')");
        })
    }

    f().then((data)=>{

        console.log(data)
    })
    .catch((err)=>{
        console.log(err.message)
        console.log(2)
    })
    console.log(3)

