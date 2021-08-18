import "./style.editor.scss";
/**
 * External Dependencies
 */
import {Component} from "@wordpress/element";
import {__} from "@wordpress/i18n";
import {
    PanelBody,
    RangeControl,
} from "@wordpress/components";
import {InspectorControls} from "@wordpress/block-editor";

/**
 * Internal Dependencies
 */
import ProductAddonsSelect from "../../editor-components/product-addons-select"
import CategoryMatchesPanel from "../../editor-panels/category-matches-panel";
import ProductMatchesPanel from "../../editor-panels/product-matches-panel";
import {Product} from "../../components/Product/";

class ProductCartAddons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true
        };
    }


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
            numberOfProducts,
        } = attributes;

        return (
            <PanelBody
                title={__("Default Options", "woo-gutenberg-blocks")}
                initialOpen
            >

                <ProductAddonsSelect {...this.props} label={__('Select product default addons:')}/>

                <RangeControl
                    label={__("Number of Products", "woo-gutenberg-blocks")}
                    value={numberOfProducts}
                    onChange={(products) => this.props.setAttributes({numberOfProducts: products})}
                    min={1}
                    max={10}
                />

            </PanelBody>
        )
    }

    /**
     * Get Layout Controls
     *
     * @return {JSX.Element[]}
     */
    getLayoutControls() {
        const {attributes} = this.props;
        const {columns} = attributes;

        return (
            <PanelBody
                title={__("Layout Options", "woo-gutenberg-blocks")}
                initialOpen
            >
                <RangeControl
                    label={__("Columns", "woo-gutenberg-blocks")}
                    value={columns}
                    onChange={(columns) => this.props.setAttributes({columns})}
                    min={1}
                    max={6}
                />
            </PanelBody>
        )
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

                <CategoryMatchesPanel {...this.props} />

                {/*<ProductMatchesPanel {...this.props} />*/}

                {this.getLayoutControls()}

            </InspectorControls>
        );
    }

    render() {
        const {loading, products} = this.state;
        const {className, attributes} = this.props;
        const {
            columns,
        } = attributes;

        const productsClasses = `${className}__products ${className}__products-col-${columns}`;

        this.getProductCartAddons();

        if (loading) {
            return <div>Loading Products...</div>
        }

        // console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
        // console.log('Attributes::: ', attributes);
        // console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');

        return (
            <>
                {this.getInspectorControls()}
                {products && products.length > 0 ? (
                    <div className={className}>
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
