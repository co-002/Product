import React, { useState } from "react";

const AddProductPopup = ({ onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedGrades, setSelectedGrades] = useState([]);

  const products = [
    "Pipes", "Tubing", "Pipe Fittings", "Forged Fittings", "Flanges", 
    "Valves", "Gaskets", "Instrumentation Fittings", "Bars", "Fasteners"
  ];

  const materials = [
    "Alloy Steel", "Aluminium", "Carbon Steel", "Copper Nickel", "Duplex Steel", 
    "Hastelloy", "Incoloy", "Monel", "Nickel Alloy", "Titanium"
  ];

  const grades = [
    "Aluminium F11 Pipes", "Aluminium F22 Pipes", "Aluminium F5 Pipes", 
    "Aluminium F9 Pipes", "Aluminium F91 Pipes", "Aluminium F11 Pipes", 
    "Aluminium F22 Pipes", "Aluminium F5 Pipes", "Aluminium F9 Pipes", "Aluminium F91 Pipes"
  ];

  const handleGradeChange = (grade) => {
    setSelectedGrades(prev =>
      prev.includes(grade) ? prev.filter(g => g !== grade) : [...prev, grade]
    );
  };

  const handleSubmit = () => {
    console.log("Selected Product:", selectedProduct);
    console.log("Selected Material:", selectedMaterial);
    console.log("Selected Grades:", selectedGrades);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Add Product</h2>

        <label>Product:</label>
        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
          <option value="">Select Product</option>
          {products.map((product, index) => (
            <option key={index} value={product}>{product}</option>
          ))}
        </select>

        <label>Material:</label>
        <select value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)}>
          <option value="">Select Material</option>
          {materials.map((material, index) => (
            <option key={index} value={material}>{material}</option>
          ))}
        </select>

        <label>Grades:</label>
        <div className="grades-list">
          {grades.map((grade, index) => (
            <div key={index}>
              <input
                type="checkbox"
                value={grade}
                checked={selectedGrades.includes(grade)}
                onChange={() => handleGradeChange(grade)}
              />
              <label>{grade}</label>
            </div>
          ))}
        </div>

        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddProductPopup;
