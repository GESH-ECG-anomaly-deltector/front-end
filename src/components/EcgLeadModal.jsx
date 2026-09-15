import { useEffect } from "react";
import EcgLeadChart from "./EcgLeadChart";

const EcgLeadModal = ({ lead, sampleRate, onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!lead) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-[1.5rem]"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-[1.4rem] p-[1.25rem] w-full max-w-[56rem] shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center pb-[0.75rem]">
                    <h2 className="font-bold leading-[1.5rem] text-[1rem]">لید {lead.name}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-[2rem] h-[2rem] rounded-full flex items-center justify-center bg-primary/10 text-[1rem]"
                        aria-label="بستن"
                    >
                        ✕
                    </button>
                </div>
                <EcgLeadChart
                    data={lead.samples}
                    sampleRate={sampleRate}
                    height={360}
                    zoomable
                    showAxes
                />
                <p className="pt-[0.75rem] text-[0.75rem] text-text-muted-foreground text-center">
                </p>
            </div>
        </div>
    );
};

export default EcgLeadModal;