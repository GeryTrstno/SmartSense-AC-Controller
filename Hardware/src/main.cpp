#include <Arduino.h>
#include <DHTesp.h> // Memanggil library DHT yang sudah diinstal

// Atur pin mana di ESP32 yang terhubung ke sensor DHT.
// Ganti angka 4 jika Anda menggunakan pin lain!
const int DHT_PIN = 4;

// Buat sebuah objek sensor
DHTesp dht;

void setup() {
  // Fungsi ini berjalan sekali saat ESP32 pertama kali nyala

  // Mulai komunikasi ke komputer untuk menampilkan tulisan
  Serial.begin(115200);

  // Siapkan sensornya
  dht.setup(DHT_PIN, DHTesp::DHT22);
  Serial.println("Setup selesai. Mulai membaca sensor...");
}

void loop() {
  // Fungsi ini berjalan berulang-ulang selamanya

  // Tunggu 2 detik sebelum membaca lagi
  delay(2000);

  // Ambil data suhu dan kelembapan
  float temperature = dht.getTemperature();
  float humidity = dht.getHumidity();

  // Tampilkan hasilnya ke layar komputer
  Serial.print("Suhu: ");
  Serial.print(temperature);
  Serial.print(" °C\t"); // \t adalah karakter tab untuk spasi
  Serial.print("Kelembapan: ");
  Serial.print(humidity);
  Serial.println(" %");
}