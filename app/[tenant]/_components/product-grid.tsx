import { ProductItem } from "./product-item"

export const ProductGrid = () => {
  return (
    <div className="container mx-auto grid grid-cols-2 gap-4 px-6 pb-8 sm:grid-cols-3 md:grid-cols-4">
      <ProductItem
        product={{
          id: 1,
          imageUrl: "/temp/burger1.png",
          name: "Texas Burger",
          category: "Tradicional",
          price: 25.5,
        }}
      />
      <ProductItem
        product={{
          id: 2,
          imageUrl: "/temp/burger2.png",
          name: "Monster Burger",
          category: "Tradicional",
          price: 25.5,
        }}
      />
      <ProductItem
        product={{
          id: 3,
          imageUrl: "/temp/burger3.png",
          name: "Golden Burger",
          category: "Tradicional",
          price: 25.5,
        }}
      />
      <ProductItem
        product={{
          id: 1,
          imageUrl: "/temp/burger4.png",
          name: "Old Burger",
          category: "Tradicional",
          price: 25.5,
        }}
      />
    </div>
  )
}
