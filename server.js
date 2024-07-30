const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const fileUpload = require('express-fileupload');
const app = express();
app.use(express.static('public'));
    

 
//file upload
app.use(fileUpload({
useTempFiles: true, tempFileDir:"/tmp/"
}))

//ffmpeg libary
ffmpeg.setFfmpegPath("C:/ffmpeg2/ffmpeg.exe")


app.get('/', (req, res) => {

    res.sendFile(__dirname + "/index.html")
    
    })

app.post('/mp4toavi',(req,res) => {

 res.contentType('video/avi');
res.attachment('output.mp3');
//uploaded file
req.files.mp4.mv("tmp/" + req.files.mp4.name, function(err) {
if(err)
{
    return res.send("An error occured");
}
else
{
    console.log("File uploaded successfully");
}
 //convert mp4 to mp3

 ffmpeg('tmp/' + req.files.mp4.name).toFormat('mp3')
 .on('end', function() {
   console.log("Finished");
 })
.on('error', function(error){
   console.log("An error occured" + err.message);
})
.pipe(res,{end:true});

})

if(req.files.mp4.mv == null)
{
    return res.send("An error occured");
}
})


app.listen(5000, () => {
    console.log("server is listening on port 5000")

})

