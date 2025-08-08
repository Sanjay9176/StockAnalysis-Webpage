export function Changechip({ last, prevClose }) {
  const diff = last.close - prevClose;
  const pct = (diff / prevClose) * 100;
  const color = diff >= 0 ? "text-green-400" : "text-red-400";
  return (
    <>
      <p className="text-xs text-yellow-300 mt-1">Previous Close: ₹{prevClose}</p>
      <p className={`${color} text-[13px]`}>
        <span className="text-[10px]">DIFFERENCE:</span> {diff >= 0 ? "+" : "-"}₹
        {Math.abs(diff).toFixed(2)} ({Math.abs(pct).toFixed(2)}%)
      </p>
    </>
  );
}

export function formatLargeNumber(value) {
  if (!value || value === "N/A") return "N/A";
  const num = parseFloat(value.toString().replace(/,/g, ''));
  if (isNaN(num)) return value;

  if (num >= 1e12) return (num / 1e12).toFixed(2) + " T";
  if (num >= 1e7) return (num / 1e7).toFixed(2) + " Cr";
  if (num >= 1e5) return (num / 1e5).toFixed(2) + " L";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + " K";

  return num.toLocaleString("en-IN");
}
