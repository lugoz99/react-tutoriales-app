import { testoApi } from "@/api/testoApi"
import type { ProductsResponse } from "@/types/products.response";

interface Options{
  limit?:number | string | undefined;
  offset?: number | string | undefined;
  sizes?: string;
  gender?:string;
  minPrice?:number;
  maxPrice?:number;
  query?:string;
}

// Get Product with axios using http
export const getProductsAction = async(options:Options):Promise<ProductsResponse> =>{
  const { limit,offset,sizes , gender, minPrice,maxPrice, query} =  options;
  const { data } = await testoApi.get<ProductsResponse>(`/products`,{
    params: {
        limit,
        offset,
        sizes,
        gender,
        minPrice,
        maxPrice,
        q:query
      },
  });
  const productsWithImageUrls = data.products.map( product => ({
    ...product,
    images: product.images.map( image => `${import.meta.env.VITE_API_URL}/files/product/${image}`)
  }))
  return {
    ...data,
    products:productsWithImageUrls
  };
}