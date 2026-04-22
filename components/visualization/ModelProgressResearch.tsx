'use client';

import React from 'react';
import { SourceLine } from '../ui/SourceLine';

type Point = number | null; // null renders a gap

interface Series {
  key: string;
  label: string;
  color: string;
  values: Point[]; // aligned to years
}

const years = [2023, 2024, 2025, 2026] as const;

const series: Series[] = [
  { key: 'swe-bench',          label: 'SWE-bench (original)',    color: '#6f391e', values: [1.96, 20.0, null, 77.83] },
  { key: 'swe-bench-verified', label: 'SWE-bench Verified',      color: '#8d4e2f', values: [null, 33.2, 80.9, 93.9] },
  { key: 'humaneval',          label: 'HumanEval',               color: '#2e6b68', values: [67.0, 93.7, null, null] },
  { key: 'mmlu',               label: 'MMLU',                    color: '#c57b4a', values: [86.4, 90.4, 93.4, null] },
  { key: 'gpqa',               label: 'GPQA Diamond',            color: '#8a5a9c', values: [39.0, 59.4, 86.95, 94.5] },
  { key: 'mmmu',               label: 'MMMU',                    color: '#4a6c8a', values: [null, 68.3, 84.2, null] },
];

const width = 880;
const height = 460;
const padding = { top: 56, right: 32, bottom: 64, left: 64 };
const yMin = 0;
const yMax = 100;

function xFor(index: number) {
  return padding.left + (index / (years.length - 1)) * (width - padding.left - padding.right);
}
function yFor(v: number) {
  return height - padding.bottom - ((v - yMin) / (yMax - yMin)) * (height - padding.top - padding.bottom);
}

export function ModelProgressResearch() {
  const yTicks = [0, 25, 50, 75, 100];

  return (
    <div
      className="gpu-accelerated"
      style={{ width: '100%', margin: '1.25rem 0 0', display: 'grid', justifyItems: 'center' }}
    >
      <div
        className="model-progress-panel"
        style={{
          width: 'min(100%, 74rem)',
          display: 'grid',
          gap: '1rem',
          padding: '1.25rem 1.5rem 1.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '44rem' }}>
            <p className="eyebrow model-progress-panel__eyebrow">
              Public milestone scores · Not a single-harness re-run
            </p>
          </div>
          <p className="model-progress-panel__frame">
            Software engineering, hard-science reasoning, coding, knowledge QA,
            and multimodal reasoning all moved sharply between 2023 and 2026.
          </p>
        </div>

        <svg
          width="100%"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Public milestone benchmark scores across 2023 to 2026"
          style={{ overflow: 'visible' }}
        >
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
              <text x={padding.left - 12} y={yFor(tick) + 4} textAnchor="end" fill="rgba(31, 26, 22, 0.7)" fontSize="12">
                {tick}
              </text>
            </g>
          ))}

          {years.map((year, index) => (
            <g key={year}>
              <line
                x1={xFor(index)}
                y1={padding.top}
                x2={xFor(index)}
                y2={height - padding.bottom}
                stroke="rgba(31, 26, 22, 0.06)"
                strokeWidth="1"
              />
              <text x={xFor(index)} y={height - 20} textAnchor="middle" fill="rgba(31, 26, 22, 0.7)" fontSize="12">
                {year}
              </text>
            </g>
          ))}

          <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="rgba(31, 26, 22, 0.3)" strokeWidth="1.5" />
          <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="rgba(31, 26, 22, 0.3)" strokeWidth="1.5" />

          {series.map((s) => {
            // Build a per-run path so nulls create gaps, and draw dots at real points.
            const runs: Array<{ d: string }> = [];
            let run = '';
            s.values.forEach((v, i) => {
              if (v === null) {
                if (run) runs.push({ d: run });
                run = '';
                return;
              }
              run += `${run === '' ? 'M' : ' L'} ${xFor(i).toFixed(2)} ${yFor(v).toFixed(2)}`;
            });
            if (run) runs.push({ d: run });

            return (
              <g key={s.key}>
                {runs.map((r, i) => (
                  <path key={i} d={r.d} fill="none" stroke={s.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                ))}
                {s.values.map((v, i) =>
                  v === null ? null : (
                    <circle key={i} cx={xFor(i)} cy={yFor(v)} r={4} fill={s.color}>
                      <title>{`${s.label} ${years[i]}: ${v}`}</title>
                    </circle>
                  ),
                )}
              </g>
            );
          })}

          <text x={18} y={height / 2} fill="rgba(31, 26, 22, 0.7)" fontSize="12" transform={`rotate(-90 18 ${height / 2})`}>
            Score (0–100)
          </text>
          <text x={width / 2} y={height - 4} fill="rgba(31, 26, 22, 0.7)" fontSize="12" textAnchor="middle">
            Year
          </text>
        </svg>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem 1.4rem' }}>
          {series.map((s) => (
            <div key={s.key} className="model-progress-panel__legend-item">
              <span style={{ width: '2.5rem', height: '0', borderTop: `3px solid ${s.color}`, display: 'inline-block' }} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <details className="model-progress-panel__details">
          <summary>Underlying milestone values</summary>
          <table className="markdown-table">
            <thead className="markdown-thead">
              <tr className="markdown-tr">
                <th className="markdown-th">Benchmark</th>
                {years.map((y) => (
                  <th key={y} className="markdown-th" style={{ textAlign: 'right' }}>{y}</th>
                ))}
              </tr>
            </thead>
            <tbody className="markdown-tbody">
              {series.map((s) => (
                <tr key={s.key} className="markdown-tr">
                  <td className="markdown-td">{s.label}</td>
                  {s.values.map((v, i) => (
                    <td key={i} className="markdown-td" style={{ textAlign: 'right' }}>
                      {v === null ? '—' : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </details>

        <SourceLine ids={[
          'benchmarksLocal',
          'mythosCard',
          'sweBenchSite',
          'sweBenchVerified',
          'gpqaPaper',
          'openAIGpt4Report',
          'aiIndex2025',
        ]} />
      </div>
    </div>
  );
}
