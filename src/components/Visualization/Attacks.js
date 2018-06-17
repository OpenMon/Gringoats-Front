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
            <Card className="attacks">
                <CardContent>
                    <List component="nav">
                        {this.props.pokemon.moves.map(function(move, index){
                            let attack = attacks[move.id];
                            return <ListItem key={index}>
                                <ListItemText>
                                    {attack.name}
                                </ListItemText>
                                <ListItemText className="move-pp">
                                    {move.pp}/{attack.pp < move.pp ? move.pp : attack.pp}
                                </ListItemText>
                            </ListItem>;
                        })}
                    </List>
                </CardContent>
            </Card>
        )
    }
}