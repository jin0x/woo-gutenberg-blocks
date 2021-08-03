import "./style.editor.scss";
import {Component} from "@wordpress/element";
import {
	withSelect
	// useSelect,
} from "@wordpress/data";
import {__} from "@wordpress/i18n";
import {RangeControl, PanelBody, ToggleControl} from "@wordpress/components";
import {InspectorControls} from "@wordpress/block-editor";

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

	getLatestPosts() {
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


		this.getLatestPosts();

		// console.log('WP:: ', wp);
		// console.log('Attributes: ', attributes);

		if(loading) {
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
