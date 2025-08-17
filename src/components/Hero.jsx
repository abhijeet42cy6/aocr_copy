
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

function Hero() {
  const navigate = useNavigate()
  const prefixRef = useRef(null)  // a_ as one unit
  const letterRefs = {
    O: useRef(null),
    C: useRef(null),
    R: useRef(null)
  }

  useEffect(() => {
    const allElements = [prefixRef.current, ...Object.values(letterRefs).map(ref => ref.current)]

    // Initial setup - all invisible
    gsap.set(allElements, {
      opacity: 0,
      filter: "brightness(1)",
      textShadow: "0 0 0 rgba(255,255,255,0)"
    })

    // Main timeline
    const mainTimeline = gsap.timeline()

    // Quick initial blinks for each element
    const blinkElement = (target, intensity, numBlinks) => {
      const sequence = gsap.timeline()
      for (let i = 0; i < numBlinks; i++) {
        sequence
          .to(target, {
            opacity: 0,
            duration: 0.09,
            ease: "steps(1)"
          })
          .to(target, {
            opacity: 1,
            filter: `brightness(${intensity})`,
            duration: 0.02,
            ease: "steps(1)"
          })
      }
      return sequence
    }

    // All elements start hidden
    gsap.set(allElements, { opacity: 0 })

    // Create parallel animations for OCR
    mainTimeline.add(() => {
      // O, C, R blink first
      blinkElement(letterRefs.O.current, 1.7, 4)
      blinkElement(letterRefs.C.current, 1.5, 5)
      blinkElement(letterRefs.R.current, 1.3, 4)
    })

    // Add a_ with delay and more blinks
    mainTimeline.add(() => {
      blinkElement(prefixRef.current, 2, 7) // More blinks for a_
    }, "+=0.15") // Reduced delay for faster timing

    // Set final state
    mainTimeline.to(allElements, {
      opacity: 1,
      filter: "brightness(1)",
      duration: 0.05
    }, "+=0.1") // Reduced delay for faster timing
  }, [])

  return (
    <div className="landing-container">
      {/* Background layers */}
      <div className="background"></div>
      <div className="earth-overlay"></div>
      <div className="lights-effect"></div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background-desktop"></div>
        <video
          className="hero-video-bg"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/herobg.mp4" type="video/mp4" />
        </video>

        <div className="hero-content">
          <h1 className="hero-logo">
            a_OCR
          </h1>
          <p className="hero-tagline"> <span ref={prefixRef} className="prefix">Any </span>
            <span ref={letterRefs.C}>Data </span>
            <span ref={letterRefs.O}>to </span>
            <span ref={letterRefs.R}>Intelligence</span></p>
          <div className="hero-button-wrapper">
            <button className="hero-button" onClick={() => navigate('/request-access')}>
              Request Access
              <svg className="button-arrow" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 25" fill="none">
                <rect width="32" height="28" transform="translate(0 0.5)" fill="white" fill-opacity="0.01" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83393 18.6665C5.5215 18.3541 5.5215 17.8475 5.83393 17.5352L16.4683 6.90078H9.59961C9.15779 6.90078 8.79961 6.54261 8.79961 6.10078C8.79961 5.65896 9.15779 5.30078 9.59961 5.30078H18.3996C18.6118 5.30078 18.8153 5.38507 18.9654 5.5351C19.1153 5.68513 19.1996 5.88861 19.1996 6.10078V14.9008C19.1996 15.3426 18.8414 15.7008 18.3996 15.7008C17.9579 15.7008 17.5996 15.3426 17.5996 14.9008V8.03216L6.96529 18.6665C6.65288 18.9789 6.14635 18.9789 5.83393 18.6665Z" fill="#1C2024" />
              </svg>
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" width="519" height="55" viewBox="0 0 519 55" fill="none" className="hero-arrow-line">
              <path d="M526.414 -122.414L749.415 100.586L748 102L525 -121L526.414 -122.414ZM505.414 -122.414L728.415 100.586L727 102L504 -121L505.414 -122.414ZM484.414 -122.414L707.415 100.586L706 102L483 -121L484.414 -122.414ZM463.414 -122.414L686.415 100.586L685 102L462 -121L463.414 -122.414ZM442.414 -122.414L665.415 100.586L664 102L441 -121L442.414 -122.414ZM421.414 -122.414L644.415 100.586L643 102L420 -121L421.414 -122.414ZM400.414 -122.414L623.415 100.586L622 102L399 -121L400.414 -122.414ZM379.414 -122.414L602.415 100.586L601 102L378 -121L379.414 -122.414ZM358.414 -122.414L581.415 100.586L580 102L357 -121L358.414 -122.414ZM337.414 -122.414L560.415 100.586L559 102L336 -121L337.414 -122.414ZM316.414 -122.414L539.415 100.586L538 102L315 -121L316.414 -122.414ZM295.414 -122.414L518.415 100.586L517 102L294 -121L295.414 -122.414ZM274.414 -122.414L497.415 100.586L496 102L273 -121L274.414 -122.414ZM253.414 -122.414L476.415 100.586L475 102L252 -121L253.414 -122.414ZM232.414 -122.414L455.415 100.586L454 102L231 -121L232.414 -122.414ZM211.414 -122.414L434.415 100.586L433 102L210 -121L211.414 -122.414ZM190.414 -122.414L413.415 100.586L412 102L189 -121L190.414 -122.414ZM169.414 -122.414L392.415 100.586L391 102L168 -121L169.414 -122.414ZM148.414 -122.414L371.415 100.586L370 102L147 -121L148.414 -122.414ZM127.414 -122.414L350.415 100.586L349 102L126 -121L127.414 -122.414ZM106.414 -122.414L329.415 100.586L328 102L105 -121L106.414 -122.414ZM85.4141 -122.414L308.415 100.586L307 102L84 -121L85.4141 -122.414ZM64.4141 -122.414L287.415 100.586L286 102L63 -121L64.4141 -122.414ZM43.4141 -122.414L266.415 100.586L265 102L42 -121L43.4141 -122.414ZM22.4141 -122.414L245.415 100.586L244 102L21 -121L22.4141 -122.414ZM1.41405 -122.414L224.415 100.586L223 102L-9.74764e-06 -121L1.41405 -122.414ZM-19.5859 -122.414L203.415 100.586L202 102L-21 -121L-19.5859 -122.414ZM-40.5859 -122.414L182.415 100.586L181 102L-42 -121L-40.5859 -122.414ZM-61.5859 -122.414L161.415 100.586L160 102L-63 -121L-61.5859 -122.414ZM-82.5859 -122.414L140.415 100.586L139 102L-84 -121L-82.5859 -122.414ZM-103.586 -122.414L119.415 100.586L118 102L-105 -121L-103.586 -122.414ZM-124.586 -122.414L98.415 100.586L97 102L-126 -121L-124.586 -122.414ZM-145.586 -122.414L77.415 100.586L76 102L-147 -121L-145.586 -122.414ZM-166.586 -122.414L56.415 100.586L55 102L-168 -121L-166.586 -122.414ZM-187.586 -122.414L35.415 100.586L34 102L-189 -121L-187.586 -122.414ZM-208.586 -122.414L14.415 100.586L13 102L-210 -121L-208.586 -122.414Z" fill="url(#paint0_linear_1024_1013)" fillOpacity="0.4" />
              <defs>
                <linearGradient id="paint0_linear_1024_1013" x1="3" y1="-10.2071" x2="515" y2="-10.2068" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="bottom-info-mobile">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 2C7.77614 2 8 2.22386 8 2.5V11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929V2.5C7 2.22386 7.22386 2 7.5 2Z" fill="white" /></svg>
      </div>
      {/* Bottom Info */}
      <div className="bottom-info">
        <div className="bottom-section">
          <div className="info-label" style={{ margin: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.5 2C7.77614 2 8 2.22386 8 2.5V11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929V2.5C7 2.22386 7.22386 2 7.5 2Z" fill="white" />
              </svg></div>
            <div> SCROLL DOWN</div>
          </div>
          <div className="info-value" style={{ color: '#ffffff00' }}>.</div>

        </div>

        <div className="bottom-section">
          <div className="info-label">TAGLINE</div>
          <div className="info-value">ANY DATA TO INTELLIGENCE</div>
        </div>

        <div className="bottom-section">
          <div className="info-label">PARENT COMPANY</div>
          <div className="info-value">A_PARATUS</div>
        </div>

        <div className="bottom-section">
          <div className="info-label">ESTD</div>
          <div className="info-value">2024 -</div>
        </div>
      </div>
    </div>
  )
}

export default Hero 
