export const getUserStatusLabel = (status) => {
    const normalized = (status || '').toString().toUpperCase();
    switch (normalized) {
        case 'APPROVED':
        case 'ACTIVE':
            return 'فعال';
        case 'PENDING':
        case 'PENDING_NATIONAL_CODE':
            return 'در انتظار تایید';
        case 'REJECTED':
        case 'INACTIVE':
            return 'غیرفعال';
        default:
            return 'نامشخص';
    }
};

export const getUserStatusColorClass = (status) => {
    const normalized = (status || '').toString().toUpperCase();
    switch (normalized) {
        case 'APPROVED':
        case 'ACTIVE':
            return 'bg-success/15 text-success';
        case 'PENDING':
        case 'PENDING_NATIONAL_CODE':
            return 'bg-warning/15 text-warning';
        case 'REJECTED':
        case 'INACTIVE':
            return 'bg-text-muted-foreground/15 text-text-muted-foreground';
        default:
            return 'bg-text-muted-foreground/15 text-text-muted-foreground';
    }
};