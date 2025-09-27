#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <IRremoteESP8266.h>
#include <IRsend.h>

// --- KONFIGURASI ---
const char *WIFI_SSID = "Afdhol 17";
const char *WIFI_PASSWORD = "#Premium17";
const char *SERVER_GET_COMMAND_URL = "http://192.168.18.194:8000/api/control/command/latest";
const uint16_t kIrLedPin = 4;

// --- OBJEK ---
IRsend irsend(kIrLedPin);
HTTPClient http;

uint16_t rawData[137] = {9778, 9828, 9812, 9828, 4614, 2504, 356, 378, 356, 954, 358, 954, 356, 380, 354, 956, 356, 378, 358, 378, 356, 378, 356, 378, 354, 958, 358, 378, 356, 378, 356, 378, 356, 956, 356, 378, 358, 376, 356, 958, 354, 956, 356, 380, 356, 380, 354, 956, 358, 378, 356, 956, 358, 378, 356, 954, 358, 954, 358, 378, 356, 378, 354, 380, 354, 380, 356, 380, 356, 376, 356, 380, 354, 380, 356, 378, 358, 378, 356, 954, 358, 376, 358, 378, 356, 378, 356, 380, 356, 378, 358, 376, 354, 380, 356, 378, 354, 956, 356, 380, 356, 954, 356, 378, 354, 958, 358, 954, 354, 380, 354, 958, 356, 378, 354, 380, 356, 378, 356, 956, 356, 378, 354, 956, 356, 958, 354, 958, 356, 378, 354, 958, 356, 378, 356, 20284, 4612};

// --- TIMER ---
unsigned long previousCommandMillis = 0;
const long commandInterval = 3000;

void setup()
{
  Serial.begin(115200);
  irsend.begin();
  // ... (kode koneksi Wi-Fi) ...

  // Koneksi ke Wi-Fi
  Serial.print("Menghubungkan ke Wi-Fi: ");
  Serial.println(WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi terhubung!");
  Serial.print("Alamat IP ESP32: ");
  Serial.println(WiFi.localIP());
}

void loop()
{
  // Serial.println("Memeriksa perintah dari server...");
  unsigned long currentMillis = millis();

  if (currentMillis - previousCommandMillis >= commandInterval)
  {
    previousCommandMillis = currentMillis;
    Serial.println("Blocking");

    if (WiFi.status() == WL_CONNECTED)
    {
      http.begin(SERVER_GET_COMMAND_URL);
      int httpCode = http.GET();

      Serial.println("Mengecek WL CONNECTED");

      if (httpCode == HTTP_CODE_OK)
      {
        String payload = http.getString();
        Serial.println("Respons dari server: " + payload);

        JsonDocument doc;
        deserializeJson(doc, payload);
        String command = doc["command"];

        if (command == "ON" || command == "on")
        {
          Serial.println("Menerima perintah ON. Mengirim sinyal IR...");
          irsend.sendRaw(rawData, 137, 38);
        }
        else if (command == "OFF" || command == "off")
        {
          Serial.println("Menerima perintah OFF. Mengirim sinyal IR...");
          irsend.sendRaw(rawData, 137, 38);
        }
      }
      http.end();
    }
  }
}