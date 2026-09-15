import { useRef, useMemo } from "react";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Tooltip, Filler } from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(LineElement, PointElement, LinearScale, Tooltip, Filler, zoomPlugin);

const TIME_MINOR_STEP = 0.04;
const TIME_MAJOR_MULT = 5;

const niceStep = (range, targetCount = 10) => {
    if (!range) return 1;
    const raw = range / targetCount;
    const magnitude = 10 ** Math.floor(Math.log10(raw));
    const residual = raw / magnitude;
    let niceResidual;
    if (residual < 1.5) niceResidual = 1;
    else if (residual < 3) niceResidual = 2;
    else if (residual < 7) niceResidual = 5;
    else niceResidual = 10;
    return niceResidual * magnitude;
};

const isOnMajorLine = (value, minorStep, majorStep) =>
    Math.abs(Math.round(value / majorStep) * majorStep - value) < minorStep / 4;

const EcgLeadChart = ({
    data,
    sampleRate = 100,
    height = 90,
    color = "#2671D9",
    zoomable = false,
    showAxes = false,
    compact = false,
}) => {
    const chartRef = useRef(null);

    const { yMinorStep, yMajorStep, yMin, yMax } = useMemo(() => {
        if (!Array.isArray(data) || data.length === 0) {
            return { yMinorStep: 1, yMajorStep: 5, yMin: 0, yMax: 1 };
        }
        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min || 1;
        const minorStep = niceStep(range, compact ? 4 : 10);
        return { yMinorStep: minorStep, yMajorStep: minorStep * 5, yMin: min, yMax: max };
    }, [data, compact]);

    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div
                style={{ height }}
                className="flex items-center justify-center bg-primary/10 rounded-[0.775rem] text-[0.7rem] text-text-muted-foreground w-full"
            >
                داده‌ای برای این لید موجود نیست
            </div>
        );
    }

    const points = data.map((value, i) => ({ x: i / sampleRate, y: value }));

    const chartData = {
        datasets: [
            {
                data: points,
                borderColor: color,
                borderWidth: compact ? 1 : 1.5,
                pointRadius: 0,
                tension: 0,
            },
        ],
    };

    const xGrid = compact
        ? { color: "#eef1f5", lineWidth: 1 }
        : {
              color: (ctx) => (isOnMajorLine(ctx.tick.value, TIME_MINOR_STEP, TIME_MINOR_STEP * TIME_MAJOR_MULT) ? "#c7ced6" : "#eef1f5"),
              lineWidth: (ctx) => (isOnMajorLine(ctx.tick.value, TIME_MINOR_STEP, TIME_MINOR_STEP * TIME_MAJOR_MULT) ? 1 : 0.5),
          };

    const yGrid = compact
        ? { color: "#eef1f5", lineWidth: 1 }
        : {
              color: (ctx) => (isOnMajorLine(ctx.tick.value, yMinorStep, yMajorStep) ? "#c7ced6" : "#eef1f5"),
              lineWidth: (ctx) => (isOnMajorLine(ctx.tick.value, yMinorStep, yMajorStep) ? 1 : 0.5),
          };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        parsing: false,
        normalized: true,
        interaction: { mode: "nearest", axis: "x", intersect: false },
        scales: {
            x: {
                type: "linear",
                grid: xGrid,
                border: { color: "#d8dee6" },
                ticks: compact
                    ? { maxTicksLimit: 4, font: { size: 8 }, color: "#8A928A", callback: (v) => `${v.toFixed(2)}s` }
                    : {
                          stepSize: TIME_MINOR_STEP,
                          autoSkip: false,
                          font: { size: 10 },
                          color: "#8A928A",
                          callback: (v) => (isOnMajorLine(v, TIME_MINOR_STEP, TIME_MINOR_STEP * TIME_MAJOR_MULT) ? `${v.toFixed(2)}s` : ""),
                      },
                title: showAxes ? { display: true, text: "زمان (ثانیه) - هر خانه‌ی بزرگ = ۰.۲ ثانیه", font: { size: 10 }, color: "#8A928A" } : undefined,
            },
            y: {
                min: compact ? undefined : yMin - yMinorStep,
                max: compact ? undefined : yMax + yMinorStep,
                grid: yGrid,
                border: { color: "#d8dee6" },
                ticks: compact
                    ? { maxTicksLimit: 3, font: { size: 8 }, color: "#8A928A" }
                    : {
                          stepSize: yMinorStep,
                          autoSkip: false,
                          font: { size: 10 },
                          color: "#8A928A",
                          callback: (v) => (isOnMajorLine(v, yMinorStep, yMajorStep) ? v.toFixed(1) : ""),
                      },
                title: showAxes ? { display: true, text: "دامنه (نسبی)", font: { size: 10 }, color: "#8A928A" } : undefined,
            },
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: !compact, callbacks: { title: (items) => `${items[0].parsed.x.toFixed(3)}s` } },
            zoom: zoomable
                ? {
                      pan: { enabled: true, mode: "x" },
                      zoom: {
                          wheel: { enabled: true },
                          pinch: { enabled: true },
                          mode: "x",
                      },
                      limits: { x: { min: 0, max: (data.length - 1) / sampleRate, minRange: 0.2 } },
                  }
                : undefined,
        },
    };

    return (
        <div style={{ height, width: "100%" }} className="relative">
            <Line ref={chartRef} data={chartData} options={options} />
            {zoomable && (
                <button
                    type="button"
                    onClick={() => chartRef.current?.resetZoom()}
                    className="absolute bottom-[0.4rem] left-[0.4rem] bg-white/90 shadow-sm rounded-full w-[1.5rem] h-[1.5rem] flex items-center justify-center text-[0.7rem]"
                    title="بازنشانی زوم"
                >
                    ⟲
                </button>
            )}
        </div>
    );
};

export default EcgLeadChart;