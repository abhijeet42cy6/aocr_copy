import React, { useState } from 'react';
import Navbar from './Navbar';
const REQUEST_ACCESS_FORM_STYLES = `
  .request-access-form-container {
    min-height: 100vh;
    background: #202426;
    font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  .request-access-form-content {
    display: flex;
    max-width: 1260px;
    margin: 0 auto;
    padding: 54px 85px;
    gap: 90px;
    align-items: flex-start;
  }

  .form-section {
    max-width: 675px;
  }

  .graphic-section {
    flex: 1;
    position: relative;
    height: 540px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .request-access-form-header {
    margin-bottom: 18px;
    margin-top: 18px;
  }

  .request-access-form-title {
    font-size: 2.25rem;
    font-weight: 300;
    color: rgba(244, 244, 227, 1);
  }

  .request-access-form {
    display: flex;
    flex-direction: column;
    gap: 27px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-label {
    font-size: 11px;
    font-weight: 400;
    color: rgba(244, 244, 227, 1);
    font-family: "Source Code Pro", monospace;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .required-asterisk {
    color: #ff4444;
    font-size: 0.8rem;
  }

  .form-input,
  .form-textarea {
    background: transparent;
    border: none;
    border-bottom: 1px solid #666;
    font-size: 11px;
    font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    color: #fff;
    transition: all 0.3s ease;
    outline: none;
  }

  .form-input:focus,
  .form-textarea:focus {
    border-bottom-color: #999;
  }

  .form-input:-webkit-autofill,
  .form-input:-webkit-autofill:hover,
  .form-input:-webkit-autofill:focus,
  .form-input:-webkit-autofill:active,
  .form-textarea:-webkit-autofill,
  .form-textarea:-webkit-autofill:hover,
  .form-textarea:-webkit-autofill:focus,
  .form-textarea:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px transparent inset !important;
    -webkit-text-fill-color: #000 !important;
    background-color: transparent !important;
    background: transparent !important;
  }

  .form-input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
    -webkit-text-fill-color: #000 !important;
    background-color: transparent !important;
    background: transparent !important;
  }

  .form-textarea:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
    -webkit-text-fill-color: #000 !important;
    background-color: transparent !important;
    background: transparent !important;
  }

  .form-input:-moz-autofill,
  .form-textarea:-moz-autofill {
    background-color: transparent !important;
    color: #fff !important;
  }

  .form-input:-ms-input-placeholder,
  .form-textarea:-ms-input-placeholder {
    background-color: transparent !important;
    color: #000 !important;
  }

  .form-input::placeholder,
  .form-textarea::placeholder {
    color: #666;
    font-size: 0.95rem;
  }

  .form-textarea {
    resize: vertical;
    min-height: 45px;
    border: 1px solid #666;
    border-radius: 4px;
    padding: 11px;
    background: rgba(255, 255, 255, 0.02);
    margin-top: 4px;
  }

  .form-textarea:focus {
    border-color: #999;
  }

  .submit-button {
    background: #F4F4E3;
    color: #000;
    border: none;
    padding: 12px 40px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: "Alliance No.2";
    align-self: flex-start;
    width: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .submit-button:hover {
    background: #f0f0f0;
    transform: translateY(-1px);
  }

  .submit-button:active {
    transform: translateY(0);
  }

  .submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  .submit-button.loading {
    position: relative;
    color: transparent;
  }

  .submit-button.loading::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    top: 50%;
    left: 50%;
    margin-left: -8px;
    margin-top: -8px;
    border: 2px solid #000;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

 
  .form-input:invalid:not(:placeholder-shown) {
    border-bottom-color: #f44336;
  }

  .form-textarea:focus {
    border-color: #999;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }

  /* Fixed Animation Keyframes */
  @keyframes floatUpDown {
    0%, 100% { 
      transform: translate(-50%, -50%) translateY(0px); 
    }
    50% { 
      transform: translate(-50%, -50%) translateY(-20px); 
    }
  }

  @keyframes floatUpDown2 {
    0%, 100% { 
      transform: translate(-50%, -50%) translateY(0px); 
    }
    50% { 
      transform: translate(-50%, -50%) translateY(-15px); 
    }
  }

  @keyframes floatUpDown3 {
    0%, 100% { 
      transform: translate(-50%, -50%) translateY(0px); 
    }
    50% { 
      transform: translate(-50%, -50%) translateY(-10px); 
    }
  }

  @keyframes floatBottom {
    0%, 100% {
      transform: translateX(-50%) translateY(0px);
    }
    50% {
      transform: translateX(-50%) translateY(-15px);
    }
  }

  /* SVG Layer Styles - Using CSS classes instead of inline styles */
  .abstractGraphics {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 1000px;
  }

  .layer {
    position: absolute;
    top: 40%;
    left: 60%;
    transform: translate(-50%, -50%);
    z-index: 104;
    animation: floatUpDown 6s ease-in-out infinite;
    width: 600px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .layer1 {
    position: absolute;
    top: 58%;
    left: 60%;
    transform: translate(-50%, -50%);
    z-index: 99;
    animation: floatUpDown2 8s ease-in-out infinite 0.5s;
    width: 600px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .layer3 {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    animation: floatBottom 9s ease-in-out infinite 1.5s;
  }

  .layer4 {
    position: absolute;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);
    z-index: 100;
    width: 600px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  @media (max-width: 1024px) {
    .request-access-form-content {
      flex-direction: column;
      gap: 54px;
      padding: 36px 18px;
    }
    
    .form-section,
    .graphic-section {
      max-width: 100%;
    }
    
    .request-access-form-title {
      font-size: 1.8rem;
    }
    
    .graphic-section {
      height: 360px;
    }
  }

  @media (max-width: 768px) {
    .request-access-form-content {
      padding: 18px;
      padding-top: 70px;
    }
    
    .request-access-form-title {
      font-size: 1.6rem;
    }
    
    .graphic-section {
display: none !important;    }
  }
`;

export default function RequestAccessForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    jobTitle: '',
    company: '',
    projectContext: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInputFocus = (e) => {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.background = 'transparent';
  };

  const handleInputBlur = (e) => {
    setTimeout(() => {
      e.target.style.backgroundColor = 'transparent';
      e.target.style.background = 'transparent';
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare the data for Google Sheets - match the exact column order
      const formDataForSheets = {
        name: formData.fullName,
        email: formData.email,
        message: formData.projectContext || 'N/A',
        company: formData.company || 'N/A',
        job: formData.jobTitle || 'N/A',
        phone: formData.phone || 'N/A'
      };

      console.log('📤 Sending form data:', formDataForSheets);

      // Send data as JSON (Google Apps Script expects JSON)
      const response = await fetch('https://script.google.com/macros/s/AKfycbxG4VhS5YcdfJi4WylUnDJRTnSlKy7XTDpFxz5KIK3lmievqz8O1j3f8bP82_r8iLhI/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataForSheets)
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        jobTitle: '',
        company: '',
        projectContext: ''
      });

    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <div className="request-access-form-container">
      <style>{REQUEST_ACCESS_FORM_STYLES}</style>

      <Navbar />

      <div className="request-access-form-content">
        {/* Left Section - Form */}
        <div className="form-section">
          <div className="request-access-form-header">
            <h1 className="request-access-form-title">Request Access</h1>
          </div>

          <form className="request-access-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                FULL NAME: <span className="required-asterisk">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                className="form-input"
                value={formData.fullName}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                placeholder=""
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                EMAIL ADDRESS: <span className="required-asterisk">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                placeholder=""
              />
            </div>

            <div className="form-group">
              <label className="form-label">PHONE NUMBER:</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder=""
              />
            </div>

            <div className="form-group">
              <label className="form-label">JOB TITLE:</label>
              <input
                type="text"
                name="jobTitle"
                className="form-input"
                value={formData.jobTitle}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder=""
              />
            </div>

            <div className="form-group">
              <label className="form-label">COMPANY/INSTITUTION:</label>
              <input
                type="text"
                name="company"
                className="form-input"
                value={formData.company}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder=""
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                TELL US ABOUT YOUR PROJECT, A BIT OF CONTEXT WILL ALLOW US TO CONNECT YOU TO THE RIGHT TEAM FASTER:
              </label>
              <textarea
                name="projectContext"
                className="form-textarea"
                value={formData.projectContext}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder=""
              />
            </div>

            <button
              type="submit"
              className={`submit-button ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>

        {/* Right Section - Abstract Graphic */}
        <div className="graphic-section">
          <div className="abstractGraphics">

            {/* Top Layer - using CSS class instead of inline style */}
            <div className="layer">
              <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none">
                <defs>
                  <filter id="blurFilter1" x="0" y="0" width="100%" height="100%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                  </filter>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" filter="url(#blurFilter1)" />
                <g transform="translate(50, 50)">
                  <foreignObject x="-89.2393" y="-89.7012" width="595.763" height="370.885">
                    <div xmlns="http://www.w3.org/1999/xhtml" style={{ clipPath: 'url(#bgblur_layer4_clip_path)', backdropFilter: 'blur(10px)', height: '100%', width: '100%' }}></div>
                  </foreignObject>
                  <g>
                    <path d="M416.284 95.7416L208.642 0.40918L1 95.7416L208.642 191.074L416.284 95.7416Z" stroke="white" strokeWidth="0.2" />
                  </g>
                </g>

                <g transform="translate(50, 50)">
                  <g transform="translate(100, 65)">
                    <path d="M104.79 7.66926L91.0781 1.13965L1.2959 45.739L15.0081 52.2686L104.79 7.66926Z" stroke="#FDFDFE" strokeWidth="0.652961" />
                  </g>
                  <g transform="translate(215, 115)">
                    <path d="M104.79 7.66926L91.0781 1.13965L1.2959 45.739L15.0081 52.2686L104.79 7.66926Z" stroke="#FDFDFE" strokeWidth="0.652961" />
                  </g>
                  <g transform="translate(200, 110)">
                    <path d="M55.0673 7.57942L41.3551 1.0498L1.52441 19.3327L15.2366 25.8623L55.0673 7.57942Z" fill="#FDFDFE" fillOpacity="0.8" stroke="white" strokeWidth="0.652961" />
                  </g>
                  <g transform="translate(130, 80)">
                    <path d="M122.856 7.23573L109.144 0.706114L0.751953 54.5491L14.4641 61.0787L122.856 7.23573Z" stroke="white" strokeWidth="0.652961" />
                  </g>
                  <g transform="translate(88, 60)">
                    <path d="M84.2581 7.27289L70.5459 0.743279L1.33203 35.1247L15.0442 41.6543L84.2581 7.27289Z" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="0.652961" />
                  </g>
                </g>
              </svg>
            </div>

            {/* Layer 4 - using CSS class instead of inline style */}
            <div className="layer4">
              <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none">
                <defs>
                  <filter id="blurFilter" x="0" y="0" width="100%" height="100%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                  </filter>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" filter="url(#blurFilter)" />
                {/* Main diamond shape from Group 5.svg */}
                <g transform="translate(50, 50)">
                  <foreignObject x="-89.2393" y="-89.7012" width="595.763" height="370.885">
                    <div xmlns="http://www.w3.org/1999/xhtml" style={{ backdropFilter: 'blur(10px)', clipPath: 'url(#bgblur_layer4_clip_path)', height: '100%', width: '100%' }}></div>
                  </foreignObject>
                  <g filter="url(#filter0_ii_1100_730)" data-figma-bg-blur-radius="20">
                    <path d="M416.284 95.7416L208.642 0.40918L1 95.7416L208.642 191.074L416.284 95.7416Z" fill="black" fillOpacity="0.01" />
                    <path d="M416.284 95.7416L208.642 0.40918L1 95.7416L208.642 191.074L416.284 95.7416Z" stroke="white" strokeWidth="0.2" />
                  </g>
                </g>

                {/* Small geometric elements from Group 5.svg */}
                <g transform="translate(50, 50)">
                  <path d="M215.824 31.4246L193.624 21.3037L171.423 31.4246L193.624 41.5455L215.824 31.4246Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M241.943 43.1785L219.743 33.0576L197.542 43.1785L219.743 53.2994L241.943 43.1785Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M268.062 54.9314L245.861 44.8105L223.66 54.9314L245.861 65.0524L268.062 54.9314Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M294.18 66.6844L271.979 56.5635L249.778 66.6844L271.979 76.8053L294.18 66.6844Z" fill="#FDFDFE" stroke="white" strokeWidth="0.652961" />
                  <path d="M320.298 78.4383L298.097 68.3174L275.896 78.4383L298.097 88.5592L320.298 78.4383Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M346.416 90.1912L324.215 80.0703L302.015 90.1912L324.215 100.312L346.416 90.1912Z" stroke="#FDFDFE" strokeWidth="0.652961" />
                  <path d="M372.536 101.944L350.335 91.8232L328.135 101.944L350.335 112.065L372.536 101.944Z" fill="#FDFDFE" stroke="white" strokeWidth="0.652961" />
                  <path d="M190.358 43.1785L168.158 33.0576L145.957 43.1785L168.158 53.2994L190.358 43.1785Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M216.478 54.9314L194.277 44.8105L172.076 54.9314L194.277 65.0524L216.478 54.9314Z" fill="#FDFDFE" stroke="white" strokeWidth="0.652961" />
                  <path d="M242.597 66.6844L220.396 56.5635L198.195 66.6844L220.396 76.8053L242.597 66.6844Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M268.715 78.4383L246.514 68.3174L224.313 78.4383L246.514 88.5592L268.715 78.4383Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M294.832 90.1912L272.631 80.0703L250.431 90.1912L272.631 100.312L294.832 90.1912Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M320.951 101.944L298.75 91.8232L276.55 101.944L298.75 112.065L320.951 101.944Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M347.07 113.698L324.87 103.577L302.669 113.698L324.87 123.819L347.07 113.698Z" fill="white" fillOpacity="0.4" stroke="#FDFDFE" strokeWidth="0.652961" />
                  <path d="M164.894 54.9314L142.693 44.8105L120.492 54.9314L142.693 65.0524L164.894 54.9314Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M191.012 66.6844L168.811 56.5635L146.61 66.6844L168.811 76.8053L191.012 66.6844Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M217.131 78.4383L194.93 68.3174L172.729 78.4383L194.93 88.5592L217.131 78.4383Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M243.249 90.1912L221.048 80.0703L198.848 90.1912L221.048 100.312L243.249 90.1912Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M269.368 101.944L247.167 91.8232L224.967 101.944L247.167 112.065L269.368 101.944Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M295.485 113.698L273.285 103.577L251.084 113.698L273.285 123.819L295.485 113.698Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M321.604 125.452L299.403 115.331L277.202 125.452L299.403 135.573L321.604 125.452Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M139.428 66.6844L117.227 56.5635L95.0264 66.6844L117.227 76.8053L139.428 66.6844Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M165.546 78.4383L143.345 68.3174L121.145 78.4383L143.345 88.5592L165.546 78.4383Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M191.664 90.1912L169.463 80.0703L147.263 90.1912L169.463 100.312L191.664 90.1912Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M217.783 101.944L195.583 91.8232L173.382 101.944L195.583 112.065L217.783 101.944Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M243.902 113.698L221.702 103.577L199.501 113.698L221.702 123.819L243.902 113.698Z" fill="#FDFDFE" stroke="white" strokeWidth="0.652961" />
                  <path d="M270.021 125.452L247.82 115.331L225.619 125.452L247.82 135.573L270.021 125.452Z" stroke="#FDFDFE" strokeWidth="0.652961" />
                  <path d="M296.138 137.204L273.937 127.083L251.736 137.204L273.937 147.325L296.138 137.204Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M113.963 78.4383L91.7622 68.3174L69.5615 78.4383L91.7622 88.5592L113.963 78.4383Z" stroke="#FDFDFE" strokeWidth="0.652961" />
                  <path d="M140.08 90.1912L117.879 80.0703L95.6787 90.1912L117.879 100.312L140.08 90.1912Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M166.198 101.944L143.998 91.8232L121.797 101.944L143.998 112.065L166.198 101.944Z" fill="white" fillOpacity="0.4" stroke="#FDFDFE" strokeWidth="0.652961" />
                  <path d="M192.318 113.698L170.118 103.577L147.917 113.698L170.118 123.819L192.318 113.698Z" fill="#FDFDFE" stroke="white" strokeWidth="0.652961" />
                  <path d="M218.437 125.452L196.236 115.331L174.035 125.452L196.236 135.573L218.437 125.452Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M244.555 137.204L222.354 127.083L200.153 137.204L222.354 147.325L244.555 137.204Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M270.673 148.958L248.472 138.837L226.271 148.958L248.472 159.079L270.673 148.958Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M88.4971 90.1912L66.2964 80.0703L44.0957 90.1912L66.2964 100.312L88.4971 90.1912Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M114.614 101.944L92.4136 91.8232L70.2129 101.944L92.4136 112.065L114.614 101.944Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M140.733 113.698L118.533 103.577L96.332 113.698L118.533 123.819L140.733 113.698Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M166.853 125.452L144.652 115.331L122.451 125.452L144.652 135.573L166.853 125.452Z" stroke="#FDFDFE" strokeWidth="0.652961" />
                  <path d="M192.971 137.204L170.77 127.083L148.569 137.204L170.77 147.325L192.971 137.204Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M219.089 148.958L196.888 138.837L174.688 148.958L196.888 159.079L219.089 148.958Z" stroke="white" strokeWidth="0.652961" />
                  <path d="M245.207 160.711L223.006 150.59L200.806 160.711L223.006 170.832L245.207 160.711Z" stroke="white" strokeWidth="0.652961" />
                </g>

                <defs>
                  <filter id="filter0_ii_1100_730" x="-89.2393" y="-89.7012" width="595.763" height="370.885" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="1" dy="1" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1100_730" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="-1" dy="-2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="effect1_innerShadow_1100_730" result="effect2_innerShadow_1100_730" />
                  </filter>
                  <clipPath id="bgblur_layer4_clip_path" transform="translate(89.2393 89.7012)">
                    <path d="M416.284 95.7416L208.642 0.40918L1 95.7416L208.642 191.074L416.284 95.7416Z" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Layer 1 - using CSS class instead of inline style */}
            <div className="layer1">
              <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none">
                <defs>
                  <filter id="blurFilter3" x="0" y="0" width="100%" height="100%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                  </filter>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" filter="url(#blurFilter3)" />
                {/* Main diamond shape from Group 5.svg */}
                <g transform="translate(50, 50)">
                  <foreignObject x="-89.2393" y="-89.7012" width="595.763" height="370.885">
                    <div xmlns="http://www.w3.org/1999/xhtml" style={{ backdropFilter: 'blur(10px)', clipPath: 'url(#bgblur_layer4_clip_path)', height: '100%', width: '100%' }}></div>
                  </foreignObject>
                  <g filter="url(#filter0_ii_1100_730)" data-figma-bg-blur-radius="20">
                    <path d="M416.284 95.7416L208.642 0.40918L1 95.7416L208.642 191.074L416.284 95.7416Z" stroke="white" strokeWidth="0.2" />
                  </g>
                </g>

                {/* Small geometric elements from toplayer.svg positioned correctly */}
                {/* Small circle elements from Group 4.svg positioned correctly */}
                <g transform="translate(50, 50)">
                  <g transform="translate(85, 105)">
                    <path d="M24.8467 1.07129C31.6576 1.07129 37.8079 2.48868 42.2432 4.76465C46.6953 7.04936 49.3328 10.1475 49.333 13.4775C49.333 16.8076 46.6953 19.9057 42.2432 22.1904C37.8079 24.4664 31.6576 25.8838 24.8467 25.8838C18.0358 25.8838 11.8854 24.4664 7.4502 22.1904C2.9981 19.9057 0.360352 16.8076 0.360352 13.4775C0.360524 10.1475 2.99808 7.04935 7.4502 4.76465C11.8854 2.48868 18.0358 1.07129 24.8467 1.07129Z" fill="none" fillOpacity="0.7" stroke="white" strokeOpacity="0.7" strokeWidth="0.652961" />
                  </g>
                  <g transform="translate(85, 90)">
                    <path d="M19.0312 0.285156C24.0177 0.285156 28.5204 1.32298 31.7676 2.98926C35.0274 4.66205 36.959 6.92997 36.959 9.36816C36.9589 11.8063 35.0273 14.0743 31.7676 15.7471C28.5204 17.4133 24.0177 18.4512 19.0312 18.4512C14.0448 18.4511 9.54207 17.4134 6.29492 15.7471C3.0353 14.0743 1.10453 11.8063 1.10449 9.36816C1.10449 6.93004 3.0353 4.66204 6.29492 2.98926C9.54207 1.32296 14.0448 0.285199 19.0312 0.285156Z" fill="white" fillOpacity="0.9" stroke="white" strokeOpacity="0.4" strokeWidth="0.478061" />
                  </g>
                  <g transform="translate(170, 140)">
                    <path d="M25.6426 0.572266C32.4535 0.572266 38.6038 1.98966 43.0391 4.26562C47.4912 6.55033 50.1287 9.64847 50.1289 12.9785C50.1289 16.3086 47.4912 19.4066 43.0391 21.6914C38.6038 23.9674 32.4535 25.3848 25.6426 25.3848C18.8317 25.3848 12.6813 23.9674 8.24609 21.6914C3.794 19.4066 1.15625 16.3086 1.15625 12.9785C1.15642 9.64848 3.79398 6.55033 8.24609 4.26562C12.6813 1.98966 18.8317 0.572271 25.6426 0.572266Z" stroke="white" strokeOpacity="0.9" strokeWidth="0.652961" />
                  </g>
                  <g transform="translate(310, 94)">
                    <path d="M19.0312 0.285156C24.0177 0.285156 28.5204 1.32298 31.7676 2.98926C35.0274 4.66205 36.959 6.92997 36.959 9.36816C36.9589 11.8063 35.0273 14.0743 31.7676 15.7471C28.5204 17.4133 24.0177 18.4512 19.0312 18.4512C14.0448 18.4511 9.54207 17.4134 6.29492 15.7471C3.0353 14.0743 1.10453 11.8063 1.10449 9.36816C1.10449 6.93004 3.0353 4.66204 6.29492 2.98926C9.54207 1.32296 14.0448 0.285199 19.0312 0.285156Z" fill="white" fillOpacity="0.9" stroke="white" strokeOpacity="0.9" strokeWidth="0.478061" />
                  </g>
                  <g transform="translate(220, 114)">
                    <path d="M19.0312 0.285156C24.0177 0.285156 28.5204 1.32298 31.7676 2.98926C35.0274 4.66205 36.959 6.92997 36.959 9.36816C36.9589 11.8063 35.0273 14.0743 31.7676 15.7471C28.5204 17.4133 24.0177 18.4512 19.0312 18.4512C14.0448 18.4511 9.54207 17.4134 6.29492 15.7471C3.0353 14.0743 1.10453 11.8063 1.10449 9.36816C1.10449 6.93004 3.0353 4.66204 6.29492 2.98926C9.54207 1.32296 14.0448 0.285199 19.0312 0.285156Z" fill="white" fillOpacity="0.9" stroke="white" strokeOpacity="0.9" strokeWidth="0.478061" />
                  </g>
                  <g transform="translate(270,87)">
                    <path d="M24.8467 1.07129C31.6576 1.07129 37.8079 2.48868 42.2432 4.76465C46.6953 7.04936 49.3328 10.1475 49.333 13.4775C49.333 16.8076 46.6953 19.9057 42.2432 22.1904C37.8079 24.4664 31.6576 25.8838 24.8467 25.8838C18.0358 25.8838 11.8854 24.4664 7.4502 22.1904C2.9981 19.9057 0.360352 16.8076 0.360352 13.4775C0.360524 10.1475 2.99808 7.04935 7.4502 4.76465C11.8854 2.48868 18.0358 1.07129 24.8467 1.07129Z" stroke="white" strokeOpacity="0.9" strokeWidth="0.652961" />
                  </g>
                </g>

                <defs>
                  <filter id="filter0_ii_1100_730" x="-89.2393" y="-89.7012" width="595.763" height="370.885" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="1" dy="1" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1100_730" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="-1" dy="-2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="effect1_innerShadow_1100_730" result="effect2_innerShadow_1100_730" />
                  </filter>
                  <clipPath id="bgblur_layer4_clip_path" transform="translate(89.2393 89.7012)">
                    <path d="M416.284 95.7416L208.642 0.40918L1 95.7416L208.642 191.074L416.284 95.7416Z" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Layer 3 - Bottom cubic element - using CSS class instead of inline style */}
            <div className="layer3">
              <svg xmlns="http://www.w3.org/2000/svg" width="166" height="168" viewBox="0 0 166 168" fill="none" style={{ filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.6))' }}>
                <path d="M164.91 95.448L82.955 57.7188L1 95.448L82.955 133.177L164.91 95.448Z" fill="#FDFDFE" stroke="white" strokeWidth="0.499725" />
                <path d="M164.91 129.428L82.955 91.6992L1 129.428L82.955 167.158L164.91 129.428Z" stroke="white" strokeWidth="0.499725" />
                <path d="M164.91 95.6973V129.425L82.9551 167.158V133.301L164.91 95.6973Z" fill="white" fillOpacity="0.4" stroke="white" strokeWidth="0.499725" />
                <path d="M1.00011 95.6973V129.425L82.9551 167.158V133.301L1.00011 95.6973Z" fill="white" fillOpacity="0.4" stroke="white" strokeWidth="0.499725" />
                <path d="M121.933 96.447V0M91.9494 115.686V13.4926M44.7254 90.7001V6.99615M77.9571 84.9533V45.475M65.2141 106.941V33.2317M142.422 93.1988V52.9709M22.9873 93.1988V52.9709" stroke="white" strokeWidth="0.499725" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}