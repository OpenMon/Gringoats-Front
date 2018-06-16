import React, { Component } from "react";
import PropTypes from 'prop-types';

import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Tabs from "@material-ui/core/es/Tabs/Tabs";
import { withStyles } from '@material-ui/core/styles';
import Box from "../../components/box/Box";
import Tab from "@material-ui/core/es/Tab/Tab";

import "./home.css";
import {getPC} from "../../utils/apiUtils";

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
            value: 0
        };
    }

    componentDidMount() {
        getPC().then((res) => {
            this.setState ({
                pcs: res,
                value: res[0].id
            })
        });
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const listPC = this.state.pcs.map((pc) =>
            <Tab key={pc.id} label={pc.id} />
        );
        return (
            <div>

                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                    >
                        {listPC}
                    </Tabs>
                </AppBar>
                <Box pc={this.state.value}/>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home)
