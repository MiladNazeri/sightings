import React from 'react';
import ReactS3Uploader from 'react-s3-uploader';
import axios from 'axios';

class Upload extends React.Component{
    constructor(){
        super()
        this.state= {

        }
    }
    _onSubmit(files) {
        var file = files.target.files[0];

        axios.post('/api/sign_s3', {
            filename: file.name,
            filetype: file.type
        })
        .then((result)=>{
            console.log("axis post results ", result)
            var signedUrl = result.data;

            var options = {
                headers: {
                    'Content-Type': file.type
                }
            };
            return axios.put(signedUrl, file, options)
        }).then((results) => console.log(results))
    }

    render () {
        return (
            <div>
                <input type="file" onChange={this._onSubmit} />
            </div>
        )
    }
}


export default Upload


// onchange = function(){

// }

// get_signed_request(file){

// }

// function get_signed_request(file){
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
//     xhr.onreadystatechange = function(){
//         if(xhr.readyState === 4){
//             if(xhr.status === 200){
//                 var response = JSON.parse(xhr.responseText);
//                 upload_file(file, response.signed_request, response.url);
//             }
//             else{
//                 alert("Could not get signed URL.");
//             }
//         }
//     };
//     xhr.send();
// }

// function upload_file(file, signed_request, url){
//     var xhr = new XMLHttpRequest();
//     xhr.open("PUT", signed_request);
//     xhr.setRequestHeader('x-amz-acl', 'public-read');
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             document.getElementById("preview").src = url;
//             document.getElementById("avatar_url").value = url;
//         }
//     };
//     xhr.onerror = function() {
//         alert("Could not upload file.");
//     };
//     xhr.send(file);
// }