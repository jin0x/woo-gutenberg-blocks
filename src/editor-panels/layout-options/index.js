/**
 * External dependencies
 */
import React from 'react';
import {__} from "@wordpress/i18n";
import {PanelBody, RangeControl} from "@wordpress/components";

const LayoutOptions = (props) => {
    const {attributes} = props;
    const {
        columns,
    } = attributes;

    return (
        <PanelBody
            title={__("Layout Options", "woo-gutenberg-blocks")}
            initialOpen
        >
            <RangeControl
                label={__("Columns", "woo-gutenberg-blocks")}
                value={columns}
                onChange={(columns) => this.props.setAttributes({columns})}
                min={1}
                max={6}
            />
        </PanelBody>
    );
};

export default LayoutOptions;
