import React from 'react';
import './Aboutstyles.css';

export const About: React.FC = () => {
  return (
    <div className="content-container">
      <h1>YAZGİT Feza - Blokzincir Teknolojisi ile Uçtan Uca Fiziksel Bağış Projesi</h1>

      <section>
        <h2>Giriş</h2>
        <p>
          YAZGİT Feza, Konya Teknik Üniversitesi Yapay Zeka ve Görüntü İşleme Topluluğu bünyesinde 2024 yılında kurulmuş
          bir ekip olarak, TEKNOFEST 2024 Blokzincir Yarışması’na katılmak üzere bir araya gelmiştir. Bu projede,
          blokzincir teknolojisinin sunduğu merkeziyetsiz yapının avantajlarını kullanarak Türkiye genelindeki otomatları
          bir araya getiren yenilikçi bir bağış sistemi geliştirilmiştir. Bu proje, bağışçıların internet üzerinden
          aracısız olarak fiziksel bağış yapabilmelerini sağlamayı hedeflemektedir.
        </p>
      </section>

      <section>
        <h2>Projenin Temel Özellikleri</h2>

        <h3>Bağış Süreçlerinde Şeffaflık ve Güven</h3>
        <p>
          Projemizin en önemli özelliklerinden biri, bağışçıların bağış süreçlerinde şeffaflık ve güvenceye sahip
          olmalarını sağlamaktır. Geleneksel bağış sistemlerinde yaşanan şeffaflık eksikliği, bağışçıların bağışlarının
          gerçekten ihtiyaç sahiplerine ulaşıp ulaşmadığı konusunda endişeler yaratmaktadır. Bu endişeler, bağış
          miktarlarının azalmasına ve güven kaybına yol açmıştır.
        </p>
        <p>
          YAZGİT Feza ekibi olarak geliştirdiğimiz sistem, bağışçıların yaptıkları bağışları izleyebilecekleri ve
          bağışlarının gerçekten ihtiyaç sahiplerine ulaştığını teyit edebilecekleri bir yapı sunmaktadır. Bu yapı,
          bağışçıların bağış yaptıktan sonra bir SMS veya e-posta ile bilgilendirilmesini içermektedir. Bu sayede,
          bağışçıların güveni artırılmakta ve bağış süreçleri daha şeffaf hale getirilmektedir.
        </p>

        <h3>Merkeziyetsiz Kimlik Yönetimi</h3>
        <p>
          Proje, merkeziyetsiz dijital kimlik yönetim sistemlerine odaklanmaktadır. Bu sistem, bağışçılar ve ihtiyaç
          sahipleri arasında gizliliği koruyarak, bağışçıların kimlik bilgilerini saklamadan işlem yapmalarını sağlar.
          Bağışçıların, merkeziyetsiz kimlikler aracılığıyla bağış yapabilecekleri ve bu kimliklerin merkezi olmayan bir
          şekilde yönetileceği bir yapı oluşturulmuştur.
        </p>
        <p>
          Bağışçılar, bağış yapmak istediklerinde, merkeziyetsiz kimliklerini kullanarak sisteme giriş yapar ve seçtikleri
          otomat üzerinden bağış yaparlar. Bağışın ihtiyaç sahibine ulaşmasının ardından, bağışçıya bu durumu bildiren bir
          SMS veya e-posta gönderilir. Böylece bağışçılar, bağışlarının yerine ulaştığından emin olurlar.
        </p>

        <h3>Fiziksel Ürünler Üzerinden Bağış</h3>
        <p>
          YAZGİT Feza projesi, bağış sürecini parasal olmaktan çıkarıp fiziksel ürünler üzerinden gerçekleştirmektedir.
          Bu sayede, bağışçılar doğrudan ihtiyaç sahiplerinin kullanabileceği ürünleri bağışlar ve bu ürünler otomatlar
          aracılığıyla ihtiyaç sahiplerine ulaştırılır. Bu sistem, toplumda güven eksikliğine yol açan parasal bağışların
          yerine somut ürünlerin bağışlanmasını teşvik eder.
        </p>
        <p>
          Geliştirilen sistemde, otomatlar Türkiye genelinde yaygın olarak kullanılan ve farklı amaçlara hizmet eden
          cihazlardır. Bu otomatlar, sistemimize entegre edilerek bağış sürecinde kullanılabilir hale getirilmiştir.
          Bağışçılar, istedikleri ürünü seçerek otomat aracılığıyla bağış yapabilirler.
        </p>

        <h3>Gelişmiş Donanım ve Yazılım Entegrasyonu</h3>
        <p>
          Proje, yazılım ve donanım bileşenlerinin entegre bir şekilde çalıştığı yenilikçi bir sistem sunmaktadır.
          Sistemin yazılım kısmı, blokzincir ile bağlantılı akıllı kontratlar, sunucular ve bir web sitesi aracılığıyla
          yönetilmektedir. Donanım kısmında ise, otomatlar, RFID okuyucular ve mikrodenetleyiciler gibi elektronik
          bileşenler bulunmaktadır.
        </p>
        <p>
          Akıllı kontratlar Solidity dilinde yazılmış olup, EVM (Ethereum Virtual Machine) uyumlu olarak çalışmaktadır.
          Bu kontratlar, bağış işlemlerinin güvenli bir şekilde gerçekleştirilmesini sağlar. Bağışçıların bağış yapması ve
          ihtiyaç sahiplerinin bu bağışları alması için bir web sitesi geliştirilmiştir. Bu web sitesi, bağışçıların bağış
          yapabilecekleri otomatları seçmelerine ve bu otomatlardaki ürünleri sanal cüzdanları aracılığıyla satın
          almalarına olanak tanır.
        </p>

        <h3>Yenilikçi Çözüm: MDB Protokolü ile Otomat Entegrasyonu</h3>
        <p>
          Otomatların sisteme entegrasyonu, MDB (Multi-Drop Bus) protokolü kullanılarak gerçekleştirilmiştir. MDB
          protokolü, piyasada yaygın olarak kullanılan otomatların kontrol edilmesini sağlar. Geliştirilen düşük maliyetli
          bir eklenti, otomat sahibi veya yetkili kişi tarafından otomatın bağlantı kablolarına takılarak blokzincir
          ağımıza bir DID (Merkeziyetsiz Kimlik) olarak eklenir.
        </p>
        <p>
          Bu eklenti sayesinde, otomatlar blokzincir ağına entegre edilmekte ve bağış sisteminin bir parçası haline
          gelmektedir. İhtiyaç sahipleri, kendilerine güvenilir kurumlar tarafından verilen RFID kartları kullanarak
          otomatlardan bağış ürünlerini teslim alabilirler. Bu süreç, otomatın kredi kartı okuma kısmına tanımlama
          kartının okutulmasıyla gerçekleştirilir.
        </p>
      </section>

      <section>
        <h2>Projenin Teknik Detayları</h2>

        <h3>Akıllı Kontratların Rolü</h3>
        <p>
          Projede, bağış işlemlerini yönetmek için Solidity programlama dilinde yazılmış akıllı kontratlar
          kullanılmaktadır. Akıllı kontratlar, bağışçıların seçtikleri ürünleri satın almalarını, bu ürünlerin otomatlar
          üzerinden ihtiyaç sahiplerine ulaştırılmasını ve tüm sürecin güvenli ve şeffaf bir şekilde yürütülmesini sağlar.
        </p>
        <p>
          Akıllı kontratlar, bağışların doğru bir şekilde dağıtılmasını ve bağışçıların seçtikleri ürünlerin otomatlarda
          mevcut olup olmadığının kontrol edilmesini sağlar. Bu işlemler, akıllı kontrat içerisindeki fonksiyonlar
          aracılığıyla gerçekleştirilir:
        </p>
        <ul>
          <li>
            <strong>Payable Fonksiyonu</strong>: Bu fonksiyon, bağışçıların seçtikleri ürünleri satın almalarını sağlar.
            Bağış miktarı ve ürünlerin fiyatları bu fonksiyon aracılığıyla kontrol edilir ve güncellenir.
          </li>
          <li>
            <strong>WithdrawDonation Fonksiyonu</strong>: İhtiyaç sahiplerinin otomatlardan ürün alması durumunda, bu
            fonksiyon devreye girer ve bağış miktarı azaltılır. Ürünlerin ücreti ise akıllı kontratın teslim alma
            adresine transfer edilir.
          </li>
          <li>
            <strong>Withdraw Fonksiyonu</strong>: Otomat sahibi, teslim alınan ürünlerin ücretini bu fonksiyon
            aracılığıyla kendi sanal cüzdanına aktarabilir. Bu sayede otomat sahibinin maliyetleri karşılanmış olur.
          </li>
        </ul>

        <h3>Merkeziyetsiz Kimliklerin Kullanımı</h3>
        <p>
          Projenin en yenilikçi özelliklerinden biri de merkeziyetsiz kimliklerin kullanımıdır. Hem bağışçılar hem de
          ihtiyaç sahipleri, merkeziyetsiz kimlikler (DID - Decentralized Identifier) aracılığıyla sisteme giriş yaparlar.
          Bu kimlikler, herhangi bir merkezi sunucuda depolanmaz; sadece zincir üzerinde hash değerleri bulunur. Bu
          sayede, kimlik bilgileri tamamen güvende tutulur ve gizlilik sağlanır.
        </p>
        <p>
          Merkeziyetsiz kimlikler, KILT Protocol’ün web3login hizmeti aracılığıyla kullanılır. KILT Protocol, Polkadot
          ekosisteminde bulunan bir merkeziyetsiz kimlik yönetim sistemi olup, kullanıcıların kimliklerini güvenli bir
          şekilde doğrulamalarına olanak tanır. Bu sistem, kullanıcıların kimliklerini doğrulamak için kullanılan
          verilerin yalnızca hash değerlerini zincir üzerinde tutar, bu da güvenliği artırır.
        </p>

        <h3>Web Sitesi ve Kullanıcı Arayüzü</h3>
        <p>
          Projenin kullanıcı arayüzü, HTML, CSS ve JavaScript kullanılarak geliştirilmiş bir web sitesidir. Bu web sitesi,
          bağışçıların bağış yapmak istedikleri otomatları seçmelerine, ürünleri incelemelerine ve sanal cüzdanlarını
          kullanarak bağış yapmalarına olanak tanır.
        </p>
        <p>
          Web sitesi, Ethers.js kütüphanesi aracılığıyla Metamask ve diğer EVM uyumlu cüzdanlarla entegre çalışır. Bu
          sayede, bağışçılar doğrudan cüzdanlarından bağış yapabilir ve akıllı kontratlarla etkileşime geçebilir.
          Kullanıcılar, web sitesi üzerinden bağış yapmak istediklerinde şu adımları izlerler:
        </p>
        <ol>
          <li><strong>Otomat Seçimi</strong>: Türkiye haritası üzerinden bağış yapmak istedikleri otomatı seçerler.</li>
          <li><strong>Ürün Seçimi</strong>: Otomat üzerinde bağış yapabilecekleri ürünleri inceleyip sepetlerine eklerler.</li>
          <li><strong>Bağış Yapma</strong>: Seçtikleri ürünleri sanal cüzdanları aracılığıyla satın alarak bağışlarını tamamlarlar.</li>
        </ol>

        <h3>Express.js Sunucu ve IoT Entegrasyonu</h3>
        <p>
          Projede, otomatlarla ve diğer sistem bileşenleriyle etkileşime geçmek için bir Express.js sunucusu kullanılır. Bu
          sunucu, otomatlardan gelen merkeziyetsiz kimlik sorgularını alır, blokzincir ile bağlantı kurarak sonuçları
          otomata geri gönderir. Sunucu, akıllı kontratların işleyişini yönetir ve bağış sürecinin güvenli bir şekilde
          tamamlanmasını sağlar.
        </p>
        <p>
          Sunucu, ayrıca otomat sahibinin teslim alınan bağışları çekmesini ve otomatın güncel durumunu sorgulamasını
          sağlar. Bu işlemler, belirli API sorguları aracılığıyla gerçekleştirilir:
        </p>
        <ul>
          <li><strong>/getBalance Sorgusu</strong>: Otomat üzerinde bulunan bağış ürünlerinin miktarını sorgular.</li>
          <li><strong>/sendTransaction Sorgusu</strong>: İhtiyaç sahiplerinin ürünleri almasını sağlar ve bu işlem sonrası ürün miktarını günceller.</li>
          <li><strong>/withdrawFunds Sorgusu</strong>: Otomat sahibinin teslim alınan bağışların ücretini kendi hesabına transfer etmesini sağlar.</li>
        </ul>

        <h3>Donanım Tasarımı ve Bileşenler</h3>
        <p>
          Projenin donanım kısmı, otomatların blokzincir ağına entegre edilmesi için gereken bileşenleri içerir. Bu
          bileşenler arasında Wemos Lonin ESP-32 mikrodenetleyicisi, PN-532 RFID-NFC okuyucu, Mifare Classic 4K RFID kartlar
          ve MDB RS232 kontrolcüsü bulunmaktadır.
        </p>
        <ul>
          <li>
            <strong>Wemos Lonin ESP-32</strong>: Bu mikrodenetleyici, otomatın merkezi birimidir ve bağış sürecini
            yönetir. Wi-Fi ve Bluetooth desteği sayesinde, otomatın blokzincir ağına bağlanmasını sağlar.
          </li>
          <li>
            <strong>PN-532 RFID-NFC Okuyucu</strong>: İhtiyaç sahiplerinin RFID kartlarını okuyarak kimliklerini
            doğrulayan bu bileşen, otomatın kullanıcıyla etkileşime geçmesini sağlar.
          </li>
          <li>
            <strong>MDB RS232 Kontrolcüsü</strong>: Otomatın içindeki ürünleri kontrol etmek ve bağış sürecini yönetmek
            için kullanılan bu bileşen, MDB protokolü aracılığıyla otomatla bağlantı kurar.
          </li>
        </ul>
      </section>

      <section>
        <h2>Projenin Faydaları ve Avantajları</h2>

        <h3>Şeffaflık ve Güvenin Artırılması</h3>
        <p>
          YAZGİT Feza projesi, bağış süreçlerinde şeffaflık ve güveni önemli ölçüde artırmaktadır. Geleneksel bağış
          sistemlerinde yaşanan şeffaflık eksiklikleri ve güven sorunları, bağışçıların bağış yapma motivasyonunu
          düşürmektedir. Projemizde, bağışçıların bağışlarının yerine ulaştığını teyit edebilecekleri bir sistem
          sunulmaktadır. Bu, bağışçıların güvenini artırırken, bağış süreçlerinin daha etkili ve verimli hale gelmesini
          sağlar.
        </p>

        <h3>Fiziksel Ürünler Üzerinden Bağış</h3>
        <p>
          Fiziksel ürünler üzerinden yapılan bağışlar, parasal bağışların yarattığı belirsizlikleri ortadan
          kaldırmaktadır. Bağışçılar, ihtiyaç sahiplerine doğrudan somut ürünler bağışlayarak, bu ürünlerin gerçekten
          ihtiyaç sahibi kişiler tarafından kullanıldığından emin olabilirler. Bu, bağış süreçlerinde daha büyük bir etki
          yaratır ve bağışçıların bağış yapma motivasyonunu artırır.
        </p>

        <h3>Merkeziyetsiz Kimlik Yönetimi ile Mahremiyetin Korunması</h3>
        <p>
          Projenin bir diğer önemli avantajı, merkeziyetsiz kimlik yönetimi sayesinde bağışçıların ve ihtiyaç sahiplerinin
          mahremiyetinin korunmasıdır. Merkeziyetsiz kimlikler (DID), kullanıcıların kimlik bilgilerini merkezi bir
          sunucuya ihtiyaç duymadan saklamalarını sağlar. Bu, kullanıcıların kişisel verilerinin güvende olmasını sağlar
          ve bağış süreçlerinde mahremiyetin korunmasına yardımcı olur.
        </p>

        <h3>Kolay Entegrasyon ve Kullanım</h3>
        <p>
          Proje, otomatlar ve blokzincir ağı arasında kolay bir entegrasyon sunar. MDB protokolü kullanılarak otomatların
          blokzincir ağına entegre edilmesi, projenin düşük maliyetli ve geniş çapta uygulanabilir olmasını sağlar. Ayrıca,
          bağışçılar ve ihtiyaç sahipleri için kullanıcı dostu bir arayüz sunan web sitesi, bağış yapma ve ürün alma
          süreçlerini basit ve erişilebilir hale getirir.
        </p>
      </section>

      <section>
        <h2>Karşılaşılan Zorluklar ve Çözümler</h2>

        <h3>Lojistik Zorluklar</h3>
        <p>
          Projenin uygulanabilirliği açısından en büyük zorluklardan biri, otomatların fiziksel olarak tüm Türkiye'de
          yaygınlaştırılmasıdır. Bu, büyük bir lojistik ve maddi gereksinim doğurur. YAZGİT Feza ekibi, bu zorluğu aşmak
          için halihazırda mevcut olan ve farklı amaçlara hizmet eden otomatları kullanmayı tercih etmiştir. Bu sayede,
          proje maliyetleri düşürülmüş ve lojistik zorluklar minimize edilmiştir.
        </p>

        <h3>Veri Güvenliği ve Gizlilik</h3>
        <p>
          Merkeziyetsiz kimlik sistemlerinin uygulanması, kullanıcıların veri güvenliğini sağlamak için kritik bir öneme
          sahiptir. Projemizde, merkeziyetsiz kimliklerin doğrulaması ve işlenmesi sürecinde kullanıcı verilerinin sadece
          hash değerlerinin zincir üzerinde tutulması sağlanarak, veri güvenliği en üst düzeyde korunmuştur. Ayrıca,
          kullanıcıların kimlik bilgileri herhangi bir merkezi sunucuda depolanmaz, bu da projenin güvenliğini artırır.
        </p>

        <h3>Teknolojik Uyum</h3>
        <p>
          Blokzincir teknolojisi, hala gelişmekte olan bir alan olup, farklı teknolojilerle entegre edilmesi bazı
          zorluklar yaratabilir. Projemizde, Solidity ile yazılmış akıllı kontratların EVM uyumlu ağlarda çalışabilmesi
          için Ethers.js gibi kütüphaneler kullanılmıştır. Bu sayede, proje farklı blokzincir ağları ile uyumlu hale
          getirilmiş ve esnek bir yapıya sahip olmuştur.
        </p>
      </section>

      <section>
        <h2>Gelecek Potansiyel Gelişmeler</h2>

        <h3>Daha Geniş Kapsamlı Uygulamalar</h3>
        <p>
          YAZGİT Feza projesi, sadece bağış süreçleriyle sınırlı kalmayıp, gelecekte daha geniş kapsamlı uygulamalara
          entegre edilebilir. Örneğin, merkeziyetsiz kimlik yönetimi, sağlık hizmetlerinden eğitim sistemlerine kadar
          birçok farklı alanda kullanılabilir. Projenin altyapısı, bu tür uygulamalara uyarlanabilecek esneklikte
          tasarlanmıştır.
        </p>

        <h3>Uluslararası Yaygınlaştırma</h3>
        <p>
          Projenin Türkiye dışındaki ülkelere yaygınlaştırılması, bağış sistemlerinin küresel ölçekte iyileştirilmesine
          katkı sağlayabilir. Merkeziyetsiz kimlik yönetimi ve blokzincir teknolojisinin sunduğu güvenlik ve şeffaflık
          avantajları, uluslararası bağış süreçlerinde de büyük bir fark yaratabilir. YAZGİT Feza ekibi, projenin
          gelecekte uluslararası bir platforma dönüştürülmesi için çalışmalar yapmayı planlamaktadır.
        </p>

        <h3>Teknolojik Gelişmelerin Entegrasyonu</h3>
        <p>
          Blokzincir teknolojisi ve merkeziyetsiz kimlik sistemleri, hızla gelişen teknolojik alanlardır. YAZGİT Feza
          ekibi, projeyi bu teknolojik gelişmelerle uyumlu hale getirmek için sürekli güncellemeler yapmayı
          planlamaktadır. Bu, projenin gelecekte de güncel ve etkili kalmasını sağlayacaktır.
        </p>
      </section>

      <section>
        <h2>Sonuç</h2>
        <p>
          YAZGİT Feza projesi, blokzincir teknolojisinin sunduğu avantajları kullanarak, bağış süreçlerinde şeffaflık,
          güven ve etkinliği artırmayı amaçlayan yenilikçi bir projedir. Merkeziyetsiz kimlik yönetimi, fiziksel ürünler
          üzerinden bağış yapılması ve otomatların sisteme entegrasyonu gibi özellikler, projenin güçlü yönlerindendir.
        </p>
        <p>
          Proje, sadece Türkiye'de değil, uluslararası alanda da bağış sistemlerini iyileştirmek için büyük bir
          potansiyele sahiptir. YAZGİT Feza ekibi, bu projeyi daha da geliştirmek ve genişletmek için çalışmaya devam
          edecektir.
        </p>
      </section>
    </div>
  );
};