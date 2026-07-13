const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding exam database...');

  const examsData = [
    {
      name: 'UPSC Civil Services',
      conductingBody: 'Union Public Service Commission (UPSC)',
      syllabus: [
        {
          title: 'General Studies I',
          weightage: 50.00,
          depthLevel: 1,
          children: [
            { title: 'Indian Polity and Governance', weightage: 15.00, depthLevel: 2 },
            { title: 'History of India and Indian National Movement', weightage: 15.00, depthLevel: 2 },
            { title: 'Indian and World Geography', weightage: 10.00, depthLevel: 2 },
            { title: 'Economic and Social Development', weightage: 10.00, depthLevel: 2 }
          ]
        },
        {
          title: 'General Studies II (CSAT)',
          weightage: 50.00,
          depthLevel: 1,
          children: [
            { title: 'Comprehension & Interpersonal Skills', weightage: 20.00, depthLevel: 2 },
            { title: 'Logical Reasoning & Analytical Ability', weightage: 15.00, depthLevel: 2 },
            { title: 'Basic Numeracy & Data Interpretation', weightage: 15.00, depthLevel: 2 }
          ]
        }
      ]
    },
    {
      name: 'JEE Main & Advanced',
      conductingBody: 'National Testing Agency (NTA) & IIT Joint Admission Board',
      syllabus: [
        {
          title: 'Physics',
          weightage: 33.33,
          depthLevel: 1,
          children: [
            { title: 'Mechanics', weightage: 12.00, depthLevel: 2 },
            { title: 'Electrodynamics', weightage: 10.00, depthLevel: 2 },
            { title: 'Optics & Modern Physics', weightage: 11.33, depthLevel: 2 }
          ]
        },
        {
          title: 'Chemistry',
          weightage: 33.33,
          depthLevel: 1,
          children: [
            { title: 'Physical Chemistry', weightage: 11.00, depthLevel: 2 },
            { title: 'Organic Chemistry', weightage: 12.00, depthLevel: 2 },
            { title: 'Inorganic Chemistry', weightage: 10.33, depthLevel: 2 }
          ]
        },
        {
          title: 'Mathematics',
          weightage: 33.34,
          depthLevel: 1,
          children: [
            { title: 'Algebra', weightage: 11.00, depthLevel: 2 },
            { title: 'Calculus', weightage: 12.34, depthLevel: 2 },
            { title: 'Coordinate Geometry & Vectors', weightage: 10.00, depthLevel: 2 }
          ]
        }
      ]
    },
    {
      name: 'NEET UG',
      conductingBody: 'National Testing Agency (NTA)',
      syllabus: [
        {
          title: 'Biology',
          weightage: 50.00,
          depthLevel: 1,
          children: [
            { title: 'Diversity in Living World', weightage: 10.00, depthLevel: 2 },
            { title: 'Structural Organisation in Animals and Plants', weightage: 10.00, depthLevel: 2 },
            { title: 'Cell Structure and Function', weightage: 15.00, depthLevel: 2 },
            { title: 'Genetics and Evolution', weightage: 15.00, depthLevel: 2 }
          ]
        },
        {
          title: 'Physics',
          weightage: 25.00,
          depthLevel: 1,
          children: [
            { title: 'Kinematics & Laws of Motion', weightage: 8.00, depthLevel: 2 },
            { title: 'Thermodynamics', weightage: 7.00, depthLevel: 2 },
            { title: 'Electrostatics & Magnetism', weightage: 10.00, depthLevel: 2 }
          ]
        },
        {
          title: 'Chemistry',
          weightage: 25.00,
          depthLevel: 1,
          children: [
            { title: 'Inorganic Chemistry and Coordination Compounds', weightage: 8.00, depthLevel: 2 },
            { title: 'Organic Reaction Mechanisms', weightage: 9.00, depthLevel: 2 },
            { title: 'Chemical Equilibrium & Kinetics', weightage: 8.00, depthLevel: 2 }
          ]
        }
      ]
    },
    {
      name: 'GATE Engineering',
      conductingBody: 'Indian Institute of Science (IISc) and IITs',
      syllabus: [
        {
          title: 'General Aptitude',
          weightage: 15.00,
          depthLevel: 1,
          children: [
            { title: 'Verbal Ability', weightage: 7.50, depthLevel: 2 },
            { title: 'Numerical Ability', weightage: 7.50, depthLevel: 2 }
          ]
        },
        {
          title: 'Engineering Mathematics',
          weightage: 13.00,
          depthLevel: 1,
          children: [
            { title: 'Linear Algebra', weightage: 4.00, depthLevel: 2 },
            { title: 'Calculus & Differential Equations', weightage: 5.00, depthLevel: 2 },
            { title: 'Probability & Statistics', weightage: 4.00, depthLevel: 2 }
          ]
        },
        {
          title: 'Core Technical Subjects',
          weightage: 72.00,
          depthLevel: 1,
          children: [
            { title: 'Data Structures & Algorithms', weightage: 15.00, depthLevel: 2 },
            { title: 'Computer Networks', weightage: 12.00, depthLevel: 2 },
            { title: 'Operating Systems', weightage: 15.00, depthLevel: 2 },
            { title: 'Database Management Systems', weightage: 15.00, depthLevel: 2 },
            { title: 'Theory of Computation & Compiler Design', weightage: 15.00, depthLevel: 2 }
          ]
        }
      ]
    }
  ];

  for (const examData of examsData) {
    // Check if exam already exists
    let exam = await prisma.exam.findUnique({
      where: { name: examData.name }
    });

    if (!exam) {
      exam = await prisma.exam.create({
        data: {
          name: examData.name,
          conductingBody: examData.conductingBody
        }
      });
      console.log(`Created exam: ${exam.name}`);
    } else {
      console.log(`Exam ${exam.name} already exists. Skipping.`);
    }

    // Seed syllabus hierarchy
    for (const subject of examData.syllabus) {
      // Check if root subject node exists
      let rootNode = await prisma.syllabusHierarchy.findFirst({
        where: {
          examId: exam.id,
          title: subject.title,
          depthLevel: subject.depthLevel
        }
      });

      if (!rootNode) {
        rootNode = await prisma.syllabusHierarchy.create({
          data: {
            examId: exam.id,
            title: subject.title,
            weightage: subject.weightage,
            depthLevel: subject.depthLevel
          }
        });
      }

      for (const child of subject.children) {
        let childNode = await prisma.syllabusHierarchy.findFirst({
          where: {
            examId: exam.id,
            parentNodeId: rootNode.id,
            title: child.title,
            depthLevel: child.depthLevel
          }
        });

        if (!childNode) {
          await prisma.syllabusHierarchy.create({
            data: {
              examId: exam.id,
              parentNodeId: rootNode.id,
              title: child.title,
              weightage: child.weightage,
              depthLevel: child.depthLevel
            }
          });
        }
      }
    }
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
