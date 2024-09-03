import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import './PopupStyles.css'; // Stil dosyasını içe aktarıyoruz




const locations: { name: string; coords: LatLngExpression; items: string[] }[] = [
  { 
    name: "İstanbul", 
    coords: [41.0082, 28.9784], 
    items: ["Çikolata", "Kraker", "Su Şişesi", "Cips"] 
  },
  { 
    name: "Ankara", 
    coords: [39.9334, 32.8597], 
    items: ["Enerji Barı", "Sakız", "Bisküvi", "Gazlı İçecek"] 
  },
  { 
    name: "İzmir", 
    coords: [38.4237, 27.1428], 
    items: ["Sandviç", "Meyve Suyu", "Atıştırmalık Kuruyemiş", "Şeker"] 
  },
  { 
    name: "Antalya Anfaş", 
    coords: [36.940083433826196, 30.816420141545944], 
    items: ["Yara Bandı", "Pastil", "Batarya", "Diş Macunu"] 
  },
  { 
    name: "Bursa", 
    coords: [40.1826, 29.0665], 
    items: ["Su Şişesi", "Cips", "Enerji Barı", "Çikolata"] 
  },
  { 
    name: "Adana", 
    coords: [37.0000, 35.3213], 
    items: ["Gazlı İçecek", "Sakız", "Sandviç", "Meyve Suyu"] 
  },
  { 
    name: "Konya", 
    coords: [37.8715, 32.4847], 
    items: ["Kraker", "Bisküvi", "Şeker", "Çay"] 
  },
  { 
    name: "Gaziantep", 
    coords: [37.0662, 37.3833], 
    items: ["Çikolata", "Su Şişesi", "Cips", "Enerji Barı"] 
  },
  { 
    name: "Kayseri", 
    coords: [38.7335, 35.4853], 
    items: ["Bisküvi", "Sakız", "Meyve Suyu", "Atıştırmalık Kuruyemiş"] 
  },
  { 
    name: "Mersin", 
    coords: [36.8121, 34.6415], 
    items: ["Şeker", "Kraker", "Gazlı İçecek", "Su Şişesi"] 
  },
  { 
    name: "Diyarbakır", 
    coords: [37.9144, 40.2306], 
    items: ["Çikolata", "Enerji Barı", "Sandviç", "Bisküvi"] 
  },
  { 
    name: "Samsun", 
    coords: [41.2867, 36.33], 
    items: ["Su Şişesi", "Cips", "Atıştırmalık Kuruyemiş", "Çay"] 
  },
  { 
    name: "Eskişehir", 
    coords: [39.7767, 30.5206], 
    items: ["Kraker", "Gazlı İçecek", "Sandviç", "Çikolata"] 
  },
  { 
    name: "Trabzon", 
    coords: [41.0053, 39.7262], 
    items: ["Bisküvi", "Şeker", "Sakız", "Meyve Suyu"] 
  },
  { 
    name: "Erzurum", 
    coords: [39.9043, 41.2679], 
    items: ["Su Şişesi", "Enerji Barı", "Çay", "Cips"] 
  },
  { 
    name: "Malatya", 
    coords: [38.3552, 38.3095], 
    items: ["Çikolata", "Kraker", "Sandviç", "Meyve Suyu"] 
  },
  { 
    name: "Van", 
    coords: [38.5019, 43.4165], 
    items: ["Gazlı İçecek", "Su Şişesi", "Şeker", "Atıştırmalık Kuruyemiş"] 
  },
  { 
    name: "Şanlıurfa", 
    coords: [37.1674, 38.7955], 
    items: ["Cips", "Sakız", "Bisküvi", "Çay"] 
  },
  { 
    name: "Sivas", 
    coords: [39.7477, 37.0179], 
    items: ["Meyve Suyu", "Kraker", "Sandviç", "Çikolata"] 
  },
  { 
    name: "Hatay", 
    coords: [36.4018, 36.3498], 
    items: ["Yara Bandı", "Pastil", "Batarya", "Diş Macunu"] 
  },
  { 
    name: "Gazze", 
    coords: [31.5017, 34.4667], 
    items: ["Soğuk Kompres", "Su Şişesi", "Islak Mendil", "Sargı Bezi"] 
  },
  { 
    name: "Halep", 
    coords: [36.2021, 37.1343], 
    items: ["BebekBezi", "Yara Bandı", "Soğuk Kompres", "Su Şişesi"] 
  },
  { 
    name: "Lübnan Bekaa Vadisi", 
    coords: [33.8444, 35.9024], 
    items: ["Soğuk Kompres", "Sargı Bezi", "Su Şişesi", "Islak Mendil"] 
  },
  { 
    name: "Bağdat", 
    coords: [33.3152, 44.3661], 
    items: ["BebekBezi", "Su Şişesi", "Soğuk Kompres", "Sargı Bezi"] 
  },
  { 
    name: "Kahire", 
    coords: [30.0444, 31.2357], 
    items: ["Islak Mendil", "Soğuk Kompres", "Su Şişesi", "Sargı Bezi"] 
  },
  { 
    name: "Sarajevo", 
    coords: [43.8563, 18.4131], 
    items: ["Soğuk Kompres", "Islak Mendil", "Su Şişesi", "Yara Bandı"] 
  },
  { 
    name: "Sanaa", 
    coords: [15.3694, 44.1910], 
    items: ["Soğuk Kompres", "Islak Mendil", "Sargı Bezi", "Su Şişesi"] 
  },
  { 
    name: "Mogadişu", 
    coords: [2.0469, 45.3182], 
    items: ["Soğuk Kompres", "Su Şişesi", "Islak Mendil", "Sargı Bezi"] 
  },
  { 
    name: "Mısrata", 
    coords: [32.3754, 15.0925], 
    items: ["Islak Mendil", "Soğuk Kompres", "Sargı Bezi", "Su Şişesi"] 
  },
  { 
    name: "Kabil", 
    coords: [34.5553, 69.2075], 
    items: ["Soğuk Kompres", "Islak Mendil", "Sargı Bezi", "Su Şişesi"] 
  },
  { 
    name: "Amman", 
    coords: [31.9539, 35.9106], 
    items: ["BebekBezi", "Su Şişesi", "Soğuk Kompres", "Islak Mendil"] 
  },
  { 
    name: "Musul", 
    coords: [36.3456, 43.2551], 
    items: ["Sargı Bezi", "Su Şişesi", "Soğuk Kompres", "Islak Mendil"] 
  },
  { 
    name: "Beyrut", 
    coords: [33.8938, 35.5018], 
    items: ["Islak Mendil", "Soğuk Kompres", "Su Şişesi", "Sargı Bezi"] 
  },
  { 
    name: "Gazze Rafah",
    coords: [31.287, 34.2401], 
    items: ["Soğuk Kompres", "Su Şişesi", "Islak Mendil", "Sargı Bezi"] 
  },
  { 
    name: "Aden", 
    coords: [12.7872, 45.0169], 
    items: ["BebekBezi", "Yara Bandı", "Soğuk Kompres", "Su Şişesi"] 
  },
  { 
    name: "Bengazi", 
    coords: [32.1167, 20.0667], 
    items: ["Islak Mendil", "Soğuk Kompres", "Sargı Bezi", "Su Şişesi"] 
  },
  { 
    name: "Nairobi", 
    coords: [1.2921, 36.8219], 
    items: ["BebekBezi", "Soğuk Kompres", "Su Şişesi", "Islak Mendil"] 
  },
  { 
    name: "Kerkük", 
    coords: [35.4695, 44.3910], 
    items: ["Sargı Bezi", "Su Şişesi", "Soğuk Kompres", "Islak Mendil"] 
  },
  { 
    name: "Şam", 
    coords: [33.5138, 36.2765], 
    items: ["Soğuk Kompres", "Islak Mendil", "Su Şişesi", "Sargı Bezi"] 
  },
  { 
    name: "Tunus", 
    coords: [36.8065, 10.1815], 
    items: ["Islak Mendil", "Soğuk Kompres", "Su Şişesi", "Sargı Bezi"] 
  }
];


const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleConfirm = (location: string, items: string[]) => {
    const itemsQuery = encodeURIComponent(items.join(','));
    if (window.confirm(`${location} Konumuna bağış yapmak istiyor musunuz?`)) {
      navigate(`/store?location=${encodeURIComponent(location)}&items=${itemsQuery}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px'}}>Nereye Bağış Yapmak İstersin?</h1>
      <div style={{ height: '70vh', width: '80%', margin: '20px 0' }}>
        <MapContainer center={[39.331137, 34.516464]} zoom={6.2} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <React.Fragment>
            {locations.map((location, index) => (
              <Marker key={index} position={location.coords}>
                <Popup>
                  <div className="popup-content">
                    <h3>{location.name}</h3>
                    <ul>
                      {location.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                    <button 
                      className="donate-button" 
                      onClick={() => handleConfirm(location.name, location.items)}
                    >
                      Bağış Yap
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </React.Fragment>
        </MapContainer>
      </div>
      <h5 style={{ marginTop: '20px', textAlign: 'center',marginBottom: '20px' }}>
        Yukardaki haritayı kullanarak bağış yapmak istediğiniz konumu belirleyebilirsiniz. 
      </h5>
      <h5>
      İstediğiniz lokasyonu seçtikten sonra pine tıklayıp "Bağış Yap" butonuna basın.
      </h5>
    </div>
  );
};

export default Home;