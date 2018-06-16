import React, { Component } from "react";
import PropTypes from 'prop-types';

import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Tabs from "@material-ui/core/es/Tabs/Tabs";
import { withStyles } from '@material-ui/core/styles';
import PC from "../../components/pc/PC";
import Tab from "@material-ui/core/es/Tab/Tab";

import "./home.css";
import {getPC} from "../../utils/apiUtils";
import Badge from "@material-ui/core/es/Badge/Badge";

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pcs: [],
            idPC: 0
        };
    }

    componentDidMount() {
        getPC().then((res) => {
            this.setState ({
                pcs: res,
                idPC: res[0].id
            })
        });
    }

    handleChange = (event, idPC) => {
        this.setState({ idPC });
    };

    render() {
        const pcs = this.state.pcs.map((pc) =>
            <Tab key={pc.id} label={
                <Badge badgeContent={pc.generation} color="primary">
                    {pc.name}
                </Badge>} />
        );
        return (
            <div>

                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.idPC}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                    >
                        {pcs}
                    </Tabs>
                </AppBar>
                {this.state.pcs.map((pc) =>
                    this.state.idPC === pc.id && <PC key={pc.id} id={pc.id}/>
                )}
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home)
