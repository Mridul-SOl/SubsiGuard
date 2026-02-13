import sys
import os
import pandas as pd

# Add current directory to path to allow importing from services
sys.path.append(os.getcwd())

from services.synthetic_data import generate_synthetic_data

def main():
    ROW_COUNT = 5000
    OUTPUT_FILE = "../large_subsidy_data.csv"
    
    print(f"Generating {ROW_COUNT} synthetic records...")
    data = generate_synthetic_data(ROW_COUNT)
    
    df = pd.DataFrame(data)
    
    # Calculate some stats to show the user
    total_amount = df['amount'].sum()
    unique_beneficiaries = df['beneficiary_id'].nunique()
    
    print(f"Generated {len(df)} records.")
    print(f"Total Subsidy Amount: ₹{total_amount:,.2f}")
    print(f"Unique Beneficiaries: {unique_beneficiaries}")
    
    df.to_csv(OUTPUT_FILE, index=False)
    print(f"File saved to: {os.path.abspath(OUTPUT_FILE)}")

if __name__ == "__main__":
    main()
