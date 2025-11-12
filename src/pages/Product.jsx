import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useOutletContext } from "react-router-dom";

const Product = () => {
    // ... (ส่วนโค้ด handleAddToCart เหมือนเดิม) ...
    const { products, carts, setCartItems } = useOutletContext();

    const handleAddToCart = (product) => {
        setCartItems(prev => {
            const existingIndex = prev.findIndex(item => item.id === product.id);
            if (existingIndex > -1) {
                const next = [...prev];
                next[existingIndex] = { ...next[existingIndex], quantity: (next[existingIndex].quantity || 1) + 1 };
                return next;
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    return (
        <>
            
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                padding: '20px 0' 
            }}>

                
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, auto)', 
                    gap: '20px', 
                    alignItems: 'start',
                    maxHeight: '90vh', 
                    overflowY: 'auto',
                    padding: '2px' 
                }}>

                    
                    {products.map((product) => {
                        return (
                            <Card style={{ width: '18rem' }} key={product.id}>
                                <Card.Img variant="top" src={product.thumbnailUrl} />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>
                                        <b>${product.price.toFixed(2)}</b>
                                    </Card.Text>

                                    {carts.find((carts) => carts.id === product.id) ? (
                                        <span className='badge bg-danger'>Added</span>
                                    ) : (
                                        <Button variant="outline-primary"
                                            onClick={() => handleAddToCart(product)}>
                                            Add to Cart
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div> 

            </div> 
        </>
    );
}

export default Product;