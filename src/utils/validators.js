/**
 * @param {string} value
 * @returns {boolean}
 */
export const isPersianName = (value) => {
    const trimmed = value.trim();
    if (trimmed.length < 3) return false;

    const persianPattern = /^[\u0600-\u06FF\u200C\s']+$/;
    if (!persianPattern.test(trimmed)) return false;

    const words = trimmed.split(/\s+/).filter(Boolean);
    return words.length >= 2;
};

/**
 * @param {string} value
 * @returns {boolean}
 */
export const isValidIranianMobile = (value) => {
    return /^09\d{9}$/.test(value.trim());
};

/**
 * @param {string} value
 * @returns {boolean}
 */
export const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

/**
 * @param {string} value
 * @returns {boolean}
 */
export const isValidMedicalCode = (value) => {
    return /^\d{4,}$/.test(value.trim());
};