import requests
import pandas as pd
import io
import time

BASE_URL = "http://localhost:8000"

def test_health():
    print(f"Testing Health Check...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        assert response.status_code == 200
        print(f"✅ Health Check Passed: {response.json()}")
    except Exception as e:
        print(f"❌ Health Check Failed: {e}")

def test_synthetic_data():
    print(f"\nTesting Synthetic Data Generation...")
    print(f"Requesting: {BASE_URL}/synthetic?rows=50")
    try:
        response = requests.get(f"{BASE_URL}/synthetic?rows=50")
        if response.status_code != 200:
             print(f"❌ Synthetic Data Check Failed with Status {response.status_code}: {response.text}")
             return []
        data = response.json()
        print(f"Received {data['count']} records (requested 50)")
        assert data['count'] >= 50
        print(f"✅ Synthetic Data Check Passed: Generated {data['count']} records")
        return data['data']
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"❌ Synthetic Data Check Failed with Exception: {repr(e)}")
        return []

def test_upload_analyze_flow(data):
    print(f"\nTesting Upload -> Analyze -> Results Flow...")
    if not data:
        print("Skipping flow test due to missing data")
        return

    # Create CSV from data
    df = pd.DataFrame(data)
    csv_buffer = io.StringIO()
    df.to_csv(csv_buffer, index=False)
    csv_file = io.BytesIO(csv_buffer.getvalue().encode())

    # 1. Upload
    print("1. Uploading CSV...")
    try:
        files = {'file': ('test.csv', csv_file, 'text/csv')}
        response = requests.post(f"{BASE_URL}/upload", files=files)
        assert response.status_code == 200
        upload_resp = response.json()
        file_id = upload_resp['file_id']
        print(f"✅ Upload Passed. File ID: {file_id}")
    except Exception as e:
        print(f"❌ Upload Failed: {e}")
        return

    # 2. Analyze
    print(f"2. Analyzing File {file_id}...")
    try:
        response = requests.post(f"{BASE_URL}/analyze", json={"file_id": file_id})
        assert response.status_code == 200
        analyze_resp = response.json()
        print(f"✅ Analysis Passed. Flagged: {analyze_resp['flagged_count']} / {analyze_resp['total_records']}")
        print(f"   Leakage: {analyze_resp['leakage_percent']}%")
        print(f"   High Risk States: {analyze_resp['high_risk_states']}")
    except Exception as e:
        print(f"❌ Analysis Failed: {e}")
        return

    # 3. Get Results
    print(f"3. Retrieving Results for {file_id}...")
    try:
        response = requests.get(f"{BASE_URL}/results/{file_id}")
        assert response.status_code == 200
        results_resp = response.json()
        assert results_resp == analyze_resp
        print(f"✅ Results Retrieval Passed.")
    except Exception as e:
        print(f"❌ Results Retrieval Failed: {e}")

if __name__ == "__main__":
    # Wait for server to start
    time.sleep(2)
    test_health()
    data = test_synthetic_data()
    test_upload_analyze_flow(data)
