import React, { Component } from "react";
import {getSprite} from "../../utils/apiUtils";
import "./pokesprite.css";
import Badge from "@material-ui/core/es/Badge/Badge";

export default class PokeSprite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: this.props.pokemon,
            link: ""
        };
    }

    render() {
        return (
            <Badge badgeContent={this.props.pokemon.level} color="primary">
                <img src={getSprite(this.props.pokemon)}/>
            </Badge>
        )
    }
}