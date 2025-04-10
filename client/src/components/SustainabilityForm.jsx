export default function SustainabilityForm({ answers, handleChange, errors }) {
  const questions = [
    {
      label: "Did you make any eco-friendly purchases today? (e.g., sustainable products, second-hand items)",
      name: "Did you make any eco-friendly purchases today?",
    },
    {
      label: "Did you participate in any community sustainability initiatives today? (e.g., clean-up drives, tree planting)",
      name: "Did you participate in any community sustainability initiatives today?",
    },
    {
      label: "Did you contribute to any carbon offset programs today? (e.g., donating to reforestation projects)",
      name: "Did you contribute to any carbon offset programs today?",
    },
    {
      label: "Did you learn or share something about sustainability today?",
      name: "Did you learn or share something about sustainability today?",
    },
  ];

  return (
    <div className="form-container">
      {/* Did you do anything eco-friendly today? */}
      <div className="form-group">
        <label className="block font-bold mb-4">Did you do anything eco-friendly today?</label>
        {errors["Did you do anything eco-friendly today?"] && (
          <p className="text-red-500 text-sm">{errors["Did you do anything eco-friendly today?"]}</p>
        )}
        <select
          className="input-box"
          value={answers["Did you do anything eco-friendly today?"] || ""}
          onChange={(e) => handleChange("Did you do anything eco-friendly today?", e.target.value)}
        >
          <option value="">Select</option>
          <option>Planted a tree</option>
          <option>Used public transport</option>
          <option>Avoided plastic</option>
          <option>Reduced food waste</option>
          <option>Used renewable energy</option>
          <option>Other (please specify)</option>
        </select>
      </div>

      {/* If "Other" is selected, provide a text input */}
      {answers["Did you do anything eco-friendly today?"] === "Other (please specify)" && (
        <div className="form-group mt-8">
          <label className="block font-bold mb-2">Please specify:</label>
          {errors["Other eco-friendly action"] && (
            <p className="text-red-500 text-sm">{errors["Other eco-friendly action"]}</p>
          )}
          <input
            type="text"
            className="input-box"
            placeholder="Enter your action"
            value={answers["Other eco-friendly action"] || ""}
            onChange={(e) => handleChange("Other eco-friendly action", e.target.value)}
          />
        </div>
      )}

      {/* Radio Group Questions */}
      {questions.map(({ label, name }) => (
        <div key={name} className="form-group mt-8">
          <label className="block font-bold mb-2">{label}</label>
          {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
          <div className="radio-group space-x-6">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name={name}
                  value={option}
                  checked={answers[name] === option}
                  onChange={(e) => handleChange(name, e.target.value)}
                  className="w-5 h-5 mr-2"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
