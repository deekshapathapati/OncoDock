import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './afterloginstyles.css'; // Import the CSS file

const AfterLogin = () => {
    useEffect(() => {
        // Create a link element for Bootstrap CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
        
        // Append the link to the head of the document
        document.head.appendChild(link);
    
        // Cleanup function to remove the link when the component is unmounted
        return () => {
          document.head.removeChild(link);
        };
      }, []); // Empty dependency array ensures this runs only once, when the component mounts
    
    return (
        <div>
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <h1>OncoDock</h1>
                    <p>AI-driven Prediction of Protein-Ligand Docking Scores</p>
                    {/* Login button positioned at the top right corner */}
                </div>
            </section>

            {/* Introduction Section */}
            <section className="feature">
                <div className="container">
                    <h2>About OncoDock</h2>
                    <p>OncoDock is an advanced AI-powered tool designed to predict protein-ligand docking scores with high accuracy. It leverages deep learning models trained on extensive molecular datasets to facilitate drug discovery and molecular interaction analysis.</p>
                    <p>By integrating state-of-the-art machine learning algorithms, OncoDock enables researchers and pharmaceutical companies to streamline the process of identifying potential drug candidates, saving time and resources while improving predictive precision.</p>
                </div>
            </section>

            {/* Key Features Section */}
            <section id="features" className="feature bg-dark">
                <div className="container">
                    <h2>Key Features</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card p-3 bg-secondary text-white">
                                <h4>Machine Learning Models</h4>
                                <p>Utilizes deep learning for enhanced accuracy.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-3 bg-secondary text-white">
                                <h4>Large Datasets</h4>
                                <p>Trained on datasets like PLAS-20k and Smiles2Dock.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-3 bg-secondary text-white">
                                <h4>Easy Integration</h4>
                                <p>Can be used with existing molecular docking software.</p>
                            </div>
                        </div>
                    </div>

                    {/* Buttons for Database and Predict Docking (Initially Hidden) */}
                    <div className="mt-4" id="featureButtons">
                        <Link to="/database" className="btn btn-custom mx-2">
                            Database
                        </Link>
                        <Link to="/predict" className="btn btn-custom mx-2">
                            Predict Docking
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Use This Application (Modern Timeline) */}
            <section className="timeline">
                <div className="container">
                    <h2 className="text-center">Why Choose OncoDock?</h2>
                    <div className="timeline-item">
                        <h4>High Accuracy</h4>
                        <p>OncoDock leverages AI-driven prediction models to provide highly accurate docking scores.</p>
                    </div>
                    <div className="timeline-item">
                        <h4>Faster Drug Discovery</h4>
                        <p>By reducing computational time, researchers can quickly identify promising drug candidates.</p>
                    </div>
                    <div className="timeline-item">
                        <h4>Open-Source & Flexible</h4>
                        <p>Can be integrated with various bioinformatics tools, making it accessible for all researchers.</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="feature bg-dark">
                <div className="container text-center">
                    <h2>Contact Us</h2>
                    <p>Have questions? Get in touch.</p>
                    <a href="mailto:contact@oncodock.com" className="btn btn-primary">Email Us</a>
                </div>
            </section>
        </div>
    );
};

export default AfterLogin;
