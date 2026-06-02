import PeriodSelector from "../PeriodSelector";
import "./GraphCard.css";

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
