import { CustomPagination } from '@/components/custom/CustomPagination';
import { CustomJumbotron } from '@/shop/components/CustomJumbotron';
import { ProductsGrid } from '@/shop/components/ProductsGrid';
import { useProducts } from '@/shop/hooks/useProducts';

export const HomePage = () => {
  const { data: productsResponse } = useProducts();
  return (
    <>
      <CustomJumbotron title="Todos los productos" />

      <ProductsGrid products={productsResponse?.products || []} />

      <CustomPagination totalPages={productsResponse?.pages || 0} />
    </>
  );
};
