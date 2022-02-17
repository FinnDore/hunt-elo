import { PayloadAction } from '@reduxjs/toolkit';
import { extend, merge } from 'lodash';
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
    let newState = state;
    switch (action.type) {
        case StoreAction.APPEND_ELO:
            newState = {
                ...state,
                [action.payload.userId]: {
                    ...(state[action.payload.userId] ?? {}),
                    eloHistory: [
                        ...(state[action.payload.userId]?.eloHistory ?? []),
                        action.payload.elo,
                    ],
                },
            };
            console.log(newState);
            console.log(action.payload);
            break;

        case StoreAction.SET_USER_NAME:
            newState = {
                ...state,
                [action.payload.userId]: {
                    ...(state[action.payload.userId] ?? {}),
                    name: action.payload.userName,
                },
            };
    }
    return newState;
}
