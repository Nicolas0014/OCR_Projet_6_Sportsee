import PeriodSelector from "../PeriodSelector";
import "./GraphCard.css";

/**
 * GraphCard – carte contenant un graphe avec en-tête et description.
 *
 * @param {string}    info                - Chiffre clé affiché à gauche (22px)
 * @param {string}    color               - "primary" | "secondary" (couleur de l'info)
 * @param {string}    description         - Paragraphe descriptif (12px, gray-dark)
 * @param {object}    periodSelectorProps - Props transmises au PeriodSelector
 * @param {ReactNode} children            - Le graphe à afficher
 */
export default function GraphCard({
  info,
  color,
  description,
  periodSelectorProps,
  children,
}) {
  return (
    <div className="graph-card">
      <div className="graph-card__header">
        <span className={`graph-card__info ${color}`}>{info}</span>
        <PeriodSelector {...periodSelectorProps} />
      </div>
      <p className="graph-card__description">{description}</p>
      <div className="graph-card__chart">{children}</div>
    </div>
  );
}
