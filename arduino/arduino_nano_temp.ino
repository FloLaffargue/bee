  
#include "DHT.h"

#define DHT_PIN 8
#define DHTTYPE DHT11

DHT dht(DHT_PIN, DHTTYPE);

String nom = "Arduino";
String msg;

void setup() {
 Serial.begin(9600);
 dht.begin();
}

void loop() {
 readSerialPort();
 if (msg != "") {
   sendData();
 }
 delay(500);
} 

void readSerialPort() {
 msg = "";
 if (Serial.available()) {
   delay(10);
   while (Serial.available() > 0) {
     msg += (char)Serial.read();
   }
   Serial.flush();
 }
}

void sendData() {
 if (msg == "getData") {
  String temp = String(dht.readTemperature());
  String humidity= String(dht.readHumidity());
  Serial.println("{ \"temp\": " + temp + ", \"humidity\": " + humidity + " }");
 } else {
  Serial.print("DO NOT UNDERSTAND");
 }
}
