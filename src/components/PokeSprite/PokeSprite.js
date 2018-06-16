import React, { Component } from "react";
import {getSprite} from "../../utils/apiUtils";

export default class Box extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: this.props.pokemon,
            link: ""
        };
    }

    componentDidMount() {
        let uri = getSprite(this.props.pokemon);
        this.setState ({
            link: uri
        })
    }

    render() {
        return (
            <img src={this.state.link} alt={this.state.name}/>
        )
    }
}