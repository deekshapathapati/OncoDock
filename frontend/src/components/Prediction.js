import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios for API requests
import './predictstyles.css';

const Prediction = () => {
    const [ligandFile, setLigandFile] = useState(null);
    const [proteinFile, setProteinFile] = useState(null);
    const [predictionResult, setPredictionResult] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [bindingScores, setBindingScores] = useState([]);  // State to store binding scores
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Dynamically include Bootstrap CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
        document.head.appendChild(link);

        // Cleanup: Remove the link when the component is unmounted
        return () => {
            document.head.removeChild(link);
        };
    }, []);

    // Handle file changes for protein and ligand
    const handleFileChange = (event, type) => {
        const file = event.target.files[0];
        if (type === 'ligand') {
            setLigandFile(file);
        } else if (type === 'protein') {
            setProteinFile(file);
        }
    };

    // Handle form submission
    const submitPrediction = async () => {
        if (ligandFile && proteinFile) {
            setIsFormVisible(false);
            setLoading(true);
            // Prepare form data
            const formData = new FormData();
            formData.append('protein', proteinFile); // Protein PDB file
            formData.append('ligand', ligandFile);   // Ligand SDF file
    
            try {
                // Make a POST request to the backend
                const response = await axios.post('http://localhost:8081/api/run-autodock', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
    
                console.log("API Response:", response.data);
                console.log("API Scores:", response.data.score);
                // Extract scores from response (Modify based on actual API response format)
                if (response.data && response.data.score) {
                    console.log("API Scores:", response.data.score);
                    setBindingScores([...response.data.score]);
                }
    
                setPredictionResult("Docking prediction for ligand is successful!");
            } catch (error) {
                console.error('Error during prediction:', error);
                setPredictionResult('Error during prediction, please try again.');
            } finally {
                setLoading(false);  // <-- Hide loading indicator
            }
        } else {
            alert('Please upload both ligand and protein files.');
        }
    };
    console.log("isFormVisible:", isFormVisible);
    
    return (
        <div className="container">
            <h2 className="text-center my-4">Predict Docking</h2>

            {/* Prediction Form */}
            {isFormVisible ? ( 
                <div className="form-container">
                    <form id="predictForm">
                        <div className="mb-3">
                            <label htmlFor="ligandFile" className="form-label">Ligand Structure (SDF)</label>
                            <input
                                type="file"
                                id="ligandFile"
                                className="form-control"
                                onChange={(e) => handleFileChange(e, 'ligand')}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="proteinFile" className="form-label">Protein Structure (PDB)</label>
                            <input
                                type="file"
                                id="proteinFile"
                                className="form-control"
                                onChange={(e) => handleFileChange(e, 'protein')}
                                required
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-custom w-100"
                            onClick={submitPrediction}
                        >
                            Predict Docking
                        </button>
                    </form>
                </div>
            ): null}
            {/* Show loading spinner when data is being fetched */}
            {loading && (
                <div className="text-center mt-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Processing docking prediction, please wait...</p>
                </div>
            )}
            {/* Prediction Result Section */}
            {predictionResult && !loading && (
                <div id="predictionResult" className="mt-4">
                    <h4 className="text-center">Prediction Result</h4>
                    <p className="text-center">{predictionResult}</p>
                </div>
            )}

            {/* Binding Scores Table */}
            {bindingScores && bindingScores.length > 0 && !loading && (
                <div className="mt-4">
                    <h4 className="text-center">Binding Scores</h4>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Mode</th>
                                <th>Affinity (kcal/mol)</th>
                                <th>RMSD LB</th>
                                <th>RMSD UB</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bindingScores.map((score, index) => (
                                <tr key={index}>
                                    <td>{score.mode}</td>
                                    <td>{score.affinity}</td>
                                    <td>{score.rmsd_lb}</td>
                                    <td>{score.rmsd_ub}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Back Button */}
            <div className="text-center mt-4">
                <a href="/afterlogin" className="btn btn-custom">Back to Home</a>
                <a href="/predict" className="btn btn-custom mx-2">Go to Predict</a>
            </div>
        </div>
    );
};

export default Prediction;
