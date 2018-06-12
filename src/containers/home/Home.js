import React, { Component } from "react";

import "./home.css";
import PC from "../../components/pc/PC";

export default class Home extends Component {

    /*componentDidMount() {
        getPC().then((res) => {
            console.log(res);
            this.setState = {
                "pcs": res
            }
        });
    }*/

    render() {
        const pcs = [{"id":0,"generation":1,"boxes":3}, {"id":1,"generation":1,"boxes":5}];
        const list = pcs.map((pc) =>
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
