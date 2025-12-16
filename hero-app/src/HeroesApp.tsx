import { RouterProvider } from 'react-router';
import { appRouter } from './router/app.route';

export const HeroesApp = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};
