import { AdminTitle } from '@/admin/components/AdminTitle';
import CustomLoading from '@/components/custom/CustomLoading';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { currencyFormatter } from '@/lib/currencyFormatter';
import { useProducts } from '@/shop/hooks/useProducts';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

export const AdminProductsPage = () => {
  const { data, isLoading } = useProducts();

  if (isLoading) return <CustomLoading />;
  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle title="Productos" subtitle="Aquí puedes ver y administrar tus productos" />

        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon />
              Nuevo producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data!.products.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>
                <img
                  src={data.images[0]}
                  alt={data.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </TableCell>
              <Link className="hover:text-blue-500 underline" to={`/admin/products/${data.id}`}>
                {data.title}
              </Link>
              <TableCell>{currencyFormatter(data.price)}</TableCell>
              <TableCell>{data.gender}</TableCell>
              <TableCell>{data.stock}</TableCell>
              <TableCell>{data.sizes.join(',')}</TableCell>
              <TableCell className="text-right">
                {/* <Link to={`t-shirt-teslo`}>Editar</Link> */}
                <Link className="hover:text-blue-500" to={`/admin/products/${data.id}`}>
                  <PencilIcon className="w-4 h-4 text-blue-500" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CustomPagination totalPages={data?.pages || 0} />
    </>
  );
};
