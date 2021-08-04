import "./style.editor.scss";
/**
 * External Dependencies
 */
import {Component} from "@wordpress/element";
import {
    withSelect
    // useSelect,
} from "@wordpress/data";
import {__} from "@wordpress/i18n";
import {
    Button,
    FormTokenField,
    IconButton,
    PanelBody,
    RangeControl,
    SelectControl,
    ToggleControl,
    TextControl,
} from "@wordpress/components";
import {InspectorControls} from "@wordpress/block-editor";

/**
 * Internal Dependencies
 */
import {Product} from "../../components/Product/";

class ProductCartAddons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headerTitle: null,
            products: [],
            loading: true
        };
    }

    onChangeNumberOfProducts = numberOfProducts => {
        this.props.setAttributes({numberOfProducts});
    };

    onChangeColumns = columns => {
        this.props.setAttributes({columns});
    };

    onChangeRows = rows => {
        this.props.setAttributes({rows});
    };

    onChangeProductTitleVisibility = hasProductTitle => {
        this.props.setAttributes({hasProductTitle});
    };

    onChangeProductPriceVisibility = hasProductPrice => {
        this.props.setAttributes({hasProductPrice});
    };

    onChangeProductRatingVisibility = hasProductRating => {
        this.props.setAttributes({hasProductRating});
    };

    onChangeProductButtonVisibility = hasProductButton => {
        this.props.setAttributes({hasProductButton});
    };

    onChangeProductCategories = productCategories => {
        this.props.setAttributes({productCategories});
    };

    handleAddCategoryMatches = () => {
        const categoryMatchesItems = [...this.props.attributes.categoryMatchesItems];
        categoryMatchesItems.push('');
        this.props.setAttributes({categoryMatchesItems});
    };

    handleRemoveCategoryMatches = (index) => {
        const categoryMatchesItems = [...this.props.attributes.categoryMatchesItems];
        categoryMatchesItems.splice(index, 1);
        this.props.setAttributes({categoryMatchesItems});
    };

    handleCategoryMatchesChange = (category, index) => {
        const categoryMatches = [...this.props.attributes.categoryMatches];

        console.log('Category Selected: ', category);
        console.log('Category Matches: ', categoryMatches);
        console.log('===========================================');

        categoryMatches[index] = category;
        this.props.setAttributes({categoryMatches});
    };

    handleProductMatchesChange = (product, index) => {
        const productMatches = [...this.props.attributes.productMatches];

        console.log('Product Selected: ', product);
        console.log('Product Matches: ', productMatches);
        console.log('===========================================');

        // productMatches[index] = product;
        // this.props.setAttributes({productMatches});
    };

    /**
     * Get Product cart add-ons
     *
     * @return {null}
     */
    getProductCartAddons() {
        wp.apiFetch({
            path: "wc/store/cart"
        }).then(data => {
            this.setState({
                products: data?.extensions?.add_ons?.products ?? [],
                headerTitle: data?.extensions?.add_ons?.header_title ?? null,
                loading: false
            });
        });

        return null;
    }


    /**
     * Get location controls
     */
    getLocationControls() {
        let categoryMatchesFields;

        const {attributes} = this.props;
        const {
            categoryMatchesItems,
            productCategories,
            productMatches,
            categoryMatches
        } = attributes;


        /**
         * Product Categories Options
         *
         * @type {string[]}
         */
        const productCategoriesOptions = [
            {value: null, label: 'Select a Category', disabled: true},
            {value: 'hoodies', label: 'Hoodies'},
            {value: 'shirts', label: 'Shirts'},
            {value: 'jeans', label: 'Jeans'}
        ]

        /**
         * Product Addons Options
         *
         * @type {[{label: string, value: string}, {label: string, value: string}, {label: string, value: string}]}
         */
        const productAddonsOptions = [
            {value: 'hoodie-with-zipper', label: 'Hoodie with zipper'},
            {value: 'polo-shirts', label: 'Polo Shirt'},
            {value: 'levis-jean', label: 'Levis Jeans'}
        ]

        /*
        console.log('✨✨✨✨✨ Category Matches Items::: ', categoryMatchesItems);
        console.log('✨✨✨✨✨ Category Matches::: ', categoryMatches);
        console.log('✨✨✨✨✨ Product Matches::: ', productMatches);
        console.log('✨✨✨✨✨ Product Categories::: ', productCategories);
         */

        if (categoryMatchesItems.length) {
            categoryMatchesFields = categoryMatchesItems.map((location, index) => {
                return (
                    <>
                        <SelectControl
                            label={__('Select category:')}
                            value={categoryMatches[index] ?? []}
                            options={productCategoriesOptions}
                            onChange={(category) => this.handleCategoryMatchesChange(category, index)}
                        />
                        <FormTokenField
                            label={__('Select Product Add-ons:')}
                            value={productCategories}
                            suggestions={productAddonsOptions}
                            onChange={(productCategories) => this.props.setAttributes({productCategories})}
                        />
                        <IconButton
                            icon="no-alt"
                            label="Delete category match"
                            onClick={() => this.handleRemoveCategoryMatches(index)}
                        />
                    </>
                );
            });
        }

        return [
            <InspectorControls key="1">
                <PanelBody title={__('Category Matches')}>
                    {categoryMatchesFields}
                    <Button
                        isDefault
                        isPrimary
                        onClick={this.handleAddCategoryMatches.bind(this)}
                    >
                        {__('Add Category Match')}
                    </Button>
                </PanelBody>
            </InspectorControls>
        ];
    }

    /**
     * Get Inspector Controls
     *
     * @return {JSX.Element}
     */
    getInspectorControls() {
        const {attributes} = this.props;
        const {
            numberOfProducts,
            columns,
            rows,
            hasProductTitle,
            hasProductPrice,
            hasProductRating,
            hasProductButton,
        } = attributes;


        return (
            <InspectorControls>
                <PanelBody
                    title={__("Product Options", "woo-gutenberg-blocks")}
                    initialOpen
                >
                    <RangeControl
                        label={__("Number of Posts", "woo-gutenberg-blocks")}
                        value={numberOfProducts}
                        onChange={this.onChangeNumberOfProducts}
                        min={1}
                        max={10}
                    />
                    {this.getLocationControls()}

                </PanelBody>
                <PanelBody
                    title={__("Layout Options", "woo-gutenberg-blocks")}
                    initialOpen
                >
                    <RangeControl
                        label={__("Columns", "woo-gutenberg-blocks")}
                        value={columns}
                        onChange={this.onChangeColumns}
                        min={1}
                        max={6}
                    />
                    <RangeControl
                        label={__("Rows", "woo-gutenberg-blocks")}
                        value={rows}
                        onChange={this.onChangeRows}
                        min={1}
                        max={3}
                    />
                </PanelBody>
                <PanelBody
                    title={__("Content Options", "woo-gutenberg-block")}
                    initialOpen
                >
                    <ToggleControl
                        label={__("Product title", "woo-gutenberg-block")}
                        help={
                            hasProductTitle
                                ? __(
                                "Product title is visible.",
                                "woo-gutenberg-block"
                                )
                                : __(
                                "Product title is hidden.",
                                "woo-gutenberg-block"
                                )
                        }
                        checked={hasProductTitle}
                        onChange={this.onChangeProductTitleVisibility}
                    />
                    <ToggleControl
                        label={__("Product price", "woo-gutenberg-block")}
                        help={
                            hasProductPrice
                                ? __(
                                "Product price is visible.",
                                "woo-gutenberg-block"
                                )
                                : __(
                                "Product price is hidden.",
                                "woo-gutenberg-block"
                                )
                        }
                        checked={hasProductPrice}
                        onChange={this.onChangeProductPriceVisibility}
                    />
                    <ToggleControl
                        label={__("Product rating", "woo-gutenberg-block")}
                        help={
                            hasProductRating
                                ? __(
                                "Product rating is visible.",
                                "woo-gutenberg-block"
                                )
                                : __(
                                "Product rating is hidden.",
                                "woo-gutenberg-block"
                                )
                        }
                        checked={hasProductRating}
                        onChange={this.onChangeProductRatingVisibility}
                    />
                    <ToggleControl
                        label={__("Add to Cart button", "woo-gutenberg-block")}
                        help={
                            hasProductButton
                                ? __(
                                "Add to Cart button is visible.",
                                "woo-gutenberg-block"
                                )
                                : __(
                                "Add to Cart button is hidden.",
                                "woo-gutenberg-block"
                                )
                        }
                        checked={hasProductButton}
                        onChange={this.onChangeProductButtonVisibility}
                    />
                </PanelBody>
            </InspectorControls>
        );
    }

    render() {
        const {loading, products, headerTitle} = this.state;
        const {className, attributes} = this.props;

        const {columns} = attributes;

        const titleClasses = `${className}__title`;
        const productsClasses = `${className}__products ${className}__products-col-${columns}`;

        this.getProductCartAddons();

        // console.log('WP:: ', wp);
        // console.log('Attributes: ', attributes);

        if (loading) {
            return <div>Loading Products...</div>
        }

        return (
            <>
                {this.getInspectorControls()}
                {products && products.length > 0 ? (
                    <div className={className}>
                        <h3 className={titleClasses}>{headerTitle}</h3>
                        <ul className={productsClasses}>
                            {products.map((product) => <Product product={product} key={product.id}
                                                                attributes={attributes}/>)}
                        </ul>
                    </div>
                ) : (<div>{__("No Products Found", "woo-gutenberg-blocks")}</div>)}
            </>
        );
    }

}

export default withSelect((select, props) => {
    const {
        attributes
    }

        = props;
    const {numberOfProducts} = attributes;
    let query = {per_page: numberOfProducts};
    return {
        products: select("core").getEntityRecords("postType", "product", query)
    };
})(ProductCartAddons);
