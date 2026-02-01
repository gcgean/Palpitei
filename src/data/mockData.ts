// Mock data for Palpitei

export interface Championship {
  id: string;
  name: string;
  slug: string;
  country: string;
  logo?: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
}

export interface Game {
  id: string;
  championship: Championship;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  status: 'scheduled' | 'live' | 'finished';
}

export interface Tip {
  id: string;
  game: Game;
  market: string;
  marketSlug: string;
  prediction: string;
  odd: number;
  result?: 'GREEN' | 'RED' | 'VOID' | 'PENDING';
  isPro?: boolean;
}

export interface MarketStats {
  championship: Championship;
  market: string;
  marketSlug: string;
  period: string;
  greens: number;
  reds: number;
  voids: number;
  winrate: number;
  oddRef: number;
  isProfitable: boolean;
  roi: number;
}

export interface ResultSummary {
  period: string;
  totalTips: number;
  greens: number;
  reds: number;
  voids: number;
  winrate: number;
  profitUnits: number;
}

// Championships
export const championships: Championship[] = [
  { id: '1', name: 'Brasileirão Série A', slug: 'brasileirao-a', country: 'Brasil', logo: '🇧🇷' },
  { id: '2', name: 'Premier League', slug: 'premier-league', country: 'Inglaterra', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: '3', name: 'La Liga', slug: 'la-liga', country: 'Espanha', logo: '🇪🇸' },
  { id: '4', name: 'Serie A', slug: 'serie-a-italia', country: 'Itália', logo: '🇮🇹' },
  { id: '5', name: 'Bundesliga', slug: 'bundesliga', country: 'Alemanha', logo: '🇩🇪' },
  { id: '6', name: 'Ligue 1', slug: 'ligue-1', country: 'França', logo: '🇫🇷' },
];

// Teams
export const teams: Team[] = [
  { id: '1', name: 'Flamengo', shortName: 'FLA' },
  { id: '2', name: 'Palmeiras', shortName: 'PAL' },
  { id: '3', name: 'São Paulo', shortName: 'SAO' },
  { id: '4', name: 'Corinthians', shortName: 'COR' },
  { id: '5', name: 'Manchester City', shortName: 'MCI' },
  { id: '6', name: 'Arsenal', shortName: 'ARS' },
  { id: '7', name: 'Liverpool', shortName: 'LIV' },
  { id: '8', name: 'Chelsea', shortName: 'CHE' },
  { id: '9', name: 'Real Madrid', shortName: 'RMA' },
  { id: '10', name: 'Barcelona', shortName: 'BAR' },
  { id: '11', name: 'Atlético Madrid', shortName: 'ATM' },
  { id: '12', name: 'Sevilla', shortName: 'SEV' },
  { id: '13', name: 'Juventus', shortName: 'JUV' },
  { id: '14', name: 'Inter Milan', shortName: 'INT' },
  { id: '15', name: 'AC Milan', shortName: 'MIL' },
  { id: '16', name: 'Napoli', shortName: 'NAP' },
  { id: '17', name: 'Bayern Munich', shortName: 'BAY' },
  { id: '18', name: 'Borussia Dortmund', shortName: 'BVB' },
  { id: '19', name: 'PSG', shortName: 'PSG' },
  { id: '20', name: 'Monaco', shortName: 'MON' },
];

// Today's Games
export const todayGames: Game[] = [
  {
    id: '1',
    championship: championships[0],
    homeTeam: teams[0],
    awayTeam: teams[1],
    date: '2026-02-01',
    time: '16:00',
    status: 'scheduled',
  },
  {
    id: '2',
    championship: championships[0],
    homeTeam: teams[2],
    awayTeam: teams[3],
    date: '2026-02-01',
    time: '18:30',
    status: 'scheduled',
  },
  {
    id: '3',
    championship: championships[1],
    homeTeam: teams[4],
    awayTeam: teams[5],
    date: '2026-02-01',
    time: '13:30',
    status: 'live',
  },
  {
    id: '4',
    championship: championships[1],
    homeTeam: teams[6],
    awayTeam: teams[7],
    date: '2026-02-01',
    time: '16:00',
    status: 'scheduled',
  },
  {
    id: '5',
    championship: championships[2],
    homeTeam: teams[8],
    awayTeam: teams[9],
    date: '2026-02-01',
    time: '17:00',
    status: 'scheduled',
  },
  {
    id: '6',
    championship: championships[3],
    homeTeam: teams[12],
    awayTeam: teams[13],
    date: '2026-02-01',
    time: '14:00',
    status: 'scheduled',
  },
];

// Today's Tips
export const todayTips: Tip[] = [
  {
    id: '1',
    game: todayGames[0],
    market: 'Resultado Final',
    marketSlug: '1x2',
    prediction: 'Casa (Flamengo)',
    odd: 1.85,
    result: 'PENDING',
    isPro: false,
  },
  {
    id: '2',
    game: todayGames[1],
    market: 'Resultado Final',
    marketSlug: '1x2',
    prediction: 'Empate',
    odd: 3.20,
    result: 'PENDING',
    isPro: false,
  },
  {
    id: '3',
    game: todayGames[2],
    market: 'Resultado Final',
    marketSlug: '1x2',
    prediction: 'Casa (Man City)',
    odd: 1.45,
    result: 'PENDING',
    isPro: false,
  },
  {
    id: '4',
    game: todayGames[3],
    market: 'Resultado Final',
    marketSlug: '1x2',
    prediction: 'Casa (Liverpool)',
    odd: 1.70,
    result: 'PENDING',
    isPro: false,
  },
  {
    id: '5',
    game: todayGames[4],
    market: 'Resultado Final',
    marketSlug: '1x2',
    prediction: 'Casa (Real Madrid)',
    odd: 2.10,
    result: 'PENDING',
    isPro: false,
  },
];

// Profitable Tips (Pro)
export const profitableTips: Tip[] = [
  {
    id: '10',
    game: todayGames[0],
    market: 'Ambas Marcam',
    marketSlug: 'btts',
    prediction: 'Sim',
    odd: 1.75,
    result: 'PENDING',
    isPro: true,
  },
  {
    id: '11',
    game: todayGames[2],
    market: 'Over/Under 2.5',
    marketSlug: 'over-under',
    prediction: 'Over 2.5',
    odd: 1.65,
    result: 'PENDING',
    isPro: true,
  },
  {
    id: '12',
    game: todayGames[4],
    market: 'Handicap Asiático',
    marketSlug: 'handicap',
    prediction: 'Real Madrid -0.5',
    odd: 2.25,
    result: 'PENDING',
    isPro: true,
  },
  {
    id: '13',
    game: todayGames[5],
    market: 'Dupla Chance',
    marketSlug: 'double-chance',
    prediction: '1X (Juventus ou Empate)',
    odd: 1.35,
    result: 'PENDING',
    isPro: true,
  },
];

// Market Statistics
export const marketStats: MarketStats[] = [
  {
    championship: championships[0],
    market: 'Resultado Final (1X2)',
    marketSlug: '1x2',
    period: '30D',
    greens: 42,
    reds: 18,
    voids: 3,
    winrate: 70,
    oddRef: 1.85,
    isProfitable: true,
    roi: 15.5,
  },
  {
    championship: championships[0],
    market: 'Ambas Marcam',
    marketSlug: 'btts',
    period: '30D',
    greens: 38,
    reds: 22,
    voids: 2,
    winrate: 63.3,
    oddRef: 1.75,
    isProfitable: true,
    roi: 10.8,
  },
  {
    championship: championships[1],
    market: 'Resultado Final (1X2)',
    marketSlug: '1x2',
    period: '30D',
    greens: 55,
    reds: 25,
    voids: 5,
    winrate: 68.8,
    oddRef: 1.90,
    isProfitable: true,
    roi: 18.2,
  },
  {
    championship: championships[1],
    market: 'Over/Under 2.5',
    marketSlug: 'over-under',
    period: '30D',
    greens: 48,
    reds: 32,
    voids: 4,
    winrate: 60,
    oddRef: 1.65,
    isProfitable: false,
    roi: -2.5,
  },
  {
    championship: championships[2],
    market: 'Resultado Final (1X2)',
    marketSlug: '1x2',
    period: '30D',
    greens: 45,
    reds: 20,
    voids: 3,
    winrate: 69.2,
    oddRef: 1.88,
    isProfitable: true,
    roi: 14.3,
  },
  {
    championship: championships[3],
    market: 'Dupla Chance',
    marketSlug: 'double-chance',
    period: '30D',
    greens: 62,
    reds: 18,
    voids: 2,
    winrate: 77.5,
    oddRef: 1.35,
    isProfitable: true,
    roi: 8.7,
  },
];

// Results Summary
export const resultsSummary: Record<string, ResultSummary> = {
  '7D': {
    period: '7D',
    totalTips: 45,
    greens: 32,
    reds: 11,
    voids: 2,
    winrate: 74.4,
    profitUnits: 8.5,
  },
  '30D': {
    period: '30D',
    totalTips: 186,
    greens: 125,
    reds: 55,
    voids: 6,
    winrate: 69.4,
    profitUnits: 28.3,
  },
  '90D': {
    period: '90D',
    totalTips: 542,
    greens: 358,
    reds: 172,
    voids: 12,
    winrate: 67.5,
    profitUnits: 72.6,
  },
  'ALL': {
    period: 'ALL',
    totalTips: 1847,
    greens: 1198,
    reds: 612,
    voids: 37,
    winrate: 66.2,
    profitUnits: 215.4,
  },
};

// Recent Results for History
export const recentResults: Tip[] = [
  {
    id: '100',
    game: {
      ...todayGames[0],
      id: '100',
      date: '2026-01-31',
      status: 'finished',
    },
    market: 'Resultado Final',
    marketSlug: '1x2',
    prediction: 'Casa',
    odd: 1.75,
    result: 'GREEN',
  },
  {
    id: '101',
    game: {
      ...todayGames[1],
      id: '101',
      date: '2026-01-31',
      status: 'finished',
    },
    market: 'Resultado Final',
    marketSlug: '1x2',
    prediction: 'Fora',
    odd: 2.10,
    result: 'RED',
  },
  {
    id: '102',
    game: {
      ...todayGames[2],
      id: '102',
      date: '2026-01-31',
      status: 'finished',
    },
    market: 'Over/Under 2.5',
    marketSlug: 'over-under',
    prediction: 'Over 2.5',
    odd: 1.85,
    result: 'GREEN',
  },
  {
    id: '103',
    game: {
      ...todayGames[3],
      id: '103',
      date: '2026-01-30',
      status: 'finished',
    },
    market: 'Ambas Marcam',
    marketSlug: 'btts',
    prediction: 'Sim',
    odd: 1.70,
    result: 'GREEN',
  },
  {
    id: '104',
    game: {
      ...todayGames[4],
      id: '104',
      date: '2026-01-30',
      status: 'finished',
    },
    market: 'Resultado Final',
    marketSlug: '1x2',
    prediction: 'Empate',
    odd: 3.40,
    result: 'VOID',
  },
];
