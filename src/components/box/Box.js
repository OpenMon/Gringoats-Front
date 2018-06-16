import React, { Component } from "react";
import Grid from "@material-ui/core/es/Grid/Grid";
import GridList from "@material-ui/core/es/GridList/GridList";
import GridListTile from "@material-ui/core/es/GridListTile/GridListTile";
import {getSlots} from "../../utils/apiUtils";
import Slot from "../slot/Slot";
import "./box.css";
import Visualization from "../Visualization/Visualization";

const styles = theme => ({
    gridListContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    }
});

export default class Box extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slots: [],
            idSlot: 0
        };
    }

    componentDidMount() {
        getSlots(this.props.idPC, this.props.id).then((res) => {
            this.setState ({
                slots: res.slots,
                idSlot: res.id
            })
        });
    }

    render() {
        let slots = [];
        for (let i = 0; i < this.state.slots.length; i++) {
            let id;
            if (this.state.slots[i] != null) {
                id = this.state.slots[i].id
            } else {
                id = -1
            }
            slots.push(
                (<GridListTile key={i} cols={1}>
                    <Slot key={i} number={i} idPC={this.props.idPC} idBox={this.props.id} slot={this.state.slots[i]}/>
                </GridListTile>)
            );
        }
        return (
            <div className="box">
                <Grid container spacing={24}>
                    <Grid item xs={12} lg={6}>
                        <div className={styles.gridListContainer}>
                            <GridList cellHeight={60} cols={5}>
                                {slots}
                            </GridList>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        {
                            this.state.slots[0] !== undefined
                            && this.state.slots[0] !== null
                            && <Visualization pokemon={this.state.slots[0]}/>
                        }
                    </Grid>
                </Grid>

            </div>
        );
    }
}