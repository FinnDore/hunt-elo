import { PayloadAction } from '@reduxjs/toolkit';
import { StoreAction } from '../../_enums/store-action';
import { EloStore } from '../../_interfaces/elo-store.model';
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

/**
 * Payload for settings the users username
 */
export type setUserNameReducerPayload = PayloadAction<
    {
        userId: number;
        userName: string;
    },
    StoreAction.SET_USER_NAME
>;

export type eloStoreReducerPayload<T = unknown> =
    T extends StoreAction.APPEND_ELO
        ? appendEloReducerPayload
        : T extends StoreAction.SET_USER_NAME
        ? setUserNameReducerPayload
        : PayloadAction<unknown, StoreAction>;

const DEFAULT_STATE: EloStore = {};

/**
 * Updates the elo store
 *
 * @param state the current store state
 * @param action the action to execute
 * @returns {object} the updated state
 */
export function eloStoreReducer(
    state = DEFAULT_STATE,
    action: appendEloReducerPayload | setUserNameReducerPayload
): EloStore {
    if (action.type === StoreAction.APPEND_ELO) {
        const eloHistory = state[action.payload.userId]?.eloHistory;
        if (eloHistory?.[eloHistory.length - 1] === action.payload.elo) {
            return state;
        }

        return {
            ...state,
            [action.payload.userId]: {
                ...(state[action.payload.userId] ?? {}),
                eloHistory: [
                    ...(state[action.payload.userId]?.eloHistory ?? []),
                    action.payload.elo,
                ],
            },
        };
    } else if (action.type === StoreAction.SET_USER_NAME) {
        return {
            ...state,
            [action.payload.userId]: {
                ...(state[action.payload.userId] ?? {}),
                name: action.payload.userName,
            },
        };
    }

    return state;
}
