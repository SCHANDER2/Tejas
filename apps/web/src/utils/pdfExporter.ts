import { AfcatPyqPaper, AfcatModelPaper, AfcatQuestion } from '../data/afcatData';

export function exportPaperToPdf(paper: AfcatPyqPaper | AfcatModelPaper, questions: AfcatQuestion[]) {
  const isPyq = 'shift' in paper;
  const paperTitle = isPyq ? (paper as AfcatPyqPaper).shift : (paper as AfcatModelPaper).title;
  const yearOrTag = isPyq ? `Year ${(paper as AfcatPyqPaper).year}` : `Model Paper #${(paper as AfcatModelPaper).paperNumber}`;

  // Group questions by subject
  const englishQs = questions.filter(q => q.subjectId === 'english');
  const mathsQs = questions.filter(q => q.subjectId === 'maths');
  const reasoningQs = questions.filter(q => q.subjectId === 'reasoning');
  const gaQs = questions.filter(q => q.subjectId === 'ga');

  const renderQuestionBlock = (q: AfcatQuestion, index: number) => `
    <div style="margin-bottom: 20px; padding: 14px; background-color: #f9f8f6; border: 1px solid #e5e2d9; border-radius: 10px; page-break-inside: avoid;">
      <div style="font-weight: bold; color: #262a2b; font-size: 14px; margin-bottom: 8px;">
        Q${index + 1}. ${q.questionText.replace(/\n/g, '<br/>')}
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px; color: #4a4540; margin-bottom: 10px;">
        ${q.options.map((opt, i) => `
          <div style="padding: 6px 10px; background-color: #ffffff; border: 1px solid #d5d0c5; border-radius: 6px; ${i === q.correctOptionIndex ? 'border-color: #10b981; background-color: #ecfdf5; font-weight: bold;' : ''}">
            <strong>${String.fromCharCode(65 + i)})</strong> ${opt} ${i === q.correctOptionIndex ? '✓ (Correct)' : ''}
          </div>
        `).join('')}
      </div>
      <div style="font-size: 12px; color: #262a2b; background-color: #ffffff; padding: 8px 12px; border-left: 3px solid #faa114; border-radius: 4px; line-height: 1.5;">
        <strong>Explanation:</strong> ${q.explanation}
      </div>
    </div>
  `;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>${paperTitle} - Official AFCAT Question Paper & Solutions</title>
      <style>
        @media print {
          body { margin: 0; padding: 15mm; background: #fff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
        }
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          color: #262a2b;
          background-color: #f4f3ef;
          margin: 0;
          padding: 30px;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
          background: #ffffff;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border: 1px solid #e5e2d9;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #262a2b;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          color: #262a2b;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .header h2 {
          margin: 6px 0 0 0;
          font-size: 18px;
          color: #faa114;
        }
        .meta-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 25px;
          font-size: 13px;
        }
        .meta-table td {
          padding: 8px 12px;
          border: 1px solid #e5e2d9;
          background: #fcfcfb;
        }
        .section-title {
          background-color: #262a2b;
          color: #ffffff;
          padding: 10px 16px;
          font-size: 15px;
          font-weight: bold;
          border-radius: 8px;
          margin: 30px 0 15px 0;
          display: flex;
          justify-content: space-between;
        }
        .btn-print {
          background: #faa114;
          color: #262a2b;
          border: none;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: bold;
          border-radius: 8px;
          cursor: pointer;
          margin-bottom: 20px;
        }
        .btn-print:hover {
          background: #e8940f;
        }
        .answer-key-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
          font-size: 12px;
          text-align: center;
        }
        .answer-key-table th, .answer-key-table td {
          border: 1px solid #d5d0c5;
          padding: 6px;
        }
        .answer-key-table th {
          background-color: #262a2b;
          color: #ffffff;
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="text-align: center;">
        <button onclick="window.print()" class="btn-print">🖨️ Save as PDF / Print Official Paper</button>
      </div>

      <div class="container">
        <div class="header">
          <div style="font-size: 12px; font-weight: bold; color: #786e67; margin-bottom: 4px;">INDIAN AIR FORCE — AIR FORCE COMMON ADMISSION TEST</div>
          <h1>${paperTitle}</h1>
          <h2>Official Examination Question Paper & Solution Key</h2>
        </div>

        <table class="meta-table">
          <tr>
            <td><strong>Exam Tag:</strong> ${yearOrTag}</td>
            <td><strong>Total Questions:</strong> ${questions.length} Qs</td>
          </tr>
          <tr>
            <td><strong>Maximum Marks:</strong> 300 Marks</td>
            <td><strong>Time Duration:</strong> 120 Minutes (2 Hours)</td>
          </tr>
          <tr>
            <td colspan="2"><strong>Marking Scheme:</strong> +3 Marks for every correct answer | -1 Mark negative marking for incorrect attempt | 0 Marks for unattempted</td>
          </tr>
        </table>

        <!-- Answer Key Summary Box -->
        <div style="margin-bottom: 30px; padding: 16px; background-color: #ecfdf5; border: 1px solid #10b981; border-radius: 12px;">
          <h3 style="margin: 0 0 10px 0; color: #065f46; font-size: 15px;">Quick Answer Key Matrix</h3>
          <table class="answer-key-table">
            <thead>
              <tr>
                <th>Q#</th>
                <th>Ans</th>
                <th>Q#</th>
                <th>Ans</th>
                <th>Q#</th>
                <th>Ans</th>
                <th>Q#</th>
                <th>Ans</th>
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: Math.ceil(questions.length / 4) }).map((_, r) => `
                <tr>
                  ${[0, 1, 2, 3].map(c => {
                    const qIdx = r + c * Math.ceil(questions.length / 4);
                    if (qIdx < questions.length) {
                      const q = questions[qIdx];
                      return `
                        <td style="font-weight: bold; background: #ffffff;">Q${qIdx + 1}</td>
                        <td style="color: #059669; font-weight: bold; background: #ffffff;">${String.fromCharCode(65 + q.correctOptionIndex)}</td>
                      `;
                    }
                    return `<td>-</td><td>-</td>`;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        ${englishQs.length > 0 ? `
          <div class="section-title">
            <span>SECTION A: VERBAL ABILITY IN ENGLISH</span>
            <span>${englishQs.length} Questions</span>
          </div>
          ${englishQs.map((q, i) => renderQuestionBlock(q, i)).join('')}
        ` : ''}

        ${mathsQs.length > 0 ? `
          <div class="section-title">
            <span>SECTION B: NUMERICAL ABILITY</span>
            <span>${mathsQs.length} Questions</span>
          </div>
          ${mathsQs.map((q, i) => renderQuestionBlock(q, englishQs.length + i)).join('')}
        ` : ''}

        ${reasoningQs.length > 0 ? `
          <div class="section-title">
            <span>SECTION C: REASONING & MILITARY APTITUDE</span>
            <span>${reasoningQs.length} Questions</span>
          </div>
          ${reasoningQs.map((q, i) => renderQuestionBlock(q, englishQs.length + mathsQs.length + i)).join('')}
        ` : ''}

        ${gaQs.length > 0 ? `
          <div class="section-title">
            <span>SECTION D: GENERAL AWARENESS & DEFENCE GK</span>
            <span>${gaQs.length} Questions</span>
          </div>
          ${gaQs.map((q, i) => renderQuestionBlock(q, englishQs.length + mathsQs.length + reasoningQs.length + i)).join('')}
        ` : ''}

        <div style="margin-top: 40px; text-align: center; border-top: 1px solid #e5e2d9; padding-top: 20px; font-size: 12px; color: #786e67;">
          Tejas AFCAT Preparation Platform — Official Mentor Suite for IAF Aspirants
        </div>
      </div>
    </body>
    </html>
  `;

  // Create Blob and trigger download / open print window
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);

  // Open in print window
  const printWin = window.open(blobUrl, '_blank');
  if (!printWin) {
    // Fallback: trigger HTML document file download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${paperTitle.replace(/[^a-zA-Z0-9]/g, '_')}_Official_Paper.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
