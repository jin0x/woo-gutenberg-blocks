import React from 'react';
import {SelectControl} from '@wordpress/components';
import {__} from "@wordpress/i18n";


const ProductCategorySelect = ({...props}) => {
    const {attributes, index} = props;
    const {categoryMatches} = attributes;

    const categoryOptions = [
        {value: null, label: 'Select a Category', disabled: true},
        {value: 1, label: 'Hoodies'},
        {value: 2, label: 'Shirts'},
        {value: 3, label: 'Jeans'}
    ];

    return index || index === 0 ? (
        <SelectControl
            label={__('Select category:')}
            value={categoryMatches[index] ?? []}
            options={categoryOptions}
            onChange={(category) => {
                const categoryMatches = [...props.attributes.categoryMatches];

                categoryMatches[index] = category;
                props.setAttributes({categoryMatches});
            }}
        />
    ) : (
        <SelectControl
            label={__('Select category:')}
            value={categoryMatches[index] ?? []}
            options={categoryOptions}
            onChange={(category) => props.setAttributes({categoryMatches: category})}
        />
    );
};

export default ProductCategorySelect;

