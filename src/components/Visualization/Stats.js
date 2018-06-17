import React, { Component } from "react";
import "./visualization.css";
import {attacks} from "../../utils/enAttacks";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import Table from "@material-ui/core/es/Table/Table";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import TableRow from "@material-ui/core/es/TableRow/TableRow";

export default class Visualization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: this.props.pokemon
        };
    }

    render() {
        let stat = ["HP", "Attack", "Defense", "Speed", "Special Attack", "Special Defense"];

        let row = [];

        for (var i=0; i<6; i++) {
            row.push(<TableRow key={i}>
                <TableCell>{stat[i]}</TableCell>
                <TableCell>{this.props.pokemon.ev[i]}</TableCell>
                <TableCell>0</TableCell>
            </TableRow>);
        }

        return <Card className="stats">
            <CardContent>
                <Table component="nav">
                    <TableHead>
                        <TableCell>Name</TableCell>
                        <TableCell>EV</TableCell>
                        <TableCell>IV</TableCell>
                    </TableHead>
                    <TableBody>
                        {row}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    }
}