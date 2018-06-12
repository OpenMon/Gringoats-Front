import React, { Component } from "react";


export default class Home extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <p>PC : Generation {this.props.generation} contains {this.props.boxes} box(es)</p>
            </div>
        );
    }
}