import {Component} from "@wordpress/element";
import {withSelect} from "@wordpress/data";
import {__} from "@wordpress/i18n";
import {decodeEntities} from "@wordpress/html-entities";
import {RangeControl, PanelBody, ToggleControl} from "@wordpress/components";
import {Rating} from '@woocommerce/components';
import {InspectorControls} from "@wordpress/block-editor";

class ProductCartAddons extends Component {

	onChangeNumberOfProducts = numberOfProducts => {
		this.props.setAttributes({numberOfProducts});
	};

	onChangeNumberOfColumns = numberOfColumns => {
		this.props.setAttributes({numberOfColumns});
	};

	onChangeProductTitleVisibility = hasProductTitle => {
		this.props.setAttributes({hasProductTitle})
	}

	onChangeProductPriceVisibility = hasProductPrice => {
		this.props.setAttributes({hasProductPrice})
	}

	onChangeProductRatingVisibility = hasProductRating => {
		this.props.setAttributes({hasProductRating})
	}

	onChangeProductButtonVisibility = hasProductButton => {
		this.props.setAttributes({hasProductButton})
	}

	render() {
		const {products, className, attributes} = this.props;
		const {
			headerTitle,
			numberOfColumns,
			numberOfProducts,
			categoryAddons,
			productAddons,
			defaultAddons,
			hasProductTitle,
			hasProductPrice,
			hasProductRating,
			hasProductButton
		} = attributes;

		console.log(`Default addons: ${defaultAddons}, Category addons: ${categoryAddons}, Product addons: ${productAddons}`)
		console.log('Attributes: ', attributes);

		return (
			<>
				<InspectorControls>
					<PanelBody title={__("Product Cart add-ons Settings", "woo-gutenberg-blocks")}>
						<RangeControl
							label={__("Number of Posts", "woo-gutenberg-blocks")}
							value={numberOfProducts}
							onChange={this.onChangeNumberOfProducts}
							min={1}
							max={10}
						/>
						<RangeControl
							label={__("Columns", "woo-gutenberg-blocks")}
							value={numberOfColumns}
							onChange={this.onChangeNumberOfColumns}
							min={1}
							max={6}
						/>
					</PanelBody>
					<PanelBody
						title={__('Content', 'woo-gutenberg-block')}
						initialOpen
					>
						<ToggleControl
							label={__('Product title', 'woo-gutenberg-block')}
							help={
								hasProductTitle
									? __(
									'Product title is visible.',
									'woo-gutenberg-block'
									)
									: __(
									'Product title is hidden.',
									'woo-gutenberg-block'
									)
							}
							checked={hasProductTitle}
							onChange={this.onChangeProductTitleVisibility}
						/>
						<ToggleControl
							label={__('Product price', 'woo-gutenberg-block')}
							help={
								hasProductPrice
									? __(
									'Product price is visible.',
									'woo-gutenberg-block'
									)
									: __(
									'Product price is hidden.',
									'woo-gutenberg-block'
									)
							}
							checked={hasProductPrice}
							onChange={this.onChangeProductPriceVisibility}
						/>
						<ToggleControl
							label={__('Product rating', 'woo-gutenberg-block')}
							help={
								hasProductRating
									? __(
									'Product rating is visible.',
									'woo-gutenberg-block'
									)
									: __(
									'Product rating is hidden.',
									'woo-gutenberg-block'
									)
							}
							checked={hasProductRating}
							onChange={this.onChangeProductRatingVisibility}
						/>
						<ToggleControl
							label={__(
								'Add to Cart button',
								'woo-gutenberg-block'
							)}
							help={
								hasProductButton
									? __(
									'Add to Cart button is visible.',
									'woo-gutenberg-block'
									)
									: __(
									'Add to Cart button is hidden.',
									'woo-gutenberg-block'
									)
							}
							checked={hasProductButton}
							onChange={this.onChangeProductButtonVisibility}
						/>
					</PanelBody>
				</InspectorControls>
				{products && products.length > 0 ? (
					<>
						<h3>{headerTitle}</h3>
						<ul className={className}>
							{products.map(product => {

								console.log('Product ', product);

									return (
										<>
											{
												hasProductTitle && (
													<li key={product.id}>
														<a
															target="_blank"
															rel="noopener noreferrer"
															href={product.link}
														>
															{decodeEntities(product.title.rendered)}
														</a>
													</li>
												)
											}
											{hasProductRating && <Rating rating={5} totalStars={5}/>}
										</>
									)
								}
							)}
						</ul>
					</>
				) : (
					<div>
						{" "}
						{products
							? __("No Products Found", "woo-gutenberg-blocks")
							: __("Loading...", "woo-gutenberg-blocks")}{" "}
					</div>
				)}
			</>
		);
	}
}

export default withSelect((select, props) => {
	const {attributes} = props;
	const {numberOfProducts} = attributes;
	let query = {per_page: numberOfProducts};
	return {
		products: select("core").getEntityRecords("postType", "product", query),
	};
})(ProductCartAddons);
