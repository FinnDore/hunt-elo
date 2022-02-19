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
    /**
     * Sets the selected user id
     */
    SET_USER_ID = 'SET_USER_ID',

    /** elo store */

    /**
     * Appends an elo value for a given player
     */
    APPEND_ELO = 'APPEND_ELO',
    /**
     * Sets the users username given their id
     */
    SET_USER_NAME = 'SET_USER_NAME',
}
