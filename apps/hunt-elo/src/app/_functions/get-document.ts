import { to } from '@hunt-elo/utils';
import { readTextFile } from '@tauri-apps/api/fs';

/**
 * Returns attributes file as a list of player PlayerAttrs
 *
 * @param path the path to the attributes.xml file
 * @returns {object} the elo and id for the given user
 */
export async function getDocument(path: string): Promise<Document | null> {
    const [file, error] = await to(readTextFile(path));
    if (!file || error) {
        return null;
    }

    const parser = new DOMParser();

    return parser.parseFromString(file, 'text/xml');
}
