import React from 'react';
import {FormTokenField} from '@wordpress/components';


const ProductAddonsSelect = ({...props}) => {
    const {attributes, index} = props;
    const {defaultAddons, productMatches} = attributes;

    const productsAddons = [
        'Hoodie with zipper',
        'Polo Shirt',
        'Levis Jeans',
        'Red Hat',
    ];

    return index || index === 0 ? (
        <FormTokenField
            label="Add product default addons"
            value={productMatches[index] ?? []}
            suggestions={productsAddons}
            onChange={(tokens) => {
                const productMatches = [...props.attributes.productMatches];


                productMatches[index] = tokens;
                console.log('PRODUCT MATCHES::: ', productMatches);


                props.setAttributes({productMatches});
            }}
        />
    ) : (
        <FormTokenField
            label="Add product default addon"
            value={defaultAddons}
            suggestions={productsAddons}
            onChange={(tokens) => props.setAttributes({defaultAddons: tokens})}
        />
    );
};

export default ProductAddonsSelect;

