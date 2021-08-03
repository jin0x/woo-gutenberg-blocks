import React from 'react';
import {decodeEntities} from "@wordpress/html-entities"
import {Rating} from "@woocommerce/components"
import './styles.scss'

export const Product = ({product, attributes}) => {

	const {
		hasProductRating,
		hasProductPrice,
		hasProductTitle
	} = attributes;

	return (
		<>
			<li className="wp-block-woo-gutenberg-blocks-product-cart-addons-product">
				{hasProductTitle && (
					<>
						<img
							src={product.featured_src}
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
						{hasProductPrice && <p>{product.price}</p>}
					</>
				)}
				{hasProductRating && (
					<Rating rating={5} totalStars={5}/>
				)}
			</li>
		</>
	);
}
;

export default Product;
