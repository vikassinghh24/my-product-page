import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Star, ShieldCheck, Truck } from 'lucide-react';

const ProductPage = () => {
  // Product Data
  const product = {
    name: "Velocity Tech Sneakers",
    price: 125.00,
    oldPrice: 160.00,
    description: "Experience ultimate comfort with our latest breathable mesh technology. Designed for both the urban commute and the morning track with a responsive sole that returns energy with every step.",
    stock: 5,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&q=80&w=600"
    ]
  };

  // State for Image Gallery & Quantity
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const sizes = [7, 8, 9, 10, 11, 12];

  // Handlers
  const increment = () => quantity < product.stock && setQuantity(quantity + 1);
  const decrement = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          {/* LEFT SIDE: IMAGE GALLERY */}
          <div className="md:w-1/2 p-6 lg:p-12 bg-gray-50/50">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-inner mb-6">
              <img 
                src={mainImage} 
                alt="Product" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    mainImage === img ? 'border-blue-600 ring-2 ring-blue-100' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: PRODUCT INFO */}
          <div className="md:w-1/2 p-6 lg:p-12">
            <nav className="text-sm font-medium text-gray-500 mb-4">
              Home / Footwear / <span className="text-blue-600">Sneakers</span>
            </nav>
            
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-orange-400">
                {[...Array(4)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                <Star size={18} />
              </div>
              <span className="text-sm text-gray-500 font-medium">4.8 (124 Reviews)</span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">{product.description}</p>
            {/* 1. PRICE SECTION */}
<div className="flex items-center gap-6 mb-8">
  <div className="flex flex-col">
    <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">Price</span>
    <div className="flex items-center gap-3">
      <span className="text-4xl font-black text-gray-900">${product.price.toFixed(2)}</span>
      <span className="text-lg text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
    </div>
  </div>
  <span className="mt-5 bg-green-500 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase">
    20% Off
  </span>
</div>

{/* 2. SIZE SECTION */}
<div className="mb-8">
  <div className="flex justify-between items-end mb-3">
    <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Select a Size</span>
  </div>
  
  <div className="flex flex-wrap gap-3">
    {sizes.map((size) => (
      <button
        key={size}
        onClick={() => setSelectedSize(size)}
        className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 font-bold transition-all ${
          selectedSize === size 
          ? 'border-black bg-black text-white shadow-lg' 
          : 'border-gray-200 text-gray-400 hover:border-gray-900 hover:text-gray-900'
        }`}
      >
        {size}
      </button>
    ))}
  </div>
  
  {/* Validation Message */}
  {!selectedSize && (
    <p className="text-red-500 text-[11px] mt-3 font-bold uppercase tracking-tighter animate-pulse">
      * Selection Required to Purchase
    </p>
  )}
</div>

            {/* INTERACTION AREA */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity Counter */}
                <div className="flex items-center justify-between border-2 border-gray-200 rounded-xl p-1 bg-white w-full sm:w-32">
                  <button onClick={decrement} className="p-2 hover:bg-gray-100 rounded-lg transition"><Minus size={18}/></button>
                  <span className="font-bold text-xl">{quantity}</span>
                  <button onClick={increment} className="p-2 hover:bg-gray-100 rounded-lg transition"><Plus size={18}/></button>
                </div>

                {/* Add to Cart Button */}
                <button 
  disabled={!selectedSize}
  className={`flex-1 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl ${
    selectedSize 
    ? 'bg-gray-900 text-white hover:bg-blue-600 shadow-gray-200' 
    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
  }`}
>
  <ShoppingCart size={20} />
  {selectedSize ? 'Add to Cart' : 'Select a Size'}
</button>
              </div>

              {/* Stock Warning */}
              {product.stock <= 5 && (
                <p className="text-red-500 text-sm font-bold animate-pulse">
                  Hurry! Only {product.stock} items left in stock.
                </p>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3 text-gray-600">
                  <Truck size={20} className="text-blue-600" />
                  <span className="text-xs font-semibold">Free Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <ShieldCheck size={20} className="text-blue-600" />
                  <span className="text-xs font-semibold">2 Year Warranty</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;