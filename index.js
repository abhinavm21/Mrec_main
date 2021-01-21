const express = require('express')
const {spawn} =require('child_process')
// const {results} = require('./models/model')
const sqlite3 = require('sqlite3')
const fs = require('fs')
let chunks=[];

const app = express()

app.post('/api',(req,res)=>{

    chunks=[];
    req.on('data',(chunk)=>{
        chunks.push(chunk);
    
    });
    
    req.on('end',()=>{
        var data=Buffer.concat(chunks);
   fs.writeFile('/home/blacksec21/hello.mp3',data,'binary',(err)=>{
       if(err)
           console.log(`couldnt make file ${err}`);
       else{
           console.log("Audio Recieved:");
           console.log(data);
       }
   });
    });


    
    const py = spawn('python',['recognize-from-file.py'] )
    py.stdout.on('data',(data)=>{
        let mari = data
        const aeron = 'not matches found '
        if(mari.includes(aeron)==true){
            res.json({rname:'not found'})
            console.log(`stdout:${data}`)
        }
        else{
            let db = new sqlite3.Database('./db/fingerprints2.db',(err)=>{
                if(err){
                    console.log(err)
                }
                console.log('connected to database')
            })
            query = 'select * from results order by id desc limit 1'
            db.get(query,(err, thriku) => {
            if (err) {
              return console.error(err.message);
            }
            res.send(JSON.stringify(thriku))
        })
        
        
        db.close((err)=>{
            if(err){
                console.log(error.message)
            }
            console.log('database closed')
        })
            console.log(`stdout:${data}`)
        }
    
 })

})

const PORT = process.env.PORT ||5000

app.listen(PORT,()=>{console.log(`Server started runing at ${PORT}`)})
