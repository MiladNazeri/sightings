import React from 'react';
import ReactS3Uploader from 'react-s3-uploader';
m

class Upload extends React.Component{
    constructor(){
        super()
        this.state= {
            filename: '',
            filetype: '',
            imgsrc: '',
            uploading: false,
            uploaded:true
        }
    }

    _onSubmit(files) {
        var file = files.target.files[0];

        this.setState({
            filename: file.name,
            filetype: file.type,
            uploading: true
        })

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
        }).then( (results) => {
            this.setState({
            uploading: false,
            uploaded:true
            })
            console.log("image returning from AWS", results)
            this._updateImg()

        }).then(()=>{
            })
    }
    _updateImg(){
        var base = `https://mobyclick.s3-us-west-2.amazonaws.com/${this.state.filename}`
        this.setState({
            imgsrc: base
        })

    }
    render () {
        return (
            <div>
                <input type="file" onChange={this._onSubmit.bind(this)} />
                {this.state.uploading && <div className="ui active text loader">Loading</div>}
                <img style={styles.img} src={this.state.imgsrc} />
                {this.state.uploaded && <img style={styles.img} src={this.state.imgsrc} />}

            </div>
        )
    }
}


export default Upload

var styles = {
    img: {
        display: "block",
        height: "100%",
        width: "200px"
    }
}

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