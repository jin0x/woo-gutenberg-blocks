/**
 * External dependencies
 */
import React, {Component} from 'react';
import {__} from "@wordpress/i18n";
import {Button, IconButton, PanelBody} from "@wordpress/components";
import {ReactSortable} from "react-sortablejs";
/**
 * Internal dependencies
 */
import ProductAddonsSelect from "../../editor-components/product-addons-select";
import ProductCategorySelect from "../../editor-components/product-category-select";

import {getRandomInt} from "../../utils/index";

class CategoryMatchesPanel extends Component {

    state = {
        list: this.props.attributes.categoryMatchesItems ?? []
    }

    handleAddCategoryMatches = () => {
        const categoryMatchesItems = [...this.props.attributes.categoryMatchesItems];
        categoryMatchesItems.push({id: getRandomInt(1, 1000)});
        this.props.setAttributes({categoryMatchesItems});
    };

    handleRemoveCategoryMatches = (index) => {
        const categoryMatchesItems = [...this.props.attributes.categoryMatchesItems];
        categoryMatchesItems.splice(index, 1);
        this.props.setAttributes({categoryMatchesItems});
    };

    handleSortCategoryMatches = (newState) => {
        this.props.setAttributes({categoryMatchesItems: newState})
    }

    render() {
        let categoryMatchesFields;
        const {attributes} = this.props;
        const {
            categoryMatchesItems,
        } = attributes;

        if (categoryMatchesItems.length) {
            categoryMatchesFields = attributes.categoryMatchesItems.map((item, index) => {
                return (
                    <div key={item.id} style={{cursor: 'pointer'}}>

                        <span>{item.id}</span>

                        <ProductCategorySelect {...this.props} index={index}/>

                        <ProductAddonsSelect {...this.props} index={index} label={__('Select Product Add-ons:')}/>

                        <IconButton
                            icon="no-alt"
                            label="Delete category match"
                            onClick={() => this.handleRemoveCategoryMatches(index)}
                        />
                    </div>
                );
            });
        }

        const sortableList = <ReactSortable
            list={attributes.categoryMatchesItems}
            setList={(newState) => this.handleSortCategoryMatches(newState)}
        >
            {categoryMatchesFields}
        </ReactSortable>

        return (
            <PanelBody title={__('Category Matches')}>
                {sortableList}
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
