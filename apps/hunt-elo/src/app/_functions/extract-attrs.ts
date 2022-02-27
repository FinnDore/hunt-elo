import { DocAttributesPrefixOrSuffix } from '../_enums/doc-attributes-prefixe';
import { PlayerAttrs } from '../_interfaces/player-attrs.model';

/**
 * Returns the elo and id for a given user
 *
 * @param document the attributes file
 * @returns {PlayerAttrs[]} a list of player attributes
 */
export function extractAttrs(document: Document): PlayerAttrs[] {
    const outputAttrs: PlayerAttrs[] = [];
    const attrs = document.children[0].children;

    for (let i = 0; i < attrs.length - 1; i++) {
        const attributes = attrs.item(i)?.attributes;
        const attrName = attributes?.getNamedItem('name')?.value;

        if (
            !attrName?.endsWith(
                DocAttributesPrefixOrSuffix.PLAYER_NAME_SUFFIX
            ) ||
            !attrName?.startsWith(DocAttributesPrefixOrSuffix.GLOBAL_PREFIX)
        ) {
            continue;
        }

        // String that represents the current user in the document. e.g 0_1_ or 0_2_
        const userIdString = attrName
            ?.replace(DocAttributesPrefixOrSuffix.GLOBAL_PREFIX, '')
            ?.replace(DocAttributesPrefixOrSuffix.PLAYER_NAME_SUFFIX, '');

        if (!userIdString) {
            continue;
        }

        const username = attributes?.getNamedItem('value')?.value ?? null;
        let userId: number | null = null;
        let elo: number | null = null;

        for (let x = i; x < attrs.length; x++) {
            const currentAttr = attrs.item(x)?.attributes;

            switch (currentAttr?.getNamedItem('name')?.value) {
                case DocAttributesPrefixOrSuffix.GLOBAL_PREFIX +
                    userIdString +
                    DocAttributesPrefixOrSuffix.MMR_SUFFIX: {
                    const mmr =
                        currentAttr.getNamedItem('value')?.value ?? null;
                    if (mmr !== null && typeof +mmr === 'number') {
                        elo = +mmr;
                    }
                    break;
                }

                case DocAttributesPrefixOrSuffix.GLOBAL_PREFIX +
                    userIdString +
                    DocAttributesPrefixOrSuffix.PROFILE_ID: {
                    const id = currentAttr.getNamedItem('value')?.value ?? null;
                    if (id !== null && typeof +id === 'number') {
                        userId = +id;
                    }
                    break;
                }
            }

            // Break early if we have collected all our values
            if (userId && elo) {
                outputAttrs.push({
                    elo,
                    id: userId,
                    name: username ?? '',
                });
                break;
            }
        }
    }

    // Filter out duplicated by names as that can happen for some reason,
    // probably something todo with playing teams of then teams of two.
    // Fix for this is coming when i figure it out. But for now just have a unique name :/
    const uniqueAttrs: PlayerAttrs[] = [];
    for (const user of outputAttrs) {
        if (!uniqueAttrs.find(x => x.name === user.name)) {
            uniqueAttrs.push(user);
        }
    }

    return uniqueAttrs;
}
