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

class CategoryMatchesPanel extends Component {

    handleAddCategoryMatches = () => {
        const categoryMatchesItems = [...this.props.attributes.categoryMatchesItems];
        categoryMatchesItems.push('');
        this.props.setAttributes({categoryMatchesItems});
    };

    handleRemoveCategoryMatches = (index) => {
        const categoryMatchesItems = [...this.props.attributes.categoryMatchesItems];
        categoryMatchesItems.splice(index, 1);
        this.props.setAttributes({categoryMatchesItems});
    };

    render() {
        let categoryMatchesFields;
        const {attributes} = this.props;
        const {
            categoryMatchesItems,
        } = attributes;

        if (categoryMatchesItems.length) {
            categoryMatchesFields = categoryMatchesItems.map((location, index) => {
                return (
                    <>
                        <ProductCategorySelect {...this.props} index={index}/>

                        <ProductAddonsSelect {...this.props} index={index} label={__('Select Product Add-ons:')}/>

                        <IconButton
                            icon="no-alt"
                            label="Delete category match"
                            onClick={() => this.handleRemoveCategoryMatches(index)}
                        />
                    </>
                );
            });
        }

        return (
            <PanelBody title={__('Category Matches')}>
                {categoryMatchesFields}
                <Button
                    isPrimary
                    onClick={this.handleAddCategoryMatches.bind(this)}
                >
                    {__('Add Category Match')}
                </Button>
            </PanelBody>
        );
    }

};

export default CategoryMatchesPanel;
