import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import Navigation from "@/components/Navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "clothing" | "accessories";
  sizes?: string[];
  colors?: string[];
}

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Aqualix Tech T-Shirt",
    price: 29.99,
    image: "/placeholder.svg",
    category: "clothing",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Aqua", "White"]
  },
  {
    id: "2", 
    name: "Aqualix Hoodie",
    price: 59.99,
    image: "/placeholder.svg",
    category: "clothing",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Aqua"]
  },
  {
    id: "3",
    name: "Aqualix Cap",
    price: 24.99,
    image: "/placeholder.svg",
    category: "clothing",
    sizes: ["One Size"],
    colors: ["Black", "Navy", "Aqua"]
  },
  {
    id: "4",
    name: "Aqualix Stickers Pack",
    price: 9.99,
    image: "/placeholder.svg",
    category: "accessories"
  },
  {
    id: "5",
    name: "Aqualix Tech Mug",
    price: 19.99,
    image: "/placeholder.svg",
    category: "accessories"
  }
];

const MerchStore = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const { toast } = useToast();

  const addToCart = (product: Product, size?: string, color?: string) => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
      selectedSize: size,
      selectedColor: color
    };

    setCart(prev => {
      const existingItem = prev.find(item => 
        item.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color
      );

      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && 
          item.selectedSize === size && 
          item.selectedColor === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, cartItem];
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const updateQuantity = (itemId: string, size: string | undefined, color: string | undefined, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(itemId, size, color);
      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.id === itemId && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (itemId: string, size: string | undefined, color: string | undefined) => {
    setCart(prev =>
      prev.filter(item =>
        !(item.id === itemId && item.selectedSize === size && item.selectedColor === color)
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Aqualix
              </h1>
              <Navigation />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowCart(!showCart)}
              className="relative"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-primary-foreground">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="flex gap-8">
          {/* Products Grid */}
          <div className="flex-1">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Aqualix Merch Store
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Show your support for Aqualix with our exclusive merchandise collection. 
                High-quality products designed for tech enthusiasts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          {showCart && (
            <div className="w-80 bg-card rounded-lg border p-6 h-fit sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Shopping Cart</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCart(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {cart.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Your cart is empty
                </p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item, index) => (
                      <CartItemCard
                        key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-lg font-bold text-primary">
                        ${getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                    <Button className="w-full" variant="neon">
                      Checkout with Stripe
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product, size?: string, color?: string) => void }) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleAddToCart = () => {
    if (product.category === "clothing" && (!selectedSize || !selectedColor)) {
      return;
    }
    onAddToCart(product, selectedSize || undefined, selectedColor || undefined);
  };

  return (
    <Card className="group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="p-0">
        <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
        <p className="text-2xl font-bold text-primary mb-4">${product.price}</p>

        {product.category === "clothing" && (
          <div className="space-y-3">
            {product.sizes && (
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {product.colors && (
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          variant="neon-outline"
          className="w-full"
          disabled={product.category === "clothing" && (!selectedSize || !selectedColor)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

const CartItemCard = ({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}: { 
  item: CartItem; 
  onUpdateQuantity: (itemId: string, size: string | undefined, color: string | undefined, quantity: number) => void;
  onRemove: (itemId: string, size: string | undefined, color: string | undefined) => void;
}) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
      <img
        src={item.image}
        alt={item.name}
        className="w-12 h-12 object-cover rounded"
      />
      <div className="flex-1">
        <h4 className="font-medium text-sm">{item.name}</h4>
        {item.selectedSize && (
          <p className="text-xs text-muted-foreground">Size: {item.selectedSize}</p>
        )}
        {item.selectedColor && (
          <p className="text-xs text-muted-foreground">Color: {item.selectedColor}</p>
        )}
        <p className="text-sm font-semibold text-primary">${item.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
        >
          <Minus className="w-3 h-3" />
        </Button>
        <span className="w-8 text-center text-sm">{item.quantity}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
        >
          <Plus className="w-3 h-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(item.id, item.selectedSize, item.selectedColor)}
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default MerchStore;