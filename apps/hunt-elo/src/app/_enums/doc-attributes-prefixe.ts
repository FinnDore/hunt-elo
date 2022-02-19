/**
 * Prefixes that can be used to identify attribute types from the attributes document
 */
export enum DocAttributesPrefixOrSuffix {
    /** PREFIXES */

    /**
     * Prefix for every item we want form the document
     */
    GLOBAL_PREFIX = 'MissionBagPlayer',

    /** SUFFIXES */

    /**
     * Prefix for a players name
     */
    PLAYER_NAME_SUFFIX = 'blood_line_name',

    /**
     * Prefix for a players mmr
     */
    MMR_SUFFIX = 'mmr',

    /**
     * Prefix for a players id
     */
    PROFILE_ID = 'profileid',
}
