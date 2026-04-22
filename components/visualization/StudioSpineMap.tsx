'use client';

import React from 'react';

const spine = [
  {
    course: 'IS117',
    year: 'Year 1',
    title: 'Interface and web fluency',
    stage: 'Foundation',
    outcome: 'Make work visible through pages, interfaces, and early product surfaces.',
  },
  {
    course: 'IS218',
    year: 'Year 2',
    title: 'Application delivery',
    stage: 'Build',
    outcome: 'Move from pages to real applications with user flows, logic, and integration pressure.',
  },
  {
    course: 'IS265',
    year: 'Year 2',
    title: 'Systems and organizational context',
    stage: 'Foundation',
    outcome: 'Read institutions, workflows, actors, and constraints, not isolated assignments.',
  },
  {
    course: 'IS331',
    year: 'Year 3',
    title: 'Data and retrieval structure',
    stage: 'Build',
    outcome: 'Learn the data models, schemas, and retrieval structure enterprise AI systems depend on.',
  },
  {
    course: 'IS390',
    year: 'Year 3',
    title: 'Requirements and workflow design',
    stage: 'Translate',
    outcome: 'Translate ambiguity into specs, acceptance criteria, and human-in-the-loop logic.',
  },
  {
    course: 'IS425',
    year: 'Year 4',
    title: 'Enterprise AI infrastructure',
    stage: 'Deploy',
    outcome: 'Bring the stack together: deployment patterns, infrastructure, governance, capstone readiness.',
  },
  {
    course: 'IS465',
    year: 'Year 4',
    title: 'Analytics and value measurement',
    stage: 'Translate',
    outcome: 'Connect data work to performance, instrumentation, and enterprise value.',
  },
  {
    course: 'IS480',
    year: 'Year 4',
    title: 'Data-centric AI and evaluation',
    stage: 'Apply',
    outcome: 'Work directly with model behavior, data quality, and evaluation-oriented AI systems practice.',
  },
] as const;

const stageColors: Record<(typeof spine)[number]['stage'], string> = {
  Foundation: '#ebdcc2',
  Build: '#bfe1df',
  Translate: '#f3c388',
  Apply: '#eb9267',
  Deploy: '#1f1a16',
};

const stageTextColors: Record<(typeof spine)[number]['stage'], string> = {
  Foundation: '#4a3a1f',
  Build: '#163f3e',
  Translate: '#523107',
  Apply: '#53200b',
  Deploy: '#fffdf9',
};

export function StudioSpineMap() {
  return (
    <div className="studio-spine-map">
      <div className="studio-spine-map__grid">
        {spine.map((item, index) => (
          <article className="studio-spine-map__card" key={item.course}>
            <div className="studio-spine-map__card-top">
              <span className="studio-spine-map__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="studio-spine-map__year">{item.year}</span>
              <span
                className="studio-spine-map__stage"
                style={{ backgroundColor: stageColors[item.stage], color: stageTextColors[item.stage] }}
              >
                {item.stage}
              </span>
            </div>
            <h3 className="studio-spine-map__course">{item.course}</h3>
            <p className="studio-spine-map__title">{item.title}</p>
            <p className="studio-spine-map__outcome">{item.outcome}</p>
          </article>
        ))}
      </div>
    </div>
  );
}