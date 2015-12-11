import React from 'react';
import Modal from 'react-modal';
import api from '../../api/api.js';
import axios from 'axios';
import ReactSelect from 'react-select';


export default class MyModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalIsOpen: this.props.openModal,
      user: this.props.user,
      pro: this.props.pro,
      sighting: this.props.sighting,
      title: "",
      long: "",
      lat: "",
      addStory: false,
      addProComment: false,
      addProApprove: false,
      story: "Submit your story",
      proComment: "Submit your comment",
      closeModal: this.props.closeModal,
      imagePath: "",
      uploading: true,
      uploaded: false,
      fileName: "",
      fileType: "",
      file: "",
      whalePick:"",
      whaleOptions: this.props.whaleOptions,
      proApprove: false
    }
    console.log("state:",this.state)
    console.log("props:",this.props)
    this._closeModal = this._closeModal.bind(this)
    this._titleChange =this._titleChange.bind(this)
    this._submitPicture = this._submitPicture.bind(this)
    this._addStoryHandle = this._addStoryHandle.bind(this)
    this._storyChange = this._storyChange.bind(this)
    this._submitUser = this._submitUser.bind(this)
    this._submitPro = this._submitPro.bind(this)
    this._longHandle = this._longHandle.bind(this)
    this._latHandle = this._latHandle.bind(this)
    this._updateWhaleValue = this._updateWhaleValue.bind(this)
    this._addProCommentHandle = this._addProCommentHandle.bind(this)
    this._addProApprove = this._addProApprove.bind(this)
    this._cancel = this._cancel.bind(this)

  }
  _initModal(){
    this.setState({
      imagePath: "",
      uploading: true,
      uploaded: false,
      fileName: "",
      fileType: "",
      file: "",
      title: "",
      long: "",
      lat: "",
      addStory: false,
      story: "Submit your story",
    })
  }
  _closeModal(){
    this.setState({
      modalIsOpen: false
    })
  }
  _titleChange(e){
    this.setState({
      title: e.target.value
    })
  }
  _submitPicture(e){
    var file = e.target.files[0]
    var filename = file.name;
    var filetype = file.type;

    this.setState({
      filename: filename,
      filetype: filetype,
      file: file,
     })

  }
  _addStoryHandle(e){
    this.setState({
      addStory: e.target.checked
    })
  }
  _addProCommentHandle(e){
    this.setState({
      addProComment: e.target.checked
    })
  }
  _addProApprove(e){
    this.setState({
      addProApprove: e.target.checked
    })
  }
  _storyChange(e){
    this.setState({
      story: e.target.value
    })
  }
  _proComment(e){
    this.setState({
      proComment: e.target.value
    })
  }
  _longHandle(e){
    this.setState({
      long: e.target.value
    })

  }
  _latHandle(e){
    this.setState({
      lat: e.target.value
    })

  }
  _updateWhaleValue(e){
      this.setState({
          whalePick: e
      })
  }
  _submitUser(){
    console.log("posting to node")
    axios.post('/api/s3/sign_s3', {
        filename: this.state.filename,
        filetype: this.state.filetype
    }).then( (result) =>{
      console.log("posting to s3")
      var signedUrl = result.data;
      axios.put(signedUrl, this.state.file)
    }).then( () => {
      console.log("setting image path to node")
      this.setState({
        imagePath: `https://mobyclick.s3-us-west-2.amazonaws.com/${this.state.filename}`
      })
      var sighting = {
        title: this.state.title,
        location: [this.state.lat, this.state.long],
        story: this.state.story,
        photo: this.state.imagePath
      }
      console.log("posting to create sighting")
      api.createSighting(sighting)
    })
      .then( () => {
        this.setState({
          modalIsOpen: false
        })
        this._initModal();
        this.state.closeModal()
      })
  }
  _submitPro(){
    var sighting = this.state.sighting
    sighting.proWhalePick = this.state.whalePick
    sighting.proComment = this.state.proComment
    sighting.proApprove = this.state.sighting
      api.updateSighting(sighting)
      .then( () => {
        this.setState({
          modalIsOpen: false
        })
        this._initModal();
        this.state.closeModal()
      })
  }
  _cancel(){
    this.setState({
      modalIsOpen: false
    })
    this._initModal();
    this.state.closeModal()

  }

  render(){
    return(
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}>
        {this.state.user &&
          <div>
            <h1>Title</h1>
            <input type="text" value={this.state.title} onChange={this._titleChange} />

            <h1>Lat</h1>
            <input type="text" value={this.state.lat} onChange={this._latHandle} />

            <h1>Long</h1>
            <input type="text" value={this.state.long} onChange={this._longHandle} />

            <h1>Upload Picture</h1>
            <input type="file" onChange={this._submitPicture} />

            <h1>Add a story?</h1>
            <input type="checkbox" onChange={this._addStoryHandle} />
            {this.state.addStory && <textarea value={this.state.story} onChange={this._storyChange} />}

        <button onClick={this._submitUser}>submit</button>
        </div>
        }
        {this.state.pro &&
            <div>
            <h1>Title</h1>
            {this.state.sighting.title}
            <h1>Location</h1>
            {this.state.sighting.location}
            <h1>Photo</h1>
            <img src={this.state.sighting.photo} />
            {this.state.sighting.story && <p> {this.state.sighting.story}</p> }
            <h1>Please choose Whale Type</h1>
            <ReactSelect
                autofocus
                options={this.props.whaleOptions}
                onChange={this._updateWhaleValue}
                value={this.state.whalePick}
                placeholder="Choose a Whale" />
            <h1>Add a Comment?</h1>
            <input type="checkbox" onChange={this._addProCommentHandle} />

            {this.state.addProComment && <textarea value={this.state.proComment} onChange={this._proComment} /> }
            <h1>Approve Sighting?</h1>
            <input type="checkbox" onChange={this._addProApprove} />

        <button onClick={this._submitPro}>submit</button>
        </div>
        }
        <button onClick={this._cancel}>submit</button>
      </Modal>
      )
  }
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
