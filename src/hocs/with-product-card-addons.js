/**
 * External dependencies
 */
import {Component} from '@wordpress/element';
import {createHigherOrderComponent} from '@wordpress/compose';
import {getCartOptions} from '../utils';

/**
 * Internal dependencies
 */
import {formatError} from '../utils/errors.js';

/**
 * HOC that queries categories for a component.
 *
 * @param {Function} OriginalComponent Component being wrapped.
 */
const withProductCartAddons = createHigherOrderComponent((OriginalComponent) => {
    return class WrappedComponent extends Component {
        constructor() {
            super(...arguments);
            this.state = {
                error: null,
                loading: false,
                productsAddons: [],
            };
            this.loadProductCartAddons = this.loadProductCartAddons.bind(this);
        }

        componentDidMount() {
            this.loadProductCartAddons();
        }

        loadProductCartAddons() {
            this.setState({loading: true});

           getCartOptions()
                .then((data) => {
                    this.setState({
                        productsAddons: data.extensions.add_ons.products,
                        loading: false,
                        error: null,
                    });
                })
                .catch(async (e) => {
                    const error = await formatError(e);

                    this.setState({
                        productsAddons: [],
                        loading: false,
                        error,
                    });
                });
        }

        render() {
            const {error, loading, productsAddons} = this.state;

            return (
                <OriginalComponent
                    {...this.props}
                    error={error}
                    isLoading={loading}
                    productsAddons={productsAddons}
                />
            );
        }
    };
}, 'withProductCartAddons');

export default withProductCartAddons;
