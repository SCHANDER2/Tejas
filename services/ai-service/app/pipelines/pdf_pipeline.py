from pypdf import PdfReader
import io

class PDFProcessor:
    def extract_text(self, pdf_bytes: bytes) -> str:
        """
        Parses binary files to return plain string text.
        """
        try:
            pdf_file = io.BytesIO(pdf_bytes)
            reader = PdfReader(pdf_file)
            text_slices = []
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text_slices.append(extracted)
            return "\n".join(text_slices)
        except Exception as e:
            raise ValueError(f"PDF extraction failed: {str(e)}")

    def get_semantic_chunks(self, text: str, chunk_size: int = 1000, overlap: int = 150) -> list:
        """
        Splits parsed text into semantic overlapping chunks.
        """
        words = text.split()
        chunks = []
        i = 0
        while i < len(words):
            chunk_words = words[i : i + chunk_size]
            chunks.append(" ".join(chunk_words))
            i += (chunk_size - overlap)
        return chunks

    def generate_embeddings(self, chunks: list) -> list:
        """
        Mock embeddings generation matching text-embedding-3 dimensions.
        In production, calls OpenAI Embeddings API.
        """
        mock_vector = [0.01536] * 1536
        return [
            {
                "chunk_index": idx,
                "text_content": chunk,
                "vector": mock_vector
            }
            for idx, chunk in enumerate(chunks)
        ]
        
    def process(self, pdf_bytes: bytes) -> list:
        text = self.extract_text(pdf_bytes)
        chunks = self.get_semantic_chunks(text)
        return self.generate_embeddings(chunks)
