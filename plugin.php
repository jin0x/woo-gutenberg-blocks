<?php
/* 
* Plugin Name: Woo Gutenberg Blocks
* Plugin URI:
* Description: Custom Blocks for WooCommerce.
* Author: John Leskas
* Author URI https://rsh.studio
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Block Categories
 *
 * @param $categories
 * @param $post
 *
 * @return array
 */
function woo_gutenberg_blocks_categories( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'woo-gutenberg-category',
				'title' => __( 'Woo Gutenberg Blocks', 'woo-gutenberg-blocks' ),
				'icon'  => 'wordpress'
			)
		)
	);
}

add_filter( 'block_categories', 'woo_gutenberg_blocks_categories', 10, 2 );

/**
 * Register Block Types
 *
 * @param       $block
 * @param array $options
 */
function woo_gutenberg_blocks_register_block_type( $block, array $options = array() ) {
	register_block_type(
		'woo-gutenberg-blocks/' . $block,
		array_merge(
			array(
				'editor_script' => 'woo-gutenberg-blocks-editor-script',
				'editor_style'  => 'woo-gutenberg-blocks-editor-style',
				'script'        => 'woo-gutenberg-blocks-script',
				'style'         => 'woo-gutenberg-blocks-style'
			),
			$options
		)

	);
}

/**
 * Enqueue Editor Blocks
 */
function woo_gutenberg_blocks_enqueue_assets() {
	wp_enqueue_script(
		'woo-gutenberg-blocks-editor-js',
		plugins_url( 'dist/editor_script.js', __FILE__ ),
		array( 'wp-data', 'wp-plugins', 'wp-edit-post', 'wp-i18n', 'wp-components', 'wp-data', 'wp-compose' )
	);
}

add_action( 'enqueue_block_editor_assets', 'woo_gutenberg_blocks_enqueue_assets' );


/**
 * Register Block
 */
function woo_gutenberg_blocks_register() {

	wp_register_script(
		'woo-gutenberg-blocks-editor-script',
		plugins_url( 'dist/editor.js', __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-editor',
			'wp-components',
			'lodash',
			'wp-blob',
			'wp-data',
			'wp-html-entities',
			'wp-compose',
			'wp-block-editor'
		)
	);

	wp_register_script(
		'woo-gutenberg-blocks-script',
		plugins_url( 'dist/script.js', __FILE__ ),
		array( 'jquery' )
	);

	wp_register_style(
		'woo-gutenberg-blocks-editor-style',
		plugins_url( 'dist/editor.css', __FILE__ ),
		array( 'wp-edit-blocks' )
	);

	wp_register_style(
		'woo-gutenberg-blocks-style',
		plugins_url( 'dist/style.css', __FILE__ )
	);

	woo_gutenberg_blocks_register_block_type(
		'product-cart-addons',
		array(
			'render_callback' => 'woo_gutenberg_blocks_render_products_block',
			'attributes'      => array(
				'headerTitle'      => array(
					'type'    => 'string',
					'default' => get_option( 'sfn_cart_addons' ) && get_option( 'sfn_cart_addons' )['header_title']
					                                                !== null ? get_option( 'sfn_cart_addons' )['header_title'] : __( 'Product Cart add-ons',
						'woo-gutenberg-blocks' )
				),
				'defaultAddons'    => array(
					'type'    => 'array',
					'default' => get_option( 'sfn_cart_addons' ) && get_option( 'sfn_cart_addons' )['default_addons'] !== null ? get_option( 'sfn_cart_addons' )['default_addons'] : []
				),
				'categoryAddons'   => array(
					'type'    => 'array',
					'default' => get_option( 'sfn_cart_addons_categories',
						array() ) !== null ? get_option( 'sfn_cart_addons_categories', array() ) : []
				),
				'productAddons'    => array(
					'type'    => 'array',
					'default' => get_option( 'sfn_cart_addons_products',
						array() ) !== null ? get_option( 'sfn_cart_addons_products', array() ) : []
				),
				'columns'  => array(
					'type'    => 'number',
					'default' => 3
				),
				'rows'  => array(
					'type'    => 'number',
					'default' => 3
				),
				'numberOfProducts' => array(
					'type'    => 'number',
					'default' => get_option( 'sfn_cart_addons' ) && get_option( 'sfn_cart_addons' )['upsell_number'] !== null ? get_option( 'sfn_cart_addons' )['upsell_number'] : 5
				),
				'hasProductTitle'  => array(
					'type'    => 'boolean',
					'default' => true
				),
				'hasProductPrice'  => array(
					'type'    => 'boolean',
					'default' => true
				),
				'hasProductRating' => array(
					'type'    => 'boolean',
					'default' => true
				),
				'hasProductButton' => array(
					'type'    => 'boolean',
					'default' => true
				),
			)
		)
	);

}

add_action( 'init', 'woo_gutenberg_blocks_register' );


/**
 * Render Product Block
 *
 * @param $attributes
 *
 * @return string
 */
function woo_gutenberg_blocks_render_products_block( $attributes ) {

	$products     = '';
	$header_title = $attributes['header_title'];

	$args = array(
		'post_type'      => 'product',
		'posts_per_page' => $attributes['numberOfProducts']
	);

	$query = new WP_Query( $args );

	if ( $header_title ) {
		$products .= '<h3 class="wp-block-woo-gutenberg-blocks-product-cart-addons__title">' . $header_title . '</h3>';
	}

	if ( $query->have_posts() ) {
		$products .= '<ul class="wp-block-woo-gutenberg-blocks-product-cart-addons">';

		while ( $query->have_posts() ) {
			$query->the_post();
			$products .= '<li><a href="' . esc_url( get_the_permalink() ) . '">'
			             . get_the_title() . '</a></li>';
		}

		$products .= '</ul>';

		wp_reset_postdata();

		return $products;
	}

	return '<div>' . __( 'No Products Found', "woo-gutenberg-blocks" ) . '</div>';
}
