import React from 'react';
import {FormTokenField} from '@wordpress/components';

const ProductAddonsSelect = ({...props}) => {
    const {attributes, index} = props;
    const {defaultAddons, categoryMatchesProductAddons} = attributes;

    const productsAddons = [
        'Hoodie with zipper',
        'Polo Shirt',
        'Levis Jeans',
        'Red Hat',
    ];

    return index || index === 0 ? (
        <FormTokenField
            label="Add product default addons"
            value={categoryMatchesProductAddons[index] ?? []}
            suggestions={productsAddons}
            onChange={(tokens) => {
                const selectedProducts = [...categoryMatchesProductAddons];

                selectedProducts[index] = tokens;
                props.setAttributes({categoryMatchesProductAddons: selectedProducts});
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
}

export default ProductAddonsSelect;
