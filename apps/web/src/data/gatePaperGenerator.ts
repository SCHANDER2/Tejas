import { GateQuestion } from './gateData';

export function generateQuestionsForGatePaper(paperId: string, seedOffset: number = 0): GateQuestion[] {
  const questions: GateQuestion[] = [];

  // General Aptitude (10 Qs: Q1 to Q10)
  for (let i = 1; i <= 5; i++) {
    questions.push({
      id: `${paperId}_q${i}`,
      type: 'MCQ',
      marks: 1,
      subjectId: 'aptitude',
      topicName: 'General Aptitude (1-Mark)',
      questionText: `Q${i}. Which of the following words is synonymous with 'PRAGMATIC'?`,
      options: ["Practical", "Theoretical", "Fanciful", "Abstract"],
      correctOptionIndices: [0],
      explanation: "Pragmatic means dealing with things sensibly and realistically.",
      difficulty: 'Easy'
    });
  }
  for (let i = 6; i <= 10; i++) {
    questions.push({
      id: `${paperId}_q${i}`,
      type: 'MCQ',
      marks: 2,
      subjectId: 'aptitude',
      topicName: 'General Aptitude (2-Mark)',
      questionText: `Q${i}. A pipe can fill a tank in 6 hours. Due to a leak at the bottom, it takes 8 hours to fill. How long will the leak take to empty the full tank?`,
      options: ["24 hours", "14 hours", "12 hours", "48 hours"],
      correctOptionIndices: [0],
      explanation: "Leak rate = 1/6 - 1/8 = 1/24. Time to empty = 24 hours.",
      difficulty: 'Medium'
    });
  }

  // Technical Core (55 Qs: Q11 to Q65)
  // 25 x 1-Mark Qs
  for (let i = 11; i <= 35; i++) {
    if (i % 3 === 0) {
      // MSQ
      questions.push({
        id: `${paperId}_q${i}`,
        type: 'MSQ',
        marks: 1,
        subjectId: 'technical',
        topicName: 'Data Structures & Algorithms (MSQ)',
        questionText: `Q${i}. Which of the following sorting algorithms have a worst-case time complexity of O(n log n)? [Select ALL correct options]`,
        options: ["Merge Sort", "Heap Sort", "Quick Sort", "Bubble Sort"],
        correctOptionIndices: [0, 1],
        explanation: "Merge Sort and Heap Sort guarantee O(n log n) worst-case. Quick Sort worst case is O(n²).",
        difficulty: 'Medium'
      });
    } else if (i % 3 === 1) {
      // NAT
      questions.push({
        id: `${paperId}_q${i}`,
        type: 'NAT',
        marks: 1,
        subjectId: 'technical',
        topicName: 'Computer Networks (NAT)',
        questionText: `Q${i}. Consider an IP address 192.168.1.135 with subnet mask 255.255.255.192. Calculate the total number of usable host IP addresses in this subnet.`,
        correctNatValue: 62,
        natTolerance: 0,
        explanation: "Subnet mask 255.255.255.192 has 6 host bits (2⁶ = 64). Usable hosts = 64 - 2 = 62.",
        difficulty: 'Medium'
      });
    } else {
      // MCQ
      questions.push({
        id: `${paperId}_q${i}`,
        type: 'MCQ',
        marks: 1,
        subjectId: 'technical',
        topicName: 'Operating Systems (MCQ)',
        questionText: `Q${i}. Which of the following page replacement algorithms suffers from Belady's Anomaly?`,
        options: ["FIFO", "LRU", "Optimal", "LFU"],
        correctOptionIndices: [0],
        explanation: "FIFO page replacement algorithm suffers from Belady's Anomaly where increasing frames increases page faults.",
        difficulty: 'Medium'
      });
    }
  }

  // 30 x 2-Mark Qs
  for (let i = 36; i <= 65; i++) {
    if (i % 2 === 0) {
      // NAT 2M
      questions.push({
        id: `${paperId}_q${i}`,
        type: 'NAT',
        marks: 2,
        subjectId: 'technical',
        topicName: 'Theory of Computation (NAT 2M)',
        questionText: `Q${i}. Calculate the maximum number of states in a Minimal DFA that accepts all binary strings ending with '101'.`,
        correctNatValue: 4,
        natTolerance: 0,
        explanation: "A string ending with a pattern of length k (101 -> k=3) requires k+1 = 4 states in a minimal DFA.",
        difficulty: 'Hard'
      });
    } else {
      // MCQ 2M
      questions.push({
        id: `${paperId}_q${i}`,
        type: 'MCQ',
        marks: 2,
        subjectId: 'technical',
        topicName: 'DBMS (MCQ 2M)',
        questionText: `Q${i}. Relation R(A, B, C, D, E) has functional dependencies F = {A -> B, BC -> D, E -> C}. What is the candidate key of relation R?`,
        options: ["AE", "AB", "AC", "ADE"],
        correctOptionIndices: [0],
        explanation: "(AE)⁺ = AE -> A,E -> B (via A->B) -> BC (since E->C) -> D (via BC->D) = ABCDE. Thus AE is candidate key.",
        difficulty: 'Hard'
      });
    }
  }

  return questions;
}
