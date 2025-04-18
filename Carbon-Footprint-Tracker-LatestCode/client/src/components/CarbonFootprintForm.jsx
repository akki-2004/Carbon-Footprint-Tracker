import React, { useState } from "react";
import axios from "axios";
import TransportForm from "./TransportForm";
import FoodForm from "./FoodForm";
import EnergyForm from "./EnergyForm";
import WaterForm from "./WaterForm";
import WasteForm from "./WasteForm";
import SustainabilityForm from "./SustainabilityForm";
import CarbonFootprintIntro from "./CarbonFootprintIntro";
import Modal from "./Modal"; // Import the Modal

const categories = ["Transport", "Food", "Energy", "Water", "Waste", "Sustainability"];

export default function CarbonFootprintForm() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState({ visible: false, message: "", type: "" }); // State for modal
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <CarbonFootprintIntro />;
  }

  const handleChange = (category, question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [question]: value,
      },
    }));
  };

  const handleNext = () => setCurrentCategory((prev) => prev + 1);
  const handleBack = () => setCurrentCategory((prev) => prev - 1);
  const handleSubmit = async () => {
    const formattedAnswers = {};
  
    // Convert first-level keys to lowercase
    Object.keys(answers).forEach((key) => {
      formattedAnswers[key.toLowerCase()] = answers[key];
    });
  
    console.log("🔍 Formatted Data Before Sending:", JSON.stringify(formattedAnswers, null, 2));
  
    // Get the logged-in user object from localStorage
    const user = JSON.parse(localStorage.getItem("user"));  // Assuming 'user' is stored as a JSON string
  
    if (!user || !user.id) {
      console.error("❌ User ID not found!");
      setModal({
        visible: true,
        message: "User not logged in. Please log in and try again.",
        type: "error",
      });
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/carbon-footprint", {
        userId: user.id,  // Use the logged-in user's ID
        ...formattedAnswers,
      }, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("✅ Success:", response.data);
  
      // Show success modal
      setModal({
        visible: true,
        message: "Carbon footprint recorded successfully!",
        type: "success",
      });
  
      // Reset form data after successful submission
      setAnswers({});
      setErrors({});
      setCurrentCategory(0); // Optionally reset to the first category
    } catch (error) {
      console.error("❌ Error submitting data:", error.response ? error.response.data : error);
  
      // Show error modal
      setModal({
        visible: true,
        message: error.response ? error.response.data.message : "An error occurred. Please try again.",
        type: "error",
      });
    }
  };
  
  
  const closeModal = () => {
    setModal({ visible: false, message: "", type: "" }); // Close modal
  };

  const renderForm = () => {
    const category = categories[currentCategory];
    const FormComponent = {
      Transport: TransportForm,
      Food: FoodForm,
      Energy: EnergyForm,
      Water: WaterForm,
      Waste: WasteForm,
      Sustainability: SustainabilityForm,
    }[category];

    return (
      <FormComponent
        answers={answers[category] || {}}
        handleChange={(question, value) => handleChange(category, question, value)}
        errors={errors[category] || {}}
      />
    );
  };

  return (
    <div className="p-6 w-full max-w-4xl mx-auto text-center">
      {/* Progress Bar */}
      <div className="progress-bar">
        {categories.map((cat, index) => (
          <React.Fragment key={cat}>
            <div className={`progress-step-container ${currentCategory === index ? "active" : ""}`}>
              <div className="progress-step"></div>
              <div className="category-label">{cat.toUpperCase()}</div>
            </div>
            {index < categories.length - 1 && <div className="progress-arrow">→</div>}
          </React.Fragment>
        ))}
      </div>

      {/* Dynamic Form Rendering */}
      <div className="mt-6">
        <h2 className="category-title">{categories[currentCategory]}</h2>
        {renderForm()}
      </div>

      {/* Navigation Buttons */}
      <div className="button-container">
        {currentCategory > 0 && <button className="nav-button back" onClick={handleBack}>Back</button>}
        {currentCategory < categories.length - 1 ? (
          <button className="nav-button next" onClick={handleNext}>Next</button>
        ) : (
          <button className="nav-button submit" onClick={handleSubmit}>Submit</button>
        )}
      </div>

      {/* Modal */}
      {modal.visible && <Modal message={modal.message} type={modal.type} onClose={closeModal} />}
    </div>
  );
}
