import React from 'react';
import {FormTokenField} from '@wordpress/components';


const ProductAddonsSelect = ({...props}) => {
    const {attributes} = props;
    const {defaultAddons} = attributes;

    const productsAddons = [
        'Hoodie with zipper',
        'Polo Shirt',
        'Levis Jeans',
        'Red Hat',
    ];

    return (
        <FormTokenField
            label="Add product default addon"
            value={defaultAddons}
            suggestions={productsAddons}
            onChange={(tokens) => props.setAttributes({defaultAddons: tokens})}
        />
    );
};

export default ProductAddonsSelect;

