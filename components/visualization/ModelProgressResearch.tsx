'use client';

import React from 'react';
import { SourceLine } from '../ui/SourceLine';

/**
 * Error-collapse chart.
 *
 * We plot *remaining error* (100 − score) instead of raw score. The editorial
 * argument — "three different kinds of work, failure rates cut ~90% in under
 * three years" — is an argument about error collapse, not a climb. Inverting
 * the axis makes the lines fall, which is literally the thing the viewer is
 * supposed to see.
 *
 * Three benchmarks only, each with a clean ≥3-point trajectory:
 *   SWE-bench Verified  — software-engineering agents
 *   GPQA Diamond        — graduate-level hard-science reasoning
 *   MMLU                — broad knowledge QA (saturation reference)
 *
 * SWE-bench (original), HumanEval, and MMMU are dropped — gaps or early
 * termination split attention. Full underlying table: /model-progress-research.
 */

type Point = { year: number; score: number };

interface Series {
  key: string;
  label: string;
  note: string;
  color: string;
  points: Point[];
}

const series: Series[] = [
  {
    key: 'swe-verified',
    label: 'SWE-bench Verified',
    note: 'software engineering',
    color: '#8a3a1f',
    points: [
      { year: 2024, score: 33.2 },
      { year: 2025, score: 80.9 },
      { year: 2026, score: 93.9 },
    ],
  },
  {
    key: 'gpqa',
    label: 'GPQA Diamond',
    note: 'hard-science reasoning',
    color: '#6f4a8f',
    points: [
      { year: 2023, score: 39.0 },
      { year: 2024, score: 59.4 },
      { year: 2025, score: 86.95 },
      { year: 2026, score: 94.5 },
    ],
  },
  {
    key: 'mmlu',
    label: 'MMLU',
    note: 'broad knowledge QA',
    color: '#2d5f4a',
    points: [
      { year: 2023, score: 86.4 },
      { year: 2024, score: 90.4 },
      { year: 2025, score: 93.4 },
    ],
  },
];

const width = 900;
const height = 460;
const padding = { top: 52, right: 200, bottom: 64, left: 78 };
const yearMin = 2023;
const yearMax = 2026;
const errMin = 0;
const errMax = 70;

function xFor(year: number) {
  return (
    padding.left +
    ((year - yearMin) / (yearMax - yearMin)) * (width - padding.left - padding.right)
  );
}
function yFor(error: number) {
  return (
    padding.top +
    ((error - errMin) / (errMax - errMin)) * (height - padding.top - padding.bottom)
  );
}

const saturationTop = yFor(10);
const saturationBottom = yFor(0);
const yTicks = [0, 10, 25, 50, 70];
const yearTicks = [2023, 2024, 2025, 2026];

export function ModelProgressResearch() {
  return (
    <div
      className="gpu-accelerated"
      style={{ width: '100%', margin: '1.25rem 0 0', display: 'grid', justifyItems: 'center' }}
    >
      <div
        className="model-progress-panel"
        style={{
          width: 'min(100%, 78rem)',
          display: 'grid',
          gap: '0.9rem',
          padding: '1.5rem 1.75rem 1.25rem',
        }}
      >
        <svg
          width="100%"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Remaining error on SWE-bench Verified, GPQA Diamond, and MMLU collapsed from roughly 61 to 6 percent between 2023 and 2026."
          style={{ overflow: 'visible' }}
        >
          <rect
            x={padding.left}
            y={saturationTop}
            width={width - padding.left - padding.right}
            height={saturationBottom - saturationTop}
            fill="rgba(45, 95, 74, 0.10)"
          />
          <text
            x={padding.left + 10}
            y={saturationTop - 8}
            fontSize="13"
            fill="rgba(45, 95, 74, 0.85)"
            fontWeight="600"
            letterSpacing="0.08em"
          >
            SATURATION FLOOR · &lt; 10% ERROR
          </text>

          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={padding.left}
                y1={yFor(tick)}
                x2={width - padding.right}
                y2={yFor(tick)}
                stroke="rgba(31, 26, 22, 0.08)"
                strokeWidth="1"
              />
              <text
                x={padding.left - 14}
                y={yFor(tick) + 5}
                textAnchor="end"
                fill="rgba(31, 26, 22, 0.7)"
                fontSize="15"
              >
                {tick}%
              </text>
            </g>
          ))}

          <text
            x={24}
            y={height / 2}
            fill="rgba(31, 26, 22, 0.75)"
            fontSize="13"
            fontWeight="600"
            letterSpacing="0.08em"
            transform={`rotate(-90 24 ${height / 2})`}
            textAnchor="middle"
          >
            % REMAINING ERROR (100 − score)
          </text>

          {yearTicks.map((year) => (
            <g key={year}>
              <line
                x1={xFor(year)}
                y1={padding.top}
                x2={xFor(year)}
                y2={height - padding.bottom}
                stroke="rgba(31, 26, 22, 0.06)"
                strokeWidth="1"
              />
              <text
                x={xFor(year)}
                y={height - padding.bottom + 26}
                textAnchor="middle"
                fill="rgba(31, 26, 22, 0.78)"
                fontSize="16"
                fontWeight="600"
              >
                {year}
              </text>
            </g>
          ))}

          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={height - padding.bottom}
            stroke="rgba(31, 26, 22, 0.3)"
            strokeWidth="1.5"
          />
          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke="rgba(31, 26, 22, 0.3)"
            strokeWidth="1.5"
          />

          {series.map((s) => {
            const asError = s.points.map((p) => ({ year: p.year, err: 100 - p.score }));
            const d = asError
              .map(
                (pt, i) =>
                  `${i === 0 ? 'M' : 'L'} ${xFor(pt.year).toFixed(2)} ${yFor(pt.err).toFixed(2)}`,
              )
              .join(' ');
            const first = asError[0];
            const last = asError[asError.length - 1];
            return (
              <g key={s.key}>
                <path
                  d={d}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {asError.map((pt) => (
                  <circle
                    key={pt.year}
                    cx={xFor(pt.year)}
                    cy={yFor(pt.err)}
                    r={5}
                    fill={s.color}
                  >
                    <title>{`${s.label} ${pt.year}: ${(100 - pt.err).toFixed(1)}% score / ${pt.err.toFixed(1)}% error`}</title>
                  </circle>
                ))}
                <text
                  x={xFor(first.year) + 10}
                  y={yFor(first.err) - 10}
                  fill={s.color}
                  fontSize="14"
                  fontWeight="600"
                >
                  {first.err.toFixed(0)}%
                </text>
                <text
                  x={xFor(last.year) + 14}
                  y={yFor(last.err) + 5}
                  fill={s.color}
                  fontSize="17"
                  fontWeight="700"
                >
                  {s.label}
                </text>
                <text
                  x={xFor(last.year) + 14}
                  y={yFor(last.err) + 24}
                  fill={s.color}
                  fontSize="13"
                  fontStyle="italic"
                  opacity="0.85"
                >
                  {s.note} · {last.err.toFixed(1)}%
                </text>
              </g>
            );
          })}
        </svg>

        <SourceLine
          ids={[
            'benchmarksLocal',
            'mythosCard',
            'sweBenchSite',
            'sweBenchVerified',
            'gpqaPaper',
            'aiIndex2025',
          ]}
        />
      </div>
    </div>
  );
}
