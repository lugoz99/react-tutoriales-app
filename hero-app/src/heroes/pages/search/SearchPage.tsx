import { CustomJomBotron } from '@/components/custom/CustomJomBotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadCrums';
import { useQuery } from '@tanstack/react-query';
import { searchHeroAction } from '@/heroes/actions/search-hero.action';
import { useSearchParams } from 'react-router';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { SearchControls } from './ui/SearchControl';

export const SearchPage = () => {
  const [searchParam] = useSearchParams();

  const name = searchParam.get('name') ?? undefined;
  const { data: heroes = [] } = useQuery({
    queryKey: ['search', { name }],
    queryFn: () => searchHeroAction({ name }),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <CustomJomBotron
        title="Busqueda de Heroes"
        description="descubre,explora y administra super y villanos"
      />
      {/* Stats Dashboard */}

      <CustomBreadcrumbs
        currentPage="Buscador de héroes"
        // breadcrumbs={[
        //   { label: 'Home1', to: '/' },
        //   { label: 'Home2', to: '/' },
        //   { label: 'Home3', to: '/' },
        // ]}
      />
      <HeroStats />
      {/* Filters Search  */}
      <SearchControls />

      <HeroGrid heroes={heroes} />
    </>
  );
};

export default SearchPage;
