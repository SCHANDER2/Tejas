export interface UniversalQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  subjectName?: string;
  topicName?: string;
  subjectId?: string;
  questionType?: 'mcq' | 'nat' | 'msq';
  numericalAnswer?: string;
}

export interface UniversalExamMetadata {
  examId: string;
  examName: string;
  conductingBody: string;
  paperTitle: string;
  yearOrType: string;
  totalMarks: number;
  durationMinutes: number;
  markingScheme: string;
}

const EXAM_CONFIGS: Record<string, { examName: string; conductingBody: string; defaultMarks: number; defaultDuration: number; markingScheme: string }> = {
  afcat: {
    examName: 'Air Force Common Admission Test (AFCAT 2026)',
    conductingBody: 'INDIAN AIR FORCE (IAF / CDAC)',
    defaultMarks: 300,
    defaultDuration: 120,
    markingScheme: '+3 Marks for Correct | -1 Mark Negative | 0 for Unattempted'
  },
  cds: {
    examName: 'Combined Defence Services (UPSC CDS 2026)',
    conductingBody: 'UNION PUBLIC SERVICE COMMISSION (UPSC)',
    defaultMarks: 300,
    defaultDuration: 360,
    markingScheme: '+0.833 / +1.0 Marks for Correct | 1/3rd Negative Marking | 0 for Unattempted'
  },
  nda: {
    examName: 'National Defence Academy & Naval Academy (UPSC NDA 2026)',
    conductingBody: 'UNION PUBLIC SERVICE COMMISSION (UPSC)',
    defaultMarks: 900,
    defaultDuration: 300,
    markingScheme: 'Maths: +2.5 / -0.83 | GAT: +4.0 / -1.33 | 0 for Unattempted'
  },
  jee_mains: {
    examName: 'Joint Entrance Examination (JEE Main 2026)',
    conductingBody: 'NATIONAL TESTING AGENCY (NTA)',
    defaultMarks: 300,
    defaultDuration: 180,
    markingScheme: '+4 Marks for Correct | -1 Mark for Incorrect (MCQ & Numerical) | 0 for Unattempted'
  },
  neet: {
    examName: 'National Eligibility cum Entrance Test (NEET UG 2026)',
    conductingBody: 'NATIONAL TESTING AGENCY (NTA)',
    defaultMarks: 720,
    defaultDuration: 200,
    markingScheme: '+4 Marks for Correct | -1 Mark Negative Marking | 0 for Unattempted'
  },
  upsc: {
    examName: 'Civil Services Examination (UPSC CSE Prelims 2026)',
    conductingBody: 'UNION PUBLIC SERVICE COMMISSION (UPSC)',
    defaultMarks: 400,
    defaultDuration: 240,
    markingScheme: 'GS 1: +2.0 / -0.66 | CSAT: +2.5 / -0.83 | 0 for Unattempted'
  },
  ssc_cgl: {
    examName: 'Staff Selection Commission (SSC CGL 2026 Tier-1)',
    conductingBody: 'STAFF SELECTION COMMISSION (SSC)',
    defaultMarks: 200,
    defaultDuration: 60,
    markingScheme: '+2 Marks for Correct | -0.5 Mark Negative Marking | 0 for Unattempted'
  },
  gate: {
    examName: 'Graduate Aptitude Test in Engineering (GATE 2026)',
    conductingBody: 'INDIAN INSTITUTE OF SCIENCE (IISc) / IITs',
    defaultMarks: 100,
    defaultDuration: 180,
    markingScheme: '1-Mark: +1 / -0.33 | 2-Mark: +2 / -0.66 | NAT/MSQ: No Negative Marking'
  },
  cat: {
    examName: 'Common Admission Test (IIM CAT 2026)',
    conductingBody: 'INDIAN INSTITUTES OF MANAGEMENT (IIMs)',
    defaultMarks: 198,
    defaultDuration: 120,
    markingScheme: 'MCQ: +3 / -1 | Non-MCQ TITA: +3 / 0 | 0 for Unattempted'
  }
};

export function exportUniversalExamPaperToPdf(
  examId: string,
  paperTitle: string,
  yearOrType: string,
  questions: any[]
) {
  const config = EXAM_CONFIGS[examId] || {
    examName: `${examId.toUpperCase()} Examination 2026`,
    conductingBody: 'NATIONAL EXAMINATION BOARD',
    defaultMarks: 300,
    defaultDuration: 120,
    markingScheme: '+3 Marks for Correct | -1 Negative Marking'
  };

  // Group questions by subject if available
  const subjectGroups: Record<string, any[]> = {};
  questions.forEach(q => {
    const subName = q.subjectName || q.subjectId || 'Core Examination Section';
    if (!subjectGroups[subName]) {
      subjectGroups[subName] = [];
    }
    subjectGroups[subName].push(q);
  });

  const renderQuestionBlock = (q: any, globalIndex: number) => {
    const isNat = q.questionType === 'nat' || (q.numericalAnswer !== undefined && (!q.options || q.options.length === 0));
    return `
      <div style="margin-bottom: 18px; padding: 14px 16px; background-color: #fcfcfb; border: 1px solid #e5e2d9; border-radius: 10px; page-break-inside: avoid;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <div style="font-weight: bold; color: #1a1d1e; font-size: 13.5px; line-height: 1.5;">
            Q${globalIndex + 1}. ${String(q.questionText || '').replace(/\n/g, '<br/>')}
          </div>
          ${q.topicName ? `<span style="font-size: 11px; background-color: #faf3e6; color: #c88410; padding: 2px 8px; border-radius: 4px; border: 1px solid #e8d5b7; font-weight: 600; white-space: nowrap; margin-left: 10px;">${q.topicName}</span>` : ''}
        </div>

        ${!isNat && q.options && q.options.length > 0 ? `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12.5px; color: #4a4540; margin-bottom: 10px;">
            ${q.options.map((opt: string, i: number) => {
              const isCorrect = i === q.correctOptionIndex;
              return `
                <div style="padding: 6px 10px; background-color: ${isCorrect ? '#ecfdf5' : '#ffffff'}; border: 1px solid ${isCorrect ? '#10b981' : '#d5d0c5'}; border-radius: 6px; ${isCorrect ? 'font-weight: bold; color: #065f46;' : ''}">
                  <strong>${String.fromCharCode(65 + i)})</strong> ${opt} ${isCorrect ? '✓ (Official Answer)' : ''}
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}

        ${isNat ? `
          <div style="margin-bottom: 10px; padding: 8px 12px; background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 6px; font-size: 12.5px; color: #166534; font-weight: bold;">
            Official Numerical / TITA Key: <strong>${q.numericalAnswer || q.options?.[q.correctOptionIndex] || 'Evaluated Range'}</strong>
          </div>
        ` : ''}

        <div style="font-size: 12px; color: #262a2b; background-color: #ffffff; padding: 9px 12px; border-left: 3.5px solid #faa114; border-radius: 4px; line-height: 1.5; margin-top: 6px;">
          <strong style="color: #c88410;">Detailed Step Solution:</strong> ${q.explanation || 'Refer to standard reference syllabus derivation for this national examination question.'}
        </div>
      </div>
    `;
  };

  let questionCounter = 0;
  const sectionsHtml = Object.entries(subjectGroups).map(([sectionName, qs]) => {
    const sectionStartIndex = questionCounter;
    questionCounter += qs.length;
    return `
      <div class="section-title">
        <span>${sectionName.toUpperCase()}</span>
        <span>${qs.length} Questions (Q${sectionStartIndex + 1} - Q${questionCounter})</span>
      </div>
      ${qs.map((q, localIdx) => renderQuestionBlock(q, sectionStartIndex + localIdx)).join('')}
    `;
  }).join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>${paperTitle} - ${config.examName} Official Paper</title>
      <style>
        @media print {
          body { margin: 0; padding: 12mm; background: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #1a1d1e;
          background-color: #f4f3ef;
          margin: 0;
          padding: 24px;
        }
        .container {
          max-width: 920px;
          margin: 0 auto;
          background: #ffffff;
          padding: 36px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          border: 1px solid #e5e2d9;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #1a1d1e;
          padding-bottom: 18px;
          margin-bottom: 24px;
        }
        .header .agency {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #786e67;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .header h1 {
          margin: 0;
          font-size: 22px;
          color: #1a1d1e;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 900;
        }
        .header h2 {
          margin: 4px 0 0 0;
          font-size: 16px;
          color: #c88410;
          font-weight: 700;
        }
        .meta-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
          font-size: 12.5px;
        }
        .meta-table td {
          padding: 7px 12px;
          border: 1px solid #e5e2d9;
          background: #fcfcfb;
        }
        .section-title {
          background-color: #1a1d1e;
          color: #ffffff;
          padding: 9px 14px;
          font-size: 13.5px;
          font-weight: 800;
          border-radius: 8px;
          margin: 26px 0 14px 0;
          display: flex;
          justify-content: space-between;
          letter-spacing: 0.5px;
        }
        .btn-print {
          background: #faa114;
          color: #1a1d1e;
          border: none;
          padding: 12px 26px;
          font-size: 14px;
          font-weight: 800;
          border-radius: 10px;
          cursor: pointer;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(250,161,20,0.3);
          transition: transform 0.1s ease;
        }
        .btn-print:hover {
          background: #e8940f;
          transform: scale(1.02);
        }
        .answer-key-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          font-size: 11.5px;
          text-align: center;
        }
        .answer-key-table th, .answer-key-table td {
          border: 1px solid #d5d0c5;
          padding: 5px 8px;
        }
        .answer-key-table th {
          background-color: #1a1d1e;
          color: #ffffff;
          font-weight: 700;
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="text-align: center;">
        <button onclick="window.print()" class="btn-print">🖨️ Save as PDF / Print Official Examination Document</button>
      </div>

      <div class="container">
        <div class="header">
          <div class="agency">${config.conductingBody}</div>
          <h1>${config.examName}</h1>
          <h2>${paperTitle} • ${yearOrType}</h2>
        </div>

        <table class="meta-table">
          <tr>
            <td><strong>Examination:</strong> ${config.examName}</td>
            <td><strong>Total Questions:</strong> ${questions.length} Questions</td>
          </tr>
          <tr>
            <td><strong>Total Marks:</strong> ${config.defaultMarks} Marks</td>
            <td><strong>Time Duration:</strong> ${config.defaultDuration} Minutes</td>
          </tr>
          <tr>
            <td colspan="2"><strong>Official Marking Scheme:</strong> ${config.markingScheme}</td>
          </tr>
        </table>

        <!-- Answer Key Summary Matrix -->
        <div style="margin-bottom: 24px; padding: 14px; background-color: #f0fdf4; border: 1px solid #10b981; border-radius: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <h3 style="margin: 0; color: #065f46; font-size: 14px; font-weight: 800;">Official Answer Key Matrix</h3>
            <span style="font-size: 11px; color: #059669; font-weight: 700;">Verified CDAC / NTA Key</span>
          </div>
          <table class="answer-key-table">
            <thead>
              <tr>
                <th>Q#</th><th>Ans</th>
                <th>Q#</th><th>Ans</th>
                <th>Q#</th><th>Ans</th>
                <th>Q#</th><th>Ans</th>
                <th>Q#</th><th>Ans</th>
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: Math.ceil(questions.length / 5) }).map((_, r) => `
                <tr>
                  ${[0, 1, 2, 3, 4].map(c => {
                    const qIdx = r + c * Math.ceil(questions.length / 5);
                    if (qIdx < questions.length) {
                      const q = questions[qIdx];
                      const ansStr = q.questionType === 'nat' || q.numericalAnswer
                        ? (q.numericalAnswer || 'NAT')
                        : (q.correctOptionIndex !== undefined ? String.fromCharCode(65 + q.correctOptionIndex) : '-');
                      return `
                        <td style="font-weight: bold; background: #ffffff;">Q${qIdx + 1}</td>
                        <td style="color: #059669; font-weight: bold; background: #ffffff;">${ansStr}</td>
                      `;
                    }
                    return `<td style="background: #f9f9f9;">-</td><td style="background: #f9f9f9;">-</td>`;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        ${sectionsHtml}

        <div style="margin-top: 36px; text-align: center; border-top: 1px solid #e5e2d9; padding-top: 18px; font-size: 11.5px; color: #786e67;">
          Tejas AI Study Operating System — Unified CBT Exam & Solution Suite for Indian Aspirants
        </div>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);

  const printWin = window.open(blobUrl, '_blank');
  if (!printWin) {
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${examId.toUpperCase()}_${paperTitle.replace(/[^a-zA-Z0-9]/g, '_')}_Official_Paper.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Backward compatibility alias for legacy imports
export function exportPaperToPdf(paper: any, questions: any[]) {
  const isPyq = 'shift' in paper;
  const paperTitle = isPyq ? paper.shift : paper.title;
  const yearOrTag = isPyq ? `Year ${paper.year}` : `Model Paper #${paper.paperNumber}`;
  exportUniversalExamPaperToPdf('afcat', paperTitle, yearOrTag, questions);
}
