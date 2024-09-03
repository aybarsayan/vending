import React from 'react';
import { Col, Row, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { StoreItem } from "../components/StoreItem";

export function Store() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Gelen location bilgisini alıyoruz
  const selectedLocation = params.get('location') || 'Store';

  // Gelen items bilgisini alıp, diziye çeviriyoruz
  const items = params.get('items')?.split(',') || [];

  // Sabit fiyatlar ve id'ler ile dinamik olarak JSON veri oluşturuyoruz
  const itemData = items.map((itemName, index) => ({
    id: index + 1, // ID'ler 1'den başlıyor
    name: itemName,
    price: [100, 200, 300, 400][index % 4], // Sabit fiyatlar döngüsel olarak atanıyor
    imgUrl: `/imgs/${itemName}.jpg` // Resim URL'si item ismi ile eşleşiyor
  }));

  return (
    <Container>
      <h1 className="mt-4 mb-4 text-center">{selectedLocation}</h1>
      <Row md={2} xs={1} lg={3} className="g-4">
        {itemData.map(item => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}