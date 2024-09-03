#include <Wire.h>
#include <Adafruit_PN532.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <lvgl.h>
#include <TFT_eSPI.h>
#include <ui.h>
#include <SPIFFS.h> 
#include <ESP32Servo.h>
#include <ArduinoJson.h>

#define CALIBRATION_FILE "/TouchCalData1"
#define REPEAT_CALIBRATION false 
uint16_t calData[5];
uint16_t touchX = 0, touchY = 0;

const char* ssid     = "FiberHGW_TPB94C_2.4GHz";
const char* password = "KyPqjqXD";


static const uint16_t screenWidth  = 320;
static const uint16_t screenHeight = 480;

const int servoPin1 = 16;
const int servoPin2 = 17;
const int servoPin3 = 25;
const int servoPin4 = 32;
#define SDA_PIN 22
#define SCL_PIN 21
Adafruit_PN532 nfc(SDA_PIN, SCL_PIN);

uint8_t keyA[6] = { 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF };


// Servo nesneleri
Servo servo1;
Servo servo2;
Servo servo3;
Servo servo4;

//Ürün nesneleri
int breadCount = 0;
int pastaCount = 0;
int diaperCount = 0;
int batteryCount = 0;


enum { SCREENBUFFER_SIZE_PIXELS = screenWidth * screenHeight / 10 };
static lv_color_t buf [SCREENBUFFER_SIZE_PIXELS];

TFT_eSPI tft = TFT_eSPI( screenWidth, screenHeight ); 

#if LV_USE_LOG != 0

void my_print(const char * buf)
{
    Serial.printf(buf);
    Serial.flush();
}
#endif

void my_disp_flush (lv_display_t *disp, const lv_area_t *area, uint8_t *pixelmap)
{
    uint32_t w = ( area->x2 - area->x1 + 1 );
    uint32_t h = ( area->y2 - area->y1 + 1 );

    if (LV_COLOR_16_SWAP) {
        size_t len = lv_area_get_size( area );
        lv_draw_sw_rgb565_swap( pixelmap, len );
    }

    tft.startWrite();
    tft.setAddrWindow( area->x1, area->y1, w, h );
    tft.pushColors( (uint16_t*) pixelmap, w * h, true );
    tft.endWrite();

    lv_disp_flush_ready( disp );
}

/*Read the touchpad*/
void my_touchpad_read (lv_indev_t * indev_driver, lv_indev_data_t * data)
{
    uint16_t touchX = 0, touchY = 0;

    bool touched = tft.getTouch( &touchX, &touchY, 600 );

    if (!touched)
    {
        data->state = LV_INDEV_STATE_REL;
    }
    else
    {
        data->state = LV_INDEV_STATE_PR;

        switch (tft.getRotation())
        {
           case 2: 
                data->point.x = touchX;
                data->point.y = touchY;
                break;
        }

        Serial.print( "Data x " );
        Serial.println( data->point.x );

        Serial.print( "Data y " );
        Serial.println( data->point.y );
    }
}

static uint32_t my_tick_get_cb (void) { return millis(); }


void setup ()
{
    Serial.begin( 115200 ); 
    servo1.attach(servoPin1);
    servo2.attach(servoPin2);
    servo3.attach(servoPin3);
    servo4.attach(servoPin4);
    Wire.begin(SDA_PIN, SCL_PIN);
    String LVGL_Arduino = "Hello Arduino! ";
    LVGL_Arduino += String('V') + lv_version_major() + "." + lv_version_minor() + "." + lv_version_patch();

    Serial.println( LVGL_Arduino );
    Serial.println( "I am LVGL_Arduino" );

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("WiFi'ye bağlanıyor...");
    }
    Serial.println("WiFi bağlantısı başarılı");

    // PN532'yi başlatma
    nfc.begin();
    uint32_t versiondata = nfc.getFirmwareVersion();
    if (!versiondata) {
        Serial.println("PN532 modülü bulunamadı");
        while (1);
    }

    nfc.SAMConfig();
    Serial.println("RFID okuyucu hazır");

    lv_init();

#if LV_USE_LOG != 0
    lv_log_register_print_cb( my_print ); 
#endif

    tft.begin();          
    tft.setRotation( 2 ); 
    
    if (!SPIFFS.begin(true)) {
        Serial.println("An error has occurred while mounting SPIFFS");
        return;
    }
    
    if (REPEAT_CALIBRATION || !SPIFFS.exists(CALIBRATION_FILE)) {
        tft.fillScreen(TFT_BLACK);
        tft.setCursor(20, 0);
        tft.setTextFont(2);
        tft.setTextSize(1);
        tft.setTextColor(TFT_WHITE, TFT_BLACK);
        tft.println("Touch corners as indicated");
        tft.calibrateTouch(calData, TFT_WHITE, TFT_RED, 15);
        Serial.println("Calibration complete!");
        fs::File f = SPIFFS.open(CALIBRATION_FILE, "w");
        if (f) {
            f.write((const unsigned char*)calData, 14);
            f.close();
        }
    } else {
        fs::File f = SPIFFS.open(CALIBRATION_FILE, "r");
        if (f) {
            if (f.read((unsigned char*)calData, 14)) {
                tft.setTouch(calData);
            }
            f.close();
        }
    }
    static lv_disp_t* disp;
    disp = lv_display_create( screenWidth, screenHeight );
    lv_display_set_buffers( disp, buf, NULL, SCREENBUFFER_SIZE_PIXELS * sizeof(lv_color_t), LV_DISPLAY_RENDER_MODE_PARTIAL );
    lv_display_set_flush_cb( disp, my_disp_flush );

    static lv_indev_t* indev;
    indev = lv_indev_create();
    lv_indev_set_type( indev, LV_INDEV_TYPE_POINTER );
    lv_indev_set_read_cb( indev, my_touchpad_read );

    lv_tick_set_cb( my_tick_get_cb );

    ui_init();
    getBalance();
    Serial.println( "Setup done" );
}
void servoTurn(int eventCode, lv_event_t * e) {
    int angle = 90; 

    if (eventCode == 1) {
        servo1.write(180); 
        delay(1000);
        servo1.write(angle);
    } else if (eventCode == 2) {
        servo2.write(180); 
        delay(1000);
        servo2.write(angle);
    } else if (eventCode == 3) {
        servo3.write(180); 
        delay(1000);
        servo3.write(angle);
    } else if (eventCode == 4) {
        servo4.write(180); 
        delay(1000);
        servo4.write(angle);
    }
}

void loop ()
{   
    lv_timer_handler(); 
    delay(5);
}

// NFC FONKSİYONLARI

String readAndProcessMifareCard() {
    String result = "";
    uint8_t success;
    uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 }; 
    uint8_t uidLength;

    success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);

    if (success) {
        Serial.println("NFC Kart Algılandı!");

        for (uint8_t sector = 0; sector < 16; sector++) {
            for (uint8_t block = 0; block < 4; block++) {
                uint8_t blockNumber = sector * 4 + block;
                if ((sector == 0 && block == 0) || block == 3) {
                    continue;
                }

                uint8_t data[16];
                success = nfc.mifareclassic_AuthenticateBlock(uid, uidLength, blockNumber, 0, keyA);

                if (success) {
                    success = nfc.mifareclassic_ReadDataBlock(blockNumber, data);

                    if (success) {
                        for (uint8_t i = 0; i < 16; i++) {
                            if (data[i] != 0) { // 0 olan verileri ekleme
                                result += String(data[i], HEX);
                            }
                        }
                    } else {
                        Serial.print("Blok "); Serial.print(blockNumber); Serial.println(" okunamadı.");
                    }
                } else {
                    Serial.print("Blok "); Serial.print(blockNumber); Serial.println(" doğrulanamadı.");
                }
            }
        }
    } else {
        result = "Kart okunamadı.";
    }

    result.toUpperCase(); 
    return result;
}

// Kart Verisini Doğrulamak için Sunucuya Gönderme Fonksiyonu
bool validateCardData() {
    Serial.print("Buradayız: ");
    String cardData = readAndProcessMifareCard(); // Kart verisini oku ve işle
    if (cardData == "Kart okunamadı.") {
        return false;
    }
    Serial.print("GÖnderilecek text: ");
    Serial.println(cardData);
    // HTTP POST isteği ile API'ya veri gönderme
    HTTPClient http;
    String serverPath = "https://kilt-credentail-978f62b6cf33.herokuapp.com/validate/test";

    http.begin(serverPath);
    http.addHeader("Content-Type", "application/json");

    String requestBody = "{\"hexData\":\"" + cardData + "\"}";
    Serial.print("request: ");
    Serial.println(requestBody);

    int httpResponseCode = http.POST(requestBody);

    if (httpResponseCode > 0) {
        String response = http.getString();
        Serial.print("HTTP POST başarılı, yanıt: ");
        Serial.println(response);
        bool isValid = (response.indexOf("true") != -1);
        return isValid;
    } else {
        Serial.print("HTTP POST başarısız, kod: ");
        Serial.println(httpResponseCode);
        return false;
    }

    http.end(); 
}

// Akıllı kontrat fonksiyonları
void getBalance() {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin("https://kilt-credentail-978f62b6cf33.herokuapp.com/getBalance");  // API endpoint URL'si

        int httpResponseCode = http.GET();

        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println(httpResponseCode);
            Serial.println(response);

            StaticJsonDocument<200> doc;
            DeserializationError error = deserializeJson(doc, response);

            if (error) {
                Serial.print("JSON deserialize hatası: ");
                Serial.println(error.c_str());
                return;
            }

            // Değerleri ilgili değişkenlere atama
            breadCount = doc["breadCount"].as<int>();
            pastaCount = doc["pastaCount"].as<int>();
            diaperCount = doc["diaperCount"].as<int>();
            batteryCount = doc["batteryCount"].as<int>();

            // Seri monitörde değerleri yazdırma
            Serial.print("Bread Countt: ");
            Serial.println(breadCount);
            Serial.print("Pasta Countt: ");
            Serial.println(pastaCount);
            Serial.print("Diaper Countt: ");
            Serial.println(diaperCount);
            Serial.print("Battery Countt: ");
            Serial.println(batteryCount);

        } else {
            Serial.print("Hata Kodu: ");
            Serial.println(httpResponseCode);
            Serial.println("HTTP isteği başarısız");
        }
        http.end(); // HTTP isteğini kapat
    } else {
        Serial.println("Wi-Fi bağlantısı kesildi");
    }
}

float getMappedValue(int input) {
  // Gelen değerleri karşılık gelen float değerlerle eşleyen dizi
  // Dizi indexi, gelen değer - 2 (çünkü gelen değerler 2'den başlıyor)
  float values[] = {0, 1, 2, 3, 4};

  if (input >= 2 && input <= 6) {
    return values[input - 2]; // Gelen değer için uygun eşlemeyi döndür
  } else {
    return -1; // Geçersiz değerler için -1 döndür
  }
}

void sendTransaction(const char* id) {
    if (WiFi.status() == WL_CONNECTED) {
        getBalance();
        HTTPClient http;
        http.begin("https://kilt-credentail-978f62b6cf33.herokuapp.com/sendTransaction");
        http.addHeader("Content-Type", "application/json");

        StaticJsonDocument<300> doc;
        doc["from"] = "0x39e0e97F020E779Ce59F82C587dD380753Da0a81";
        doc["privateKey"] = "8a53d7a896e362eafa75c62d7519d9c8f22d0c8ca44a0b7f9d9f695ce26ddbda";

        JsonArray products = doc.createNestedArray("products");
        JsonArray amounts = doc.createNestedArray("amounts");

        products.add(atoi(id)); // const char*'ı integer'a çevirir
        amounts.add(1);

        String requestBody;
        serializeJson(doc, requestBody);

        int httpResponseCode = http.POST(requestBody);

        if (httpResponseCode == 200) {
            Serial.println("Başarılı"); // HTTP yanıt kodu 200 ise başarılı
            String response = http.getString();
            Serial.println(httpResponseCode);
            Serial.println(response);
        } else {
            Serial.print("Hata Kodu: ");
            Serial.println(httpResponseCode);
            String response = http.getString();
            Serial.println(response);
        }
        http.end(); // HTTP isteğini kapat
    } else {
        Serial.println("Wi-Fi bağlantısı kesildi");
    }
}