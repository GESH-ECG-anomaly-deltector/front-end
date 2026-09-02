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
 * @param {Array} records
 * @param {string} patientId
 * @returns {Array}
 */
export const getRecordsByPatientId = (records, patientId) => {
    return records.filter((r) => r.patientId === patientId);
};

/**
 * @param {Array} records
 * @returns {Array}
 */
export const sortRecordsByDateDesc = (records) => {
    return [...records].sort(
        (a, b) => new Date(b.dateISO) - new Date(a.dateISO)
    );
};

/**
 * @param {Array} records
 * @param {string} patientId
 * @returns {Object|undefined}
 */
export const getLatestRecordByPatientId = (records, patientId) => {
    const patientRecords = getRecordsByPatientId(records, patientId);
    return sortRecordsByDateDesc(patientRecords)[0];
};

/**
 * @param {Array} records
 * @param {string} recId
 * @returns {Object|undefined}
 */
export const getRecordById = (records, recId) => {
    return records.find((r) => r.recId === recId);
};

/**
 * @param {Array} patients
 * @param {string} doctorId
 * @returns {Array}
 */
export const getPatientsByDoctorId = (patients, doctorId) => {
    return patients.filter((p) => p.assignedDoctorId === doctorId);
};

/**
 * @param {Array} patients
 * @param {string} patientId
 * @returns {Object|undefined}
 */
export const getPatientById = (patients, patientId) => {
    return patients.find((p) => p.id === patientId);
};

/**
 * @param {Array} records
 * @param {string} doctorId
 * @param {Array} patients
 * @returns {Array}
 */
export const getPendingReviewRecords = (records, doctorId, patients) => {
    const pending = records.filter((r) => r.status === 'pending');

    if (!doctorId || !patients) return pending;

    const doctorPatientIds = getPatientsByDoctorId(patients, doctorId).map((p) => p.id);
    return pending.filter((r) => doctorPatientIds.includes(r.patientId));
};

/**
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

