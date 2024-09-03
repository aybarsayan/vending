// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationContract {
    address public recipient;
    uint256 public batteryPrice = 1 ether;
    uint256 public breadPrice = 0.5 ether;
    uint256 public diaperPrice = 0.3 ether;
    uint256 public pastaPrice = 0.4 ether;

    uint256 public batteryCount = 0;
    uint256 public breadCount = 0;
    uint256 public diaperCount = 0;
    uint256 public pastaCount = 0;

    constructor(address _recipient) {
        recipient = _recipient;
    }

    // Bağış işlevi
    function donate(uint8[] memory products, uint256[] memory amounts) public payable {
        require(products.length == amounts.length, "Products and amounts length mismatch");
        uint256 totalCost = 0;

        for (uint256 i = 0; i < products.length; i++) {
            if (products[i] == 1) {
                batteryCount += amounts[i];
                totalCost += amounts[i] * batteryPrice;
            } else if (products[i] == 2) {
                breadCount += amounts[i];
                totalCost += amounts[i] * breadPrice;
            } else if (products[i] == 3) {
                diaperCount += amounts[i];
                totalCost += amounts[i] * diaperPrice;
            } else if (products[i] == 4) {
                pastaCount += amounts[i];
                totalCost += amounts[i] * pastaPrice;
            }
        }

        require(msg.value >= totalCost, "Insufficient Ether sent for donation");
    }

    // Bağışı çekmek için işlev
    function withdrawDonation(uint8[] memory products, uint256[] memory amounts) public {
        require(msg.sender == recipient, "Only the recipient can withdraw");
        require(products.length == amounts.length, "Products and amounts length mismatch");

        for (uint256 i = 0; i < products.length; i++) {
            if (products[i] == 1) {
                require(batteryCount >= amounts[i], "Not enough batteries");
                batteryCount -= amounts[i];
            } else if (products[i] == 2) {
                require(breadCount >= amounts[i], "Not enough bread");
                breadCount -= amounts[i];
            } else if (products[i] == 3) {
                require(diaperCount >= amounts[i], "Not enough diapers");
                diaperCount -= amounts[i];
            } else if (products[i] == 4) {
                require(pastaCount >= amounts[i], "Not enough pasta");
                pastaCount -= amounts[i];
            }
        }
    }

    // Fonksiyonları geri çekmek için
    function withdraw() public {
        require(msg.sender == recipient, "Only the recipient can withdraw funds");
        payable(recipient).transfer(address(this).balance);
    }

    // Fiyat ve miktarları sorgulamak için view fonksiyonları
    function getBatteryCount() public view returns (uint256) {
        return batteryCount;
    }

    function getBatteryPrice() public view returns (uint256) {
        return batteryPrice;
    }

    function getBreadCount() public view returns (uint256) {
        return breadCount;
    }

    function getBreadPrice() public view returns (uint256) {
        return breadPrice;
    }

    function getDiaperCount() public view returns (uint256) {
        return diaperCount;
    }

    function getDiaperPrice() public view returns (uint256) {
        return diaperPrice;
    }

    function getPastaCount() public view returns (uint256) {
        return pastaCount;
    }

    function getPastaPrice() public view returns (uint256) {
        return pastaPrice;
    }
}