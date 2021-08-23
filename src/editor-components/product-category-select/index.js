import React from 'react';
import {SelectControl} from '@wordpress/components';
import {__} from "@wordpress/i18n";

const ProductCategorySelect = ({...props}) => {
    let selectControl = null;
    const {
        index,
        attributes,
        categories,
        productMatchesSelect
    } = props;
    const {
        categoryMatchesSelectedCategory,
        productMatchesSelectedCategory
    } = attributes;

    let categoryOptions = [
        {value: -1, label: 'Select a Category'},
    ];

    categories.length > 0 && categories.map((category) => {
        categoryOptions.push({value: category.id, label: category.name});
    })

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
