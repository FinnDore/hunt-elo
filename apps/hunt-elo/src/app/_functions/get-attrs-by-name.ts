import { PlayerAttrs } from '../_interfaces/player-attrs.model';
import { extractAttrs } from './extract-attrs';
import { getDocument } from './get-document';

/**
 * Returns attrs for a given user by their userName
 *
 * @param userName the user to get the attrs for
 * @param path the path to the attributes.xml file
 * @returns {object} the elo and id for the given user
 */
export async function getAttrsByUserName(
    userName: string,
    path: string
): Promise<PlayerAttrs | null> {
    const document = await getDocument(path);

    if (!document) {
        return null;
    }

    const attrs = extractAttrs(document);

    return attrs.find(x => x.name === userName) ?? null;
}
