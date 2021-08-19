import React from 'react';
import {FormTokenField} from '@wordpress/components';

const ProductAddonsSelect = ({...props}) => {
    const {attributes, index, productMatchesSelectedCategory} = props;
    const {defaultAddons, categoryMatchesProductAddons, productMatchesProductAddons} = attributes;

    const productsAddons = [
        'Hoodie with zipper',
        'Polo Shirt',
        'Levis Jeans',
        'Red Hat',
    ];

    const selectControl = productMatchesSelectedCategory ? (
            <FormTokenField
                label="Add product default addons"
                value={productMatchesProductAddons[index] ?? []}
                suggestions={productsAddons}
                onChange={(tokens) => {
                    const selectedProducts = [...productMatchesProductAddons];

                    selectedProducts[index] = tokens;
                    props.setAttributes({productMatchesProductAddons: selectedProducts});
                }}
            />
        ) : (
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
        )

    return index || index === 0 ? (
        {selectControl}
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
