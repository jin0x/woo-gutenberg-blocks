import React, {Component} from "react";
import {ReactSortable} from "react-sortablejs";
import {TextControl} from "@woocommerce/components";

export class Sortable extends Component {
    state = {
        list: [
            { id: "1" },
            { id: "2" },
            { id: "3" },
            { id: "4" },
        ],
    };

    render() {
        return (
            <ReactSortable
                list={this.state.list}
                setList={(newState) => this.setState({list: newState})}
            >
                {this.state.list.map((item) => (
                    <div key={item.id} style={{ cursor: 'pointer' }}>
                        <TextControl
                            label={`Text label for text ${item.id}`}
                            value=""
                            onChange={ e => console.log(e) }
                            type="text"
                        />
                    </div>
                ))}
            </ReactSortable>
        );
    }
}
