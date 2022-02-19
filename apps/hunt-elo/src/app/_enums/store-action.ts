/**
 * Actions for the global store
 */
export enum StoreAction {
    /** settings */
    /**
     * Sets dark or light mode
     */
    SET_THEME_MODE = 'SET_THEME_MODE',
    /**
     * Sets the current path
     */
    SET_PATH = 'SET_PATH',
    /**
     * Sets the current overlay
     */
    SET_ACTIVE_OVERLAY = 'SET_ACTIVE_OVERLAY',

    /** elo store */

    /**
     * Appends an elo value for a given player
     */
    APPEND_ELO = 'APPEND_ELO',
    /**
     * Appends an elo value for a given player
     */
    SET_USER_NAME = 'SET_USER_NAME',
}
