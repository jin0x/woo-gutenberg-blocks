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
import LayoutOptions from "../../editor-panels/layout-options";
import DefaultOptions from "../../editor-panels/default-options";
import CategoryMatchesPanel from "../../editor-panels/category-matches-panel";
import ProductMatchesPanel from "../../editor-panels/product-matches-panel";
import {Product} from "../../components/Product/";
import withProductCartAddons from "../../hocs/with-product-card-addons"

class ProductCartAddons extends Component {

    render() {
        const {className, attributes, products, isLoading} = this.props;
        const {
            columns,
        } = attributes;
        const productsClasses = `${className}__products ${className}__products-col-${columns}`;

        if (isLoading) {
            return <div>Loading Products...</div>
        }

        return (
            <>
                <InspectorControls>

                    <DefaultOptions {...this.props} />

                    <CategoryMatchesPanel {...this.props} />

                    <ProductMatchesPanel {...this.props} />

                    <LayoutOptions {...this.props} />

                </InspectorControls>

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

export default withProductCartAddons(ProductCartAddons);
