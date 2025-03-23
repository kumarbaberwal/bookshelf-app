// this function will convert the createdAt to this format : "Jan 2021"

export function formatMemberSince(dateString: string) {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${year}`;
}


// this function will convert the createdAt to this format : "Jan 15, 2021"

export function formatPublishDate(dateString: string) {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day} ${year}`;
}