export function isOutDate(date) {
    if (Date.now() - date > 600000) {
        return true;
    }
    return false;
}
