#!/usr/bin/env python3
import os
import sys
import subprocess
import requests
from datetime import datetime
import xml.etree.ElementTree as ET

def get_health_data_path():
    """Get the path to the Apple Health data export"""
    home = os.path.expanduser("~")
    return os.path.join(home, "Library/Developer/CoreSimulator/Devices/*/data/HealthKit")

def export_health_data():
    """Export health data from Apple Watch"""
    try:
        # Use xcrun to communicate with the paired Apple Watch
        subprocess.run([
            "xcrun", "simctl", "health", "export", "export.xml"
        ], check=True)
        return "export.xml"
    except subprocess.CalledProcessError as e:
        print(f"Error exporting health data: {e}")
        sys.exit(1)

def upload_to_server(file_path):
    """Upload the health data to our Next.js API"""
    try:
        with open(file_path, 'r') as f:
            xml_data = f.read()
        
        response = requests.post(
            'http://localhost:3000/api/health/sync',
            data=xml_data,
            headers={'Content-Type': 'application/xml'}
        )
        response.raise_for_status()
        print("Health data successfully synced")
    except Exception as e:
        print(f"Error uploading health data: {e}")
        sys.exit(1)

def main():
    print(f"Starting health data sync at {datetime.now()}")
    
    # Export the health data
    export_file = export_health_data()
    
    # Upload to our server
    upload_to_server(export_file)
    
    # Clean up
    os.remove(export_file)
    print("Sync completed successfully")

if __name__ == "__main__":
    main() 