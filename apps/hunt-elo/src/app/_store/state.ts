import { Settings } from '../_interfaces/settings.model';

/**
 * The sate for the global store
 */
export interface State {
    /**
     * {@property} The a collection of elo history's
     */
    eloStore: {
        [key: number]: {
            /**
             * {@property} the username for the user
             */
            name: string;
            /**
             * {@property} the users elo history
             */
            eloHistory: number[];
        };
    };
    /**
     * {@property} the current tree map settings
     */
    settings: Settings;
}
