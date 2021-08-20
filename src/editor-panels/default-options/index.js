/**
 * External dependencies
 */
import React from 'react';
import {__} from "@wordpress/i18n";
import {PanelBody, RangeControl} from "@wordpress/components";
/**
 * Internal dependencies
 */
import ProductAddonsSelect from "../../editor-components/product-addons-select";

const DefaultOptions = (props) => {
    const {attributes} = props;
    const {
        numberOfProducts,
    } = attributes;

    return (
        <PanelBody
            title={__("Default Options", "woo-gutenberg-blocks")}
            initialOpen
        >

            <ProductAddonsSelect {...props} label={__('Select product default addons:')}/>

            <RangeControl
                label={__("Number of Products", "woo-gutenberg-blocks")}
                value={numberOfProducts}
                onChange={(products) => this.props.setAttributes({numberOfProducts: products})}
                min={1}
                max={10}
            />

        </PanelBody>
    );
};

export default DefaultOptions;
