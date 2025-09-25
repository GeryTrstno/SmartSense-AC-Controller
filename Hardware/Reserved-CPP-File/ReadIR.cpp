#include <Arduino.h>
#include <IRrecv.h>
#include <IRutils.h>

// Tentukan pin GPIO tempat Anda menghubungkan pin DATA dari IR Receiver
const uint16_t kRecvPin = 34;

// Konfigurasi buffer untuk menampung data IR yang panjang dari remote AC
const uint16_t kCaptureBufferSize = 1024;
const uint8_t kTimeout = 50; //ms

// Buat objek IR Receiver
IRrecv irrecv(kRecvPin, kCaptureBufferSize, kTimeout, true);
// Objek untuk menyimpan hasil decode
decode_results results; 

void setup() {
  Serial.begin(115200);
  
  // Mulai receiver
  irrecv.enableIRIn();
  
  Serial.println("IR Receiver siap. Arahkan remote AC Anda dan tekan tombol.");
}

void loop() {
  // Cek apakah ada sinyal IR yang diterima
  if (irrecv.decode(&results)) {
    Serial.println("===================================================");
    Serial.println("Sinyal Diterima!");

    // Cetak hasil dalam format array C/C++ yang bisa langsung di-copy
    Serial.println(resultToSourceCode(&results));
    
    // Tunggu sinyal berikutnya
    irrecv.resume();
  }
  delay(100);
}