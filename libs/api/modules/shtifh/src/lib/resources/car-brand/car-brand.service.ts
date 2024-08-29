import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';

const data1 = [
  {
    name_en: 'Opel',
    name_ar: 'أوبل',
    name_he: 'אופל',
    image_url:
      '/https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/opel.png',
  },
  {
    name_en: 'Austin',
    name_ar: 'أوستن',
    name_he: 'אוסטין',
    image_url:
      '/https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/austin.png',
  },
  {
    name_en: 'Oldsmobile',
    name_ar: 'أولدزموبيل',
    name_he: 'אולדסמוביל',
    image_url:
      '/https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/oldsmobile.png',
  },
  {
    name_en: 'Iveco',
    name_ar: 'إيفيكو',
    name_he: 'איווקו',
    image_url:
      '/https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/iveco.png',
  },
  {
    name_en: 'Aiways',
    name_ar: 'آيوايز',
    name_he: 'איוייס',
    image_url:
      '/https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/aiways.png',
  },
  {
    name_en: 'Ora',
    name_ar: 'أورا',
    name_he: 'אורה',
    image_url:
      '/https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/ora.png',
  },
  {
    name_en: 'LEVC',
    name_ar: 'إل إي ڤي سي',
    name_he: 'אל.איי.וי.סי',
    image_url:
      '/https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/levc.png',
  },
  {
    name_en: 'Isuzu',
    name_ar: 'إيسوزو',
    name_he: 'איסוזו',
    image_url:
      '/https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/isuzu.png',
  },
  {
    name_en: 'Infiniti',
    name_ar: 'إنفينيتي',
    name_he: 'אינפיניטי',
    image_url:
      '/https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/infiniti.png',
  },
  {
    name_en: 'Alpine',
    name_ar: 'ألبين',
    name_he: 'אלפין',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/alpine.png',
  },
  {
    name_en: 'Alfa Romeo',
    name_ar: 'ألفا روميو',
    name_he: 'אלפא רומיאו',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/alfa-romeo.png',
  },
  {
    name_en: 'LTI',
    name_ar: 'إل تي آي',
    name_he: 'אל.טי.איי',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/LTI.png',
  },
  {
    name_en: 'FAW',
    name_ar: 'فيو',
    name_he: 'אף.אי.וו',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/faw.png',
  },
  {
    name_en: 'Aston Martin',
    name_ar: 'أستون مارتن',
    name_he: 'אסטון מרטין',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/aston-martin.png',
  },
  {
    name_en: 'MG',
    name_ar: 'إم جي',
    name_he: 'אם.ג׳י.',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/mg.png',
  },
  {
    name_en: 'Buick',
    name_ar: 'بويك',
    name_he: 'ביואיק',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/buick.png',
  },
  {
    name_en: 'BYD',
    name_ar: 'بي واي دي',
    name_he: 'בי.ויי.די',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/byd.png',
  },
  {
    name_en: 'BMW',
    name_ar: 'بي إم دبليو',
    name_he: 'ב.מ.וו',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/bmw.png',
  },
  {
    name_en: 'Denza',
    name_ar: 'دنزا',
    name_he: 'דנזה',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/denza.png',
  },
  {
    name_en: 'BAW',
    name_ar: 'باو',
    name_he: 'באוו',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/baw.png',
  },
  {
    name_en: 'ZEEKR',
    name_ar: 'زيكر',
    name_he: 'זיקר',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/zeekr.png',
  },
  {
    name_en: 'XPENG',
    name_ar: 'إكس بنغ',
    name_he: 'אקספנג',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/xpeng.png',
  },
  {
    name_en: 'RAM',
    name_ar: 'رام',
    name_he: 'ראם',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/ram.png',
  },
  {
    name_en: 'Autobianchi',
    name_ar: 'أوتوبيانكي',
    name_he: 'אוטוביאנקי',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/autobianchi.png',
  },
  {
    name_en: 'Abarth',
    name_ar: 'أبارث',
    name_he: 'אברט',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/abarth.png',
  },
  {
    name_en: 'Audi',
    name_ar: 'أودي',
    name_he: 'אודי',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b1/audi.png',
  },
];

const data2 = [
  {
    name_en: 'GAC',
    name_ar: 'جاك',
    name_he: 'ג׳י.אי.סי',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/gac-group.png',
  },
  {
    name_en: 'Jaecoo',
    name_ar: 'جيكو',
    name_he: 'ג׳יאקו',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/jaecoo.png',
  },
  {
    name_en: 'Bentley',
    name_ar: 'بنتلي',
    name_he: 'בנטלי',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/bentley.png',
  },
  {
    name_en: 'Geo',
    name_ar: 'جيو',
    name_he: 'גיאו',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/geo.png',
  },
  {
    name_en: 'GMC',
    name_ar: 'جي إم سي',
    name_he: 'ג׳י.אם.סי',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/gmc.png',
  },
  {
    name_en: 'Jeep',
    name_ar: 'جيب',
    name_he: 'ג׳יפ',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/jeep.png',
  },
  {
    name_en: 'Geely',
    name_ar: 'جيلي',
    name_he: 'ג׳ילי',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/geely.png',
  },
  {
    name_en: 'JAC',
    name_ar: 'جاك',
    name_he: 'ג׳יאק',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/jac.png',
  },
  {
    name_en: 'Great Wall Motors',
    name_ar: 'جريت وول',
    name_he: 'גרייט וול',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/great-wall.png',
  },
  {
    name_en: 'Genesis',
    name_ar: 'جينيسيس',
    name_he: 'גניסיס',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/genesis.png',
  },
  {
    name_en: 'GAC Trumpchi',
    name_ar: 'جيب تاعير',
    name_he: 'ג׳יפ תע״ר',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/gac-group.png',
  },
  {
    name_en: 'Dongfeng',
    name_ar: 'دونغفنغ',
    name_he: 'דונגפנג',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/dongfeng.png',
  },
  {
    name_en: 'Dodge',
    name_ar: 'دودج',
    name_he: 'דודג׳',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/dodge.png',
  },
  {
    name_en: 'Dacia',
    name_ar: 'داشيا',
    name_he: 'דאצ׳יה',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/dacia.png',
  },
  {
    name_en: 'Daihatsu',
    name_ar: 'دايهاتسو',
    name_he: 'דייהטסו',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/daihatsu.png',
  },
  {
    name_en: 'Daewoo',
    name_ar: 'دايو',
    name_he: 'דייהו',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/daewoo.png',
  },
  {
    name_en: 'DS Automobiles',
    name_ar: 'دي إس',
    name_he: 'די.אס',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/ds.png',
  },
  {
    name_en: 'Honda',
    name_ar: 'هوندا',
    name_he: 'הונדה',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/honda.png',
  },
  {
    name_en: 'Hongqi',
    name_ar: 'هونغتشي',
    name_he: 'הונגצ׳י',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/hongqi.png',
  },
  {
    name_en: 'Hummer',
    name_ar: 'هامر',
    name_he: 'האמר',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/hummer.png',
  },
  {
    name_en: 'Voyah',
    name_ar: 'ويا',
    name_he: 'וויה',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/voyah.png',
  },
  {
    name_en: 'Wey',
    name_ar: 'وي',
    name_he: 'ויי',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/wey.png',
  },
  {
    name_en: 'Hino',
    name_ar: 'هينو',
    name_he: 'הינו',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/hino.png',
  },
  {
    name_en: 'Toyota',
    name_ar: 'تويوتا',
    name_he: 'טויוטה',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/toyota.png',
  },
  {
    name_en: 'Tata',
    name_ar: 'تاتا',
    name_he: 'טאטא',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/tata.png',
  },
  {
    name_en: 'Volvo',
    name_ar: 'فولفو',
    name_he: 'וולוו',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b2/volvo.png',
  },
];

const data3 = [
  {
    name_en: 'Hyundai',
    name_ar: 'هيونداي',
    name_he: 'יונדאי',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/hyundai.png',
  },
  {
    name_en: 'Jaguar',
    name_ar: 'جاكوار',
    name_he: 'יגואר',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/jaguar.png',
  },
  {
    name_en: 'Tesla',
    name_ar: 'تسلا',
    name_he: 'טסלה',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/tesla.png',
  },
  {
    name_en: 'Lincoln',
    name_ar: 'لينكولن',
    name_he: 'לינקולן',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/lincoln.png',
  },
  {
    name_en: 'Lynk & Co',
    name_ar: 'لينك آند كو',
    name_he: 'לינק&קו',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/lynk-and-co.png',
  },
  {
    name_en: 'Lada',
    name_ar: 'لادا',
    name_he: 'לאדה',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/lada.png',
  },
  {
    name_en: 'Lamborghini',
    name_ar: 'لامبورغيني',
    name_he: 'למבורגיני',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/lamborghini.png',
  },
  {
    name_en: 'LeEco',
    name_ar: 'ليتشي',
    name_he: 'ליצ׳י',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/leeco.png',
  },
  {
    name_en: 'Leapmotor',
    name_ar: 'ليب موتور',
    name_he: 'ליפמוטור',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/leapmotor.png',
  },
  {
    name_en: 'NIO',
    name_ar: 'نيو',
    name_he: 'ניו',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/nio.png',
  },
  {
    name_en: 'Mercedes-Benz',
    name_ar: 'مرسيدس بنز',
    name_he: 'מרצדס',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/mercedes-benz.png',
  },
  {
    name_en: 'Maxus',
    name_ar: 'ماكسوس',
    name_he: 'מקסוס',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/maxus.png',
  },
  {
    name_en: 'Saab',
    name_ar: 'ساب',
    name_he: 'סאאב',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/saab.png',
  },
  {
    name_en: 'Gurgel',
    name_ar: 'جورغل',
    name_he: 'ננג׳ינג',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/gurgel.png',
  },
  {
    name_en: 'Nissan',
    name_ar: 'نيسان',
    name_he: 'ניסאן',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/nissan.png',
  },
  {
    name_en: 'SangYong',
    name_ar: 'سانج يونج',
    name_he: 'סאנגיונג',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/ssangyong.png',
  },
  {
    name_en: 'Sun Living',
    name_ar: 'صن ليفينج',
    name_he: 'סאן ליווינג',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/SunLiving.png',
  },
  {
    name_en: 'Lexus',
    name_ar: 'لكزس',
    name_he: 'לקסוס',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/lexus.png',
  },
  {
    name_en: 'Lancia',
    name_ar: 'لانسيا',
    name_he: 'לנצ׳יה',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/lancia.png',
  },
  {
    name_en: 'Land Rover',
    name_ar: 'لاند روفر',
    name_he: 'לנד רובר',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/land-rover.png',
  },
  {
    name_en: 'Maserati',
    name_ar: 'مازيراتي',
    name_he: 'מזראטי',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/maserati.png',
  },
  {
    name_en: 'MAN',
    name_ar: 'مان',
    name_he: 'מאן',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/man.png',
  },
  {
    name_en: 'Mazda',
    name_ar: 'مازدا',
    name_he: 'מאזדה',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/mazda.png',
  },
  {
    name_en: 'McLaren',
    name_ar: 'ماكلارين',
    name_he: 'מקלארן',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/mcLaren.png',
  },
  {
    name_en: 'Mitsubishi',
    name_ar: 'ميتسوبيشي',
    name_he: 'מיצובישי',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/mitsubishi.png',
  },
  {
    name_en: 'MINI',
    name_ar: 'ميني',
    name_he: 'מיני',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b3/mini.png',
  },
];

const data4 = [
  {
    name_en: 'SEAT',
    name_ar: 'سيات',
    name_he: 'סיאט',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/seat.png',
  },
  {
    name_en: 'Suzuki',
    name_ar: 'سوزوكي',
    name_he: 'סוזוקי',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/suzuki.png',
  },
  {
    name_en: 'Subaru',
    name_ar: 'سوبارو',
    name_he: 'סובארו',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/subaru.png',
  },
  {
    name_en: 'Cenntro',
    name_ar: 'سنترو',
    name_he: 'סנטרו',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/cenntro.png',
  },
  {
    name_en: 'Smart',
    name_ar: 'سمارت',
    name_he: 'סמארט',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/smart.png',
  },
  {
    name_en: 'Citroën',
    name_ar: 'ستروين',
    name_he: 'סיטרואן',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/citroën.png',
  },
  {
    name_en: 'Seres',
    name_ar: 'سيرس',
    name_he: 'סרם',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/SERES.png',
  },
  {
    name_en: 'Skywell',
    name_ar: 'سكايويل',
    name_he: 'סקייוול',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/Skywels.png',
  },
  {
    name_en: 'Škoda',
    name_ar: 'سكودا',
    name_he: 'סקודה',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/skoda.png',
  },
  {
    name_en: 'Pontiac',
    name_ar: 'بونتياك',
    name_he: 'פונטיאק',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/pontiac.png',
  },
  {
    name_en: 'Volkswagen',
    name_ar: 'فولكس فاجن',
    name_he: 'פולקסווגן',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/volkswagen.png',
  },
  {
    name_en: 'Polestar',
    name_ar: 'بولستار',
    name_he: 'פולסטאר',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/polestar.png',
  },
  {
    name_en: 'Forthing',
    name_ar: 'فورثينج',
    name_he: 'פורטינג',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/forthing.png',
  },
  {
    name_en: 'Porsche',
    name_ar: 'بورشه',
    name_he: 'פורשה',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/porsche.png',
  },
  {
    name_en: 'Ford',
    name_ar: 'فورد',
    name_he: 'פורד',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/ford.png',
  },
  {
    name_en: 'Peugeot',
    name_ar: 'بيجو',
    name_he: 'פיג׳ו',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/peugeot.png',
  },
  {
    name_en: 'Fiat',
    name_ar: 'فيات',
    name_he: 'פיאט',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/fiat.png',
  },
  {
    name_en: 'Piaggio',
    name_ar: 'بياجيو',
    name_he: 'פיאג׳יו',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/piaggio.png',
  },
  {
    name_en: 'Cadillac',
    name_ar: 'كاديلاك',
    name_he: 'קאדילק',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/cadillac.png',
  },
  {
    name_en: 'Chery',
    name_ar: 'شيري',
    name_he: 'צ׳רי',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/chery.png',
  },
  {
    name_en: 'Ferrari',
    name_ar: 'فيراري',
    name_he: 'פרארי',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/ferrari.png',
  },
  {
    name_en: 'Kia',
    name_ar: 'كيا',
    name_he: 'קיה',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/kia.png',
  },
  {
    name_en: 'Cupra',
    name_ar: 'كوبرا',
    name_he: 'קופרה',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/cupra.jpg',
  },
  {
    name_en: 'Karma',
    name_ar: 'كارما',
    name_he: 'קארמה',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/karma.png',
  },
  {
    name_en: 'Rolls-Royce',
    name_ar: 'رولز رويس',
    name_he: 'רולס רויס',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/rolls-royce.png',
  },
  {
    name_en: 'Rover',
    name_ar: 'روفر',
    name_he: 'רובר',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/rover.png',
  },
  {
    name_en: 'Chrysler',
    name_ar: 'كرايسلر',
    name_he: 'קרייזלר',
    image_url:
      'https://shtifh-car-brand-logos.s3.eu-central-1.amazonaws.com/b4/chrysler.png',
  },
];

@Injectable()
export class CarBrandResourceService {
  private logger = new Logger(CarBrandResourceService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async list() {
    await this.prismaService.carBrand.createMany({
      data: [...data1, ...data2, ...data3, ...data4],
    });
    const results = await this.prismaService.carBrand.findMany({
      select: {
        id: true,
        image_url: true,
        name_ar: true,
        name_en: true,
        name_he: true,
      },
    });

    return results;
  }
}
