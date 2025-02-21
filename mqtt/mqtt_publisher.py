import random
import time
import paho.mqtt.client as mqtt

# MQTT configuration
MQTT_BROKER = "mqtt.thingspeak.com"
MQTT_PORT = 8883
MQTT_TOPIC = "channels/2848133/publish/FR6Q4TERE03XYED7"
MQTT_USERNAME = "mwa0000036830598"
MQTT_PASSWORD = "6MOUUB8A7EP2KMD8"

# Function to simulate random data values
def generate_random_data():
    spo2 = random.uniform(90, 100)  # Simulate SpO2 between 90 and 100
    heart_rate = random.randint(60, 100)  # Simulate heart rate between 60 and 100 bpm
    steps = random.randint(0, 10000)  # Simulate steps between 0 and 10000
    temperature = random.uniform(36.0, 37.5)  # Simulate temperature between 36.0 and 37.5°C
    return spo2, heart_rate, steps, temperature

# Function to publish data to ThingSpeak
def publish_data(client):
    spo2, heart_rate, steps, temperature = generate_random_data()
    payload = f"field1={spo2}&field2={heart_rate}&field3={steps}&field4={temperature}"
    client.publish(MQTT_TOPIC, payload)
    print(f"Published data: {payload}")

# MQTT event callbacks
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT Broker!")
    else:
        print(f"Failed to connect, return code {rc}")

def on_publish(client, userdata, mid):
    print("Data published successfully")

# Main function
def main():
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_publish = on_publish

    client.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)
    client.connect(MQTT_BROKER, MQTT_PORT, 60)
    client.loop_start()

    try:
        while True:
            publish_data(client)
            time.sleep(15)  # Publish data every 15 seconds
    except KeyboardInterrupt:
        print("Exiting...")
    finally:
        client.loop_stop()
        client.disconnect()

if __name__ == "__main__":
    main()