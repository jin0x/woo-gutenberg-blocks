/**
 * External dependencies
 */
import {Component} from '@wordpress/element';
import {createHigherOrderComponent} from '@wordpress/compose';
import {getProducts} from '../utils';

/**
 * Internal dependencies
 */
import {formatError} from '../utils/errors.js';

/**
 * HOC that queries categories for a component.
 *
 * @param {Function} OriginalComponent Component being wrapped.
 */
const withProducts = createHigherOrderComponent((OriginalComponent) => {
	return class WrappedComponent extends Component {
		constructor() {
			super(...arguments);
			this.state = {
				error: null,
				loading: false,
				products: [],
			};
			this.loadProducts = this.loadProducts.bind(this);
		}

		componentDidMount() {
			this.loadProducts();
		}

		loadProducts() {
			this.setState({loading: true});

			getProducts()
				.then((data) => {
					this.setState({
						products: data,
						loading: false,
						error: null,
					});
				})
				.catch(async (e) => {
					const error = await formatError(e);

					this.setState({
						products: [],
						loading: false,
						error,
					});
				});
		}

		render() {
			const {error, loading, products} = this.state;

			return (
				<OriginalComponent
					{...this.props}
					error={error}
					isLoading={loading}
					products={products}
				/>
			);
		}
	};
}, 'withProducts');

export default withProducts;
