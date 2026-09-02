const PERSIAN_NAME_REGEX = /^[\u0600-\u06FF\s\u200C]+$/;

const IRAN_PHONE_REGEX = /^09\d{9}$/;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @param {string} name
 * @returns {string|null}
 */
export const validatePersianName = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return 'لطفاً نام و نام خانوادگی را وارد کنید';
    if (!PERSIAN_NAME_REGEX.test(trimmed)) {
        return 'نام و نام خانوادگی باید فقط با حروف فارسی نوشته شود';
    }
    return null;
};

/**
 * @param {string} phone
 * @returns {string|null}
 */
export const validateIranPhone = (phone) => {
    const trimmed = phone.trim();
    if (!trimmed) return 'لطفاً شماره موبایل را وارد کنید';
    if (!IRAN_PHONE_REGEX.test(trimmed)) {
        return 'شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود (مثلاً ۰۹۱۲۳۴۵۶۷۸۹)';
    }
    return null;
};

/**
 * @param {string} email
 * @param {boolean} required
 * @returns {string|null}
 */
export const validateEmail = (email, required = false) => {
    const trimmed = email.trim();
    if (!trimmed) {
        return required ? 'لطفاً ایمیل را وارد کنید' : null;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
        return 'فرمت ایمیل درست نیست (مثلاً name@example.com)';
    }
    return null;
};

/**
 * @param {string} value
 * @param {string} fieldLabel
 * @returns {string|null}
 */
export const validateRequired = (value, fieldLabel) => {
    if (!value || !value.toString().trim()) {
        return `لطفاً ${fieldLabel} را وارد کنید`;
    }
    return null;
};
