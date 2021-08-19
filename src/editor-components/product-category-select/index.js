import React from 'react';
import {SelectControl} from '@wordpress/components';
import {__} from "@wordpress/i18n";


const ProductCategorySelect = ({...props}) => {
    let selectControl = null;
    const {
        index,
        attributes,
        productMatchesSelect
    } = props;
    const {
        categoryMatchesSelectedCategory,
        productMatchesSelectedCategory
    } = attributes;

    /**
     * TODO: Fetch items from WC categories
     */
    const categoryOptions = [
        {value: 0, label: 'Select a Category'},
        {value: 1, label: 'Hoodies'},
        {value: 2, label: 'Shirts'},
        {value: 3, label: 'Jeans'}
    ];


    if (index || index === 0) {

        if (productMatchesSelect) {
            selectControl = <SelectControl
                label={__('Select category:')}
                value={productMatchesSelectedCategory[index] ?? []}
                options={categoryOptions}
                onChange={(category) => {
                    const selectedCategories = [...productMatchesSelectedCategory];
                    selectedCategories[index] = category;
                    props.setAttributes({productMatchesSelectedCategory: selectedCategories});
                }}
            />
        } else {
            selectControl = <SelectControl
                label={__('Select category:')}
                value={categoryMatchesSelectedCategory[index] ?? []}
                options={categoryOptions}
                onChange={(category) => {
                    const selectedCategories = [...categoryMatchesSelectedCategory];
                    selectedCategories[index] = category;
                    props.setAttributes({categoryMatchesSelectedCategory: selectedCategories});
                }}
            />
        }
    } else {
        selectControl = <SelectControl
            label={__('Select category:')}
            value={categoryMatchesSelectedCategory[index] ?? []}
            options={categoryOptions}
            onChange={(category) => props.setAttributes({categoryMatchesSelectedCategory: category})}
        />
    }


    return selectControl;
};

export default ProductCategorySelect;
