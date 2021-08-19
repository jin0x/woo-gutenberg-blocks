import React from 'react';
import {SelectControl} from '@wordpress/components';
import {__} from "@wordpress/i18n";


const ProductCategorySelect = ({...props}) => {
    const {attributes, index, productMatchesSelect} = props;
    const {categoryMatchesSelectedCategory, productMatchesSelectedCategory} = attributes;

    /**
     * TODO: Fetch items from WC categories
     */
    const categoryOptions = [
        {value: 0, label: 'Select a Category'},
        {value: 1, label: 'Hoodies'},
        {value: 2, label: 'Shirts'},
        {value: 3, label: 'Jeans'}
    ];

    const selectControl = productMatchesSelect ? (
        <SelectControl
            label={__('Select category:')}
            value={productMatchesSelectedCategory[index] ?? []}
            options={categoryOptions}
            onChange={(category) => {
                const selectedCategories = [...productMatchesSelectedCategory];
                selectedCategories[index] = category;
                props.setAttributes({productMatchesSelectedCategory: selectedCategories});
            }}
        />
    ) : (
        <SelectControl
            label={__('Select category:')}
            value={categoryMatchesSelectedCategory[index] ?? []}
            options={categoryOptions}
            onChange={(category) => {
                const selectedCategories = [...categoryMatchesSelectedCategory];
                selectedCategories[index] = category;
                props.setAttributes({categoryMatchesSelectedCategory: selectedCategories});
            }}
        />
    )

    return index || index === 0 ? (
        {selectControl}
    ) : (
        <SelectControl
            label={__('Select category:')}
            value={categoryMatchesSelectedCategory[index] ?? []}
            options={categoryOptions}
            onChange={(category) => props.setAttributes({categoryMatchesSelectedCategory: category})}
        />
    );
};

export default ProductCategorySelect;
