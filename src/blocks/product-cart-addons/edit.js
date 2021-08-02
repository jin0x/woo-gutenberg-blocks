import {Component} from "@wordpress/element";
import {withSelect} from "@wordpress/data";
import {__} from "@wordpress/i18n";
import {decodeEntities} from "@wordpress/html-entities";
import {RangeControl, PanelBody, ToggleControl} from "@wordpress/components";
import {
	Rating
} from '@woocommerce/components';
import {InspectorControls} from "@wordpress/block-editor";

class ProductCartAddons extends Component {

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

	getInspectorControls() {

		const {attributes} = this.props;
		const {
			numberOfProducts,
			columns,
			rows,
			hasProductTitle,
			hasProductPrice,
			hasProductRating,
			hasProductButton
		} = attributes;

		console.log('Attributes', attributes);

		return (
			<>
				<PanelBody title={__("Product Options", "woo-gutenberg-blocks")} initialOpen>
					<RangeControl
						label={__("Number of Posts", "woo-gutenberg-blocks")}
						value={numberOfProducts}
						onChange={this.onChangeNumberOfProducts}
						min={1}
						max={10}
					/>
				</PanelBody>
				<PanelBody title={__("Layout Options", "woo-gutenberg-blocks")} initialOpen>
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
				<PanelBody title={__('Content Options', 'woo-gutenberg-block')} initialOpen>
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
			</>
		)

	}

	render() {
		const {products, className, attributes} = this.props;
		const {
			headerTitle,
			columns,
			rows,
			numberOfProducts,
			categoryAddons,
			productAddons,
			defaultAddons,
			hasProductTitle,
			hasProductPrice,
			hasProductRating,
			hasProductButton
		} = attributes;

		// console.log(`Default addons: ${defaultAddons}, Category addons: ${categoryAddons}, Product addons: ${productAddons}`)
		// console.log('Attributes: ', attributes);

		return (
			<>
				<InspectorControls>
					{this.getInspectorControls()}
				</InspectorControls>
				{products && products.length > 0 ? (
					<>
						<h3>{headerTitle}</h3>
						<ul className={className}>
							{products.map(product => {

									// console.log('Product ', product);

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
