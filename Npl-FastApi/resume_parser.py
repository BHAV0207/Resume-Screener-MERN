from fastapi import FastAPI, HTTPException
import spacy

app = FastAPI()

# Load English NLP model with Named Entity Recognition (NER)
nlp = spacy.load("en_core_web_sm")

@app.post("/extract-skills/")
async def extract_skills(text: str):
    if not text:
        raise HTTPException(status_code=400, detail="No text provided")
    
    doc = nlp(text)
    extracted_skills = []

    # Extract entities related to skills and job roles
    for ent in doc.ents:
        if ent.label_ in ["ORG", "PRODUCT", "GPE", "LANGUAGE"]:
            extracted_skills.append(ent.text)

    return {"skills": list(set(extracted_skills))}  # Return unique skills
