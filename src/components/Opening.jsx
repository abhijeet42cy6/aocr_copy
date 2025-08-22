// PinnedWordRevealPage.jsx
import React, { useRef, useLayoutEffect, useState, useCallback } from "react";
import ThreeLinePattern from './ThreeLinePattern';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Helper: distance from point to center of box
function distanceToBoxCenter(mouse, box) {
  const cx = box.left + box.width / 2;
  const cy = box.top + box.height / 2;
  return Math.sqrt((mouse.x - cx) ** 2 + (mouse.y - cy) ** 2);
}

// Helper: calculate grid distance between two pattern positions
const isAdjacent = (idx1, idx2, gridData) => {
  if (idx1 < 0 || idx2 < 0 || idx1 >= gridData.length || idx2 >= gridData.length) {
    return false;
  }
  const pos1 = gridData[idx1];
  const pos2 = gridData[idx2];

  // Check if patterns are neighbors (horizontally or vertically)
  const colDiff = Math.abs(pos1.col - pos2.col);
  const rowDiff = Math.abs(pos1.row - pos2.row);

  return (colDiff <= 1 && rowDiff === 0) || (colDiff === 0 && rowDiff <= 1);
};

export default function PinnedWordRevealPage() {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);

  // Vector lines configuration - same as Opening.jsx
  const lines = {
    line1: {
      start: { x: 13.5, y: 0 },
      end: { x: 13.5, y: 13 }
    },
    line2: {
      start: { x: 13.5, y: 13 },
      end: { x: 27, y: 14 }
    },
    line3: {
      start: { x: 13.5, y: 13 },
      end: { x: 9, y: 19 }
    }
  };

  // Pattern grid constants - same as Opening.jsx
  const ROWS = 6;
  const COLS = 24;
  const BOX_W = 27;
  const BOX_H = 26;
  const H_GAP = 27;
  const V_GAP = 32;

  // Hidden indices per row - same as Opening.jsx
  const hiddenMap = [
    [7, 16, 19],
    [1, 5, 14, 21],
    [2, 7, 10, 15, 23],
    [4, 5, 16, 22],
    [1, 6, 14, 23],
    [11, 12, 15],
  ];

  // Split grid for top and bottom
  const gridTop = [];
  const gridBottom = [];
  let idx = 0;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (!hiddenMap[row].includes(col)) {
        if (row < 3) {
          gridTop.push({ row, col, idx });
        } else {
          gridBottom.push({ row: row - 3, col, idx });
        }
        idx++;
      }
    }
  }

  // Top grid state
  const gridTopRef = useRef(null);
  const [hoverIdxTop, setHoverIdxTop] = useState(null);
  const getBoxRectsTop = useCallback(() => {
    return gridTop.map(({ row, col }) => ({
      left: col * (BOX_W + H_GAP),
      top: row * (BOX_H + V_GAP),
      width: BOX_W,
      height: BOX_H,
    }));
  }, [gridTop]);
  const handleMouseMoveTop = (e) => {
    const rect = gridTopRef.current.getBoundingClientRect();
    const mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const boxes = getBoxRectsTop();
    let minDist = Infinity;
    let minIdx = null;
    boxes.forEach((box, idx) => {
      const dist = distanceToBoxCenter(mouse, box);
      if (dist < minDist) {
        minDist = dist;
        minIdx = idx;
      }
    });
    setHoverIdxTop(minDist < 40 ? minIdx : null);
  };
  const handleMouseLeaveTop = () => setHoverIdxTop(null);

  // Bottom grid state
  const gridBottomRef = useRef(null);
  const [hoverIdxBottom, setHoverIdxBottom] = useState(null);
  const getBoxRectsBottom = useCallback(() => {
    return gridBottom.map(({ row, col }) => ({
      left: col * (BOX_W + H_GAP),
      top: row * (BOX_H + V_GAP),
      width: BOX_W,
      height: BOX_H,
    }));
  }, [gridBottom]);
  const handleMouseMoveBottom = (e) => {
    const rect = gridBottomRef.current.getBoundingClientRect();
    const mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const boxes = getBoxRectsBottom();
    let minDist = Infinity;
    let minIdx = null;
    boxes.forEach((box, idx) => {
      const dist = distanceToBoxCenter(mouse, box);
      if (dist < minDist) {
        minDist = dist;
        minIdx = idx;
      }
    });
    setHoverIdxBottom(minDist < 40 ? minIdx : null);
  };
  const handleMouseLeaveBottom = () => setHoverIdxBottom(null);

  // Style for a SINGLE pattern box
  const singlePatternStyle = {
    position: 'relative',
    width: '27px',
    height: '26px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '27px 26px',
    backgroundPosition: 'center',
    opacity: 0.15,
    transition: 'opacity 0.3s ease-out, filter 0.3s ease-out',
    cursor: 'pointer',
  };

  // Your sentence (edit freely)
  const sentence =
    "The foundation of AI automation—transforming unstructured documents into machine-actionable data across your enterprise.";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // collect word nodes
      const words = wordsRef.current.filter(Boolean);
      if (!words.length) return;

      // ensure starting state (no movement, only opacity)
      gsap.set(words, { opacity: 0.1 });

      // timeline that fades words in with stagger (no y/scale/rotation)
      const tl = gsap.timeline().to(words, {
        opacity: 1,
        stagger: 0.22,           // reveal gap between words
        duration: 0.4,           // fade duration per word
        ease: "power1.out",
      });

      // pin the section for the whole animation,
      // and scrub so opacity follows scroll
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        animation: tl,
        start: "top top",
        end: "+=" + words.length * 50, // pin length based on word count
        pin: true,          // lock the screen to this section
        scrub: true,        // tie progress to scroll for smoothness
        markers: false,
        anticipatePin: 1,
      });

      return () => {
        st.kill();
        tl.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Render top rows
  let gridIdxTop = 0;
  const rowsTop = [];
  for (let row = 0; row < 3; row++) {
    const cols = [];
    for (let col = 0; col < COLS; col++) {
      if (hiddenMap[row].includes(col)) {
        cols.push(
          <div key={col} style={{ ...singlePatternStyle, visibility: 'hidden' }} />
        );
      } else {
        let opacity = 0.15;
        let lineColor = '#000';
        if (hoverIdxTop !== null) {
          if (gridIdxTop === hoverIdxTop) {
            opacity = 1;
            lineColor = '#111';
          } else if (isAdjacent(gridIdxTop, hoverIdxTop, gridTop)) {
            opacity = 0.5;
          }
        }
        cols.push(
          <ThreeLinePattern
            key={col}
            spacing={0}
            style={{ ...singlePatternStyle, opacity }}
            lineColor={lineColor}
            lineWidth={1}
            line1Start={lines.line1.start}
            line1End={lines.line1.end}
            line2Start={lines.line2.start}
            line2End={lines.line2.end}
            line3Start={lines.line3.start}
            line3End={lines.line3.end}
          />
        );
        gridIdxTop++;
      }
    }
    rowsTop.push(
      <div className="hard-row-openingO" key={row}>
        {cols}
      </div>
    );
  }

  // Render bottom rows
  let gridIdxBottom = 0;
  const rowsBottom = [];
  for (let row = 3; row < 6; row++) {
    const cols = [];
    for (let col = 0; col < COLS; col++) {
      if (hiddenMap[row].includes(col)) {
        cols.push(
          <div key={col} style={{ ...singlePatternStyle, visibility: 'hidden' }} />
        );
      } else {
        let opacity = 0.15;
        let lineColor = '#000';
        if (hoverIdxBottom !== null) {
          if (gridIdxBottom === hoverIdxBottom) {
            opacity = 1;
            lineColor = '#111';
          } else if (isAdjacent(gridIdxBottom, hoverIdxBottom, gridBottom)) {
            opacity = 0.5;
          }
        }
        cols.push(
          <ThreeLinePattern
            key={col}
            spacing={0}
            style={{ ...singlePatternStyle, opacity }}
            lineColor={lineColor}
            lineWidth={1}
            line1Start={lines.line1.start}
            line1End={lines.line1.end}
            line2Start={lines.line2.start}
            line2End={lines.line2.end}
            line3Start={lines.line3.start}
            line3End={lines.line3.end}
          />
        );
        gridIdxBottom++;
      }
    }
    rowsBottom.push(
      <div className="hard-row-openingO" key={row}>
        {cols}
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="page-openingO">
      <style>{`
        /* Page base - unique to OpeningO */
        .page-openingO {
          min-height: 100vh;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6vh 5vw;
          box-sizing: border-box;
          position: relative;
        }

        /* Text box */
        .hero-wrap-openingO {
          max-width: 1100px;
          width: 100%;
          position: relative;
          z-index: 10;
        }

        .headline-openingO {
          margin: 0;
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI",
            Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji",
            "Segoe UI Emoji";
          font-size: 44px;
          line-height: 1.3;
          color: #333333;
          font-weight: 400;
          text-align: center;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Keep words inline but targetable */
        .headline-openingO .word {
          display: inline-block;
          opacity: 0;
          will-change: opacity;
          margin-right: 10px;
        }

        /* Optional subtle color accents */
        .muted-openingO { color:rgba(75, 85, 99, 0.61); }
        .highlight-openingO { color: #4169e1; }

        /* Vector grid styling - unique to OpeningO */
        .hard-grid-openingO {
          margin: 0 53px 0 53px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .top-grid-openingO {
          margin-top: 70px; /* Pushed down by 20px from 35px */
        }

        .bottom-grid-openingO {
          margin-top: 650px; /* Pushed down by 50px from 350px */
          margin-bottom: 35px;
        }

        .hard-row-openingO {
          display: flex;
          gap: 27px;
          justify-content: center;
          pointer-events: auto;
        }

        /* Ensure text is above the grid */
        .hero-wrap-openingO {
          z-index: 20;
        }
      `}</style>

      {/* Vector Lines Grid - Top */}
      <div
        className="hard-grid-openingO top-grid-openingO"
        ref={gridTopRef}
        onMouseMove={handleMouseMoveTop}
        onMouseLeave={handleMouseLeaveTop}
        style={{ userSelect: 'none' }}
      >
        {rowsTop}
      </div>

      {/* Vector Lines Grid - Bottom */}
      <div
        className="hard-grid-openingO bottom-grid-openingO"
        ref={gridBottomRef}
        onMouseMove={handleMouseMoveBottom}
        onMouseLeave={handleMouseLeaveBottom}
        style={{ userSelect: 'none' }}
      >
        {rowsBottom}
      </div>

      <div className="hero-wrap-openingO">
        <h1 className="headline-openingO" aria-label={sentence}>
          {sentence.split(" ").map((w, i) => (
            <span
              key={i}
              className={`word${
                // simple example: tint a few words if you like (optional)
                [" foundation ", "automation—", "unstructured", "documents", "machine-actionable", "data","into"].includes(
                  w.replace(/[^\w-—]/g, "")
                )
                  ? " highlight-openingO"
                  : ""
                }`}
              ref={(el) => (wordsRef.current[i] = el)}
            >
              {w}
              {i < sentence.split(" ").length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
