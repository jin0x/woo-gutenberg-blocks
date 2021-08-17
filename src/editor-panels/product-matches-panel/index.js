/**
 * External dependencies
 */
import React, {Component} from 'react';
import {__} from "@wordpress/i18n";
import {Button, IconButton, PanelBody} from "@wordpress/components";
/**
 * Internal dependencies
 */
import ProductAddonsSelect from "../../editor-components/product-addons-select";
import ProductCategorySelect from "../../editor-components/product-category-select";

class ProductMatchesPanel extends Component {

    handleAddProductMatches = () => {
        const productMatchesItems = [...this.props.attributes.productMatchesItems];
        productMatchesItems.push({id: ''});
        this.props.setAttributes({productMatchesItems});
    };

    handleRemoveProductMatches = (index) => {
        const productMatchesItems = [...this.props.attributes.productMatchesItems];
        productMatchesItems.splice(index, 1);
        this.props.setAttributes({productMatchesItems});
    };

    render() {
        let productMatchesFields;
        const {attributes} = this.props;
        const {
            productMatchesItems,
        } = attributes;

        if (productMatchesItems.length) {
            productMatchesFields = productMatchesItems.map((location, index) => {
                return (
                    <>
                        <ProductCategorySelect {...this.props} index={index}/>

                        <ProductAddonsSelect {...this.props} index={index} label={__('Select Product Add-ons:')}/>

                        <IconButton
                            icon="no-alt"
                            label="Delete product match"
                            onClick={() => this.handleRemoveProductMatches(index)}
                        />
                    </>
                );
            });
        }

        return (
            <PanelBody title={__('Product Matches')}>
                {productMatchesFields}
                <Button
                    isPrimary
                    onClick={this.handleAddProductMatches.bind(this)}
                >
                    {__('Add Product Match')}
                </Button>
            </PanelBody>
        );
    }

};

export default ProductMatchesPanel;
