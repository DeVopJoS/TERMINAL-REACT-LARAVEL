/**
 * Utility functions for the application
 */

/**
 * Format a date with the given format
 * @param {Date|string} date - Date to format
 * @param {string} format - Format pattern (e.g., 'yyyy-MM-dd')
 * @returns {string} Formatted date
 */
export const formatDate = (date, format) => {
    if (!date) return '';
    if (typeof date === 'string') {
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            const [year, month, day] = date.split('-');
            let result = format;
            result = result.replace('yyyy', year);
            result = result.replace('MM', month);
            result = result.replace('dd', day);
            return result;
        }
        
        // Si es una fecha con timestamp (ISO)
        if (date.includes('T')) {
            const datePart = date.split('T')[0];
            if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
                const [year, month, day] = datePart.split('-');
                let result = format;
                result = result.replace('yyyy', year);
                result = result.replace('MM', month);
                result = result.replace('dd', day);
                return result;
            }
        }
    }
    
    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        if (isNaN(dateObj.getTime())) return '';

        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        
        let result = format;
        
        result = result.replace('yyyy', year);
        result = result.replace('MM', month);
        result = result.replace('dd', day);
        
        return result;
    } catch (error) {
        console.error('Error formatting date:', error);
        return '';
    }
};

/**
 * Format a number as currency (Bs)
 * @param {number} value - Value to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted currency
 */
export const formatCurrency = (value, decimals = 2) => {
    if (value === null || value === undefined) return 'Bs. 0.00';
    
    const formatter = new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: 'BOB',
        minimumFractionDigits: decimals
    });
    
    return formatter.format(value).replace('BOB', 'Bs.');
};

/**
 * Truncate text to a specific length and add ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    
    return text.substring(0, maxLength) + '...';
};
