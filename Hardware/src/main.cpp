#include <Arduino.h>
#include <DHTesp.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h> // Library untuk membuat format JSON

// --- [ WAJIB DIUBAH ] ---
const char* WIFI_SSID = "ITS-WIFI-TW2";
const char* WIFI_PASSWORD = "itssurabaya";
// Ganti dengan IP Address komputer Anda, bukan localhost
const char* SERVER_ADDRESS = "http://10.4.65.3:8000/api/sensor-readings"; 
// -------------------------

// --- Konfigurasi Pin ---
const int DHT_PIN = 4;
const int PIR_PIN = 5;

// --- Membuat Objek Sensor & Klien HTTP ---
DHTesp dht;
HTTPClient http;

// --- Variabel untuk Timer ---
unsigned long previousSensorMillis = 0;
const long sensorInterval = 5000; // Kirim data setiap 5 detik

void setup() {
  Serial.begin(115200);

  // Inisialisasi Sensor
  dht.setup(DHT_PIN, DHTesp::DHT22);
  pinMode(PIR_PIN, INPUT);

  // Koneksi ke Wi-Fi
  Serial.print("Menghubungkan ke Wi-Fi: ");
  Serial.println(WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi terhubung!");
  Serial.print("Alamat IP ESP32: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  unsigned long currentMillis = millis();

  // Cek apakah sudah waktunya mengirim data
  if (currentMillis - previousSensorMillis >= sensorInterval) {
    previousSensorMillis = currentMillis;

    // Baca semua sensor
    float temperature = dht.getTemperature();
    float humidity = dht.getHumidity();
    bool motionDetected = digitalRead(PIR_PIN);

    // Cek jika pembacaan DHT gagal (misal: sensor belum terpasang)
    if (isnan(temperature) || isnan(humidity)) {
      Serial.println("Gagal membaca sensor DHT!");
      return; // Lewati pengiriman data jika bacaan tidak valid
    }

    // Siapkan data dalam format JSON
    JsonDocument doc; // Gunakan JsonDocument untuk ArduinoJson v7+
    doc["temperature"] = temperature;
    doc["humidity"] = humidity;
    doc["motion_detected"] = motionDetected;

    String jsonPayload;
    serializeJson(doc, jsonPayload);

    // Kirim data ke server Laravel
    Serial.print("Mengirim data ke server: ");
    Serial.println(jsonPayload);

    http.begin(SERVER_ADDRESS);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.POST(jsonPayload);

    if (httpResponseCode > 0) {
      Serial.print("Kode Respons HTTP: ");
      Serial.println(httpResponseCode);
      String responsePayload = http.getString();
      Serial.print("Respons Server: ");
      Serial.println(responsePayload);
    } else {
      Serial.print("Error saat mengirim POST, kode: ");
      Serial.println(httpResponseCode);
    }
    
    http.end();
  }
}