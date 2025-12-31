import { Place, Translations, Language } from './types';

export const ALMATY_COORDINATES = { lat: 43.2389, lng: 76.8897 };

export const TRANSLATIONS: Record<Language, Translations> = {
  EN: {
    nav: { home: 'Discover', planner: 'Smart Route', tours: 'Tours', map: 'World Map' },
    hero: { explore: 'Explore', bestSeason: 'Best in', trending: 'Trending Now', allDestinations: 'All Destinations' },
    details: { 
      addToPlan: 'Add to Plan', 
      added: 'Planned', 
      coordinates: 'GPS Coordinates',
      share: 'Share',
      viewDetails: 'View Details',
      video: 'Cinematic Preview',
      gallery: 'Photo Gallery',
      interactiveMap: 'Interactive Map',
      panoramas: '3D Views',
      view3D: 'Open 3D View',
      videoReviews: 'Video Reviews',
      source: 'Source'
    },
    planner: {
      title: 'Your Journey',
      subtitle: 'From Almaty',
      subtitleLoc: 'From Your Location',
      empty: 'No destinations added yet. Go explore!',
      distanceFromAlmaty: 'From Almaty',
      distanceFromYou: 'From You',
      km: 'km',
      calculating: 'Locating you...',
      locDenied: 'Location access denied. Using Almaty as start point.'
    },
    tours: { comingSoon: 'Coming Soon', collab: 'Exclusive Expeditions', notify: 'Get Notified' },
    filter: {
        searchPlaceholder: 'Search destinations...',
        sortBy: 'Sort by',
        sortTrending: 'Trending',
        sortNearest: 'Nearest',
        sortName: 'A-Z',
        noResults: 'No destinations found.',
        prev: 'Prev',
        next: 'Next',
        page: 'Page'
    }
  },
  KZ: {
    nav: { home: 'Келу', planner: 'Маршрут', tours: 'Турлар', map: 'Карта' },
    hero: { explore: 'Зерттеу', bestSeason: 'Маусымы', trending: 'Танымал', allDestinations: 'Барлық жерлер' },
    details: { 
      addToPlan: 'Жоспарлау', 
      added: 'Қосылды', 
      coordinates: 'GPS Координаттары',
      share: 'Бөлісу',
      viewDetails: 'Толығырақ',
      video: 'Бейне шолу',
      gallery: 'Фотогалерея',
      interactiveMap: 'Интерактивті карта',
      panoramas: '3D Көріністер',
      view3D: '3D көру',
      videoReviews: 'Бейне шолулар',
      source: 'Дереккөз'
    },
    planner: {
      title: 'Сіздің Саяхатыңыз',
      subtitle: 'Алматыдан',
      subtitleLoc: 'Сіздің орналасқан жеріңізден',
      empty: 'Әзірге ешқандай жер қосылмады.',
      distanceFromAlmaty: 'Алматыдан',
      distanceFromYou: 'Сізден',
      km: 'км',
      calculating: 'Локация анықталуда...',
      locDenied: 'Геолокацияға рұқсат жоқ. Бастау нүктесі - Алматы.'
    },
    tours: { comingSoon: 'Жақында', collab: 'Арнайы Экспедициялар', notify: 'Хабарлау' },
    filter: {
        searchPlaceholder: 'Іздеу...',
        sortBy: 'Сұрыптау',
        sortTrending: 'Танымал',
        sortNearest: 'Ең жақын',
        sortName: 'А-Я',
        noResults: 'Нәтиже табылмады.',
        prev: 'Артқа',
        next: 'Алға',
        page: 'Бет'
    }
  },
  RU: {
    nav: { home: 'Обзор', planner: 'Маршрут', tours: 'Туры', map: 'Карта' },
    hero: { explore: 'Изучить', bestSeason: 'Лучше всего', trending: 'Популярное', allDestinations: 'Все направления' },
    details: { 
      addToPlan: 'В план', 
      added: 'Добавлено', 
      coordinates: 'GPS Координаты',
      share: 'Поделиться',
      viewDetails: 'Подробнее',
      video: 'Видео обзор',
      gallery: 'Фотогалерея',
      interactiveMap: 'Интерактивная карта',
      panoramas: '3D Виды',
      view3D: 'Открыть 3D',
      videoReviews: 'Видео обзоры',
      source: 'Источник'
    },
    planner: {
      title: 'Ваше Путешествие',
      subtitle: 'От Алматы',
      subtitleLoc: 'От Вас',
      empty: 'Пока нет добавленных мест.',
      distanceFromAlmaty: 'От Алматы',
      distanceFromYou: 'От Вас',
      km: 'км',
      calculating: 'Определение локации...',
      locDenied: 'Нет доступа к гео. Старт от Алматы.'
    },
    tours: { comingSoon: 'Скоро', collab: 'Эксклюзивные Экспедиции', notify: 'Узнать первым' },
    filter: {
        searchPlaceholder: 'Поиск мест...',
        sortBy: 'Сортировка',
        sortTrending: 'Популярное',
        sortNearest: 'Ближайшие',
        sortName: 'А-Я',
        noResults: 'Места не найдены.',
        prev: 'Назад',
        next: 'Вперед',
        page: 'Стр.'
    }
  }
};

export const PLACES: Place[] = [
  {
    id: '1',
    name: { EN: 'Kolsay Lakes', KZ: 'Көлсай көлдері', RU: 'Озера Кольсай' },
    description: {
      EN: 'Often referred to as "Pearls of the Northern Tien Shan", these three alpine lakes are submerged in a steep valley.',
      KZ: 'Солтүстік Тянь-Шаньның інжу-маржаны деп аталатын бұл үш альпі көлі тік шатқалда орналасқан.',
      RU: 'Часто называемые «Жемчужинами Северного Тянь-Шаня», эти три высокогорных озера расположены в крутом ущелье.'
    },
    season: { EN: 'Summer', KZ: 'Жаз', RU: 'Лето' },
    coordinates: { lat: 42.9922, lng: 78.3292 },
    images: [
        "https://images.unsplash.com/photo-1596423985790-28e7e1f7c199?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552656967-7a0fe8a4f853?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1627917765166-5e022b7a48d3?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1563804803980-08d13b41d01f?q=80&w=1200&auto=format&fit=crop"
    ],
    type: 'Lake',
    locationLabel: { EN: 'Almaty Region', KZ: 'Алматы облысы', RU: 'Алматинская область' },
    isTrending: true,
    panoramas: [
      {
        title: { EN: 'Lake View', KZ: 'Көл көрінісі', RU: 'Вид на озеро' },
        embedUrl: 'https://www.google.com/maps/embed?pb=!4v1767125030756!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ19nSURVcFFF!2m2!1d42.98827702099912!2d78.32559902232916!3f108.47421123404408!4f-30.979628549994445!5f0.7820865974627469',
        thumbnailUrl: "https://images.unsplash.com/photo-1596423985790-28e7e1f7c199?q=80&w=400&auto=format&fit=crop"
      },
    ],
    videoReviews: [
        {
            url: "https://assets.mixkit.co/videos/preview/mixkit-mountain-landscape-with-a-lake-in-the-background-40439-large.mp4",
            creditName: "@almaty_travel_guide",
            creditUrl: "https://instagram.com",
            thumbnailUrl: "https://images.unsplash.com/photo-1596423985790-28e7e1f7c199?q=80&w=400&auto=format&fit=crop",
            platform: 'instagram'
        },
        {
            url: "https://assets.mixkit.co/videos/preview/mixkit-lake-surrounded-by-dry-grass-in-autumn-44588-large.mp4",
            creditName: "@nomad_vibes",
            creditUrl: "https://tiktok.com",
            thumbnailUrl: "https://images.unsplash.com/photo-1552656967-7a0fe8a4f853?q=80&w=400&auto=format&fit=crop",
            platform: 'tiktok'
        }
    ]
  },
  {
    id: '2',
    name: { EN: 'Charyn Canyon', KZ: 'Шарын шатқалы', RU: 'Чарынский каньон' },
    description: {
      EN: 'The Valley of Castles. A canyon on the Sharyn River in Kazakhstan, often compared to the Grand Canyon.',
      KZ: 'Қамалдар алқабы. Қазақстандағы Шарын өзеніндегі каньон, жиі Гранд Каньонмен салыстырылады.',
      RU: 'Долина Замков. Каньон на реке Шарын в Казахстане, который часто сравнивают с Гранд-Каньоном.'
    },
    season: { EN: 'Spring/Autumn', KZ: 'Көктем/Күз', RU: 'Весна/Осень' },
    coordinates: { lat: 43.3512, lng: 79.0809 },
    images: [
        "https://images.unsplash.com/photo-1558588942-930faae5a389?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1533230490196-851965a3d706?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1627389955776-8533d3663a75?q=80&w=1200&auto=format&fit=crop"
    ],
    type: 'Canyon',
    locationLabel: { EN: 'Almaty Region', KZ: 'Алматы облысы', RU: 'Алматинская область' },
    isTrending: true,
    panoramas: [],
    videoReviews: [
         {
            url: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-desert-canyon-4239-large.mp4",
            creditName: "@charyn_official",
            creditUrl: "https://instagram.com",
            thumbnailUrl: "https://images.unsplash.com/photo-1558588942-930faae5a389?q=80&w=400&auto=format&fit=crop",
            platform: 'instagram'
        }
    ]
  },
  {
    id: '3',
    name: { EN: 'Bozyra Tract', KZ: 'Бозжыра шатқалы', RU: 'Урочище Бозжыра' },
    description: {
      EN: 'A magnificent creation of weathering and erosion, located on the Ustyurt Plateau. An alien landscape.',
      KZ: 'Үстірт үстіртінді орналасқан жел мен эрозияның ғажайып туындысы. Өзге ғаламшарлық көрініс.',
      RU: 'Великолепное творение выветривания и эрозии, расположенное на плато Устюрт. Инопланетный пейзаж.'
    },
    season: { EN: 'May/September', KZ: 'Мамыр/Қыркүйек', RU: 'Май/Сентябрь' },
    coordinates: { lat: 43.9167, lng: 53.5333 },
    images: [
        "https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518182170546-0766ce6fec56?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605634289389-9b517e471962?q=80&w=1200&auto=format&fit=crop"
    ],
    type: 'Desert',
    locationLabel: { EN: 'Mangystau', KZ: 'Маңғыстау', RU: 'Мангистау' },
    isTrending: true,
    panoramas: [],
    videoReviews: []
  },
  {
    id: '4',
    name: { EN: 'Kaindy Lake', KZ: 'Қайыңды көлі', RU: 'Озеро Каинды' },
    description: {
      EN: 'Famous for its submerged spruce forest. The dried trunks of the spruce trees rise above the water surface.',
      KZ: 'Су астындағы шырша орманымен әйгілі. Шырша ағаштарының қураған діңдері су бетіне шығып тұрады.',
      RU: 'Знаменито своим подводным еловым лесом. Засохшие стволы елей возвышаются над поверхностью воды.'
    },
    season: { EN: 'Summer', KZ: 'Жаз', RU: 'Лето' },
    coordinates: { lat: 42.5902, lng: 78.2755 },
    images: [
        "https://images.unsplash.com/photo-1605218439502-d9f75727918a?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1565554366650-719543884e62?q=80&w=1200&auto=format&fit=crop"
    ],
    type: 'Lake',
    locationLabel: { EN: 'Almaty Region', KZ: 'Алматы облысы', RU: 'Алматинская область' },
    isTrending: true,
    panoramas: [],
    videoReviews: []
  },
  {
    id: '5',
    name: { EN: 'Big Almaty Lake', KZ: 'Үлкен Алматы көлі', RU: 'Большое Алматинское озеро' },
    description: {
      EN: 'A natural alpine reservoir. It is located in the Trans-Ili Alatau mountains, 15 km south from the center of Almaty.',
      KZ: 'Табиғи альпілік су қоймасы. Ол Іле Алатауы тауларында, Алматы орталығынан оңтүстікке қарай 15 шақырым жерде орналасқан.',
      RU: 'Природное высокогорное водохранилище. Расположено в горах Заилийского Алатау, в 15 км к югу от центра Алматы.'
    },
    season: { EN: 'Autumn', KZ: 'Күз', RU: 'Осень' },
    coordinates: { lat: 43.0506, lng: 76.9850 },
    images: [
        "https://images.unsplash.com/photo-1551801319-ca4c4dc20138?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1628267252876-0f8c2e688849?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1533230490196-851965a3d706?q=80&w=1200&auto=format&fit=crop"
    ],
    type: 'Mountain',
    locationLabel: { EN: 'Almaty City', KZ: 'Алматы қаласы', RU: 'Город Алматы' },
    isTrending: false,
    panoramas: [
      {
        title: { EN: 'Lake View', KZ: 'Көл көрінісі', RU: 'Вид на озеро' },
        embedUrl: 'https://www.google.com/maps/embed?pb=!4v1767007161059!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRDR6ZmVqRlE.!2m2!1d43.05055598882759!2d76.98500001989194!3f347.84548751185605!4f-10.268668952246912!5f0.7820865974627469',
        thumbnailUrl: "https://images.unsplash.com/photo-1551801319-ca4c4dc20138?q=80&w=400&auto=format&fit=crop"
      },
      {
        title: { EN: 'Mountain Path', KZ: 'Тау жолы', RU: 'Горная тропа' },
        embedUrl: 'https://www.google.com/maps/embed?pb=!4v1628163901234!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRDR6ZmVqRlE.!2m2!1d43.0505!2d76.9850!3f0!4f0!5f0.7820865974627469', // Mock different view
        thumbnailUrl: "https://images.unsplash.com/photo-1628267252876-0f8c2e688849?q=80&w=400&auto=format&fit=crop"
      }
    ],
    videoReviews: []
  },
  {
    id: '6',
    name: { EN: 'Burabay', KZ: 'Бурабай', RU: 'Боровое' },
    description: {
      EN: 'Known as the "Switzerland of Kazakhstan", Burabay National Park features pine forests, unique rock formations, and lakes.',
      KZ: 'Қазақстанның "Швейцариясы" деп аталатын Бурабай ұлттық паркі қарағайлы ормандарымен, ерекше жартастарымен және көлдерімен танымал.',
      RU: 'Известный как «Казахстанская Швейцария», национальный парк Бурабай славится сосновыми лесами, уникальными скалами и озерами.'
    },
    season: { EN: 'Summer/Winter', KZ: 'Жаз/Қыс', RU: 'Лето/Зима' },
    coordinates: { lat: 53.0864, lng: 70.2979 },
    images: [
        "https://images.unsplash.com/photo-1595186938740-10906230f259?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1589998059171-698f8d097826?q=80&w=1200&auto=format&fit=crop"
    ],
    type: 'Mountain',
    locationLabel: { EN: 'Akmola Region', KZ: 'Ақмола облысы', RU: 'Акмолинская область' },
    isTrending: false,
    panoramas: [],
    videoReviews: []
  }
];