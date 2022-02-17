/**
 * A collection of elo history's
 */
export interface EloStore {
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
}
