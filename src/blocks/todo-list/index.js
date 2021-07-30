import edit from "./edit";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import "./ToDoInfo";

registerBlockType("woo-gutenberg-blocks/todo-list", {
    title: __(" Redux Todo List ", "woo-gutenberg-blocks"),
    description: __("A todo list.", "woo-gutenberg-blocks"),
    icon: "editor-ul",
    category: "woo-gutenberg-category",
    edit,
    save() {
        return null;
    }
});
