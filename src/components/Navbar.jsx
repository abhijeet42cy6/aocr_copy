import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const [isOverOpening, setIsOverOpening] = useState(false)
  const [isOverIntelligence, setIsOverIntelligence] = useState(false)
  const [isOverSolutions, setIsOverSolutions] = useState(false)
  const [isOverPipeline, setIsOverPipeline] = useState(false)
  const [isOverStats, setIsOverStats] = useState(false)
  const [activePage, setActivePage] = useState('0')

  useEffect(() => {
    const handleScroll = () => {
      const openingSection = document.querySelector('.opening-container')
      const intelligenceSection = document.querySelector('.intelligence-layer-container')
      const solutionsSection = document.querySelector('.solutions-container')
      const pipelineSection = document.querySelector('.pipeline-container')
      const statsSection = document.querySelector('.stats-page-container')

      const scrollPosition = window.scrollY + 100 // navbar height + some buffer

      // Check if over Opening section
      if (openingSection) {
        const openingTop = openingSection.offsetTop
        const openingBottom = openingTop + openingSection.offsetHeight

        if (scrollPosition >= openingTop && scrollPosition < openingBottom) {
          setIsOverOpening(true)
          setIsOverIntelligence(false)
          setIsOverSolutions(false)
          setIsOverStats(false)
          setActivePage('features')
        } else {
          setIsOverOpening(false)
        }
      }

      // Check if over Intelligence Layer section
      if (intelligenceSection) {
        const intelligenceTop = intelligenceSection.offsetTop
        const intelligenceBottom = intelligenceTop + intelligenceSection.offsetHeight

        if (scrollPosition >= intelligenceTop && scrollPosition < intelligenceBottom) {
          setIsOverIntelligence(true)
          setIsOverOpening(false)
          setIsOverSolutions(false)
          setIsOverStats(false)
          setActivePage('features')
        } else {
          setIsOverIntelligence(false)
        }
      }

      // Check if over Solutions section
      if (solutionsSection) {
        const solutionsTop = solutionsSection.offsetTop
        const solutionsBottom = solutionsTop + solutionsSection.offsetHeight

        if (scrollPosition >= solutionsTop && scrollPosition < solutionsBottom) {
          setIsOverSolutions(true)
          setIsOverOpening(false)
          setIsOverIntelligence(false)
          setIsOverStats(false)
          setActivePage('applications')
        } else {
          setIsOverSolutions(false)
        }
      }

      // Check if over Pipeline section
      if (pipelineSection) {
        const pipelineTop = pipelineSection.offsetTop
        const pipelineBottom = pipelineTop + pipelineSection.offsetHeight

        if (scrollPosition >= pipelineTop && scrollPosition < pipelineBottom) {
          setIsOverPipeline(true)
          setIsOverSolutions(false)
          setIsOverOpening(false)
          setIsOverIntelligence(false)
          setIsOverStats(false)
          setActivePage('how-it-works')
        } else {
          setIsOverPipeline(false)
        }
      }

      // Check if over Stats section
      if (statsSection) {
        const statsTop = statsSection.offsetTop
        const statsBottom = statsTop + statsSection.offsetHeight

        if (scrollPosition >= statsTop && scrollPosition < statsBottom) {
          setIsOverStats(true)
          setIsOverOpening(false)
          setIsOverIntelligence(false)
          setIsOverSolutions(false)
          setActivePage('stats')
        } else {
          setIsOverStats(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (page) => {
    setActivePage(page)

    // Scroll to appropriate section based on page
    switch (page) {
      case 'features':
        document.querySelector('.intelligence-layer-container')?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'applications':
        document.querySelector('.solutions-container')?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'how-it-works':
        document.querySelector('.pipeline-container')?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'stats':
        document.querySelector('.stats-page-container')?.scrollIntoView({ behavior: 'smooth' })
        break
      default:
        break
    }
  }

  const handleRequestAccess = () => {
    navigate('/request-access')
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <nav className={`nav-container ${isOverOpening ? 'nav-over-opening' : ''} ${isOverIntelligence ? 'nav-over-intelligence' : ''} ${isOverSolutions ? 'nav-over-solutions' : ''} ${isOverPipeline ? 'nav-over-pipeline' : ''} ${isOverStats ? 'nav-over-stats' : ''}`}>
      <div className="nav-section left">
        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>a_OCR</div>
      </div>

      {/* Desktop Navigation */}
      <div className="nav-divider desktop-only"></div>

      <div className="nav-section center desktop-only">
        <ul className="nav-menu">
          <li
            className={`nav-item ${activePage === 'features' ? 'active' : ''}`}
            onClick={() => handleNavClick('features')}
          >
            {activePage === 'features' && <span className="nav-indicator"></span>}
            Features
          </li>
          <li
            className={`nav-item ${activePage === 'applications' ? 'active' : ''}`}
            onClick={() => handleNavClick('applications')}
          >
            {activePage === 'applications' && <span className="nav-indicator"></span>}
            Applications
          </li>
          <li
            className={`nav-item ${activePage === 'how-it-works' ? 'active' : ''}`}
            onClick={() => handleNavClick('how-it-works')}
          >
            {activePage === 'how-it-works' && <span className="nav-indicator"></span>}
            How it works
          </li>
          <li
            className={`nav-item ${activePage === 'stats' ? 'active' : ''}`}
            onClick={() => handleNavClick('stats')}
          >
            {activePage === 'stats' && <span className="nav-indicator"></span>}
            Stats
          </li>
        </ul>
      </div>

      <div className="nav-divider desktop-only"></div>

      <div className="nav-section right desktop-only">
        <div className="nav-button-wrapper">
          <button className="nav-button" onClick={handleRequestAccess}>
            Request Access
            <svg className="button-arrow" style={{ position: 'absolute', right: '17px', top: '17px' }} xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <rect width="24" height="24" transform="translate(0 0.5)" fill="white" fill-opacity="0.01" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83393 18.6665C5.5215 18.3541 5.5215 17.8475 5.83393 17.5352L16.4683 6.90078H9.59961C9.15779 6.90078 8.79961 6.54261 8.79961 6.10078C8.79961 5.65896 9.15779 5.30078 9.59961 5.30078H18.3996C18.6118 5.30078 18.8153 5.38507 18.9654 5.5351C19.1153 5.68513 19.1996 5.88861 19.1996 6.10078V14.9008C19.1996 15.3426 18.8414 15.7008 18.3996 15.7008C17.9579 15.7008 17.5996 15.3426 17.5996 14.9008V8.03216L6.96529 18.6665C6.65288 18.9789 6.14635 18.9789 5.83393 18.6665Z" fill="#1C2024" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Simple horizontal layout */}
      <div className="nav-section right mobile-only">
        <div className="nav-button-wrapper">
          <button className="nav-button mobile-nav-button" onClick={handleRequestAccess}>
            Request Access
            <svg className="button-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <rect width="24" height="24" transform="translate(0 0.5)" fill="white" fill-opacity="0.01" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83393 18.6665C5.5215 18.3541 5.5215 17.8475 5.83393 17.5352L16.4683 6.90078H9.59961C9.15779 6.90078 8.79961 6.54261 8.79961 6.10078C8.79961 5.65896 9.15779 5.30078 9.59961 5.30078H18.3996C18.6118 5.30078 18.8153 5.38507 18.9654 5.5351C19.1153 5.68513 19.1996 5.88861 19.1996 6.10078V14.9008C19.1996 15.3426 18.8414 15.7008 18.3996 15.7008C17.9579 15.7008 17.5996 15.3426 17.5996 14.9008V8.03216L6.96529 18.6665C6.65288 18.9789 6.14635 18.9789 5.83393 18.6665Z" fill="#1C2024" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar