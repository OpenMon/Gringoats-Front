import React, { Component } from "react";

import "./home.css";
import PC from "../../components/pc/PC";
import {getPC} from "../../utils/apiUtils";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "pcs": []
        };
    }

    componentDidMount() {
        getPC().then((res) => {
            console.log(res);
            this.setState = {
                "pcs": res
            }
        });
    }

    render() {
        const list = this.state.pcs.map((pc) =>
            <PC key={pc.id} generation={pc.generation} boxes={pc.boxes} />
        );
        return (
            <div>
                Welcome to GlobalPKBank !

                {list}

            </div>
        );
    }
}
