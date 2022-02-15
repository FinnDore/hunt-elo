import { to } from '@hunt-elo/utils';
import { readTextFile } from '@tauri-apps/api/fs';
import { getPath } from './get-path';

/**
 * Returns the elo for a given user
 * @param userName the user to get the elo for
 * @param pathOverride the path to use instead
 * @returns {number | null} the elo for the given user
 */
export async function getElo(
    userName: string,
    pathOverride?: string
): Promise<number | null> {
    let path: string;

    if (!pathOverride) {
        const [userSelectedPath, getPathError] = await getPath();
        if (getPathError || !userSelectedPath) {
            return null;
        }
        path = userSelectedPath;
    } else {
        path = pathOverride;
    }

    const [file, error] = await to(readTextFile(path));
    if (!file || error) {
        console.log(error);
        return null;
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(file, 'text/xml');

    const attrs = xmlDoc.children[0].children;
    for (let i = 0; i < attrs.length - 1; i++) {
        const attrName = attrs.item(i)?.attributes.getNamedItem('name');
        const name = attrs.item(i)?.attributes.getNamedItem('value');

        if (
            !attrName?.value.startsWith('MissionBagPlayer') ||
            name?.value !== userName
        ) {
            continue;
        }

        const prefix = attrName.value.replace('blood_line_name', '');
        for (let i = 0; i < attrs.length; i++) {
            const attrName = attrs.item(i)?.attributes.getNamedItem('name');

            if (attrName?.value === prefix + 'mmr') {
                const mmr = attrs.item(i)?.attributes.getNamedItem('value');
                if (mmr?.value) {
                    return parseInt(mmr?.value) ?? null;
                } else {
                    return null;
                }
            }
        }
    }

    return null;
}
