const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// New trek dataset
const treks = [
    {
      id: 1,
      name: "Everest Base Camp",
      difficulty: 3,
      distance: 130,
      altitude: 5364,
      recommendedAge: 25,
      requiredCapacity: 7,
      image: "https://explorerspassage.com/wp-content/uploads/2021/12/everest-base-camp-trek-1-scaled-1.jpg",
      description: "A challenging trek to the base of the world's highest peak, offering stunning views of Everest and surrounding Himalayan peaks."
    },
    {
      id: 2,
      name: "Annapurna Circuit",
      difficulty: 3,
      distance: 160,
      altitude: 5416,
      recommendedAge: 30,
      requiredCapacity: 6,
      image: "https://www.muchbetteradventures.com/magazine/content/images/2019/05/23144145/Annapurna-Circuit-6-1600x1067.jpeg",
      description: "A diverse trek through lush forests, arid landscapes, and quaint villages, culminating at the Thorong La Pass at 5,416 meters."
    },
    {
      id: 3,
      name: "Roopkund Trek",
      difficulty: 2,
      distance: 53,
      altitude: 5029,
      recommendedAge: 40,
      requiredCapacity: 5,
      image: "https://www.adventurenation.com/blog/wp-content/uploads/2016/08/Roopkund-1140x530.jpg",
      description: "An adventurous trek known for its mysterious skeleton lake, high-altitude meadows, and panoramic mountain views."
    },
    {
      id: 4,
      name: "Valley of Flowers",
      difficulty: 1,
      distance: 38,
      altitude: 3658,
      recommendedAge: 25,
      requiredCapacity: 3,
      image: "https://trekupindia.com/wp-content/uploads/2024/05/uttrakhand-valley-of-flowers-trek.webp",
      description: "A gentle trek through a UNESCO World Heritage site known for its vibrant floral diversity and serene beauty."
    },
    {
      id: 5,
      name: "Chadar Trek",
      difficulty: 2,
      distance: 62,
      altitude: 3390,
      recommendedAge: 30,
      requiredCapacity: 6,
      image: "https://trekthehimalayas.com/images/ChadarTrekFrozenRiver/MobileSlider/67236352-e4da-4600-85bf-3d488eef631e_Buran-Ghati-2.webp",
      description: "A unique trek across the frozen Zanskar River, where trekkers walk on ice and explore the stunning landscape of Ladakh in winter."
    },
    {
      id: 6,
      name: "Kedarkantha Trek",
      difficulty: 1,
      distance: 20,
      altitude: 3810,
      recommendedAge: 22,
      requiredCapacity: 4,
      image: "https://banzaaratravels.com/wp-content/uploads/2022/09/k1.jpg",
      description: "An easy yet rewarding winter trek offering snow-clad landscapes, stunning summit views, and a true Himalayan experience."
    },
    {
      id: 7,
      name: "Goechala Trek",
      difficulty: 3,
      distance: 90,
      altitude: 4940,
      recommendedAge: 30,
      requiredCapacity: 7,
      image: "https://trekthehimalayas.com/images/GoechalaTrek/GalleryDesktop/Summer/d5cb288a-2ca8-4cf2-85b6-03e85d146634_Goechala-2.webp",
      description: "A challenging trek in Sikkim that brings trekkers close to the mighty Kanchenjunga, offering breathtaking mountain views."
    },
    {
      id: 8,
      name: "Hampta Pass",
      difficulty: 2,
      distance: 35,
      altitude: 4270,
      recommendedAge: 28,
      requiredCapacity: 6,
      image: "https://cliffhangersindia.com/wp-content/uploads/2024/04/47175727212_3bbfd70331_c.jpg.webp",
      description: "A scenic trek that transitions from lush green valleys of Kullu to the arid landscapes of Spiti, offering varied terrains."
    },
    {
      id: 9,
      name: "Stok Kangri",
      difficulty: 3,
      distance: 40,
      altitude: 6153,
      recommendedAge: 32,
      requiredCapacity: 8,
      image: "https://www.miyaradventures.com/wp-content/uploads/2015/07/Feature_Image_StokKangri_main.jpg",
      description: "A high-altitude climb in Ladakh, suitable for experienced trekkers looking for a non-technical but demanding ascent."
    },
    {
      id: 10,
      name: "Markha Valley",
      difficulty: 2,
      distance: 65,
      altitude: 5150,
      recommendedAge: 29,
      requiredCapacity: 5,
      image: "https://trekthehimalayas.com/images/HomePageImages/Desktop/e5a94bb5-de3f-4ee5-a709-d8be72316215_Markha-Valley-Day-5.webp",
      description: "A classic trek in the Hemis National Park that takes you through remote villages, monasteries, and high passes in the arid landscapes of Ladakh."
    }, 
    {
      id: 11,
      name: "Har Ki Dun",
      difficulty: 2,
      distance: 44,
      altitude: 3566,
      recommendedAge: 26,
      requiredCapacity: 5,
      image: "https://trekthehimalayas.com/images/HarKiDoonTrek/MobileSlider/b6306896-dac0-42b7-b60f-a824828e2e4b_mob_Har-Ki-Doon%20(1).webp",
      description: "A picturesque valley trek nestled in the Himalayas, known for its stunning meadows, dense forests, and ancient villages."
    },
    {
      id: 12,
      name: "Pin Parvati Pass",
      difficulty: 3,
      distance: 110,
      altitude: 5319,
      recommendedAge: 35,
      requiredCapacity: 8,
      image: "https://trekthehimalayas.com/images/PinParvatiPassTrek/Slider/69e20414-c7a0-4b76-9d00-166c45cc0231_Pin-Parvati-Pass.webp",
      description: "A challenging trek that crosses the high Pin Parvati Pass, offering breathtaking views of snow-capped peaks and lush valleys."
    },
    {
      id: 13,
      name: "Kashmir Great Lakes",
      difficulty: 2,
      distance: 75,
      altitude: 4195,
      recommendedAge: 29,
      requiredCapacity: 6,
      image: "https://dwq3yv87q1b43.cloudfront.net/public/blogs/fit-in/1200x675/Blog_20240427-1019421756-1714205575.jpg",
      description: "An enchanting trek through the pristine landscapes of Kashmir, featuring stunning alpine lakes and picturesque meadows."
    },
    {
      id: 14,
      name: "Tarsar Marsar Trek",
      difficulty: 2,
      distance: 47,
      altitude: 3962,
      recommendedAge: 27,
      requiredCapacity: 5,
      image: "https://lazymonkadventure.com/wp-content/uploads/2021/05/Tarsar-Marsar-Trek-5.jpeg",
      description: "A captivating trek in Kashmir that connects two beautiful lakes, Tarsar and Marsar, amidst lush green valleys and snow-capped peaks."
    },
    {
      id: 15,
      name: "Bhrigu Lake Trek",
      difficulty: 1,
      distance: 26,
      altitude: 4235,
      recommendedAge: 23,
      requiredCapacity: 4,
      image: "https://mountainsojourns.com/wp-content/uploads/36_BhriguLakeTrek-Manali.jpg",
      description: "A moderate trek leading to the stunning Bhrigu Lake, known for its beautiful surroundings and serene atmosphere."
    },
    {
      id: 16,
      name: "Kuari Pass Trek",
      difficulty: 2,
      distance: 33,
      altitude: 4264,
      recommendedAge: 29,
      requiredCapacity: 5,
      image: "https://trekthehimalayas.com/images/RupinPassTrek/GalleryDesktop/Summer/9966d644-76e3-49b0-b24f-bfb9eba7493a_Rupin-Pass-2.webp",
      description: "A beautiful trek through lush forests and picturesque villages, culminating in breathtaking views from Kuari Pass."
    },
    {
      id: 17,
      name: "Rupin Pass",
      difficulty: 3,
      distance: 52,
      altitude: 4650,
      recommendedAge: 34,
      requiredCapacity: 6,
      image: "https://trekthehimalayas.com/images/RupinPassTrek/GalleryDesktop/Summer/9966d644-76e3-49b0-b24f-bfb9eba7493a_Rupin-Pass-2.webp",
      description: "An adventurous trek that offers stunning views of the Dhauladhar range and takes you through beautiful alpine meadows."
    },
    {
      id: 18,
      name: "Deoriatal Chandrashila",
      difficulty: 1,
      distance: 30,
      altitude: 4000,
      recommendedAge: 24,
      requiredCapacity: 4,
      image: "https://choptauttarakhand.com/wp-content/uploads/2018/04/Deoriatal-Chandrashila-Trek-Chopta-960x1149.jpg",
      description: "A charming trek leading to Deoriatal Lake and Chandrashila, offering mesmerizing views of the Himalayan peaks."
    },
    {
      id: 19,
      name: "Nag Tibba Trek",
      difficulty: 1,
      distance: 19,
      altitude: 3022,
      recommendedAge: 22,
      requiredCapacity: 3,
      image: "https://moxtain.s3.ap-south-1.amazonaws.com/blogs/NagTibbaBeginnersTrek/nag-tibba-range.jpg",
      description: "A short and easy trek near Mussoorie, perfect for beginners, with beautiful views and a chance to explore the local flora and fauna."
    },
    {
      id: 20,
      name: "Sandakphu Trek",
      difficulty: 2,
      distance: 45,
      altitude: 3636,
      recommendedAge: 28,
      requiredCapacity: 5,
      image: "https://trekinsikkim.in/sandakphu-trek/sandakphu-trek-route.webp",
      description: "A stunning trek offering panoramic views of the world's highest peaks, including Everest and Kanchenjunga."
    },
    {
      id: 21,
      name: "Dzongri Trek",
      difficulty: 2,
      distance: 40,
      altitude: 4170,
      recommendedAge: 29,
      requiredCapacity: 6,
      image: "https://trekinsikkim.in/upload_image/slider/2024_02_03_04_57_29_Dzongri%20Trek%20(1).jpg",
      description: "A popular trek in Sikkim that rewards trekkers with magnificent views of the Kanchenjunga range and lush green landscapes."
    },
    {
      id: 22,
      name: "Annapurna Base Camp",
      difficulty: 2,
      distance: 67,
      altitude: 4130,
      recommendedAge: 30,
      requiredCapacity: 5,
      image: "https://cdn1.goibibo.com/voy_ing/t_g/anapurna_base_camp_qfxenmlpoeq9sckjo6lk.jpg",
      description: "A stunning trek leading to the base of Annapurna, offering incredible views of the Annapurna massif and rich cultural experiences."
    },
    {
      id: 23,
      name: "Mardi Himal Trek",
      difficulty: 2,
      distance: 49,
      altitude: 4500,
      recommendedAge: 29,
      requiredCapacity: 5,
      image: "https://i.ytimg.com/vi/iMvgjOhdAl8/sddefault.jpg",
      description: "A lesser-known gem in the Annapurna region, this trek offers stunning views of the Himalayas and a peaceful experience away from crowds."
    },
    {
      id: 24,
      name: "Khopra Ridge Trek",
      difficulty: 2,
      distance: 52,
      altitude: 3660,
      recommendedAge: 31,
      requiredCapacity: 5,
      image: "https://trekthehimalayas.com/images/KhopraRidge/GalleryDesktop/Autumn/d8928a8d-bf56-4890-81fc-db302b3824b7_Khopra-Ridge-6.webp",
      description: "An off-the-beaten-path trek offering spectacular views of the Annapurna range, lush forests, and a chance to see diverse wildlife."
    },
    {
      id: 25,
      name: "Pindari Glacier Trek",
      difficulty: 2,
      distance: 50,
      altitude: 3800,
      recommendedAge: 30,
      requiredCapacity: 5,
      image: "https://trekthehimalayas.com/images/PindariGlacierTrek/GalleryDesktop/Autumn/e6f7c2de-f5c2-46ea-84e2-fbb7c9385a20_Pindari-Glacier-6.webp",
      description: "A breathtaking trek to the Pindari Glacier, known for its stunning mountain scenery and serene environment."
    },{
      id: 26,
      name: "Gaumukh Tapovan",
      difficulty: 3,
      distance: 46,
      altitude: 4463,
      recommendedAge: 33,
      requiredCapacity: 7,
      image: "https://www.shikhar.com/blog/wp-content/uploads/2021/08/Mt-Shiviling-tapovan_shikhar-travels5.jpg",
      description: "A challenging trek to Gaumukh, the source of the Ganges, and Tapovan, surrounded by stunning views of the Shivling peak."
    },
    {
      id: 27,
      name: "Nanda Devi East Base Camp",
      difficulty: 3,
      distance: 110,
      altitude: 4150,
      recommendedAge: 34,
      requiredCapacity: 7,
      image: "https://himalayanclimber.com/wp-content/uploads/2017/12/IMG_9672-720x606.jpg",
      description: "An adventurous trek leading to the base camp of Nanda Devi, offering spectacular views of the surrounding peaks."
    },
    {
      id: 28,
      name: "Kanchendzonga Base Camp",
      difficulty: 3,
      distance: 90,
      altitude: 5143,
      recommendedAge: 36,
      requiredCapacity: 8,
      image: "https://mlupntr8jlvr.i.optimole.com/w:auto/h:auto/q:mauto/f:avif/https://everesttravel.co.nz/wp-content/uploads/2020/07/Ama-n-Pumori-on-bck-Minimised.jpg",
      description: "A challenging trek that takes you to the base camp of Kanchendzonga, the third highest peak in the world, with breathtaking views."
    },
    {
      id: 29,
      name: "Singalila Ridge Trek",
      difficulty: 2,
      distance: 45,
      altitude: 3636,
      recommendedAge: 27,
      requiredCapacity: 5,
      image: "https://www.mountainiq.com/wp-content/uploads/2016/12/sikkim-trekking-2.jpg",
      description: "A scenic trek along the Singalila Ridge, offering stunning views of the Kanchenjunga range and vibrant rhododendron forests."
    },
    {
      id: 30,
      name: "Shivling Base Camp",
      difficulty: 3,
      distance: 55,
      altitude: 4863,
      recommendedAge: 32,
      requiredCapacity: 7,
      image: "https://www.shikhar.com/images/tours/shivling-base-camp-trek-intro.jpg",
      description: "A thrilling trek to the base camp of Shivling, known for its majestic views and challenging terrain."
    },
    {
      id: 31,
      name: "Dzongri-Goecha La Trek",
      difficulty: 3,
      distance: 90,
      altitude: 4940,
      recommendedAge: 35,
      requiredCapacity: 8,
      image: "https://nomadsofindia.com/wp-content/uploads/2023/07/Goechala-Trek.jpg",
      description: "An exhilarating trek that leads to Goecha La, with incredible views of the Kanchenjunga range and beautiful landscapes."
    },
    {
      id: 32,
      name: "Everest Three Passes Trek",
      difficulty: 3,
      distance: 166,
      altitude: 5545,
      recommendedAge: 35,
      requiredCapacity: 8,
      image: "https://z3r7m3t5.rocketcdn.me/wp-content/uploads/2023/06/Three-Passes-Trek-Nepal.webp",
      description: "A demanding trek that crosses three high passes in the Everest region, offering unparalleled views of the Himalayas."
    },
    {
      id: 33,
      name: "Makalu Base Camp",
      difficulty: 3,
      distance: 84,
      altitude: 4870,
      recommendedAge: 32,
      requiredCapacity: 8,
      image: "https://adventuremountaintreks.com/wp-content/uploads/2021/09/Makalu-BC.jpg",
      description: "A remote trek leading to the base camp of Makalu, the fifth highest peak, with stunning landscapes and fewer crowds."
    },
    {
      id: 34,
      name: "Upper Mustang Trek",
      difficulty: 2,
      distance: 85,
      altitude: 3840,
      recommendedAge: 30,
      requiredCapacity: 6,
      image: "https://sunriseadventuretrek.com/admin/images/package/20240202171256file-Upper-mustang-Trek-1024x690.jpg",
      description: "A unique trek through the arid landscapes of Upper Mustang, rich in Tibetan culture and ancient monasteries."
    },
    {
      id: 35,
      name: "Langtang Valley Trek",
      difficulty: 2,
      distance: 70,
      altitude: 3800,
      recommendedAge: 27,
      requiredCapacity: 5,
      image: "https://www.accessibleadventure.com/uploads/2024/08/langtang-valley-1.jpg",
      description: "A beautiful trek in the Langtang region, known for its stunning valley views, rich biodiversity, and welcoming local communities."
    },
    {
      id: 36,
      name: "Poon Hill Trek",
      difficulty: 1,
      distance: 32,
      altitude: 3210,
      recommendedAge: 22,
      requiredCapacity: 3,
      image: "https://cdn.bookatrekking.com/data/images/2019/11/poon-hill-trek-long-read-everything-you-need-to-know.jpg",
      description: "A popular and easy trek that offers breathtaking sunrise views over the Annapurna and Dhaulagiri ranges from Poon Hill."
    },
    {
      id: 37,
      name: "Manaslu Circuit",
      difficulty: 3,
      distance: 177,
      altitude: 5135,
      recommendedAge: 35,
      requiredCapacity: 8,
      image: "https://cdn.bookatrekking.com/data/images/2019/11/manaslu-circuit-trek-all-you-need-to-know1.jpg",
      description: "A stunning trek around Manaslu, the eighth highest peak, offering diverse landscapes and cultural experiences."
    },
    {
      id: 38,
      name: "Nar Phu Valley Trek",
      difficulty: 2,
      distance: 72,
      altitude: 5360,
      recommendedAge: 34,
      requiredCapacity: 6,
      image: "https://whitehilladventure.com/wp-content/uploads/2016/06/Nar-Phu-Ngawal-995x650.jpg",
      description: "An off-the-beaten-path trek through the remote Nar Phu Valley, known for its rugged terrain and unique Tibetan culture."
    },
    {
      id: 39,
      name: "Jomsom Muktinath",
      difficulty: 2,
      distance: 60,
      altitude: 3800,
      recommendedAge: 30,
      requiredCapacity: 5,
      image: "https://www.himalayanfrozen.com/uploads/img/jomsom-muktinath-trek-10-days.jpg",
      description: "A beautiful trek from Jomsom to Muktinath, featuring stunning landscapes and important religious sites."
    },
    {
      id: 40,
      name: "Helambu Trek",
      difficulty: 1,
      distance: 43,
      altitude: 3600,
      recommendedAge: 25,
      requiredCapacity: 3,
      image: "https://media.nepaltrekadventures.com/uploads/img/helambu-banner.webp",
      description: "A relatively easy trek near Kathmandu, known for its beautiful landscapes, charming villages, and rich culture."
    },
    {
      id: 41,
      name: "Tamang Heritage Trail",
      difficulty: 2,
      distance: 50,
      altitude: 3165,
      recommendedAge: 28,
      requiredCapacity: 5,
      image: "https://travellingnepaltips.com/wp-content/uploads/2020/08/tamang-heritage-990x490-770x381.jpeg",
      description: "A cultural trek through the Tamang villages, offering a glimpse into the local lifestyle and stunning views of the Himalayas."
    },
    {
      id: 42,
      name: "Dhaulagiri Circuit",
      difficulty: 3,
      distance: 80,
      altitude: 5360,
      recommendedAge: 35,
      requiredCapacity: 8,
      image: "https://images.squarespace-cdn.com/content/v1/5a95e83d372b96dbac073ec8/1619807717790-V00OAU61EGVO3CO9PG2E/Dhaulagiri.jpg",
      description: "An adventurous circuit around Dhaulagiri, featuring breathtaking landscapes and a chance to experience diverse cultures."
    },
    {
      id: 43,
      name: "Kang Yatse II",
      difficulty: 3,
      distance: 65,
      altitude: 6200,
      recommendedAge: 35,
      requiredCapacity: 9,
      image: "https://aquaterra.in/wp-content/uploads/2020/01/Kang-Yatse-2-Trek-50.jpg",
      description: "A challenging trek to the summit of Kang Yatse II, offering stunning views of the surrounding peaks and valleys."
    },
    {
      id: 44,
      name: "Tso Moriri Trek",
      difficulty: 3,
      distance: 85,
      altitude: 4595,
      recommendedAge: 34,
      requiredCapacity: 7,
      image: "https://www.ju-lehadventure.com/photos/860x574/860x574_tso_moriri_lake_trek.jpg",
      description: "A picturesque trek to Tso Moriri, one of the highest lakes in the world, surrounded by mesmerizing landscapes."
    },
    {
      id: 45,
      name: "Lamayuru to Chilling",
      difficulty: 2,
      distance: 45,
      altitude: 4075,
      recommendedAge: 29,
      requiredCapacity: 5,
      image: "https://mountainintelligence.in/wp-content/uploads/2024/03/Lamayuru-Chilling-Trek-7-600x590.jpg",
      description: "A scenic trek from Lamayuru to Chilling, offering views of unique landscapes and ancient monasteries."
    },
    {
      id: 46,
      name: "Lingshed Trek",
      difficulty: 3,
      distance: 60,
      altitude: 5100,
      recommendedAge: 31,
      requiredCapacity: 6,
      image: "https://himalayantramp.wordpress.com/wp-content/uploads/2015/03/l10.jpg",
      description: "A remote trek to Lingshed, known for its stunning landscapes, ancient monasteries, and Tibetan culture."
    },
    {
      id: 47,
      name: "Phuktal Monastery Trek",
      difficulty: 2,
      distance: 40,
      altitude: 3850,
      recommendedAge: 30,
      requiredCapacity: 4,
      image: "https://live.staticflickr.com/7541/16035160018_d4c1b1c683_b.jpg",
      description: "A unique trek to Phuktal Monastery, built into a cliff, offering breathtaking views and cultural insights."
    },
    {
      id: 48,
      name: "Rumtse to Tso Moriri",
      difficulty: 3,
      distance: 86,
      altitude: 4630,
      recommendedAge: 33,
      requiredCapacity: 7,
      image: "https://media.gettyimages.com/id/478059896/photo/view-from-tsokar.jpg?s=2048x2048&w=gi&k=20&c=w4NwnwnAtGfq1sEVUqKovTg3h4AiS-6xyBL23gfaNTo=",
      description: "A scenic trek from Rumtse to Tso Moriri, traversing high-altitude landscapes and offering spectacular views."
    },
    {
      id: 49,
      name: "Zanskar Valley",
      difficulty: 3,
      distance: 95,
      altitude: 6100,
      recommendedAge: 32,
      requiredCapacity: 9,
      image: "https://beyondwildplaces.com/wp-content/uploads/2021/12/Zanskar-Valley.jpg",
      description: "An adventurous trek through the Zanskar Valley, known for its stunning landscapes and remote charm."
    },
    {
      id: 50,
      name: "Spiti Valley Trek",
      difficulty: 2,
      distance: 55,
      altitude: 4551,
      recommendedAge: 31,
      requiredCapacity: 6,
      image: "https://www.himalayanhikers.in/wp-content/uploads/2019/11/chandratal-trek.jpg",
      description: "A culturally rich trek through the Spiti Valley, offering views of beautiful monasteries and unique landscapes."
    },
    {
      id: 51,
      name: "Singalila Ridge",
      difficulty: 2,
      distance: 50,
      altitude: 3700,
      recommendedAge: 32,
      requiredCapacity: 5,
      image: "https://www.mountainiq.com/wp-content/uploads/2016/12/sikkim-trekking-2.jpg",
      description: "A scenic trek along the Singalila Ridge, offering stunning views of the Kanchenjunga range and vibrant rhododendron forests."
    },
    {
      id: 52,
      name: "Everest Panorama",
      difficulty: 2,
      distance: 50,
      altitude: 3600,
      recommendedAge: 31,
      requiredCapacity: 5,
      image: "https://www.aghtrekking.com/picture/everest-view.jpg",
      description: "A relatively easy trek offering panoramic views of the Everest region, perfect for first-time trekkers."
    },
    {
      id: 53,
      name: "Arun Valley",
      difficulty: 2,
      distance: 70,
      altitude: 3200,
      recommendedAge: 30,
      requiredCapacity: 5,
      image: "https://media.nepalmotherhousetreks.com/uploads/fullbanner/arun-valley-treks.webp",
      description: "A beautiful trek through Arun Valley, known for its rich biodiversity, lush forests, and local villages."
    },
    {
      id: 54,
      name: "Mera Peak",
      difficulty: 3,
      distance: 40,
      altitude: 6476,
      recommendedAge: 35,
      requiredCapacity: 9,
      image: "https://miro.medium.com/v2/resize:fit:1024/1*m7oph5hwqk8XKdiGgY__Qw.jpeg",
      description: "A challenging trek to Mera Peak, offering stunning views of the Himalayas and a rewarding experience for climbers."
    },
    {
      id: 55,
      name: "Dingboche Trek",
      difficulty: 2,
      distance: 60,
      altitude: 4410,
      recommendedAge: 30,
      requiredCapacity: 5,
      image: "https://triptins.com/wp-content/uploads/2020/05/Tengboche-to-Dingboche-Trekking.jpeg",
      description: "A scenic trek from Tengboche to Dingboche, offering beautiful views of the surrounding mountains and valleys."
    },
    {
      id: 56,
      name: "Lobuche East Trek",
      difficulty: 3,
      distance: 45,
      altitude: 6119,
      recommendedAge: 33,
      requiredCapacity: 8,
      image: "https://media.protrekadventure.com/2021/12/Lobuche-East-Peak-Climbing-1.webp",
      description: "A challenging trek to Lobuche East, offering breathtaking views of the Himalayas and the opportunity to climb to a peak."
    },
    {
      id: 57,
      name: "Saribung Pass Trek",
      difficulty: 3,
      distance: 75,
      altitude: 6020,
      recommendedAge: 35,
      requiredCapacity: 9,
      image: "https://media.a1excursion.com/uploads/fullbanner/saribung-pass-trek.webp",
      description: "An adventurous trek across Saribung Pass, known for its stunning mountain vistas and cultural richness."
    },
    {
      id: 58,
      name: "Upper Dolpo",
      difficulty: 3,
      distance: 95,
      altitude: 5300,
      recommendedAge: 34,
      requiredCapacity: 8,
      image: "https://sunriseadventuretrek.com/admin/images/package/20230505141815image-upper-dolpo-trek.webp",
      description: "A remote trek in Upper Dolpo, famous for its dramatic landscapes and traditional Tibetan culture."
    },
    {
      id: 59,
      name: "Kailash Mansarovar",
      difficulty: 3,
      distance: 100,
      altitude: 5610,
      recommendedAge: 40,
      requiredCapacity: 8,
      image: "https://www.nepalecotrekking.com/public/uploads/upper%20Dolpo%20trek-1.jpg",
      description: "A sacred pilgrimage trek to Kailash Mansarovar, renowned for its spiritual significance and breathtaking views."
    },
    {
      id: 60,
      name: "Sunderdhunga Glacier Trek",
      difficulty: 3,
      distance: 54,
      altitude: 4320,
      recommendedAge: 36,
      requiredCapacity: 7,
      image: "https://www.nomadadventures.co.in/wp-content/uploads/2024/06/Sunderdhunga-_1.jpg",
      description: "A scenic trek to Sunderdhunga Glacier, offering stunning views of the surrounding mountains and glaciers."
    },
    {
      id: 61,
      name: "Thorong La Pass",
      difficulty: 3,
      distance: 55,
      altitude: 5416,
      recommendedAge: 33,
      requiredCapacity: 7,
      image: "https://images.squarespace-cdn.com/content/v1/5a87961cbe42d637c54cab93/1609405863419-RQ29K2KAG4MZDKITVOP1/crossing-thorong-la-pass-annapurna-circuit-trek.jpg",
      description: "One of the highest trekking passes in the world, offering breathtaking views of the Annapurna range."
    },
    {
      id: 62,
      name: "Chembra Peak",
      difficulty: 1,
      distance: 12,
      altitude: 2100,
      recommendedAge: 25,
      requiredCapacity: 4,
      image: "https://wayanadtourism.co.in/images//tourist-places/chembra-peak-wayanad/chembra-peak-wayanad-tourism-opening-time-closing.jpg",
      description: "An easy trek to Chembra Peak, known for its heart-shaped lake and scenic views."
    },
    {
      id: 63,
      name: "Nubra Valley",
      difficulty: 2,
      distance: 65,
      altitude: 3400,
      recommendedAge: 30,
      requiredCapacity: 6,
      image: "https://hikerwolf.com/wp-content/uploads/2020/03/Thumbnail-Nubra-Valley-Things-to-do-in-Nubra-Valley-13.jpg.webp",
      description: "A stunning trek through Nubra Valley, famous for its unique landscapes and cultural experiences."
    },
    {
      id: 64,
      name: "Chele La Pass",
      difficulty: 2,
      distance: 25,
      altitude: 3988,
      recommendedAge: 28,
      requiredCapacity: 5,
      image: "https://static7.drukasia.com/images/media/DrukAsia_102417_Chelelaparo.jpg",
      description: "A scenic trek across Chele La Pass, offering stunning views of the Himalayas and beautiful rhododendron forests."
    },
    {
      id: 65,
      name: "Phalut Trek",
      difficulty: 2,
      distance: 48,
      altitude: 3600,
      recommendedAge: 32,
      requiredCapacity: 5,
      image: "https://desinomadz.com/home/wp-content/uploads/2022/05/sandakphu-phalut-trek-kalipokhri-to-sandakphu-indiahikes-1_1507734138m-870x555-1.jpg",
      description: "A beautiful trek to Phalut, offering breathtaking views of the Kanchenjunga range."
    },
    {
      id: 66,
      name: "Malana Trek",
      difficulty: 2,
      distance: 15,
      altitude: 2652,
      recommendedAge: 24,
      requiredCapacity: 4,
      image: "https://www.zingbus.com/blog/wp-content/uploads/2023/12/Malana-Village-trek.jpg",
      description: "A short trek to the quaint village of Malana, known for its unique culture and stunning scenery."
    },
    {
      id: 67,
      name: "Triund Trek",
      difficulty: 1,
      distance: 12,
      altitude: 2850,
      recommendedAge: 22,
      requiredCapacity: 3,
      image: "https://www.treksandtrails.org/blog/wp-content/uploads/2020/05/triund-trek.jpg",
      description: "A popular beginner trek to Triund, offering stunning views of the Dhauladhar range."
    },
    {
      id: 68,
      name: "Bara Bhangal Trek",
      difficulty: 3,
      distance: 63,
      altitude: 4580,
      recommendedAge: 34,
      requiredCapacity: 7,
      image: "https://billingadventure.com/wp-content/uploads/Inside-View-of-Bara-Bhangal-Village.jpg",
      description: "An adventurous trek through the remote Bara Bhangal region, known for its natural beauty and cultural heritage."
    },
    {
      id: 69,
      name: "Great Himalayan National Park",
      difficulty: 2,
      distance: 70,
      altitude: 3200,
      recommendedAge: 29,
      requiredCapacity: 5,
      image: "https://whc.unesco.org/uploads/thumbs/site_1406_0008-750-750-20231018172652.jpg",
      description: "A trek through the Great Himalayan National Park, recognized for its diverse flora and fauna."
    },
    {
      id: 70,
      name: "Sach Pass Trek",
      difficulty: 3,
      distance: 82,
      altitude: 4414,
      recommendedAge: 36,
      requiredCapacity: 8,
      image: "https://www.himalayanhikers.in/wp-content/uploads/2019/11/Sach_pass-trek-in-himachal.jpg",
      description: "A thrilling trek across Sach Pass, known for its dramatic landscapes and adventure."
    },
    // Continue until you have all 100 real treks
    {
      id: 100,
      name: "Kaliheni Pass",
      difficulty: 3,
      distance: 60,
      altitude: 4730,
      recommendedAge: 35,
      requiredCapacity: 8,
      image: "https://www.tourmyindia.com/treks/wp-content/uploads/2020/08/kalihani-pass-trek7.jpg",
      description: "A challenging trek over Kaliheni Pass, offering stunning mountain vistas and an adventurous experience."
    }
];

// Recommendation system based on user input
function recommendTrek(age, runningCapacity) {
    const recommendations = treks.map(trek => {
        const ageMatch = Math.abs(trek.recommendedAge - age);  // The closer the age to recommended, the better
        const capacityMatch = Math.abs(trek.requiredCapacity - runningCapacity);  // Same for running capacity

        const score = 1 / (ageMatch + 1) + 1 / (capacityMatch + 1);  // Higher score means better match
        // difficulty: 3, distance: 10, altitude: 1500
        return {
            id : trek.id,
            difficulty : trek.difficulty,
            distance : trek.distance,
            altitude : trek.altitude,
            name: trek.name,
            description: trek.description,
            image: trek.image,
            score: score
        };
    });

    // Sort by score and recommend the top 3 treks
    recommendations.sort((a, b) => b.score - a.score);
    return recommendations.slice(0, 3);  // Top 3 recommendations
}

app.post('/gettreks', (req, res) => {
    const input = req.body;
    console.log(input);
    const recommendedTreks = recommendTrek(input.age, input.running_capacity);
    res.send(JSON.stringify(recommendedTreks));
});
app.post('/similartreks', (req, res) => {
    const input = req.body;
    console.log(input);
    const similarTreks = findSimilarTreks(input, treks)
    res.send(JSON.stringify(similarTreks));
});
function calculateDistance(trek1, trek2) {
    return Math.sqrt(
      Math.pow(trek1.difficulty - trek2.difficulty, 2) +
      Math.pow(trek1.distance - trek2.distance, 2) +
      Math.pow(trek1.altitude - trek2.altitude, 2)
    );
  }
  
  // Function to find similar treks
  function findSimilarTreks(trek, trekDataset, count = 3) {
    const similarities = trekDataset.map(otherTrek => {
      return {
        trek: otherTrek,
        distance: calculateDistance(trek, otherTrek),
      };
    });
  
    // Sort by distance (smallest distance = most similar)
    similarities.sort((a, b) => a.distance - b.distance);
  
    // Return the top 'count' similar treks (excluding the trek itself)
    return similarities
      .filter(similarity => similarity.trek.id !== trek.id)
      .slice(0, count)
      .map(similarity => similarity.trek);
  }
  

  // Example trek to find similar treks to
//   const exampleTrek = { id: 1, difficulty: 3, distance: 10, altitude: 1500 };
  
  // Find 3 similar treks
  const similarTreks = findSimilarTreks(exampleTrek, treks);
  console.log(similarTreks);
app.listen(3000, () => console.log('App is listening on port 3000.'));
