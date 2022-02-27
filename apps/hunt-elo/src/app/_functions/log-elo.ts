/**
 * Take a elo history and logs the last change ( up, down, detected)
 *
 * @param history the current elo history
 * @returns {void}
 */
export function logElo(history: number[]) {
    if (!history || !history.length) {
        return;
    }

    if (history.length === 1) {
        console.log(
            '%c ELO DETECTED  ',
            'background: #8000ff; color: white; font-weight: bolder',
            `: ${history[0]}`
        );
        return;
    }

    const lastElo = history[history.length - 1];
    const prevElo = history[history.length - 2];
    if (lastElo > prevElo) {
        console.log(
            '%c ELO INCREASED ',
            'background: #00ff5e; color: white; font-weight: bolder',
            `: from ${prevElo}  -> ${lastElo}`
        );
    } else {
        console.log(
            '%c ELO DECREASED ',
            'background: #ff3c00; color: white; font-weight: bolder',
            `: from ${prevElo}  -> ${lastElo}`
        );
    }
}
