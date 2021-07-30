import edit from "./edit";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

registerBlockType("woo-gutenberg-blocks/latest-posts", {
    title: __("Latest Posts", "woo-gutenberg-blocks"),
    description: __("Block showing the latest posts.", "woo-gutenberg-blocks"),
    icon: "admin-post",
    category: "woo-gutenberg-category",
    edit: edit,
    save() {
        return null;
    }
});
