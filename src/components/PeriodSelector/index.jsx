import "./PeriodSelector.css";

/**
 * PeriodSelector – navigation par semaine ou par mois avec flèches chevron.
 *
 * @param {string}   label     - Libellé affiché entre les deux boutons (calculé par le parent)
 * @param {function} onPrev    - Callback bouton gauche
 * @param {function} onNext    - Callback bouton droit
 * @param {boolean}  canGoPrev - Active / désactive le bouton gauche
 * @param {boolean}  canGoNext - Active / désactive le bouton droit
 */
export default function PeriodSelector({
  label,
  onPrev,
  onNext,
  canGoPrev = true,
  canGoNext = true,
}) {
  return (
    <div className="period-selector">
      <button
        className="period-selector__btn"
        onClick={onPrev}
        disabled={!canGoPrev}
        aria-label="Période précédente"
      >
        <span className="period-selector__chevron">&#8249;</span>
      </button>

      <span className="period-selector__label">{label}</span>

      <button
        className="period-selector__btn"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Période suivante"
      >
        <span className="period-selector__chevron">&#8250;</span>
      </button>
    </div>
  );
}
