from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="Lead Generation Tool API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Lead(BaseModel):
    company_name: str
    website: str
    industry: Optional[str] = None
    employee_count: Optional[int] = None
    location: Optional[str] = None
    contact_email: Optional[str] = None
    score: Optional[float] = None

@app.get("/")
async def root():
    return {"message": "Welcome to Lead Generation Tool API"}

@app.post("/leads/", response_model=Lead)
async def create_lead(lead: Lead):
    # TODO: Implement lead creation logic
    return lead

@app.get("/leads/", response_model=List[Lead])
async def get_leads():
    # TODO: Implement lead retrieval logic
    return []

@app.get("/leads/{lead_id}", response_model=Lead)
async def get_lead(lead_id: int):
    # TODO: Implement single lead retrieval logic
    raise HTTPException(status_code=404, detail="Lead not found")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 