import React, { useState } from "react";
import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";
import { ethers } from "ethers";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database"; // Firebase Realtime Database importları

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyAxS4ikjZ5vtU3b_UUsR6HInEmGFLuMfag",
  authDomain: "cryptobox-56968.firebaseapp.com",
  databaseURL: "https://cryptobox-56968-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cryptobox-56968",
  storageBucket: "cryptobox-56968.appspot.com",
  messagingSenderId: "634208067243",
  appId: "1:634208067243:web:18c6673136113b13c121ee",
  measurementId: "G-NBLWTCEF9Y"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Firebase database'i başlat
// `window.ethereum` tipini tanımlıyoruz
declare global {
  interface Window {
    ethereum: any;
  }
}

type ShoppingCartProps = {
  isOpen: boolean;
};

// Ethereum hesabını almak için fonksiyon
async function getAccount(): Promise<string | null> {
  if (window.ethereum) {
    const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0] || null;
  }
  return null;
}

// Balance'ı kontrol eden fonksiyon, `bigint` kullanarak karşılaştırma yapıyoruz
async function checkBalance(account: string, amount: number): Promise<boolean> {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const balance = await provider.getBalance(account);

  // Bakiye ve miktarı formatlayarak log'luyoruz
  console.log("Hesap Bakiyesi: ", ethers.utils.formatEther(balance));
  const convertedAmount = amount * Math.pow(10, -9); // Gwei'yi Ether'e çevirme
  console.log("Gerekli Bakiye (Ether): ", convertedAmount);

  // Karşılaştırmayı gerçekleştiriyoruz
  return parseFloat(ethers.utils.formatEther(balance)) >= convertedAmount;
}

// Bağışı gerçekleştiren fonksiyon
async function sendDonation(account: string, products: number[], amounts: number[], totalAmount: number): Promise<void> {
const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();

  
  const contractAddress = "0x6ceda29030e778d0c1a4d5c99824b658dca177c2";
  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "uint8[]",
          "name": "products",
          "type": "uint8[]"
        },
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "name": "donate",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8[]",
          "name": "products",
          "type": "uint8[]"
        },
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "name": "withdrawDonation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "batteryCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "batteryPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "breadCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "breadPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "diaperCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "diaperPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pastaCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pastaPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "recipient",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  
  
  let contract = new ethers.Contract(contractAddress, contractABI, signer);

  const value = ethers.utils.parseUnits(totalAmount.toString(), "gwei");
  console.log("value: ", value);
  console.log("Total Amount: ", totalAmount);
  const tx = await contract.donate(products, amounts, { value });
  await tx.wait();
}


export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Total amount in Wei
  const totalAmount = cartItems.reduce((sum, item) => {
    const product = storeItems.find(p => p.id === item.id);
    return sum + (product ? product.price : 0);
  }, 0);

  const totalAmountInGwei = totalAmount.toString(); // Gwei olarak totalAmount'ı kullanıyoruz.

  const checkout = async () => {
    const account = await getAccount();
    if (!account) {
      alert("Ethereum hesabı bulunamadı!");
      return;
    }
  
    const productIds = cartItems.map(item => storeItems.findIndex(p => p.id === item.id));
    const productAmounts = cartItems.map(() => 1); // Her üründen 1 tane olduğu varsayımıyla
  
    console.log("Total amount:", totalAmountInGwei);
    console.log("Products:", productIds.toString());
    console.log("Amounts:", productAmounts.toString());
  
    if (await checkBalance(account, totalAmount)) {
      try {
        await sendDonation(account, productIds, productAmounts, totalAmount);
        alert("Ödeme yapıldı! Sepet bilgileri kaydedildi.");
  
        // Firebase Realtime Database'e veriyi kaydetme
        const newOrderRef = push(ref(database, 'orders')); // Yeni bir referans oluştur
        await set(newOrderRef, {
          email: email,
          phone: phone,
          products: productIds,
          amounts: productAmounts,
          totalAmount: totalAmount,
          timestamp: new Date().toISOString()
        }).then(() => {
          console.log("Veri başarılı bir şekilde Realtime Database'e kaydedildi!");
        }).catch((error) => {
          console.error("Veri Realtime Database'e kaydedilirken hata oluştu: ", error);
        });
  
      } catch (error) {
        console.error("Transaction failed:", error);
        alert("Bağış işlemi başarısız oldu. Lütfen tekrar deneyin.");
      }
    } else {
      alert("Hesabınızda yeterli bakiye yok!");
    }
  };

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Sepet</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Toplam: {totalAmountInGwei} Gwei
          </div>
          <Button 
            className="w-100" 
            onClick={checkout}>
            Ödemeyi Tamamla
          </Button>

          <hr />
          <h5>Bağış Sonuçlanınca Bilgi Almak İsterseniz Aşağıdaki Alanları Doldurabilirsiniz. </h5>
          <div className="mb-3">
            <input
              type="email"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              placeholder="Telefon Numarası"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
            />
          </div>
          <hr />
          <h5>Bağışınızın Sonucunu Blokzincir Üzerinden Takip Etmek İsterseniz Aşağıdaki Linke Tıklayabilirsiniz.</h5>
          <Button
  className="w-100" 
  onClick={() => window.location.href = 'https://sepolia.etherscan.io/address/0x39e0e97f020e779ce59f82c587dd380753da0a81'}>
    Görüntüle
</Button>
          <hr />
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}