// import { groq } from "next-sanity";

// // Query to fetch all categories
// export const categoriesQuery = groq`
//   *[_type == "categories"] {
//     _id,
//     title,
//     "imageUrl": image.asset->url,
//     products
//   }
// `;

// // Query to fetch all products
// export const productsQuery = groq`
//   *[_type == "products"] {
//     _id,
//     title,
//     price,
//     priceWithoutDiscount,
//     badge,
//     "imageUrl": image.asset->url,
//     category->{title},
//     description,
//     inventory,
//     tags
//   }
// `;

// // Query to fetch a single product by its ID
// export const productByIdQuery = groq`
//   *[_type == "products" && _id == $id][0] {
//     _id,
//     title,
//     price,
//     priceWithoutDiscount,
//     badge,
//     "imageUrl": image.asset->url,
//     category->{title},
//     description,
//     inventory,
//     tags
//   }
// `;

// // Query to fetch products by category
// export const productsByCategoryQuery = groq`
//   *[_type == "products" && category._ref == $categoryId] {
//     _id,
//     title,
//     price,
//     priceWithoutDiscount,
//     badge,
//     "imageUrl": image.asset->url,
//     description,
//     inventory,
//     tags
//   }
// `;

// // Query to fetch featured products (based on a tag)
// export const featuredProductsQuery = groq`
//   *[_type == "products" && "featured" in tags] {
//     _id,
//     title,
//     price,
//     priceWithoutDiscount,
//     badge,
//     "imageUrl": image.asset->url,
//     category->{title},
//     description,
//     inventory,
//     tags
//   }
// `;
// api/query.ts
// api/query.ts



export const allProductsQuery = ` 
  *[_type == "products"]{
    _id,
    title,
    price,
    priceWithoutDiscount,
    "image": image.asset->url,
    description,
    category->{
      title
    },
    badge,
    tags,
    inventory
  }
`;




// export const allProductsQuery = `
//   *[_type == "products"]{
//     _id,
//     title,
//     price,
//     "image": image.asset->url,
//     description,
//     category->{
//       title
//     }
//   }
// `;

