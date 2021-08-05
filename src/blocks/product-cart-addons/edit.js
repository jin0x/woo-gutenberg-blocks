import "./style.editor.scss";
/**
 * External Dependencies
 */
import {Component} from "@wordpress/element";
import {__} from "@wordpress/i18n";
import {
    Button,
    IconButton,
    PanelBody,
    RangeControl,
    TextControl,
    ToggleControl,
} from "@wordpress/components";
import {InspectorControls} from "@wordpress/block-editor";

/**
 * Internal Dependencies
 */
import ProductAddonsSelect from "../../editor-components/product-addons-select"
import ProductCategorySelect from "../../editor-components/product-category-select"
import {Product} from "../../components/Product/";

class ProductCartAddons extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
     * Get Default Controls
     *
     * @return {JSX.Element[]}
     */
    getDefaultControls() {
        const {attributes} = this.props;
        const {
            headerTitle,
            numberOfProducts,
        } = attributes;

        return [
            <PanelBody
                title={__("Default Options", "woo-gutenberg-blocks")}
                initialOpen
            >
                <TextControl
                    value={headerTitle}
                    label={__("Display Title", "woo-gutenberg-blocks")}
                    labelPosition="top"
                    type="text"
                    isPressEnterToChange
                    onChange={(text) => this.props.setAttributes({headerTitle: text})}
                />

                <ProductAddonsSelect {...this.props} label={__('Select product default addons:')} />

                <RangeControl
                    label={__("Number of Products", "woo-gutenberg-blocks")}
                    value={numberOfProducts}
                    onChange={this.onChangeNumberOfProducts}
                    min={1}
                    max={10}
                />
                <TextControl
                    value={numberOfProducts}
                    label={__("Number of Products", "woo-gutenberg-blocks")}
                    labelPosition="top"
                    type="number"
                    isPressEnterToChange
                    onChange={this.onChangeNumberOfProducts}
                />
            </PanelBody>
        ]
    }

    /**
     * Get category matches controls
     */
    getCategoryMatchesControls() {
        let categoryMatchesFields;

        const {attributes} = this.props;
        const {
            categoryMatchesItems,
        } = attributes;

        if (categoryMatchesItems.length) {
            categoryMatchesFields = categoryMatchesItems.map((location, index) => {
                return (
                    <>
                        <ProductCategorySelect {...this.props} index={index}/>

                        <ProductAddonsSelect {...this.props} index={index} label={__('Select Product Add-ons:')} />

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

            <PanelBody title={__('Category Matches')}>
                {categoryMatchesFields}
                <Button
                    isPrimary
                    onClick={this.handleAddCategoryMatches.bind(this)}
                >
                    {__('Add Category Match')}
                </Button>
            </PanelBody>

        ];
    }

    /**
     * Get Layout Controls
     *
     * @return {JSX.Element[]}
     */
    getLayoutControls() {
        const {attributes} = this.props;
        const {columns} = attributes;

        return [
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
            </PanelBody>
        ]
    }

    /**
     * Get Content Controls
     *
     * @return {JSX.Element[]}
     */
    getContentControls() {
        const {attributes} = this.props;

        const {
            hasProductTitle,
            hasProductPrice,
            hasProductRating,
            hasProductButton,
        } = attributes;

        return [
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
        ]
    }

    /**
     * Get Inspector Controls
     *
     * @return {JSX.Element}
     */
    getInspectorControls() {

        return (
            <InspectorControls>

                {this.getDefaultControls()}

                {this.getCategoryMatchesControls()}

                {this.getLayoutControls()}

                {this.getContentControls()}

            </InspectorControls>
        );
    }

    render() {
        const {loading, products} = this.state;
        const {className, attributes} = this.props;
        const {
            columns,
            headerTitle,
        } = attributes;

        const titleClasses = `${className}__title`;
        const productsClasses = `${className}__products ${className}__products-col-${columns}`;

        this.getProductCartAddons();

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

export default ProductCartAddons;
