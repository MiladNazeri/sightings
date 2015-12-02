import React from "react";

export default class Two extends React.Component {

    _submit(){
        console.log(this.props)
        var input = this.refs.note.value;
        this.props.passMeDown(input);
    }
    render(){
    return (

        <div>
            <input type="text" ref="note" />
            <button onClick={this._submit.bind(this)} />
        </div>
    )
    }
}
