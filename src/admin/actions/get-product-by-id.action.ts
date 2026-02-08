import { testoApi } from "@/api/testoApi"
import type { Product } from "@/types/product.interface"


const getProductByIdAction = async (id:string):Promise<Product> => {
  if(!id) throw new Error('id is required!')
  if(id === 'new') {
    return {
      id:'new',
      title:'',
      price: 0,
      description:'',
      sizes:[],
      stock:0,
      gender:'men',
      tags:[],
      slug:'',
      images: []
    } as unknown as Product
  }

  const { data } = await testoApi.get<Product>(`/product/${id}`)
  const images = data.images.map( image => {
    if(image.includes('http')) return image;
    return `${import.meta.env.VITE_API_URL}/files/product/${image}`
  }) 
  return {
    ...data,
    images
  };
}

export { getProductByIdAction }