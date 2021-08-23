/**
 * External dependencies
 */
import {addQueryArgs} from '@wordpress/url';

/**
 * Get a promise that resolves to a product object from the Store API.
 *
 */
export const getProducts = () => {
    return wp.apiFetch({
        path: `/wc/store/products/`,
    });
};

/**
 * Get a promise that resolves to a product object from the Store API.
 *
 * @param {number} productId Id of the product to retrieve.
 */
export const getProduct = (productId) => {
    return wp.apiFetch({
        path: `/wc/store/products/${productId}`,
    });
};

/**
 * Get a promise that resolves to a list of category objects from the Store API.
 *
 * @param {Object} queryArgs Query args to pass in.
 */
export const getCategories = (queryArgs) => {
    return wp.apiFetch({
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
    return wp.apiFetch({
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
