import { to } from '@hunt-elo/utils';
import { readTextFile } from '@tauri-apps/api/fs';
import { getPath } from './get-path';

/**
 * Returns the elo and id for a given user
 * @param userName the user to get the elo for
 * @param pathOverride the path to use instead
 * @returns {object} the elo and id for the given user
 */
export async function getEloAndId(
    userName: string,
    pathOverride?: string
): Promise<{ elo: number; userId: number } | null> {
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
        let elo: number | null = null;
        let userId: number | null = null;

        for (let i = 0; i < attrs.length; i++) {
            const attrName = attrs.item(i)?.attributes.getNamedItem('name');
            if (attrName?.value === prefix + 'mmr') {
                const mmr = attrs.item(i)?.attributes.getNamedItem('value');
                if (mmr?.value) {
                    elo = +mmr?.value ?? null;
                } else {
                    return null;
                }
            } else if (attrName?.value === prefix + 'profileid') {
                const idAttr = attrs.item(i)?.attributes.getNamedItem('value');
                if (idAttr?.value) {
                    userId = +idAttr?.value;
                }
            }
        }

        if (userId !== null && elo !== null) {
            return { userId, elo };
        }
    }

    return null;
}
