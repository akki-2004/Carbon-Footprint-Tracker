export default function WasteForm({ answers, handleChange, errors }) {
  const questions = [
    "Did you segregate your waste today?",
    "Did you compost organic waste today?",
    "Did you recycle any materials today? (e.g., paper, plastic, glass)",
    "Did you dispose of or recycle any electronic waste today?",
    "Did you avoid using single-use plastics today? (e.g., bags, straws, cutlery)",
    "Did you use any reusable items today? (e.g., bottles, tiffin boxes, bags)",
    "Did you take any steps to reduce waste today? (e.g., reusable bags, avoiding packaging)"
  ];

  return (
    <div className="form-container">
      {questions.map((question) => (
        <div key={question} className="form-group mt-8">
          <label className="block font-bold text-2xl mb-4 text-center text-white">{question}</label>
          {errors[question] && <p className="text-red-500 text-lg">{errors[question]}</p>}
          <div className="radio-group space-x-6">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex items-center text-white text-xl">
                <input
                  type="radio"
                  name={question}
                  value={option}
                  checked={answers[question] === option}
                  onChange={(e) => handleChange(question, e.target.value)}
                  className="w-6 h-6 mr-3"
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
