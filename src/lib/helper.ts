export function truncateWord(text: string, maxLength: number, suffix = '...') {
    if (!text || typeof text !== 'string') return '';
    if (!maxLength || maxLength <= 0) return text;

    if (text.length <= maxLength) {
        return text;
    }

    const availableLength = maxLength - suffix.length;

    if (availableLength <= 0) {
        return suffix.slice(0, maxLength);
    }

    return text.slice(0, availableLength) + suffix;
}