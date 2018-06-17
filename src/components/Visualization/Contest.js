import React, { Component } from "react";
import "./visualization.css";
import {attacks} from "../../utils/enAttacks";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";

export default class Visualization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: this.props.pokemon
        };
    }

    render() {
        return (
            <Card className="contest">
                <CardContent>
                    Will display contest information :)
                </CardContent>
            </Card>
        )
    }
}