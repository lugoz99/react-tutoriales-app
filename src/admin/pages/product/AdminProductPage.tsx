// https://github.com/Klerith/bolt-product-editor
import { Navigate, useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

import { useProduct } from '@/admin/hooks/useProduct';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/types/product.interface';
import CustomLoading from '@/components/custom/CustomLoading';

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // relacionado a producto
  const { isLoading, isError, data: product, mutation } = useProduct(id || '');

  const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const subtitle =
    id === 'new' ? 'Aquí puedes crear un nuevo producto.' : 'Aquí puedes editar el producto.';

  // Partial permit definir propiedades opcionales | para las acciones del producto
  // es parcial pq no tiene id
  const handleSubmit = async (productLike: Partial<Product>) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success('Producto actualizado correctamente', {
          position: 'top-right',
        });
        navigate(`/admin/products/${data.id}`);
      },
      onError: (error) => {
        console.log(error);
        toast.error('Error al actualizar el producto');
      },
    });
  };

  if (isError) {
    return <Navigate to="/admin/products" />;
  }

  if (isLoading) {
    return <CustomLoading />;
  }

  if (!product) {
    return <Navigate to="/admin/products" />;
  }

  return (
    <ProductForm
      title={title}
      subTitle={subtitle}
      product={product}
      onSubmit={handleSubmit}
      isPending={mutation.isPending}
    />
  );
};
