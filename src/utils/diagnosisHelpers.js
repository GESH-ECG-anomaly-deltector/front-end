
/**
  @param {string} 
  @returns {string}
 */
 export const getDiagnosisColorClass = (diagnosis) => {
    switch (diagnosis) {
        case 'NSR':
            return 'bg-success/15 text-success';
        case 'SB':
            return 'bg-warning/15 text-warning';
        case 'AF':
            return 'bg-pulse/15 text-pulse';
        case 'processing':
            return 'bg-text-muted-foreground/15 text-text-muted-foreground';
        
            // مثل همون بلوک شاخه‌ای راست که هیچی براش نداریم
        default:
            return 'bg-purple-100 purple-red-600';
    }
};


/**
 * @param {string}
 * @returns {string}
 */
export const getDiagnosisLable = (diagnosis) => {
    switch (diagnosis) {
        case 'NSR':
            return 'ریتم سینوسی طبیعی';
        case 'SB':
            return 'برادی‌کاردی خفیف';
        case 'AF':
            return 'فیبرلاسیون دهلیزی';
        case 'processing':
            return 'در حال پردازش';
        default:
            return 'نامشخص';
    }
}

/**
 * @param {string} level
*/
export const getRiskColorClass = (level) => {
    switch (level) {
        case 'high':
            return 'bg-pulse/15 text-pulse';
        case 'medium':
            return 'bg-warning/15 text-warning';
        case 'low':
            return 'bg-success/15 text-success';
        default:
            return 'bg-text-muted-foreground/15 text-text-muted-foreground';
    }
};

/**
 * @param {string} level 
 */
export const getRiskLabel = (level) => {
    switch (level) {
        case 'high':
            return 'ریسک بالا';
        case 'medium':
            return 'ریسک متوسط';
        case 'low':
            return 'ریسک کم';
        default:
            return 'نامشخص';
    }
};

/**
 * @param {string} status
*/
export const getStatusColorClass = (status) => {
    switch (status) {
        case 'reviewed':
            return 'bg-success/15 text-success';
        case 'pending':
            return 'bg-primary/20 text-accent';
        case 'processing':
            return 'bg-warning/15 text-warning';
        case 'model-only':
            return 'bg-pulse/15 text-pulse';
        default:
            return 'bg-text-muted-foreground/15 text-text-muted-foreground';
    }
};

/**
 * @param {string} status 
 */
export const getStatusLabel = (status) => {
    switch (status) {
        case 'reviewed':
            return 'بررسی‌شده توسط پزشک';
        case 'pending':
            return 'منتظر بررسی';
        case 'processing':
            return 'در حال پردازش';
        case 'model-only':
            return 'تحلیل مدل';
        default:
            return 'نامشخص';
    }
};
