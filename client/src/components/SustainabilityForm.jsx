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
      <div className="form-group mt-8">
        <label className="block font-bold text-2xl mb-4 text-center text-white">Did you do anything eco-friendly today?</label>
        {errors["Did you do anything eco-friendly today?"] && (
          <p className="text-red-500 text-lg">{errors["Did you do anything eco-friendly today?"]}</p>
        )}
        <select
          className="input-box text-lg p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <label className="block font-bold text-2xl mb-4 text-center text-white">Please specify:</label>
          {errors["Other eco-friendly action"] && (
            <p className="text-red-500 text-lg">{errors["Other eco-friendly action"]}</p>
          )}
          <input
            type="text"
            className="input-box text-lg p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your action"
            value={answers["Other eco-friendly action"] || ""}
            onChange={(e) => handleChange("Other eco-friendly action", e.target.value)}
          />
        </div>
      )}

      {/* Radio Group Questions */}
      {questions.map(({ label, name }) => (
        <div key={name} className="form-group mt-8">
          <label className="block font-bold text-2xl mb-4 text-center text-white">{label}</label>
          {errors[name] && <p className="text-red-500 text-lg">{errors[name]}</p>}
          <div className="radio-group space-x-6">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex items-center text-white text-xl">
                <input
                  type="radio"
                  name={name}
                  value={option}
                  checked={answers[name] === option}
                  onChange={(e) => handleChange(name, e.target.value)}
                  className="w-6 h-6 mr-4"
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
