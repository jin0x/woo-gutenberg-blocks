import React from 'react';
import {decodeEntities} from "@wordpress/html-entities"
import {Rating} from "@woocommerce/components"
import './styles.scss'

export const Product = ({product}) => {

        return (
            <>
                <li className="wp-block-woo-gutenberg-blocks-product-cart-addons-product">
                    <img
                        src={product?.featured_src}
                        alt={decodeEntities(
                            product.title
                        )}
                    />
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={product.permalink}
                    >
                        {decodeEntities(
                            product.title
                        )}
                    </a>
                    <p>{product.price}</p>
                    <Rating rating={4} totalStars={5}/>
                </li>
            </>
        );
    }
;

export default Product;
