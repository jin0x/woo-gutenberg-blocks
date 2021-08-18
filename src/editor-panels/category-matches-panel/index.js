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

import {getRandomInt, moveInArray} from "../../utils/index";

class CategoryMatchesPanel extends Component {

    handleAddCategoryMatches = () => {
        const randomNum = getRandomInt(1, 1000);

        const categoryMatchesItems = [...this.props.attributes.categoryMatchesItems];
        categoryMatchesItems.push({id: randomNum});
        this.props.setAttributes({categoryMatchesItems});

        const categoryMatches = [...this.props.attributes.categoryMatches];
        categoryMatches.push({id: randomNum});
        this.props.setAttributes({categoryMatches});
    };

    handleRemoveCategoryMatches = (index) => {
        const categoryMatchesItems = [...this.props.attributes.categoryMatchesItems];
        categoryMatchesItems.splice(index, 1);
        this.props.setAttributes({categoryMatchesItems});

        const categoryMatches = [...this.props.attributes.categoryMatches];
        categoryMatches.splice(index, 1);
        this.props.setAttributes({categoryMatches});

        if (categoryMatchesItems.length === 0 || categoryMatches.length === 0) {
            this.props.setAttributes({categoryMatchesSelectedCategory: []})
            this.props.setAttributes({categoryMatchesProductAddons: []})
        }
    };

    handleSortCategoryMatches = (newState) => {
        this.props.setAttributes({categoryMatchesItems: newState})
        this.props.setAttributes({categoryMatches: newState})
    }

    handleOnEndSort = (evt) => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;

        if (this.props.attributes.categoryMatchesProductAddons.length > 0) {
            const categoryMatchesProductAddons = [...this.props.attributes.categoryMatchesProductAddons];
            moveInArray(categoryMatchesProductAddons, oldIndex, newIndex);
            this.props.setAttributes({categoryMatchesProductAddons})
        }

        if (this.props.attributes.categoryMatchesSelectedCategory.length > 0) {
            const categoryMatchesSelectedCategory = [...this.props.attributes.categoryMatchesSelectedCategory];
            moveInArray(categoryMatchesSelectedCategory, oldIndex, newIndex);
            this.props.setAttributes({categoryMatchesSelectedCategory})
        }
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
                    <div key={item.id} style={{cursor: 'grab'}}>

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
            onEnd={(evt) => this.handleOnEndSort(evt)}
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
