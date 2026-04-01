import { useFormState } from "../context/FormContext";

export default function StepReview() {
  const { values } = useFormState();

  return (
    <div>
      <h2>Review your travel plan</h2>
      <p className="section-text">Check all information before submit.</p>

      <div className="review-grid">
        <div className="review-box">
          <h3>Personal</h3>
          <p><strong>Full name:</strong> {values.fullName}</p>
          <p><strong>Email:</strong> {values.email}</p>
          <p><strong>Birth date:</strong> {values.birthDate}</p>
          <p><strong>Travelers:</strong> {values.travelers}</p>
        </div>

        <div className="review-box">
          <h3>Trip</h3>
          <p><strong>Country:</strong> {values.country}</p>
          <p><strong>Trip type:</strong> {values.tripType}</p>
          <p><strong>Budget:</strong> ${values.budget}</p>
          <p><strong>Period:</strong> {values.startDate} - {values.endDate}</p>
        </div>

        <div className="review-box full-width">
          <h3>Extras</h3>
          <p><strong>Selected extras:</strong> {values.extras.join(", ") || "None"}</p>
          <p><strong>Notes:</strong> {values.notes || "No notes"}</p>
          <p><strong>Terms accepted:</strong> {values.agreeTerms ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
}