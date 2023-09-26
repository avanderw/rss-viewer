
/** Convert pubDate to English meaningful date */
export function pubDateToFriendly(date: string) {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (days == 0) {
        if (hours == 0) {
            return 'Just now';
        }
        return hours + ' hours ago';
    }
    if (days == 1) {
        return 'Yesterday';
    }
    if (days < 7) {
        return days + ' days ago';
    }
    return d.toLocaleDateString();
}