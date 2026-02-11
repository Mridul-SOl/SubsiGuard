from faker import Faker
import pandas as pd
import random
from typing import List, Dict, Any

fake = Faker('en_IN')

INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
]

SUBSIDY_TYPES = ["PM-KISAN", "MGNREGA", "LPG Subsidy", "Fertilizer Subsidy", "PMAY"]

def generate_aadhaar() -> str:
    return str(fake.random_number(digits=12, fix_len=True))

def generate_synthetic_data(num_rows: int = 100) -> List[Dict[str, Any]]:
    data: List[Dict[str, Any]] = []
    
    # Generate base data
    for _ in range(num_rows):
        record = {
            "beneficiary_id": fake.uuid4(),
            "aadhaar": generate_aadhaar(),
            "name": fake.name(),
            "state": random.choice(INDIAN_STATES),
            "district": fake.city(),
            "subsidy_type": random.choice(SUBSIDY_TYPES),
            "amount": round(random.uniform(1000, 50000), 2),
            "income": round(random.uniform(50000, 1000000), 2),
            "distributor_id": f"DIST-{fake.random_number(digits=4)}",
            "claim_date": fake.date_between(start_date='-1y', end_date='today').isoformat()
        }
        data.append(record)

    # Inject Fraud Patterns (approx 10% of data)
    num_fraud = int(num_rows * 0.10)
    
    # 1. Duplicate Aadhaar (Identity Theft)
    for _ in range(num_fraud // 3):
        original = random.choice(data)
        duplicate = original.copy()
        duplicate["beneficiary_id"] = fake.uuid4()
        duplicate["name"] = fake.name() # Different name, same Aadhaar
        duplicate["amount"] = round(random.uniform(1000, 50000), 2)
        data.append(duplicate)

    # 2. High Income + High Subsidy (Ineligible Beneficiary)
    for _ in range(num_fraud // 3):
        record = {
            "beneficiary_id": fake.uuid4(),
            "aadhaar": generate_aadhaar(),
            "name": fake.name(),
            "state": random.choice(INDIAN_STATES),
            "district": fake.city(),
            "subsidy_type": random.choice(SUBSIDY_TYPES),
            "amount": round(random.uniform(80000, 150000), 2), # Unusually high amount
            "income": round(random.uniform(1500000, 5000000), 2), # High income
            "distributor_id": f"DIST-{fake.random_number(digits=4)}",
            "claim_date": fake.date_between(start_date='-1y', end_date='today').isoformat()
        }
        data.append(record)

    # 3. Multiple claims same day/distributor (Collusion)
    distributor = f"FRAUD-DIST-{fake.random_number(digits=4)}"
    date = fake.date_between(start_date='-1M', end_date='today').isoformat()
    for _ in range(num_fraud // 3):
         record = {
            "beneficiary_id": fake.uuid4(),
            "aadhaar": generate_aadhaar(),
            "name": fake.name(),
            "state": random.choice(INDIAN_STATES),
            "district": fake.city(),
            "subsidy_type": random.choice(SUBSIDY_TYPES),
            "amount": round(random.uniform(5000, 20000), 2),
            "income": round(random.uniform(50000, 300000), 2),
            "distributor_id": distributor,
            "claim_date": date
        }
         data.append(record)

    # Shuffle data
    random.shuffle(data)
    return data[:num_rows + num_fraud] # Ensure we return requested rows + fraud injection
