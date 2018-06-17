import React, { Component } from "react";
import PokeSprite from "../PokeSprite/PokeSprite";
import "./visualization.css";
import XPBar from "./XPBar";
import BottomNavigation from "@material-ui/core/es/BottomNavigation/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/es/BottomNavigationAction/BottomNavigationAction";
import PieChartIcon from '@material-ui/icons/PieChart';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import StarIcon from '@material-ui/icons/Star';
import Attacks from "./Attacks";
import Stats from "./Stats";
import Contest from "./Contest";

export default class Visualization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: this.props.pokemon,
            value: "stats"
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        return (
            <div className="visualization">
                <BottomNavigation value={this.state.value} onChange={this.handleChange}>
                    <BottomNavigationAction label="Stats" value="stats" icon={<PieChartIcon />} />
                    <BottomNavigationAction label="Moves" value="moves" icon={<WhatshotIcon />} />
                    <BottomNavigationAction label="Contest" value="contest" icon={<StarIcon />} />
                </BottomNavigation>
                <PokeSprite pokemon={this.props.pokemon}/>
                <XPBar pokemon={this.props.pokemon}/>
                {this.state.value === "stats" && <Stats pokemon={this.props.pokemon}/>}
                {this.state.value === "moves" && <Attacks pokemon={this.props.pokemon}/>}
                {this.state.value === "contest" && <Contest pokemon={this.props.pokemon}/>}
            </div>
        )
    }

}