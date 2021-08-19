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
import {getRandomInt, moveInArray} from "../../utils/index";
import {ReactSortable} from "react-sortablejs";


class ProductMatchesPanel extends Component {

    handleAddProductMatches = () => {
        const randomNum = getRandomInt(1, 1000);

        const productMatches = [...this.props.attributes.productMatches];
        productMatches.push({id: randomNum});
        this.props.setAttributes({productMatches});
    };

    handleRemoveProductMatches = (index) => {
        const productMatches = [...this.props.attributes.productMatches];
        productMatches.splice(index, 1);
        this.props.setAttributes({productMatches});

        if (productMatches.length === 0) {
            this.props.setAttributes({productMatchesSelectedCategory: []})
            this.props.setAttributes({productMatchesProductAddons: []})
        }
    };

    handleSortProductMatches = (newState) => {
        this.props.setAttributes({productMatches: newState})
    }

    handleOnEndSort = (evt) => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;

        if (this.props.attributes.productMatchesProductAddons.length > 0) {
            const productMatchesProductAddons = [...this.props.attributes.productMatchesProductAddons];
            moveInArray(productMatchesProductAddons, oldIndex, newIndex);
            this.props.setAttributes({productMatchesProductAddons})
        }

        if (this.props.attributes.productMatchesSelectedCategory.length > 0) {
            const productMatchesSelectedCategory = [...this.props.attributes.productMatchesSelectedCategory];
            moveInArray(productMatchesSelectedCategory, oldIndex, newIndex);
            this.props.setAttributes({productMatchesSelectedCategory})
        }
    }

    render() {
        let productMatchesFields;
        const {attributes} = this.props;
        const {
            productMatches,
        } = attributes;

        if (productMatches.length) {
            productMatchesFields = attributes.productMatches.map((item, index) => {
                return (
                    <div key={item.id} style={{cursor: 'grab'}}>

                        <ProductCategorySelect {...this.props} index={index} productMatchesSelect />

                        <ProductAddonsSelect {...this.props} index={index} label={__('Select Product Add-ons:')} productMatchesSelect />

                        <IconButton
                            icon="no-alt"
                            label="Delete product match"
                            onClick={() => this.handleRemoveProductMatches(index)}
                        />

                    </div>
                );
            });
        }

        const sortableList = <ReactSortable
            list={attributes.productMatches}
            setList={(newState) => this.handleSortProductMatches(newState)}
            onEnd={(evt) => this.handleOnEndSort(evt)}
        >
            {productMatchesFields}
        </ReactSortable>

        return (
            <PanelBody title={__('Product Matches')}>
                {sortableList}
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
