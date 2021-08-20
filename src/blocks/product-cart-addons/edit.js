import "./style.editor.scss";
/**
 * External Dependencies
 */
import {Component} from "@wordpress/element";
import {__} from "@wordpress/i18n";
import {InspectorControls} from "@wordpress/block-editor";

/**
 * Internal Dependencies
 */
import CategoryMatchesPanel from "../../editor-panels/category-matches-panel";
import ProductMatchesPanel from "../../editor-panels/product-matches-panel";
import DefaultOptions from "../../editor-panels/default-options";
import LayoutOptions from "../../editor-panels/layout-options";
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
     * Get Inspector Controls
     *
     * @return {JSX.Element}
     */
    getInspectorControls() {

        return (
            <InspectorControls>

                <DefaultOptions {...this.props} />

                <CategoryMatchesPanel {...this.props} />

                <ProductMatchesPanel {...this.props} />

                <LayoutOptions {...this.props} />

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

        console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
        console.log('Attributes::: ', attributes);
        console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');

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
