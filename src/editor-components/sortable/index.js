import React, {Component, useState} from "react";
import {ReactSortable} from "react-sortablejs";
import {TextControl} from "@woocommerce/components";

export const Sortable = ({attributes}) => {

    const [state, setState] = useState(attributes.categoryMatchesItems);

    console.log('CATEGORY MATCHES ITEMS:::', attributes.categoryMatchesItems);

    return (
        <ul
        >
            {attributes.categoryMatchesItems.map((item) => (
                <div key={item.id} style={{cursor: 'pointer'}}>
                    <TextControl
                        label={`Text label for text ${item.id}`}
                        value=""
                        onChange={e => console.log(e)}
                        type="text"
                    />
                </div>
            ))}
        </ul>
    );

}
