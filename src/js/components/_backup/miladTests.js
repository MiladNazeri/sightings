import React from 'react';
import api from '../api/api';
import ReactSelect from 'react-select';

class ExampleDisplay extends React.Component {
    render(){
        return(
            <div style={{display:"inline-block", margin:"20px"}}>
                <div style={{height: "300px", width:"300px", float:"right", clear:"right"}}>
                    <h1><strong>Whale Name:</strong> <br />{this.props.whaleName}</h1>
                    <h2><strong>Scientific Whale Name:</strong> <br />{this.props.sciName}</h2>
                    <h3><strong>Whale Group:</strong> <br />{this.props.whaleGroup}</h3>
                </div>
                <div style={{float: "left", height:"100px", width:"200px"}}>
                    <img style={styles.image} src={this.props.imageSrc} />
                </div>
            </div>
        )
    }
}

var styles = {
    container: {
        width: "1000px",
        margin: "auto",
        paddingBottom: "200px",
        paddingTop: "200px"
    },
    image: {
        width: "100%",
        height: "auto",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0"
    }
}

class MiladTest extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            whales: [],
            whaleOptions:[],
            users: [],
            userOptions:[],
            sightings: [],
            sightingsOptions: [],
            updateSightings: this._updateSightings,
            value: "",
            _findById: this._findById
        }
        this._updateValue = this._updateValue.bind(this);
        this.state.updateSightings = this.state.updateSightings.bind(this);
    }
    _updateValue(value){
        console.log("value:", value)
        this.setState({
            value: value
        })
    }
    componentDidMount(){
        console.log("in Milad")
        api.getWhales()
        .then( (whales) => {
            console.log("whales from api:", whales);
            this.setState({
                whales: whales.data,
            })
        })
        .then( () => {
            this.setState({
                whaleOptions: this._optionMaker(this.state.whales, "id", "whaleName" )
            })
        })
        api.getUsers()
        .then( (users) => {
            console.log("users:", users)
            this.setState({
                users: users.data
            })
        })
        .then( () => {
            this.setState({
                userOptions: this._optionMaker(this.state.users, "id", "email")
            })
        })
        api.getSightings()
        .then( (sightings) => {
            this.setState({
                sightings: sightings.data
            })
        })
        .then( () => {
            this.setState({
                sightingsOptions: this._optionMaker(this.state.sightings, "_id", "time")
            })
        })
        .catch( (err) =>{
            console.log(err)
        })
    }
    _updateSightings(){
        console.log("this:", this)
        api.getSightings()
        .then( (sightings) => {
            this.setState({
                sightings: sightings.data
            })
        })
        .then( () => {
            this.setState({
                sightingsOptions: this._optionMaker(this.state.sightings, "_id", "time")
            })
        })
    }
    _findById(objSearch, id){
        var search = objSearch.filter( (item) => {
            return item.id === id || item._id === id
        })
        return search[0]
    }
    _optionMaker(array, value, label){
        return array.map( (item) => {
            return {
                value: item[value],
                label: item[label]
            }
        })
    }
    render(){
        console.log("in Milad")
        console.log("this.state.whales", this.state.whales)
        var whaleMap = this.state.whales.map( (whale, index) => {
            return <ExampleDisplay style={{display:"inline", width:"300px"}}key={index} imageSrc={whale.referenceImage} whaleName={whale.whaleName} sciName={whale.sciName} whaleGroup={whale.whaleGroup} />
        })
        return(
            <div style={styles.container}>
                <img src="icons/mobyClick06.svg" style={{margin:"0 auto", width:"50%", height:"auto", display:"block"}} />
                <div style={{width:"1500px", display:"inline-block"}}>
                {whaleMap}
                </div>
                <hr />
                <br />
                <AddSighting {...this.state} />
                <hr />
                <br />
                <ViewSightings {...this.state} />
            </div>
        )
    }
}

class AddSighting extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lat: "",
            long:"",
            picture: "",
            whalePick: "",
            comment: "",
            userId: "",
            updateSightings: this.props.updateSightings
        }
        this._updateLat =  this._updateLat.bind(this)
        this._updateLong = this._updateLong.bind(this)
        this._updatePicture =  this._updatePicture.bind(this)
        this._updateComment =  this._updateComment.bind(this)
        this._updateUserID = this._updateUserID.bind(this)
        this._updateWhaleValue = this._updateWhaleValue.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
        this._initState = this._initState.bind(this)

    }
    _initState(){
        this.setState({
            lat: "",
            long:"",
            picture: "",
            whalePick: "",
            comment: "",
            userId: ""
        })

    }
    _updateLat(e){
        this.setState({
            lat: e.target.value
        })
    }
    _updateLong(e){
       this.setState({
           long: e.target.value
       })
    }
    _updatePicture(e){
        this.setState({
            picture: e.target.value
        })
    }
    _updateComment(e){
        this.setState({
            comment: e.target.value
        })
    }
    _updateUserID(e){
        this.setState({
            userId: e
        })
    }
    _updateWhaleValue(e){
        this.setState({
            whalePick: e
        })
    }
    _handleSubmit(){
        var sighting = {
            userId: this.state.userId,
            location: [this.state.lat, this.state.long],
            mediaFull: this.state.picture,
            userPick: {
                userWhalePick: this.state.whalePick,
                userWhaleComment: this.state.comment
            }
        }
        api.createSighting(sighting)
        .then( () => {
            this.state.updateSightings();
            this._initState();
        })

    }
    render(){
        return(
            <div>
                <h1>User ID</h1>
                <ReactSelect
                    autofocus options={this.props.userOptions}
                    onChange={this._updateUserID}
                    value={this.state.userId}
                    placeholder="Choose a User" />
                <h1>lat</h1><br />
                <input type="text" value={this.state.lat} onChange={this._updateLat} /><br />
                <h1>long</h1><br />
                <input type="text" value={this.state.long} onChange={this._updateLong} /><br />
                <h1>Picture</h1><br />
                <input type="text" value={this.state.picture} onChange={this._updatePicture} /><br />
                <h1>Whale Pick</h1><br />
                <ReactSelect
                    autofocus options={this.props.whaleOptions}
                    onChange={this._updateWhaleValue}
                    value={this.state.whalePick}
                    placeholder="Select a sighting" />
                <hr />
                {this.state.whalePick &&
                    <div> <h1>Here is the whale you picked</h1>
                    <ExampleDisplay
                    style={{display:"inline", width:"300px"}}
                    imageSrc={this.props._findById(this.props.whales, this.state.whalePick).referenceImage}
                    whaleName={this.props._findById(this.props.whales, this.state.whalePick).whaleName}
                    sciName={this.props._findById(this.props.whales, this.state.whalePick).sciName}
                    whaleGroup={this.props._findById(this.props.whales, this.state.whalePick).whaleGroup} />
                    <hr />
                    </div>}
                <h1>Comment</h1><br />
                <br />
                <input type="text" value={this.state.comment} onChange={this._updateComment} /><br />

                <button onClick={this._handleSubmit}>Submit Sighting</button>
            </div>
        )

    }
}

class ViewSightings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sightingsValue: "",
            vote: 0,
        }
        this._updateSightingsValue = this._updateSightingsValue.bind(this);
        this._voteUpHandler = this._voteUpHandler.bind(this);
        this._voteDownHandler = this._voteDownHandler.bind(this);

    }
    _updateSightingsValue(e){
        this.setState({
            sightingsValue: e
        })
    }
    _voteUpHandler(e){
        this.setState({
            vote: this.state.vote++
        })
    }
    _voteDownHandler(e){
        this.setState({
            vote: this.state.vote--
        })
    }
    render(){
        console.log("this",this)
        return(
            <div>
                <div>
                    <h1>Select a sighting</h1>
                    <ReactSelect
                        autofocus options={this.props.sightingsOptions}
                        onChange={this._updateSightingsValue}
                        value={this.state.sightingsValue}
                        placeholder="Choose a Whale" />
                </div>
                {this.state.sightingsValue &&
                    <div>
                    <img src={this.props._findById(this.props.sightings, this.state.sightingsValue).mediaFull} />

                    <h1>Location:</h1>
                    {this.props._findById(this.props.sightings, this.state.sightingsValue).location}
                    <h1>Time:</h1>
                    {this.props._findById(this.props.sightings, this.state.sightingsValue).time}
                    <h1>Taken by:</h1>
                    {this.props._findById(this.props.sightings, this.state.sightingsValue).userId.email}
                    <h1>This user said it's a:</h1>
                    <ExampleDisplay
                        style={{display:"inline", width:"300px"}}
                        imageSrc={this.props._findById(this.props.whales,this.props._findById(this.props.sightings, this.state.sightingsValue).userPick.userWhalePick).referenceImage}
                        whaleName={this.props._findById(this.props.whales,this.props._findById(this.props.sightings, this.state.sightingsValue).userPick.userWhalePick).whaleName}
                        sciName={this.props._findById(this.props.whales,this.props._findById(this.props.sightings, this.state.sightingsValue).userPick.userWhalePick).sciName}
                        whaleGroup={this.props._findById(this.props.whales,this.props._findById(this.props.sightings, this.state.sightingsValue).userPick.userWhalePick).whaleGroup}
                    />

                    <h1>They also said: </h1>
                    {this.props._findById(this.props.sightings, this.state.sightingsValue).userPick.userWhaleComment}
                    <br />
                    <button onClick={this._voteUpHandler}>Vote up</button>
                    <br />
                    <button onClick={this._voteDownHandler}>Vote down</button>
                    <br />
                    <hr />
                    <AddComment {...this.props} sightingsValue={this.state.sightingsValue}  />
                    <br />
                    <h1>Other Comments: </h1>
                    {this.props._findById(this.props.sightings, this.state.sightingsValue).comments.map( (comment, index) => {
                        return <DisplayComment
                           key={index}
                           user={comment.commentUserId}
                           comment={comment.commentWhaleComment}
                           whalePick={comment.commentWhalePick}
                           vote={comment.vote}
                           updateSighting={this.updateSighting}
                           sighting={this.props._findById(this.props.sightings, this.state.sightingsValue)}
                           commentId={comment._id} />
                    })}
                    </div>
                    }
                </div>
                )
            }
        }
class AddComment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userId: "",
            whalePick: "",
            comment: "",
            updateSightings: this.props.updateSightings
        }
        this._updateComment =  this._updateComment.bind(this)
        this._updateUserID = this._updateUserID.bind(this)
        this._updateWhaleValue = this._updateWhaleValue.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
    }
    _initState(){
        this.setState({
            whalePick: "",
            comment: "",
            userId: "",
        })

    }
    _updateUserID(e){
        this.setState({
            userId: e
        })
    }
    _updateComment(e){
        this.setState({
            comment: e.target.value
        })
    }
    _updateWhaleValue(e){
        this.setState({
            whalePick: e
        })
    }
    _handleSubmit(){
        var sighting = this.props._findById(this.props.sightings, this.props.sightingsValue)
        sighting.userId = sighting.userId.id
        sighting.comments.push({
            commentUserId: this.state.userId,
            commentWhalePick: this.state.whalePick,
            commentWhaleComment:this.state.comment,
        })
        console.log("sighting about to be saved:",sighting)
        api.updateSighting(sighting)
        .then( (sighting) => {
            console.log("SUCCESS", sighting)
            this._initState();
            this.state.updateSightings();

        })

    }
    render(){
        return(
            <div>
            <h1>Add Comment:</h1>
            <hr />
            <h1>User Id</h1>
            <ReactSelect
                autofocus
                options={this.props.userOptions}
                onChange={this._updateUserID}
                value={this.state.userId}
                placeholder="Choose a User" />
            <h1>Comment</h1>
            <input type="text" value={this.state.comment} onChange={this._updateComment} /><br />
            <h1>Whale Pick</h1><br />
            <ReactSelect
                autofocus
                options={this.props.whaleOptions}
                onChange={this._updateWhaleValue}
                value={this.state.whalePick}
                placeholder="Choose a Whale" />
            <hr />
            {this.state.whalePick &&
                <div> <h1>Here is the whale you picked</h1>
                <ExampleDisplay
                style={{display:"inline", width:"300px"}}
                imageSrc={this.props._findById(this.props.whales, this.state.whalePick).referenceImage}
                whaleName={this.props._findById(this.props.whales, this.state.whalePick).whaleName}
                sciName={this.props._findById(this.props.whales, this.state.whalePick).sciName}
                whaleGroup={this.props._findById(this.props.whales, this.state.whalePick).whaleGroup} />
                <hr />
                </div>}
                <br />
            <button onClick={this._handleSubmit}>submit comment</button>
            </div>
        )
    }

}

class DisplayComment extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            vote: this.props.vote
        }
    }
        _voteUpHandler(e){
            this.setState({
                vote: this.state.vote++
            })
            sighting = this.props.sighting;
            sighting.comments[this.props.commentsId].vote = this.state.vote;
            api.updateSighting(sighting)
            .then( () => {
                this.props.updateSightings();
            })
        }
        _voteDownHandler(e){
            this.setState({
                vote: this.state.vote--
            })
            sighting = this.props.sighting;
            sighting.comments[this.props.commentsId].vote = this.state.vote;
            api.updateSighting(sighting)
            .then( () => {
                this.props.updateSightings();
            })
        }
        render(){
            console.log("View comments props:",this.props)
            return (
                <div>
                    <h1>User: </h1>
                    {this.props.user}
                    <h1>Comments:</h1>
                    {this.props.comments}
                    <h1>They think it's:</h1>
                    <ExampleDisplay
                    style={{display:"inline", width:"300px"}}
                    imageSrc={this.props.referenceImage}
                    whaleName={this.props.whaleName}
                    sciName={this.props.sciName}
                    whaleGroup={this.props.whaleGroup} />
                    <hr />
                    <br />
                    <button onClick={this._voteUpHandler}>Vote up</button> <br /> <button onClick={this._voteDownHandler}>Vote down</button>
                    <br />



                </div>
            )
        }

}



export default MiladTest;


        // var commentsFunc = function(commentsArray){
        //     console.log("commentsArray", commentsArray, arguments)
        //      commentsArray.sort( (a, b) => {
        //         console.log("a", a)
        //         console.log("b", b)
        //                 return a.vote < b.vote
        //             }).map( (comment) => {
        //                 console.log("map comment", comment)