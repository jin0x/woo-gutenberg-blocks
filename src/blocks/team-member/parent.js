import { registerBlockType, createBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { InnerBlocks, InspectorControls } from "@wordpress/block-editor";
import { RangeControl } from "@wordpress/components";

const attributes = {
    columns: {
        type: "number",
        default: 2
    }
};

registerBlockType("woo-gutenberg-blocks/team-members", {
    title: __("Team Members", "woo-gutenberg-blocks"),

    description: __("Block showing a Team Members.", "woo-gutenberg-blocks"),

    icon: "grid-view",

    category: "woo-gutenberg-category",

    supports: {
        html: false,
        align: ["wide", "full"]
    },

    transforms: {
        from: [
            {
                type: "block",
                blocks: ["core/gallery"],
                transform: ({ columns, images }) => {
                    let inner = images.map(({ alt, id, url }) =>
                        createBlock("woo-gutenberg-blocks/team-member", {
                            alt,
                            id,
                            url
                        })
                    );
                    return createBlock(
                        "woo-gutenberg-blocks/team-members",
                        {
                            columns: columns
                        },
                        inner
                    );
                }
            },
            {
                type: "block",
                blocks: ["core/image"],
                isMultiBlock: true,
                transform: attributes => {
                    let inner = attributes.map(({ alt, id, url }) =>
                        createBlock("woo-gutenberg-blocks/team-member", {
                            alt,
                            id,
                            url
                        })
                    );
                    return createBlock(
                        "woo-gutenberg-blocks/team-members",
                        {
                            columns: 3
                        },
                        inner
                    );
                }
            }
        ]
    },

    keywords: [
        __("team", "woo-gutenberg-blocks"),
        __("member", "woo-gutenberg-blocks"),
        __("person", "woo-gutenberg-blocks")
    ],

    attributes,

    edit({ className, attributes, setAttributes }) {
        const { columns } = attributes;
        return (
            <div className={`${className} has-${columns}-columns`}>
                <InspectorControls>
                    <panelBody>
                        <RangeControl
                            label={__("column", "woo-gutenberg-blocks")}
                            value={columns}
                            onChange={columns => setAttributes({ columns })}
                            min={1}
                            max={6}
                        />
                    </panelBody>
                </InspectorControls>
                <InnerBlocks
                    allowedBlocks={["woo-gutenberg-blocks/team-member"]}
                    template={[
                        ["woo-gutenberg-blocks/team-member"],
                        ["woo-gutenberg-blocks/team-member"]
                    ]}
                />
            </div>
        );
    },

    save({ attributes }) {
        const { columns } = attributes;
        return (
            <div className={`has-${columns}-columns`}>
                <InnerBlocks.Content />
            </div>
        );
    }
});
