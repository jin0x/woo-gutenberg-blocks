import {Component} from "@wordpress/element";
import {withSelect} from "@wordpress/data";
import {__} from "@wordpress/i18n";
import {decodeEntities} from "@wordpress/html-entities";
import {RangeControl, PanelBody} from "@wordpress/components";
import {InspectorControls} from "@wordpress/block-editor";

class ProductCartAddons extends Component {

	onChangeNumberOfProducts = numberOfProducts => {
		this.props.setAttributes({numberOfProducts});
	};

	onChangeNumberOfColumns = numberOfColumns => {
		this.props.setAttributes({numberOfColumns});
	};

	onChangeCategories = categories => {
		this.props.setAttributes({postCategories: categories.join(",")});
	};

	render() {
		const {products, className, attributes} = this.props;
		const {
			headerTitle,
			numberOfColumns,
			numberOfProducts,
			categoryAddons,
			productAddons,
			defaultAddons
		} = attributes;

		// console.log('ClassName: ', className);
		// console.log('Attributes: ', attributes);

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
				</InspectorControls>
				{products && products.length > 0 ? (
					<>
						<h3>{headerTitle}</h3>
						<ul className={className}>
							{products.map(product => (
								<li key={product.id}>
									<a
										target="_blank"
										rel="noopener noreferrer"
										href={product.link}
									>
										{decodeEntities(product.title.rendered)}
									</a>
								</li>
							))}
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
