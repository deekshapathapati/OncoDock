// import React from 'react';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const LandingPage = () => {
//   return (
//     <div style={{ backgroundColor: '#121212', color: 'white', fontFamily: 'Arial, sans-serif' }}>
//       {/* Hero Section */}
//       <section className="hero" style={{ background: 'linear-gradient(135deg, #007bff, #ff416c)', padding: '80px 0', textAlign: 'center', position: 'relative' }}>
//         <div className="container">
//           <h1>OncoDock</h1>
//           <p>AI-driven Prediction of Protein-Ligand Docking Scores</p>
//           {/* Login Button */}
//           <Link to="/login" className="btn-login" style={{
//             position: 'absolute', top: '20px', right: '20px', padding: '10px 20px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', fontSize: '16px'
//           }}>
//             Login
//           </Link>
//         </div>
//       </section>

//       {/* Introduction Section */}
//       <section className="feature" style={{ padding: '50px 20px', textAlign: 'center' }}>
//         <div className="container">
//           <h2>About OncoDock</h2>
//           <p>OncoDock is an advanced AI-powered tool designed to predict protein-ligand docking scores with high accuracy. It leverages deep learning models trained on extensive molecular datasets to facilitate drug discovery and molecular interaction analysis.</p>
//           <p>By integrating state-of-the-art machine learning algorithms, OncoDock enables researchers and pharmaceutical companies to streamline the process of identifying potential drug candidates, saving time and resources while improving predictive precision.</p>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="feature bg-dark" style={{ padding: '50px 20px', textAlign: 'center' }}>
//         <div className="container">
//           <h2>Key Features</h2>
//           <div className="row">
//             <div className="col-md-4">
//               <div className="card p-3 bg-secondary text-white">
//                 <h4>Machine Learning Models</h4>
//                 <p>Utilizes deep learning for enhanced accuracy.</p>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="card p-3 bg-secondary text-white">
//                 <h4>Large Datasets</h4>
//                 <p>Trained on datasets like PLAS-20k and Smiles2Dock.</p>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="card p-3 bg-secondary text-white">
//                 <h4>Easy Integration</h4>
//                 <p>Can be used with existing molecular docking software.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Why Use This Application Section (Modern Timeline) */}
//       <section className="timeline" style={{ position: 'relative', padding: '50px 0', maxWidth: '800px', margin: 'auto' }}>
//         <div className="container">
//           <h2 className="text-center">Why Choose OncoDock?</h2>
//           <div className="timeline-item" style={{ position: 'relative', width: '45%', padding: '20px', background: '#1e1e1e', color: 'white', borderRadius: '8px', boxShadow: '0 4px 10px rgba(255, 65, 108, 0.4)', marginBottom: '30px' }}>
//             <h4>High Accuracy</h4>
//             <p>OncoDock leverages AI-driven prediction models to provide highly accurate docking scores.</p>
//           </div>
//           <div className="timeline-item" style={{ position: 'relative', width: '45%', padding: '20px', background: '#1e1e1e', color: 'white', borderRadius: '8px', boxShadow: '0 4px 10px rgba(255, 65, 108, 0.4)', marginBottom: '30px' }}>
//             <h4>Faster Drug Discovery</h4>
//             <p>By reducing computational time, researchers can quickly identify promising drug candidates.</p>
//           </div>
//           <div className="timeline-item" style={{ position: 'relative', width: '45%', padding: '20px', background: '#1e1e1e', color: 'white', borderRadius: '8px', boxShadow: '0 4px 10px rgba(255, 65, 108, 0.4)', marginBottom: '30px' }}>
//             <h4>Open-Source & Flexible</h4>
//             <p>Can be integrated with various bioinformatics tools, making it accessible for all researchers.</p>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="feature bg-dark" style={{ padding: '50px 20px', textAlign: 'center' }}>
//         <div className="container">
//           <h2>Contact Us</h2>
//           <p>Have questions? Get in touch.</p>
//           <a href="mailto:contact@oncodock.com" className="btn btn-primary">Email Us</a>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LandingPage;
