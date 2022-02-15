import { to } from '@hunt-elo/utils';
import { dialog } from '@tauri-apps/api';

/**
 * Opens a dialog for a user and allows them to select a path
 * @returns {string} a path chosen by a user
 */
export async function getPath(): Promise<[string, null] | [null, Error]> {
    const [path, error] = await to(
        dialog.open({
            directory: false,
        })
    );

    if (error || !path) {
        return [
            null,
            error !== null ? error : new Error('Failed to select a path'),
        ];
    }

    return [typeof path === 'string' ? path : path[0], null];
}
