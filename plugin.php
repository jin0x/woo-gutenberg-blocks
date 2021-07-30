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

	woo_gutenberg_blocks_register_block_type( 'team-member' );
	woo_gutenberg_blocks_register_block_type( 'team-members' );
	woo_gutenberg_blocks_register_block_type(
		'latest-posts',
		array(
			'render_callback' => 'woo_gutenberg_blocks_render_latest_posts_block',
			'attributes'      => array(
				'numberOfPosts'  => array(
					'type'    => 'number',
					'default' => 5
				),
				'postCategories' => array(
					'type' => 'string',
				)
			)
		)
	);
	woo_gutenberg_blocks_register_block_type(
		'product-cart-addons',
		array(
			'render_callback' => 'woo_gutenberg_blocks_render_products_block',
			'attributes'      => array(
				'headerTitle'     => array(
					'type'    => 'string',
					'default' => get_option( 'sfn_cart_addons' ) && get_option( 'sfn_cart_addons' )['header_title']
					                                                !== null ? get_option( 'sfn_cart_addons' )['header_title'] : __( 'Product Cart add-ons',
						'woo-gutenberg-blocks' )
				),
				'defaultAddons'   => array(
					'type'    => 'array',
					'default' => get_option( 'sfn_cart_addons' ) && get_option( 'sfn_cart_addons' )['default_addons'] !== null ? get_option( 'sfn_cart_addons' )['default_addons'] : []
				),
				'categoryAddons'  => array(
					'type'    => 'array',
					'default' => get_option( 'sfn_cart_addons_categories',
						array() ) !== null ? get_option( 'sfn_cart_addons_categories', array() ) : []
				),
				'productAddons'   => array(
					'type'    => 'array',
					'default' => get_option( 'sfn_cart_addons_products',
						array() ) !== null ? get_option( 'sfn_cart_addons_products', array() ) : []
				),
				'numberOfColumns' => array(
					'type'    => 'number',
					'default' => 3
				),
				'numberOfProducts'   => array(
					'type'    => 'number',
					'default' => get_option( 'sfn_cart_addons' ) && get_option( 'sfn_cart_addons' )['upsell_number'] !== null ? get_option( 'sfn_cart_addons' )['upsell_number'] : 5
				)
			)
		)
	);
	woo_gutenberg_blocks_register_block_type( 'redux' );
	woo_gutenberg_blocks_register_block_type( 'todo-list' );
	woo_gutenberg_blocks_register_block_type( 'todo-list-count' );
}

add_action( 'init', 'woo_gutenberg_blocks_register' );


/**
 * Render Latest Posts Block
 *
 * @param $attributes
 *
 * @return string
 */
function woo_gutenberg_blocks_render_latest_posts_block( $attributes ) {

	$args = array(
		'posts_per_page' => $attributes['numberOfPosts']
	);

	if ( $attributes['postCategories'] ) {
		$args['cat'] = $attributes['postCategories'];
	}

	$query = new WP_Query( $args );
	$posts = '';

	if ( $query->have_posts() ) {
		$posts .= '<ul class="wp-block-woo-gutenberg-blocks-latest-posts">';
		while ( $query->have_posts() ) {
			$query->the_post();
			$posts .= '<li><a href="' . esc_url( get_the_permalink() ) . '">'
			          . get_the_title() . '</a></li>';
		}
		$posts .= '</ul>';
		wp_reset_postdata();

		return $posts;
	}

	return '<div>' . __( 'No Posts Found', "woo-gutenberg-blocks" ) . '</div>';
}

/**
 * Render Product Block
 *
 * @param $attributes
 *
 * @return string
 */
function woo_gutenberg_blocks_render_products_block( $attributes ) {

	$products = '';

	$args = array(
		'posts_per_page' => $attributes['numberOfPosts']
	);

	$query = new WP_Query( $args );

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
