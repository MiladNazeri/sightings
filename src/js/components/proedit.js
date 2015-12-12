import React from 'react';

export default class ProEdit extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    }
    ComponentDidMount(){

        this.props.addButtonPress(this.props.sighting.filter( (sighting) => {
            return sighting._id === this.props.params.sightingId
        }) )
    }
    render(){

    }
}