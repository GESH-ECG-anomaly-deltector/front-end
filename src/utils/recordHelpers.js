/**
 * @param {Array} records
 * @param {string}  patientId
 * @return {boolean}
 */
export const hasPendingRecord = (records, patientId) => {
    return records.some(
        (r) => r.patientId === patientId && r.status === 'pending'
    );
};

/**
 * @param {Array} records
 * @param {string}  patientId
 * @return {boolean}
 */
export const hasProcessingRecord = (records, patientId) => {
    return records.some(
        (r) => r.patientId === patientId && r.status === 'processing'
    );
};


export const getPatientCardStatus = (records, patientId) => {
    if (hasPendingRecord(records, patientId)) return 'pending';
    if (hasProcessingRecord(records, patientId)) return 'processing';
    return null;
}


/**
 * همه‌ی رکوردهای متعلق به یه بیمار خاص رو برمی‌گردونه.
 * @param {Array} records - آرایه‌ی کامل رکوردها (records.json)
 * @param {string} patientId
 * @returns {Array}
 */
export const getRecordsByPatientId = (records, patientId) => {
    return records.filter((r) => r.patientId === patientId);
};

/**
 * نکته: این تابع به فیلد r.dateISO نیاز داره، ولی رکوردهای فعلی توی recordsData.json
 * فقط lastRecDate (تاریخ شمسی به‌صورت رشته، مثل "۱۴۰۵/۰۵/۱۲") رو دارن، نه dateISO.
 * فعلاً این تابع جایی صدا زده نمی‌شه (dead code)، ولی اگه خواستی استفاده‌اش کنی،
 * باید یا یه فیلد dateISO واقعی (مثلاً "2026-08-03T09:24:00") به رکوردها اضافه کنی،
 * یا این تابع رو با یه parser تاریخ شمسی بازنویسی کنی.
 * رکوردها رو بر اساس تاریخ به‌صورت نزولی (جدیدترین اول) مرتب می‌کنه.
 * از spread ([...records]) استفاده می‌شه تا آرایه‌ی اصلی دست‌نخورده بمونه،
 * چون .sort() آرایه‌ی ورودی رو مستقیم mutate می‌کنه.
 * @param {Array} records
 * @returns {Array}
 */
export const sortRecordsByDateDesc = (records) => {
    return [...records].sort(
        (a, b) => new Date(b.dateISO) - new Date(a.dateISO)
    );
};

/**
 * آخرین (جدیدترین) رکورد یه بیمار خاص رو برمی‌گردونه.
 * @param {Array} records - آرایه‌ی کامل رکوردها
 * @param {string} patientId
 * @returns {Object|undefined}
 */
export const getLatestRecordByPatientId = (records, patientId) => {
    const patientRecords = getRecordsByPatientId(records, patientId);
    return sortRecordsByDateDesc(patientRecords)[0];
};

/**
 * یه رکورد خاص رو با شناسه‌ش پیدا می‌کنه.
 * @param {Array} records
 * @param {string} recId
 * @returns {Object|undefined}
 */
export const getRecordById = (records, recId) => {
    return records.find((r) => r.recId === recId);
};

/**
 * همه‌ی بیمارهای متعلق به یه پزشک خاص رو برمی‌گردونه.
 * @param {Array} patients - آرایه‌ی کامل بیمارها (patients.json)
 * @param {string} doctorId
 * @returns {Array}
 */
export const getPatientsByDoctorId = (patients, doctorId) => {
    return patients.filter((p) => p.assignedDoctorId === doctorId);
};

/**
 * یه بیمار خاص رو با شناسه‌ش پیدا می‌کنه.
 * @param {Array} patients
 * @param {string} patientId
 * @returns {Object|undefined}
 */
export const getPatientById = (patients, patientId) => {
    return patients.find((p) => p.id === patientId);
};

/**
 * رکوردهایی که هنوز نظر پزشک روشون ثبت نشده (در انتظار بررسی) رو برمی‌گردونه.
 * برای صفحه‌ی «درخواست‌های بررسی» پزشک استفاده می‌شه.
 * @param {Array} records
 * @param {string} doctorId - اختیاری: اگه بدی، فقط رکوردهای بیمارهای همون پزشک برمی‌گرده
 * @param {Array} patients - فقط وقتی doctorId دادی لازمه
 * @returns {Array}
 */
export const getPendingReviewRecords = (records, doctorId, patients) => {
    const pending = records.filter((r) => r.status === 'pending');

    if (!doctorId || !patients) return pending;

    const doctorPatientIds = getPatientsByDoctorId(patients, doctorId).map((p) => p.id);
    return pending.filter((r) => doctorPatientIds.includes(r.patientId));
};

/**
 * جست‌وجوی رکوردها بر اساس شناسه (REC-xxxx) یا تاریخ — برای اینپوت سرچ.
 * @param {Array} records
 * @param {string} query
 * @returns {Array}
 */
export const searchRecords = (records, query) => {
    if (!query.trim()) return records;

    const normalizedQuery = query.trim().toLowerCase();

    return records.filter(
        (r) =>
            r.recId.toLowerCase().includes(normalizedQuery) ||
            r.date.includes(normalizedQuery)
    );
};

