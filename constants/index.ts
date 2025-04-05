export const initialQalmas: QalmasState = {
  0: {
    qalma: 'یَا ذَو الْجَلَالِ وَالْإِكْرَامِ',
    count: 0,
    loop: 0,
    day: 'Sunday',
  },
  1: {
    qalma: 'یَا قَاضی الحَاجَاتْ',
    count: 0,
    loop: 0,
    day: 'Monday',
  },
  2: {
    qalma: 'يَا أَرْحَمَ الرَّاحِمِيْنَ',
    count: 0,
    loop: 0,
    day: 'Tuesday',
  },
  3: {
    qalma: 'یَا حیُّی یَا قَیُّوم',
    count: 0,
    loop: 0,
    day: 'Wednesday',
  },
  4: {
    qalma: 'لَا إِلَهَ إِلَّا اللَّهُ الْمَلِكُ الْحَقُّ الْمُبِينُ',
    count: 0,
    loop: 0,
    day: 'Thursday',
  },
  5: {
    qalma: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
    count: 0,
    loop: 0,
    day: 'Friday',
  },
  6: {
    qalma: 'يَا رَبِّ العَالَمِيْنَ',
    count: 0,
    loop: 0,
    day: 'Saturday',
  },
};

export type Qalma = {
  qalma: string;
  count: number;
  loop: number;
  day?: string;
};

export type QalmasState = {
  [key: number]: Qalma;
};

export const DEFAULT_TARGET = 100;
