import React, { Component } from "react";
import LinearProgress from "@material-ui/core/es/LinearProgress/LinearProgress";
import "./visualization.css";

export default class Visualization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: this.props.pokemon
        };
    }

    render() {
        return (
            <LinearProgress
                className="xpbar"
                variant="determinate"
                value={this.props.pokemon.level}
            />
        )
    }
}