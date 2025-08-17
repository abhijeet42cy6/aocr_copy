import React, { useEffect, useState, useRef } from 'react';

// Custom hook for typewriter effect with intersection observer
const useTypewriter = (text, speed = 50, delay = 2000, dependency = null, shouldStart = false) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // Reset animation when dependency changes
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsTyping(false);
  }, [dependency]);

  useEffect(() => {
    if (!text || !shouldStart) return;

    const timer = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, dependency, shouldStart]);

  useEffect(() => {
    if (!isTyping || currentIndex >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayText(text.slice(0, currentIndex + 1));
      setCurrentIndex(currentIndex + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isTyping, currentIndex, text, speed]);

  return displayText;
};

const styles = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.solutions-container {
  min-height: 100vh;
  background-color: #FFF;
  padding: 90px 95px 60px 95px;
}

.solutions-header {
  margin-bottom: 80px;
  display: flex;
  gap: 90px;
  align-items: flex-start;
}

.solutions-left {
  flex: 0 0 auto;
}

.solutions-label {
  font-size: 12px;
  color: #666;
  font-family: "Source Code Pro";
  margin-bottom: 10px;
}

.solutions-title {
  color: #000;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: var(--Typography-Letter-spacing-8, -0.01rem);
}

.solutions-description {
  margin: 50px 0 0 25px;
  font-size: 15.5px;
  line-height: 1.4;
  color: #444;
  max-width: 100%;
  flex: 1;
  color: rgba(0, 0, 0, 0.60);
  font-weight: 400;
}

.solutions-description-highlight {
  font-weight: 500;
  color: #000;
}

.solutions-content {
  display: flex;
  gap: 90px;
  margin-top: 48px;
  flex-direction: row-reverse;
}

.industry-sidebar {
  width: 240px;
  flex-shrink: 0;
}

.industry-item {
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.industry-item:hover {
  padding-left: 5px;
}

.industry-item.active {
  border-bottom-color: #0e3ba5;
}

.industry-name {
  font-size: 16px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.4);
}

.industry-item.active .industry-name {
  color: #000;
  font-weight: 400;
}

.industry-item.active {
  border-bottom: 1px solid #0e3ba5;
  color: #000;
}

.industry-number {
  font-size: 11px;
  color: #999;
  font-weight: 300;
}

.industry-details-panel {
  flex: 1;
  background-color: #0e3ba5;
  padding: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin-right: 18px;
}

.panel-header {
  font-size: 10px;
  letter-spacing: 2px;
  opacity: 0.8;
  margin-bottom: 20px;
}

.document-types-grid {
  display: grid;
  gap: 5px;
}

.document-type-item {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 32px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.document-type-item:last-child {
  border-bottom: none;
}

.document-type-name {
  font-size: 13px;
  text-decoration: underline;
  text-underline-offset: 1px;
  text-decoration-thickness: 1px;
  opacity: 0.9;
}

.document-type-description {
  font-size: 13px;
  line-height: 1.6;
  opacity: 0.8;
}

.benefits-section {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 4px;
  margin-top: auto;
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.benefits-label {
  font-size: 10px;
  letter-spacing: 2px;
  color: rgba(0, 113, 63, 0.87);
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  margin-bottom: 0;
}

.benefits-arrow {
  width: 15px;
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.benefits-arrow svg {
  width: 15px;
  height: 21px;
}

.benefits-arrow-span{
  color: rgba(0, 113, 63, 0.87);
  font-weight: 700;
  font-size: 10px;
}

.benefits-text {
  font-size: 12px;
  color: rgba(0, 113, 63, 0.87);
  font-family: "Source Code Pro";
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 1.3;
}

.typewriter-cursor {
  animation: blink 1s infinite;
  color: #00713F;
  font-weight: bold;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@media (max-width: 1200px) {
  .solutions-container {
    padding: 40px;
  }
  
  .solutions-title {
    font-size: 56px;
  }
  
  .solutions-content {
    flex-direction: column;
  }
  
  .industry-sidebar {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .solutions-container {
    padding: 20px;
  }
  
  .solutions-title {
    font-size: 40px;
  }
  
  .document-type-item {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .industry-details-panel {
    padding: 30px;
  }
  
  .industry-sidebar {
    display: none !important;
  }
  
  .panel-header {
    display: none !important;
  }
}

  /* Hide mobile selector on larger screens */
  .mobile-industry-selector {
    display: none;
  }

  /* Mobile styles for devices up to 480px */
@media (max-width: 480px) {
  .solutions-container {
    padding: 20px 16px 40px 16px;
    min-height: auto;
  }

  .solutions-header {
    margin-bottom: 40px;
    display: block;
    gap: 0;
  }

  .solutions-left {
    margin-bottom: 20px;
  }

  .solutions-label {
    font-size: 11px;
    margin-bottom: 8px;
  }

  .solutions-title {
    font-size: 28px;
    line-height: 1.1;
    margin-bottom: 0;
  }

  .solutions-description {
    margin: 20px 0 0 0;
    font-size: 14px;
    line-height: 1.5;
    max-width: 100%;
  }

  .solutions-content {
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
  }

  .industry-sidebar {
    width: 100%;
    order: 2;
  }

  .industry-item {
    padding: 14px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }

  .industry-item:hover {
    padding-left: 0;
  }

  .industry-name {
    font-size: 15px;
  }

  .industry-number {
    font-size: 10px;
  }

  .industry-details-panel {
    order: 1;
    margin-right: 0;
    padding: 20px 16px;
    border-radius: 6px;
    position: relative;
  }

  .mobile-industry-selector {
    display: block;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 0;
    padding: 6px 12px;
    font-size: 10px;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);
    font-weight: 500;
    letter-spacing: 0.5px;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 8px center;
    background-size: 12px;
    padding: 6px 12px;
    margin-bottom: 20px;
    min-width: 80px;
    width: 160px;
  }

  .mobile-industry-selector:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  .mobile-industry-selector:active {
    transform: translateY(0);
  }

  .mobile-industry-selector option {
    background: #0e3ba5;
    color: white;
    padding: 8px 12px;
    font-size: 11px;
  }

  .panel-header {
    font-size: 9px;
    letter-spacing: 1.5px;
    margin-bottom: 16px;
  }

  .document-types-grid {
    gap: 16px;
    margin-bottom: 20px;
  }

  .document-type-item {
    display: block;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }

  .document-type-name {
    font-size: 14px;
    margin-bottom: 8px;
    display: block;
  }

  .document-type-description {
    font-size: 12px;
    line-height: 1.5;
  }

  .benefits-section {
    padding: 16px;
    gap: 12px;
    flex-direction: column;
    margin-top: 16px;
  }

  .benefits-label {
    font-size: 9px;
    letter-spacing: 1px;
    margin-bottom: 8px;
    align-self: flex-start;
  }

  .benefits-arrow {
    width: 12px;
    height: 10px;
  }

  .benefits-arrow svg {
    width: 12px;
    height: 16px;
  }

  .benefits-arrow-span {
    padding-top: 12px;
    font-size: 12px;
  }

  .benefits-text {
    font-size: 10px;
    line-height: 1.4;
    letter-spacing: 0.3px;
  }

  /* Mobile-specific layout improvements */
  .solutions-header {
    text-align: left;
  }

  .industry-sidebar {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 16px;
  }

  .industry-item {
    border-radius: 4px;
    margin-bottom: 4px;
    padding: 12px 8px;
    border-bottom: none;
    background: transparent;
    transition: background-color 0.2s ease;
  }

  .industry-item:hover,
  .industry-item.active {
    background-color: rgba(14, 59, 165, 0.1);
    padding-left: 8px;
  }

  .industry-item.active {
    border-left: 3px solid #0e3ba5;
  }

  .industry-item.active .industry-name {
    color: #0e3ba5;
    font-weight: 500;
  }
}
`;

const industries = [
  { name: 'Financial Technology', number: '01' },
  { name: 'Healthcare & Medical', number: '02' },
  { name: 'Legal Services', number: '03' },
  { name: 'Government & Public Sector', number: '04' },
  { name: 'Logistics & Supply Chain', number: '05' }
];

const industryData = {
  'Financial Technology': {
    header: '01 - FINANCIAL TECHNOLOGY',
    documents: [
      {
        name: 'Bank Statements',
        description: 'Extract transaction data, balances, and customer information from multiple banking formats'
      },
      {
        name: 'KYC Documents',
        description: 'Process identity verification including passports, licenses, and proof of address'
      },
      {
        name: 'Loan Applications',
        description: 'Digitize income statements, tax returns, and employment letters'
      },
      {
        name: 'Check Processing',
        description: 'Convert handwritten and printed checks into structured data'
      }
    ]
  },
  'Healthcare & Medical': {
    header: '02 - HEALTHCARE & MEDICAL',
    documents: [
      {
        name: 'Medical Records',
        description: 'Extract patient information, diagnoses, and treatment history from clinical documents'
      },
      {
        name: 'Insurance Claims',
        description: 'Process claim forms, EOBs, and authorization documents automatically'
      },
      {
        name: 'Prescriptions',
        description: 'Digitize handwritten prescriptions and medication orders with high accuracy'
      },
      {
        name: 'Lab Reports',
        description: 'Convert test results and diagnostic reports into searchable data'
      }
    ]
  },
  'Legal Services': {
    header: '03 - LEGAL SERVICES',
    documents: [
      {
        name: 'Contracts',
        description: 'Extract key terms, clauses, and parties from legal agreements'
      },
      {
        name: 'Court Documents',
        description: 'Process pleadings, motions, and judgments with legal entity recognition'
      },
      {
        name: 'Patents & IP',
        description: 'Digitize patent applications and intellectual property documents'
      },
      {
        name: 'Compliance Forms',
        description: 'Automate regulatory filing and compliance document processing'
      }
    ]
  },
  'Government & Public Sector': {
    header: '04 - GOVERNMENT & PUBLIC SECTOR',
    documents: [
      {
        name: 'Citizen Applications',
        description: 'Process permit applications, license renewals, and service requests'
      },
      {
        name: 'Tax Documents',
        description: 'Extract data from tax forms, returns, and assessment notices'
      },
      {
        name: 'Public Records',
        description: 'Digitize historical archives and government documentation'
      },
      {
        name: 'Immigration Papers',
        description: 'Process visa applications, passports, and immigration forms'
      }
    ]
  },
  'Logistics & Supply Chain': {
    header: '05 - LOGISTICS & SUPPLY CHAIN',
    documents: [
      {
        name: 'Shipping Documents',
        description: 'Extract data from bills of lading, packing lists, and manifests'
      },
      {
        name: 'Invoices & POs',
        description: 'Process purchase orders and invoices across multiple formats'
      },
      {
        name: 'Customs Forms',
        description: 'Digitize import/export documentation and customs declarations'
      },
      {
        name: 'Delivery Notes',
        description: 'Convert proof of delivery and receipt confirmations to digital format'
      }
    ]
  }
};

export default function SolutionsByIndustry() {
  const [activeIndustry, setActiveIndustry] = useState('Financial Technology');
  const [isBenefitsVisible, setIsBenefitsVisible] = useState(false);
  const [showMobileSelector, setShowMobileSelector] = useState(false);
  const benefitsRef = useRef(null);

  // Refs for title animation
  const titleWordRefs = {
    Solutions: useRef(null),
    by: useRef(null),
    Industry: useRef(null)
  };

  // Typewriter effect for benefits text - restart when industry changes and only when visible
  const getBenefitsText = (industry) => {
    switch (industry) {
      case 'Financial Technology':
        return "REDUCE MANUAL DATA ENTRY BY 90%, ACCELERATE CUSTOMER ONBOARDING BY 75%, ENSURE REGULATORY COMPLIANCE, AND MINIMIZE HUMAN ERROR IN FINANCIAL CALCULATIONS.";
      case 'Healthcare & Medical':
        return "IMPROVE PATIENT CARE EFFICIENCY BY 80%, REDUCE MEDICAL ERRORS BY 95%, ACCELERATE CLAIMS PROCESSING BY 70%, AND ENHANCE REGULATORY COMPLIANCE IN HEALTHCARE DOCUMENTATION.";
      case 'Legal Services':
        return "ACCELERATE CONTRACT REVIEW BY 85%, REDUCE LEGAL RESEARCH TIME BY 75%, IMPROVE DOCUMENT ACCURACY BY 90%, AND STREAMLINE COMPLIANCE MONITORING PROCESSES.";
      case 'Government & Public Sector':
        return "IMPROVE CITIZEN SERVICE DELIVERY BY 80%, REDUCE PROCESSING TIME BY 70%, ENHANCE DATA SECURITY AND COMPLIANCE, AND STREAMLINE GOVERNMENT OPERATIONS EFFICIENCY.";
      case 'Logistics & Supply Chain':
        return "OPTIMIZE SUPPLY CHAIN VISIBILITY BY 85%, REDUCE DOCUMENT PROCESSING TIME BY 75%, IMPROVE INVENTORY ACCURACY BY 90%, AND ACCELERATE CUSTOMS CLEARANCE PROCESSES.";
      default:
        return "REDUCE MANUAL DATA ENTRY BY 90%, ACCELERATE PROCESSING BY 75%, ENSURE COMPLIANCE, AND MINIMIZE HUMAN ERROR.";
    }
  };

  const benefitsText = getBenefitsText(activeIndustry);
  const typewriterText = useTypewriter(benefitsText, 15, 100, activeIndustry, isBenefitsVisible);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Intersection Observer to detect when benefits section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsBenefitsVisible(true);
        } else {
          setIsBenefitsVisible(false);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (benefitsRef.current) {
      observer.observe(benefitsRef.current);
    }

    return () => {
      if (benefitsRef.current) {
        observer.unobserve(benefitsRef.current);
      }
    };
  }, []);

  // Title animation effect (simplified for mobile)
  useEffect(() => {
    const allElements = Object.values(titleWordRefs).map(ref => ref.current);
    if (!allElements.every(el => el)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Simplified animation for mobile - just fade in
          allElements.forEach((el, index) => {
            setTimeout(() => {
              if (el) {
                el.style.opacity = '1';
                el.style.transition = 'opacity 0.5s ease';
              }
            }, index * 200);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    // Set initial state
    allElements.forEach(el => {
      if (el) el.style.opacity = '0';
    });

    observer.observe(allElements[0]);

    return () => observer.disconnect();
  }, []);

  const currentData = industryData[activeIndustry];
  const currentIndustryNumber = industries.find(ind => ind.name === activeIndustry)?.number || '01';

  const handleMobileIndustryChange = (event) => {
    setActiveIndustry(event.target.value);
  };

  return (
    <div className="solutions-container">
      <div className="solutions-header">
        <div className="solutions-left">
          <div className="solutions-label">[APPLICATIONS]</div>
          <h1 className="solutions-title">
            <span ref={titleWordRefs.Solutions}>Solutions</span> <span ref={titleWordRefs.by}>by </span><br /> <span ref={titleWordRefs.Industry}>Industry</span>
          </h1>
        </div>
        <p className="solutions-description">
          Transform your document processing <span className="solutions-description-highlight">workflow</span> with <span className="solutions-description-highlight">industry-specific OCR solutions</span> designed to
          handle the unique challenges of your sector. Our advanced optical character recognition technology
          delivers precise, <span className="solutions-description-highlight">scalable document digitization</span> across diverse business environments.
        </p>
      </div>

      <div className="solutions-content">
        <div className="industry-details-panel">
          <select 
            className="mobile-industry-selector" 
            value={activeIndustry}
            onChange={handleMobileIndustryChange}
            title="Select industry"
          >
            {industries.map((industry) => (
              <option key={industry.number} value={industry.name}>
                {industry.number} - {industry.name}
              </option>
            ))}
          </select>
          <div className="panel-header">{currentData.header}</div>

          <div className="document-types-grid">
            {currentData.documents.map((doc, index) => (
              <div key={index} className="document-type-item">
                <div className="document-type-name">{doc.name}</div>
                <div className="document-type-description">{doc.description}</div>
              </div>
            ))}
          </div>

          <div className="benefits-section" ref={benefitsRef}>
            <div className="benefits-label">
              <div className="benefits-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="21" viewBox="0 0 15 21" fill="none">
                  <path d="M1 16.5H0.5V17H1V16.5ZM14.8536 16.8536C15.0488 16.6583 15.0488 16.3417 14.8536 16.1464L11.6716 12.9645C11.4763 12.7692 11.1597 12.7692 10.9645 12.9645C10.7692 13.1597 10.7692 13.4763 10.9645 13.6716L13.7929 16.5L10.9645 19.3284C10.7692 19.5237 10.7692 19.8403 10.9645 20.0355C11.1597 20.2308 11.4763 20.2308 11.6716 20.0355L14.8536 16.8536ZM1 0H0.5V16.5H1H1.5V0H1ZM1 16.5V17H14.5V16.5V16H1V16.5Z" fill="#00713F" fillOpacity="0.870588" />
                </svg>
              </div>
              <span className="benefits-arrow-span">KEY BENEFITS</span>
            </div>
            <div className="benefits-text">
              {typewriterText}
              <span className="typewriter-cursor">|</span>
            </div>
          </div>
        </div>

        <div className="industry-sidebar">
          {industries.map((industry) => (
            <div
              key={industry.number}
              className={`industry-item ${activeIndustry === industry.name ? 'active' : ''}`}
              onClick={() => setActiveIndustry(industry.name)}
            >
              <span className="industry-name">{industry.name}</span>
              <span className="industry-number">{industry.number}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}