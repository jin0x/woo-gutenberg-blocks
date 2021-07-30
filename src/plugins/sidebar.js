import { registerPlugin } from "@wordpress/plugins";
import { PluginSidebar, PluginSidebarMoreMenuItem } from "@wordpress/edit-post";
import { __ } from "@wordpress/i18n";
import { PanelBody, TextControl } from "@wordpress/components";
import { withSelect, withDispatch } from "@wordpress/data";
import { compose } from "@wordpress/compose";

let PluginMetaFields = props => {
    return (
        <>
            <PanelBody
                title={__("Meta Fields Panel", "woo-gutenberg-blocks")}
                icon="admin-post"
                intialOpen={true}
            >
                <TextControl
                    value={props.subtitle}
                    label={__("Post Subtitle", "woo-gutenberg-blocks")}
                    onChange={value => props.onSubtitleChange(value)}
                />
            </PanelBody>
        </>
    );
};

PluginMetaFields = compose([
    withSelect(select => {
        return {
            subtitle: select("core/editor").getEditedPostAttribute("meta")[
                "_woo_gutenberg_blocks_post_subtitle"
            ]
        };
    }),
    withDispatch(dispatch => {
        return {
            onSubtitleChange: subtitle => {
                dispatch("core/editor").editPost({
                    meta: { _woo_gutenberg_blocks_post_subtitle: subtitle }
                });
            }
        };
    })
])(PluginMetaFields);

registerPlugin("woo-gutenberg-blocks-sidebar", {
    icon: "smiley",
    render: () => {
        return (
            <>
                <PluginSidebarMoreMenuItem target="woo-gutenberg-blocks-sidebar">
                    {__("Meta Options", "woo-gutenberg-blocks")}
                </PluginSidebarMoreMenuItem>

                <PluginSidebar
                    name="woo-gutenberg-blocks-sidebar"
                    icon="admin-post"
                    title={__("Meta Options", "woo-gutenberg-blocks")}
                >
                    <PluginMetaFields />
                </PluginSidebar>
            </>
        );
    }
});
