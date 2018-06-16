import React, { Component } from "react";
import {getSlots} from "../../utils/apiUtils";
import PokeSprite from "../PokeSprite/PokeSprite";
import "./visualization.css";
import XPBar from "./XPBar";

export default class Visualization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: this.props.pokemon
        };
    }

    render() {
        return (
            <div className="visualization">
                <PokeSprite pokemon={this.props.pokemon}/>
                <XPBar pokemon={this.props.pokemon}/>
            </div>
        )
    }

}