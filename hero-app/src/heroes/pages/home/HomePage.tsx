import { use, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { HeroStats } from '@/heroes/components/HeroStats';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { CustomPagination } from '@/components/custom/CustomPagination';

import { useHeroSummary } from '@/heroes/hooks/useHeroSummary';
import { usePaginationHero } from '@/heroes/hooks/usePaginationHero';
import { FavoriteHeroeContext } from '../../context/FavoriteHeroeContext';
import { CustomJomBotron } from '@/components/custom/CustomJomBotron';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadCrums';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab]);

  const { data: heroesResponse } = usePaginationHero(+page, +limit, category);
  const { data: summary } = useHeroSummary();
  const { favoriteCount, favorites } = use(FavoriteHeroeContext);

  return (
    <>
      <>
        {/* Header */}
        <CustomJomBotron
          title="Universo de SuperHéroes"
          description="Descubre, explora y administra super héroes y villanos"
        />

        <CustomBreadcrumbs currentPage="Super Héroes" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'all');
                  prev.set('category', 'all');
                  prev.set('page', '1');
                  return prev;
                })
              }
            >
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center gap-2"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'favorites');
                  return prev;
                })
              }
            >
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'heroes');
                  prev.set('category', 'hero');
                  prev.set('page', '1');
                  return prev;
                })
              }
            >
              Heroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'villains');
                  prev.set('category', 'villain');
                  prev.set('page', '1');
                  return prev;
                })
              }
            >
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Mostrar todos los personajes */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            {/* Mostrar todos los personajes favoritos */}
            <HeroGrid heroes={favorites ?? []} />
          </TabsContent>
          <TabsContent value="heroes">
            {/* Mostrar todos los héroes */}
            <h1>Héroes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains">
            {/* Mostrar todos los Villanos */}
            <h1>Villanos</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {selectedTab !== 'favorites' && (
          <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
        )}
      </>
    </>
  );
};

// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// import { HeroStats } from '@/heroes/components/HeroStats';
// import { HeroGrid } from '@/heroes/components/HeroGrid';
// import { CustomPagination } from '@/components/custom/CustomPagination';
// import { CustomBreadcrumbs } from '@/components/custom/CustomBreadCrums';
// import { CustomJomBotron } from '@/components/custom/CustomJomBotron';
// import { useSearchParams } from 'react-router';
// import { useMemo } from 'react';
// import { useHeroSummary } from '@/heroes/hooks/useHeroSummary';
// import { usePaginationHero } from '@/heroes/hooks/usePaginationHero';

// export const HomePage = () => {
//   // todo eso podria ser un customHook para el home a discrecion
//   // const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'heroes' | 'villains'>('all');
//   const [searchParam, setSearchParam] = useSearchParams();

//   const activeTab = searchParam.get('tab') ?? 'all';
//   const page = searchParam.get('page') ?? '1';

//   const limit = searchParam.get('limit') ?? '6';

//   const category = searchParam.get('category') ?? 'all';
//   // usePaginationHero(+page,+limit)
//   // const { data: heroesResponse } = useQuery({
//   //   queryKey: ['heroes', { page, limit }],
//   //   // queryFn: () => getHeroesByPageAction, como no se ocupa mandar nigun argument puede ir sin parentensis
//   //   queryFn: () => getHeroesByPageAction(+page, +limit),
//   //   staleTime: 1000 * 60 * 5, // cuanto tiene de fresca la peticion | evitar peticiones en cada momento
//   // });

//   const { data: heroesResponse } = usePaginationHero(+page, +limit, category);
//   const selectedTab = useMemo(() => {
//     const validaTabs = ['all', 'favorites', 'heroes', 'villains'];
//     return validaTabs.includes(activeTab) ? activeTab : 'all';
//   }, [activeTab]);

//   const { data: summary } = useHeroSummary();

//   return (
//     <>
//       <>
//         {/* Header */}
//         <CustomJomBotron
//           title="Universo de SuperHéroes"
//           description="Descubre, explora y administra super héroes y villanos"
//         />

//         <CustomBreadcrumbs currentPage="Super Héroes" />

//         {/* Stats Dashboard */}
//         <HeroStats />

//         {/* Tabs */}
//         <Tabs value={selectedTab} className="mb-8">
//           <TabsList className="grid w-full grid-cols-4">
//             <TabsTrigger
//               value="all"
//               onClick={() =>
//                 setSearchParam((prev) => {
//                   prev.set('tab', 'all');
//                   prev.set('category', 'all');
//                   prev.set('page', '1');
//                   return prev;
//                 })
//               }
//             >
//               All Characters {summary?.totalHeroes}
//             </TabsTrigger>
//             <TabsTrigger
//               value="favorites"
//               className="flex items-center gap-2"
//               onClick={() =>
//                 setSearchParam((prev) => {
//                   prev.set('tab', 'favorites');
//                   return prev;
//                 })
//               }
//             >
//               Favorites (3)
//             </TabsTrigger>
//             <TabsTrigger
//               value="heroes"
//               onClick={() =>
//                 setSearchParam((prev) => {
//                   prev.set('tab', 'heroes');
//                   prev.set('category', 'hero');
//                   prev.set('page', '1');
//                   return prev;
//                 })
//               }
//             >
//               Heroes ({summary?.heroCount})
//             </TabsTrigger>
//             <TabsTrigger
//               value="villains"
//               onClick={() =>
//                 setSearchParam((prev) => {
//                   prev.set('tab', 'villains');
//                   prev.set('category', 'villain');
//                   prev.set('page', '1');
//                   return prev;
//                 })
//               }
//             >
//               Villains Heroe ({summary?.villainCount})
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="all">
//             {/* Mostrar todos los personajes */}
//             <HeroGrid heroes={heroesResponse?.heroes ?? []} />
//           </TabsContent>
//           <TabsContent value="favorites">
//             {/* Mostrar todos los personajes favoritos */}
//             <h1>Favoritos!!!</h1>
//             {/* <HeroGrid /> */}
//           </TabsContent>
//           <TabsContent value="heroes">
//             {/* Mostrar todos los héroes */}
//             <h1>Héroes</h1>
//             <HeroGrid heroes={heroesResponse?.heroes ?? []} />
//           </TabsContent>
//           <TabsContent value="villains">
//             {/* Mostrar todos los Villanos */}
//             <h1>Villanos</h1>
//             <HeroGrid heroes={heroesResponse?.heroes ?? []} />
//           </TabsContent>
//         </Tabs>

//         {/* Pagination */}
//         <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
//       </>
//     </>
//   );
// };
