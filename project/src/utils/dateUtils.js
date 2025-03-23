export const formatDate = (date, format = 'full') => {
    const d = new Date(date);
    
    if (format === 'short') {
        return d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    }
    
    return d.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}; 