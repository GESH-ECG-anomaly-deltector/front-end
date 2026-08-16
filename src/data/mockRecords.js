export const mockRecords = [
    {
        recId: '1042',
        lastRecDate: '۱۴۰۵/۰۵/۱۲ — ۰۹:۲۴',
        leadCount: 12,
        duration: 10,
        sampleRate: 500,
        signalQuality: 96,
        bpm: 78,
     
        diagnoses: [
            { code: 'NSR', label: 'ریتم سینوسی طبیعی',  confidence: 94 },
            { code:'SB', label: 'برادی‌کاردی خفیف', confidence: 4 },
            { code: 'AF', label: 'فیبریلاسیون دهلیزی', confidence: 2 },
        ],
        doctorNote: {
            text: 'ریتم سینوسی طبیعی است. تشخیص مدل تایید می‌شود؛ کنترل دوره‌ای شش ماهه کافی است.',
            doctorName: 'زینب جنتی',
            confirmedAt: '۱۴۰۵/۰۵/۱۳',
        },
        leads: [
            { name: 'Lead |', graph: '<div className="w-[11.5rem] h-[3.25rem] bg-primary rounded-[0.775rem]"><div/>'},
            { name: 'Lead ||', graph: '<div className="w-[11.5rem] h-[3.25rem] bg-primary rounded-[0.775rem]"><div/>'},
            { name: 'Lead |||', graph: '<div className="w-[11.5rem] h-[3.25rem] bg-primary rounded-[0.775rem]"><div/>'},
            { name: 'Lead aVF', graph: '<div className="w-[11.5rem] h-[3.25rem] bg-primary rounded-[0.775rem]"><div/>'},
            { name: 'Lead aVL', graph: '<div className="w-[11.5rem] h-[3.25rem] bg-primary rounded-[0.775rem]"><div/>'},
            { name: 'Lead aVR', graph: '<div className="w-[11.5rem] h-[3.25rem] bg-primary rounded-[0.775rem]"><div/>'},
        ],
    },
    {
        recId: '1041',
        lastRecDate: '۱۴۰۵/۰۴/۰۲ — ۱۱:۱۰',
    },
];