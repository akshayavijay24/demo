from pydantic import BaseModel
from typing import List, Optional


class Contract(BaseModel):
    name: str
    start_date: str
    end_date: str
    scope_of_work: str
    deliverables: List[str]
    rate_card: str


class PerformanceMetrics(BaseModel):
    people_requested: int
    people_assigned: int
    quality_score: float


class Vendor(BaseModel):
    id: int
    name: str
    contracts: List[Contract]
    msa_status: str
    performance_metrics: PerformanceMetrics
