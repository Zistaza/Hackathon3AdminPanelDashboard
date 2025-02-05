import { sanityClient } from "./sanityClient";


export async function getProducts() {
  const query = `*[_type == "product"]{
    _id,
    name,
    price,
    stockLevel,
    "imageUrl": image.asset->url,
    category,
    description,
    discountPercentage
  }`;

  return await sanityClient.fetch(query);
}
