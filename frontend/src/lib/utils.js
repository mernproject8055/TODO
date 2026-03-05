export function formatDate(dateString) {
    if (!dateString) return "No Date";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}