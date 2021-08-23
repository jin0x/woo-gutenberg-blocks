import React, {Component} from 'react';
import Select from 'react-select'
import {FormTokenField} from '@wordpress/components';
import {__} from "@wordpress/i18n";

class ProductAddonsSelect extends Component {

    render() {
        let productOptions = [];
        let selectControl = null;
        const {attributes, index, products, productMatchesSelect} = this.props;
        const {defaultAddons, categoryMatchesProductAddons, productMatchesProductAddons} = attributes;

        products.length > 0 && products.map((product) => {
            productOptions.push({value: 'product.id', label: product.name});
        });

        if (index || index === 0) {

            if (productMatchesSelect) {
                selectControl = <Select
                    isMulti
                    label="Add product default addons"
                    value={productMatchesProductAddons[index] ?? []}
                    options={productOptions}
                    onChange={(tokens) => {
                        const selectedProducts = [...productMatchesProductAddons];

                        selectedProducts[index] = tokens;
                        this.props.setAttributes({productMatchesProductAddons: selectedProducts});
                    }}
                />
            } else {
                selectControl = <Select
                    isMulti
                    label={__('Add product default addons')}
                    value={categoryMatchesProductAddons[index] ?? []}
                    options={productOptions}
                    onChange={(tokens) => {
                        const selectedProducts = [...categoryMatchesProductAddons];

                        selectedProducts[index] = tokens;
                        this.props.setAttributes({categoryMatchesProductAddons: selectedProducts});
                    }}
                />
            }
        } else {
            selectControl = <Select
                isMulti
                label={__('Add product default addons')}
                value={defaultAddons}
                options={productOptions}
                onChange={(tokens) => this.props.setAttributes({defaultAddons: tokens})}
            />
        }

        return selectControl;
    }

}

export default ProductAddonsSelect;
