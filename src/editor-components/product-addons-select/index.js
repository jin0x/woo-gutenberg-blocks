import React from 'react';
import {FormTokenField} from '@wordpress/components';
import {__} from "@wordpress/i18n";

const ProductAddonsSelect = ({...props}) => {
    let selectControl = null;
    const {attributes, index, productMatchesSelect} = props;
    const {defaultAddons, categoryMatchesProductAddons, productMatchesProductAddons} = attributes;

    const productsAddons = [
        'Hoodie with zipper',
        'Polo Shirt',
        'Levis Jeans',
        'Red Hat',
    ];

    if (index || index === 0) {

        if (productMatchesSelect) {
            selectControl = <FormTokenField
                label="Add product default addons"
                value={productMatchesProductAddons[index] ?? []}
                suggestions={productsAddons}
                onChange={(tokens) => {
                    const selectedProducts = [...productMatchesProductAddons];

                    selectedProducts[index] = tokens;
                    props.setAttributes({productMatchesProductAddons: selectedProducts});
                }}
            />
        } else {
            selectControl = <FormTokenField
                label={__('Add product default addons')}
                value={categoryMatchesProductAddons[index] ?? []}
                suggestions={productsAddons}
                onChange={(tokens) => {
                    const selectedProducts = [...categoryMatchesProductAddons];

                    selectedProducts[index] = tokens;
                    props.setAttributes({categoryMatchesProductAddons: selectedProducts});
                }}
            />
        }
    } else {
        selectControl = <FormTokenField
            label={__('Add product default addons')}
            value={defaultAddons}
            suggestions={productsAddons}
            onChange={(tokens) => props.setAttributes({defaultAddons: tokens})}
        />
    }

    return selectControl;
}

export default ProductAddonsSelect;
