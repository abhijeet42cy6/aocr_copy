import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import MiddleSection from './MiddleSection'
import './Pipeline.css'

const Pipeline = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const isMobile = screenWidth <= 480;

    // Refs for title animation
    const titleWordRefs = {
        Intelligent: useRef(null),
        OCR: useRef(null),
        Pipeline: useRef(null),
        in: useRef(null),
        Action: useRef(null)
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Title animation effect
    useEffect(() => {
        const allElements = Object.values(titleWordRefs).map(ref => ref.current);
        if (!allElements.every(el => el)) return;

        // Create intersection observer to trigger animation when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Start the blinking animation
                    startBlinkAnimation(allElements);
                    observer.unobserve(entry.target); // Only trigger once
                }
            });
        }, { threshold: 0.5 });

        // Observe the first element to trigger the animation
        observer.observe(allElements[0]);

        return () => observer.disconnect();
    }, []);

    const startBlinkAnimation = (allElements) => {
        // Initial setup - all invisible
        gsap.set(allElements, {
            opacity: 0,
            filter: "brightness(1)",
            textShadow: "0 0 0 rgba(0,0,0,0)"
        });

        // Main timeline
        const mainTimeline = gsap.timeline();

        // Quick initial blinks for each element
        const blinkElement = (target, intensity, numBlinks) => {
            const sequence = gsap.timeline();
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
                    });
            }
            return sequence;
        };

        // All elements start hidden
        gsap.set(allElements, { opacity: 0 });

        // Create parallel animations for each word at different times
        mainTimeline.add(() => {
            // Intelligent blinks first
            blinkElement(titleWordRefs.Intelligent.current, 1.7, 4);
        });

        // OCR with delay
        mainTimeline.add(() => {
            blinkElement(titleWordRefs.OCR.current, 1.5, 5);
        }, "+=0.15");

        // Pipeline with more delay
        mainTimeline.add(() => {
            blinkElement(titleWordRefs.Pipeline.current, 1.3, 4);
        }, "+=0.15");

        // "in" with more delay
        mainTimeline.add(() => {
            blinkElement(titleWordRefs.in.current, 1.2, 4);
        }, "+=0.15");

        // Action with most delay
        mainTimeline.add(() => {
            blinkElement(titleWordRefs.Action.current, 1.1, 4);
        }, "+=0.15");

        // Set final state for all elements
        mainTimeline.to(allElements, {
            opacity: 1,
            filter: "brightness(1)",
            duration: 0.05
        }, "+=0.1");
    };

    return (
        <div className='pipeline-container'>
            <div className='pipeline-heading'>
                <p><span ref={titleWordRefs.Intelligent}>Intelligent</span> <span ref={titleWordRefs.OCR}>OCR</span> <span ref={titleWordRefs.Pipeline}>Pipeline</span> <span ref={titleWordRefs.in}>in</span> <span ref={titleWordRefs.Action}>Action</span></p>
            </div>
            <div className='pipeline-main-section'>
                <div className='pipeline-left-section'>
                    <img
                        src="/faded_tilt.svg"
                        alt="Faded tilted lines background"
                        className='pipeline-faded-tilt-image'
                    />
                </div>
                <MiddleSection />
                <div className='pipeline-right-section'>
                </div>
            </div>
            <div className='main-section-mobile'>
                <div className="svg-mobile">
                    <img src="./pipeline.png" alt="" />
                </div>

                {/* Four Pipeline Stage Cards */}
                <div className="pipeline-cards">
                    <div className="pipeline-card card-01">
                        <div className="card-number">01</div>
                        <div className="card-content">
                            <h3 className="card-title">INGEST</h3>
                            <p className="card-description">Upload files or data from emails, cloud storage services, support tickets, and just about any data source.</p>
                        </div>
                    </div>

                    <div className="pipeline-card card-02">
                        <div className="card-number">02</div>
                        <div className="card-content">
                            <h3 className="card-title">UNDERSTAND</h3>
                            <p className="card-description">Extract data accurately with our advanced AI extractors that don't rely on predefined templates.</p>
                            
                        </div>
                    </div>

                    <div className="pipeline-card card-03">
                        <div className="card-number">03</div>
                        <div className="card-content">
                            <h3 className="card-title">TAKE ACTION</h3>
                            <p className="card-description">Leverage decision engines to flag, review, validate files, or enhance your extracted/missing data.</p>
                        </div>
                    </div>

                    <div className="pipeline-card card-04">
                        <div className="card-number">04</div>
                        <div className="card-content">
                            <h3 className="card-title">EXPORT</h3>
                            <p className="card-description">Push structured data into your CRM, WMS, database directly - or export as XLS, CSV, XML etc.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Pipeline