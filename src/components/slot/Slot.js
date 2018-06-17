import React, { Component } from "react";
import {getNames} from "../../utils/apiUtils";
import {enNames} from "../../utils/enNames";
import {enForms} from "../../utils/enForms";

import "./slot.css";
import GridListTile from "@material-ui/core/es/GridListTile/GridListTile";

export default class Slot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enName: ""
        };
        this.iconId = `${this.props.idPC}-${this.props.idBox}-${this.props.number}`;
    }

    componentDidMount() {
        if (this.props.slot !== null) {
            //TODO: use store to stock names
            /*getNames("en").then((res) => {
                console.log(res);
                this.setState ({
                    enName: res[this.props.id - 1]
                })
            });*/
            let name = "Unknown";
            if(this.props.slot.id > 0) {
                name = enNames[this.props.slot.id - 1];
            }
            this.setState ({
                enName: name
            });
        }
    }

    componentDidUpdate() {
        if (this.state.enName !== "")
            window.updateIcon(this.iconId);
    }

    setIcon() {
        let className = `pkspr pkmn-${this.state.enName.toLowerCase()}`;
        if (this.props.slot.shiny) {
            className += " color-shiny";
        }
        if (enForms[this.props.slot.id] !== undefined) {
            let form = enForms[this.props.slot.id][this.props.slot.form];
            if(form !== "") {
                className += " form-"+form;
            }
        }
        return className;
    }

    render() {
        return (
            <div className="slot" onClick={this.props.onClick}>
                {this.props.slot !== null &&
                    <span
                        id={this.iconId}
                        className={this.setIcon()}
                    />
                }
            </div>
        );
    }
}