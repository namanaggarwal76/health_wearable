from flask import Flask, jsonify
import requests

app = Flask(__name__)

CHANNEL_ID = "2848133"
API_KEY = "YV00RQWLDTRL6I4W"
URL = f"https://api.thingspeak.com/channels/{CHANNEL_ID}/feeds.json?results=1&api_key={API_KEY}"

@app.route("/health", methods=["GET"])
def get_health_data():
    response = requests.get(URL)
    data = response.json()
    
    if "feeds" in data and data["feeds"]:
        latest_data = data["feeds"][0]
        return jsonify({
            "heart_rate": latest_data["Heart Rate"],
            "spo2": latest_data["SpO2"],
            "steps": latest_data["Steps"],
            "temperature": latest_data["Temperature"]
        })
    
    return jsonify({"error": "No data available"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
