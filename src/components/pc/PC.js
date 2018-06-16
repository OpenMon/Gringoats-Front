import React, { Component } from "react";
import {getBoxes} from "../../utils/apiUtils";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Tabs from "@material-ui/core/es/Tabs/Tabs";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Tab from "@material-ui/core/es/Tab/Tab";
import Box from "../box/Box";

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class PC extends Component {

    constructor(props) {
        super(props);
        this.state = {
            boxes: [],
            idBox: 0
        };
    }

    componentDidMount() {
        getBoxes(this.props.id).then((res) => {
            this.setState ({
                boxes: res,
                idBox: res[0].id
            })
        });
    }

    handleChange = (event, idBox) => {
        this.setState({ idBox });
    };


    render() {
        const boxes = this.state.boxes.map((box) =>
            <Tab key={box.id} label={box.name} />
        );
        return (
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.idBox}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                    >
                        {boxes}
                    </Tabs>
                </AppBar>
                {this.state.boxes.map((box) =>
                    this.state.idBox === box.id && <Box key={box.id} idPC={this.props.id} id={box.id}/>
                )}

            </div>
        );
    }
}

PC.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PC)
