import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";

let TodoCount = props => {
    return (
        <div>
            <p>Total: {props.total}</p>
            <p>To Do: {props.todo}</p>
            <p>Done: {props.done}</p>
        </div>
    );
};

TodoCount = withSelect(select => {
    return {
        total: select("woo-gutenberg-blocks/todo").getToDosNumber(),
        todo: select("woo-gutenberg-blocks/todo").getUnDoneToDosNumber(),
        done: select("woo-gutenberg-blocks/todo").getDoneToDosNumber()
    };
})(TodoCount);

registerBlockType("woo-gutenberg-blocks/todo-list-count", {
    title: __("Redux Todo Count", "woo-gutenberg-blocks"),

    description: __("Redux Todo Count", "woo-gutenberg-blocks"),

    icon: "editor-ul",

    category: "woo-gutenberg-category",

    edit() {
        return <TodoCount />;
    },

    save() {}
});
