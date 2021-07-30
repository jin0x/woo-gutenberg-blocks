import edit from "./edit";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

registerBlockType("woo-gutenberg-blocks/product-cart-addons", {
    title: __("Product Cart add-ons", "woo-gutenberg-blocks"),
    description: __("Block showing the product cart add-ons.", "woo-gutenberg-blocks"),
    icon: "admin-post",
    category: "woo-gutenberg-category",
    edit: edit,
    save() {
        return null;
    }
});
