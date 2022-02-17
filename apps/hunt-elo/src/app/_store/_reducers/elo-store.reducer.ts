import { PayloadAction } from '@reduxjs/toolkit';
import { merge } from 'lodash';
import { StoreAction } from '../../_enums/store-action';
import { EloStore } from '../../_interfaces/elo-store';
/**
 * Payload for appending an elo value ofr a given player
 */
export type appendEloReducerPayload = PayloadAction<
    {
        userId: number;
        elo: number;
    },
    StoreAction.APPEND_ELO
>;

export type eloStoreReducerPayload<T = unknown> =
    T extends StoreAction.APPEND_ELO
        ? appendEloReducerPayload
        : PayloadAction<unknown, StoreAction>;

const DEFAULT_STATE: EloStore = {};

/**
 * Sets the current theme mode
 *
 * @param state the current store state
 * @param action the action to execute
 * @returns {object} the updated state
 */
export function eloStoreReducer(
    state = DEFAULT_STATE,
    action: appendEloReducerPayload
) {
    if (action.type === StoreAction.APPEND_ELO) {
        return merge(state, {
            [action.payload.userId]: {
                eloHistory: [
                    ...(state[action.payload.userId].eloHistory ?? []),
                    action.payload.elo,
                ],
            },
        });
    }

    return state;
}
