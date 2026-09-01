// این فایل فقط قوانین «اعتبارسنجی ورودی‌ها» رو نگه می‌داره — مستقل از UI.
// هر کامپوننت فرم (SignUpForm, PatientProfile, ECGUploadForm, ...) این توابع رو
// صدا می‌زنه و بر اساس خروجی، پیام خطا و حاشیه‌ی قرمز رو خودش نمایش می‌ده.

// فقط حروف فارسی، فاصله، نیم‌فاصله و همزه رو قبول می‌کنه (بدون عدد و حروف لاتین)
const PERSIAN_NAME_REGEX = /^[\u0600-\u06FF\s\u200C]+$/;

// شماره موبایل ایران: با 09 شروع بشه و دقیقاً 11 رقم باشه (مثل 09123456789)
const IRAN_PHONE_REGEX = /^09\d{9}$/;

// فرمت استاندارد و ساده‌ی ایمیل
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * چک می‌کنه نام واردشده فقط فارسیه یا نه.
 * @param {string} name
 * @returns {string|null} پیام خطا، یا null اگه معتبر بود
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
 * چک می‌کنه شماره موبایل با سینتکس ایرانی مطابقت داره یا نه.
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
 * چک می‌کنه ایمیل فرمت درستی داره یا نه.
 * @param {string} email
 * @param {boolean} required - آیا پرکردن این فیلد اجباریه؟
 * @returns {string|null}
 */
export const validateEmail = (email, required = false) => {
    const trimmed = email.trim();
    if (!trimmed) {
        return required ? 'لطفاً ایمیل را وارد کنید' : null; // اگه اجباری نیست و خالیه، مشکلی نداره
    }
    if (!EMAIL_REGEX.test(trimmed)) {
        return 'فرمت ایمیل درست نیست (مثلاً name@example.com)';
    }
    return null;
};

/**
 * چک می‌کنه یه فیلد متنی ساده خالی نباشه (برای رمز عبور، کد نظام پزشکی و...)
 * @param {string} value
 * @param {string} fieldLabel - اسم فیلد که توی پیام خطا نشون داده می‌شه
 * @returns {string|null}
 */
export const validateRequired = (value, fieldLabel) => {
    if (!value || !value.toString().trim()) {
        return `لطفاً ${fieldLabel} را وارد کنید`;
    }
    return null;
};
