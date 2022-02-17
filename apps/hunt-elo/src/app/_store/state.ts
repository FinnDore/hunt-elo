import { EloStore } from '../_interfaces/elo-store';
import { Settings } from '../_interfaces/settings.model';

/**
 * The sate for the global store
 */
export interface State {
    /**
     * {@property}a collection of elo history's
     */
    eloStore: EloStore;
    /**
     * {@property} the current tree map settings
     */
    settings: Settings;
}
