import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductCombinations,
  postProduct,
  postMaterial,
  postGrade,
  postProductCombination,
} from "../redux/productCombinationSlice.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const ProductTable = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.productCombination
  );

  useEffect(() => {
    dispatch(fetchProductCombinations());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("Tubing");
  const [selectedMaterial, setSelectedMaterial] = useState("Aluminium");
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const products = ["Tubing", "Pipefitting", "Valves", "Gaskets", "Bolts"];
  const materials = [
    "Aluminium",
    "Carbon Steel",
    "Copper Nickel",
    "Duplex Steel",
    "Iron",
  ];
  const grades = [
    "Grade F11",
    "Grade F22",
    "Grade F5",
    "Grade F9",
    "Grade F91",
  ];

  const handleGradeSelection = (grade) => {
    setSelectedGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };

  const handleSubmit = async () => {
    try {
      const productResponse = await dispatch(
        postProduct({ name: selectedProduct })
      ).unwrap();
      const materialResponse = await dispatch(
        postMaterial({ name: selectedMaterial })
      ).unwrap();

      const gradeResponses = await Promise.all(
        selectedGrades.map((grade) =>
          dispatch(postGrade({ name: grade })).unwrap()
        )
      );

      await dispatch(
        postProductCombination({
          productId: productResponse._id,
          materialId: materialResponse._id,
          gradeIds: gradeResponses.map((res) => res._id),
        })
      );

      setShowModal(false);
      setSelectedGrades([]);
      dispatch(fetchProductCombinations());
    } catch (error) {
      console.error("Error submitting product combination:", error);
    }
  };

  const filteredData = data.filter((item) =>
    item.product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Products
        </button>
        <h5 className="fw-bold">
          <span className="text-dark">280</span>/
          <span className="text-muted">400</span> Products
        </h5>
      </div>

      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Material</th>
            <th>Grades</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item._id}>
              <td>{item.product?.name || "N/A"}</td>
              <td>{item.material?.name || "N/A"}</td>
              <td>
                {item.grades?.length
                  ? item.grades.map((g) => g.name).join(", ")
                  : "N/A"}
              </td>
              <td>{item.price || "N/A"}</td>
              <td>
                <button className="btn btn-link">Quick Edit</button> |
                <button className="btn btn-link">Add Product Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Product Combination</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-4">
                    <label>Product</label>
                    <select
                      className="form-select"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      {products.map((product) => (
                        <option key={product} value={product}>
                          {product}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-4">
                    <label>Material</label>
                    <select
                      className="form-select"
                      value={selectedMaterial}
                      onChange={(e) => setSelectedMaterial(e.target.value)}
                    >
                      {materials.map((material) => (
                        <option key={material} value={material}>
                          {material}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-4">
                    <label>Grades</label>
                    <div
                      className="border p-2"
                      style={{ maxHeight: "200px", overflowY: "auto" }}
                    >
                      {grades.map((grade) => (
                        <div key={grade} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={grade}
                            checked={selectedGrades.includes(grade)}
                            onChange={() => handleGradeSelection(grade)}
                          />
                          <label className="form-check-label">{grade}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
