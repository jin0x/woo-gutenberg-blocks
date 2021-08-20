/**
 * External dependencies
 */
import {addQueryArgs} from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import {flatten, uniqBy} from 'lodash';


/**
 * Get product query requests for the Store API.
 *
 * @param {Object} request A query object with the list of selected products and search term.
 * @param {Array} request.selected Currently selected products.
 * @param {string} request.search Search string.
 * @param {Array} request.queryArgs Query args to pass in.
 */
const getProductsRequests = ({
                                 selected = [],
                                 search = '',
                                 queryArgs = [],
                             }) => {
    const isLargeCatalog = false;
    const defaultArgs = {
        per_page: isLargeCatalog ? 100 : 0,
        catalog_visibility: 'any',
        search,
        orderby: 'title',
        order: 'asc',
    };
    const requests = [
        addQueryArgs('/wc/store/products', {...defaultArgs, ...queryArgs}),
    ];

    // If we have a large catalog, we might not get all selected products in the first page.
    if (isLargeCatalog && selected.length) {
        requests.push(
            addQueryArgs('/wc/store/products', {
                catalog_visibility: 'any',
                include: selected,
            })
        );
    }

    return requests;
};

/**
 * Get a promise that resolves to a list of products from the Store API.
 *
 * @param {Object} request A query object with the list of selected products and search term.
 * @param {Array} request.selected Currently selected products.
 * @param {string} request.search Search string.
 * @param {Array} request.queryArgs Query args to pass in.
 */
export const getProducts = ({
                                selected = [],
                                search = '',
                                queryArgs = [],
                            }) => {
    const requests = getProductsRequests({selected, search, queryArgs});

    return Promise.all(requests.map((path) => apiFetch({path})))
        .then((data) => {
            const products = uniqBy(flatten(data), 'id');

            return products.map((product) => ({
                ...product,
                parent: 0,
            }));

        })
        .catch((e) => {
            throw e;
        });
};

/**
 * Get a promise that resolves to a product object from the Store API.
 *
 * @param {number} productId Id of the product to retrieve.
 */
export const getProduct = (productId) => {
    return apiFetch({
        path: `/wc/store/products/${productId}`,
    });
};

/**
 * Get a promise that resolves to a list of category objects from the Store API.
 *
 * @param {Object} queryArgs Query args to pass in.
 */
export const getCategories = (queryArgs) => {
    return apiFetch({
        path: addQueryArgs(`wc/store/products/categories`, {
            per_page: 0,
            ...queryArgs,
        }),
    });
};

/**
 * Get a promise that resolves to a category object from the API.
 *
 * @param {number} categoryId Id of the product to retrieve.
 */
export const getCategory = (categoryId) => {
    return apiFetch({
        path: `wc/store/products/categories/${categoryId}`,
    });
};

/**
 * Get a promise that resolves to cart object from the API.
 *
 */
export const getCartOptions = () => {
    return wp.apiFetch({
        path: 'wc/store/cart',
    });
};

/**
 * Get random int
 *
 * @param min
 * @param max
 * @return {number}
 */
export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

/**
 * Move an item from one index to another in an array.
 *
 * @param  {Array}   arr  The array to move the item in
 * @param  {Integer} from The starting index of the item
 * @param  {Integer} to   The new index for the item
 */
export const moveInArray = (arr, from, to) => {

    // Make sure a valid array is provided
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
        throw new Error('Please provide a valid array');
    }

    // Delete the item from it's current position
    const item = arr.splice(from, 1);

    // Make sure there's an item to move
    if (!item.length) {
        throw new Error('There is no item in the array at index ' + from);
    }

    // Move the item to its new position
    arr.splice(to, 0, item[0]);

};
