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

        const categoryMatches = [...this.props.attributes.categoryMatches];
        categoryMatches.push({id: randomNum});
        this.props.setAttributes({categoryMatches});
    };

    handleRemoveCategoryMatches = (index) => {
        const categoryMatches = [...this.props.attributes.categoryMatches];
        categoryMatches.splice(index, 1);
        this.props.setAttributes({categoryMatches});

        if (categoryMatches.length === 0) {
            this.props.setAttributes({categoryMatchesSelectedCategory: []})
            this.props.setAttributes({categoryMatchesProductAddons: []})
        }
    };

    handleSortCategoryMatches = (newState) => {
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
            categoryMatches,
        } = attributes;

        if (categoryMatches.length) {
            categoryMatchesFields = attributes.categoryMatches.map((item, index) => {
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
            list={attributes.categoryMatches}
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
