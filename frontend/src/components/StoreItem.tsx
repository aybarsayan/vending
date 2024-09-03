import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"

type StoreItemProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()
  const quantity = getItemQuantity(id)

  // imgUrl'yi encode ediyoruz
  const encodedImgUrl = encodeURI(imgUrl)

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={encodedImgUrl}  // encode edilmiş URL'yi kullanıyoruz
        height="200px"
        style={{ objectFit: "cover", borderTopLeftRadius: '0.25rem', borderTopRightRadius: '0.25rem' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{price} Gwei</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              className="w-100"
              onClick={() => increaseCartQuantity(id)}
              style={{ backgroundColor: "#63815C", borderColor: "#63815C" }}
            >
              + Sepete Ekle
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button
                  onClick={() => decreaseCartQuantity(id)}
                  style={{ backgroundColor: "#63815C", borderColor: "#63815C", color: "#fff" }}
                >
                  -
                </Button>
                <div>
                  <span className="fs-3">{quantity}</span> adet
                </div>
                <Button
                  onClick={() => increaseCartQuantity(id)}
                  style={{ backgroundColor: "#63815C", borderColor: "#63815C", color: "#fff" }}
                >
                  +
                </Button>
              </div>
              <Button
                onClick={() => removeFromCart(id)}
                variant="danger"
                size="sm"
                style={{ backgroundColor: "#395b91", borderColor: "#395b91" }}
              >
                Kaldır
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}