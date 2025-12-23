import { Badge } from '@/components/ui/badge';
import { Heart, Trophy, Users, Zap } from 'lucide-react';
import { HeroStatCard } from './HeroStatCard';
import { useHeroSummary } from '../hooks/useHeroSummary';
import { use } from 'react';
import { FavoriteHeroeContext } from '../context/FavoriteHeroeContext';

export const HeroStats = () => {
  const { data: summary } = useHeroSummary();
  const { favoriteCount } = use(FavoriteHeroeContext);

  if (!summary) {
    return <div>Loading .....</div>;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <HeroStatCard
        title="Total Personajes"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-2xl font-bold">{summary.totalHeroes}</div>
        <div className="flex gap-1 mt-2">
          <Badge variant="secondary" className="text-xs">
            {summary?.heroCount}
          </Badge>
          <Badge variant="destructive" className="text-xs">
            {summary?.villainCount}
          </Badge>
        </div>
      </HeroStatCard>
      {/* card numero 2 */}
      <HeroStatCard title="Favoritos" icon={<Heart className="h-4 w-4 text-muted-foreground" />}>
        <div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
        <p className="text-xs text-muted-foreground">
          {((favoriteCount * 100) / summary?.totalHeroes).toFixed(2)}% of total
        </p>
      </HeroStatCard>
      {/* card numero 2 */}
      <HeroStatCard title="Strongest" icon={<Zap className="h-4 w-4 text-muted-foreground" />}>
        <div className="text-lg font-bold">{summary?.strongestHero.name}</div>
        <p className="text-xs text-muted-foreground">Strength: {summary.strongestHero.strength}</p>
      </HeroStatCard>
      {/* card numero 3 */}
      <HeroStatCard title="Smartest" icon={<Trophy className="h-4 w-4 text-muted-foreground" />}>
        <div className="text-lg font-bold">{summary?.smartestHero.name}</div>
        <p className="text-xs text-muted-foreground">
          Intelligence: {summary?.smartestHero.intelligence}
        </p>
      </HeroStatCard>

      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Favorites</CardTitle>
          <Heart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">3</div>
          <p className="text-xs text-muted-foreground">18.8% of total</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Strongest</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">Superman</div>
          <p className="text-xs text-muted-foreground">Strength: 10/10</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Smartest</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">Batman</div>
          <p className="text-xs text-muted-foreground">Intelligence: 10/10</p>
        </CardContent>
      </Card> */}
    </div>
  );
};
