from app.pipelines.pdf_pipeline import PDFProcessor
from app.pipelines.quiz_pipeline import QuizGenerator

class ResearchPaperPipeline:
    def __init__(self):
        self.pdf_processor = PDFProcessor()
        self.quiz_generator = QuizGenerator()

    async def execute_mode(self, pdf_bytes: bytes, difficulty: str = "hard") -> dict:
        """
        Executes complete Research Paper Mode flow:
        PDF Upload -> Text extraction -> AI Summary -> Concept extraction -> Quiz generation
        """
        # 1. Extract Text
        text = self.pdf_processor.extract_text(pdf_bytes)
        if not text:
            raise ValueError("No text could be extracted from the uploaded PDF document.")

        # 2. AI Summary (Mock abstraction)
        summary = (
            "Research Paper Abstract Summary:\n"
            f"This paper covers key concepts within the extracted corpus. "
            f"Key observations emphasize systemic structural reforms and central governance parameters."
        )

        # 3. Concept Extraction
        # Simulate structured key concepts parsed out of the text content
        extracted_concepts = ["Governance Decentralization", "Administrative Centralization", "Federal balance"]

        # 4. Quiz Generation
        quiz_data = await self.quiz_generator.generate(text, difficulty, count=3)

        return {
            "file_size_bytes": len(pdf_bytes),
            "summary": summary,
            "extracted_concepts": extracted_concepts,
            "generated_quizzes": quiz_data["quizzes"]
        }
