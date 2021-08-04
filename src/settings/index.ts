/**
 * External dependencies
 */
import { getSetting} from '@woocommerce/shared-settings';

export type WordCountType =
    | 'words'
    | 'characters_excluding_spaces'
    | 'characters_including_spaces';

interface WcBlocksConfig {
    buildPhase: number;
    pluginUrl: string;
    productCount: number;
    restApiRoutes: Record< string, string[] >;
    wordCountType: WordCountType;
}

export const blocksConfig = getSetting( 'wcBlocksConfig', {
    buildPhase: 1,
    pluginUrl: '',
    productCount: 0,
    restApiRoutes: {},
    wordCountType: 'words',
} ) as WcBlocksConfig;
