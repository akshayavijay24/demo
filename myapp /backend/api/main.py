from fastapi import FastAPI, HTTPException
from typing import List
from api.vendor import Vendor, Contract, PerformanceMetrics
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import json


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def vendordata(filepath: str) -> List[Vendor]:
    df = pd.read_csv(filepath)
    vendors = []
    for _, row in df.iterrows():
        contracts = [
            Contract(
                name=row["contract_name"],
                start_date=row["start_date"],
                end_date=row["end_date"],
                scope_of_work=row["scope_of_work"],
                deliverables=row["deliverables"].split(";"),
                rate_card=row["rate_card"],
            )
        ]
        performance_metrics = PerformanceMetrics(
            people_requested=row["people_requested"],
            people_assigned=row["people_assigned"],
            quality_score=row["quality_score"],
        )
        vendor = Vendor(
            id=row["id"],
            name=row["name"],
            contracts=contracts,
            msa_status=row["msa_status"],
            performance_metrics=performance_metrics,
        )
        vendors.append(vendor)
    return vendors


@app.get("/vendors", response_model=List[Vendor])
def get_vendors():
    vendors = vendordata(
        "/Users/akshayavijayabalaji/Documents/VS code/demo/myapp/backend/data/data.csv"
    )
    return vendors


# _____________________________________________________________________________________________________________


def load_json_data():
    try:
        with open(
            "/Users/akshayavijayabalaji/Documents/VS code/demo/myapp/backend/data/vendordata.json",
            "r",
        ) as f:
            return json.load(f)
    except Exception as e:
        print("Error loading JSON:", e)
        return []


mock_vendors = load_json_data()


@app.get("/vendordetails")
def get_all_vendors_json():
    return mock_vendors


@app.get("/vendordetails/{vendor_id}")
def get_vendor_by_id_json(vendor_id: int):
    for vendor in mock_vendors:
        if vendor["id"] == vendor_id:
            return vendor
    raise HTTPException(status_code=404, detail="Vendor not found")
