import "./PeriodSelector.css";

export default function PeriodSelector({ label, onPrev, onNext }) {
  return (
    <div className="period-selector">
      <button
        className="period-selector__btn"
        onClick={onPrev}
        aria-label="Période précédente"
      >
        <span className="period-selector__chevron">&#8249;</span>
      </button>

      <span className="period-selector__label">{label}</span>

      <button
        className="period-selector__btn"
        onClick={onNext}
        aria-label="Période suivante"
      >
        <span className="period-selector__chevron">&#8250;</span>
      </button>
    </div>
  );
}
