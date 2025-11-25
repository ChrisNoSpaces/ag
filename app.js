// App State
let currentUser = null;
let map = null;
let markers = [];
let locations = [];
let zones = [];
let numZones = 8;
let maxPerZone = 30;
let editingLocationId = null;

const ZONE_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
  '#8B5CF6', '#EC4899', '#14B8A6', '#F97316',
  '#06B6D4', '#84CC16', '#6366F1', '#A855F7'
];

const CHRIS_ADDRESSES = [
  {business_name:"Capital Flooring Inc",address:"46969 West Rd, Wixom, MI 48393",lat:42.5257,lng:-83.5361},
  {business_name:"Leslie McGwire & Associates",address:"4301 Orchard Lake Rd, West Bloomfield Township, MI 48323",lat:42.5454,lng:-83.3668},
  {business_name:"Gumma Group",address:"7419 Middlebelt Rd # 4, West Bloomfield Township, MI 48322",lat:42.5429,lng:-83.2932},
  {business_name:"DKI Demolition",address:"6775 Daly Rd Suite#101, West Bloomfield Township, MI 48322",lat:42.5561,lng:-83.3089},
  {business_name:"Independence Commercial Construction, Inc.",address:"2635 Dixie Hwy, Waterford Township, MI 48328",lat:42.6365,lng:-83.3877},
  {business_name:"Wolverine Stone Co",address:"27270 Gloede Dr, Warren, MI 48088",lat:42.4628,lng:-83.0247},
  {business_name:"Wakely Associates",address:"30500 Van Dyke Ave, Warren, MI 48093",lat:42.4902,lng:-83.0236},
  {business_name:"Villa Carpets, Inc",address:"30000 Ryan Rd, Warren, MI 48092",lat:42.4842,lng:-83.0198},
  {business_name:"Son Shine Floor Covering",address:"31065 Ryan Rd, Warren, MI 48092",lat:42.4960,lng:-83.0198},
  {business_name:"Ross & Barr Inc",address:"11800 E 9 Mile Rd, Warren, MI 48089",lat:42.4759,lng:-82.9845},
  {business_name:"Motor City Carpet & Flooring",address:"23957 Ryan Rd, Warren, MI 48091",lat:42.4180,lng:-83.0198},
  {business_name:"MGC Granite & Design",address:"14230 E 11 Mile Rd, Warren, MI 48089",lat:42.4982,lng:-82.9776},
  {business_name:"Dapco Central Operations Office",address:"11020 E 9 Mile Rd, Warren, MI 48089",lat:42.4759,lng:-82.9932},
  {business_name:"Creative Building & Remodeling",address:"26820 Dequindre Rd, Warren, MI 48091",lat:42.4534,lng:-83.0476},
  {business_name:"Brencal Contractors Inc",address:"26079 Schoenherr Rd, Warren, MI 48089",lat:42.4466,lng:-82.9876},
  {business_name:"Stonescape Supply",address:"4454 22 Mile Rd, Shelby Township, MI 48317",lat:42.6539,lng:-83.0298},
  {business_name:"Beninati Custom Pools, Swim Spas and Hot Tubs",address:"6991 Auburn Rd, Utica, MI 48317",lat:42.6276,lng:-83.0523},
  {business_name:"Zac Cruse Construction Company",address:"4150 Lincoln St, Detroit, MI 48208",lat:42.3523,lng:-83.1032},
  {business_name:"Your Choice Flooring Inc",address:"1409 Allen Dr # E, Troy, MI 48083",lat:42.5456,lng:-83.1432},
  {business_name:"Ruth Casper Design Studio",address:"1700 Stutz Dr # 102E, Troy, MI 48084",lat:42.5612,lng:-83.1523},
  {business_name:"Quality Tile",address:"3331 Gerald Ave, Rochester Hills, MI 48307",lat:42.6589,lng:-83.1298},
  {business_name:"PMP Marble & Granite",address:"1360 E Big Beaver Rd, Troy, MI 48083",lat:42.5612,lng:-83.1298},
  {business_name:"Peter Basso Associates Inc",address:"5145 Livernois Rd #100, Troy, MI 48098",lat:42.5845,lng:-83.2087},
  {business_name:"Office Express",address:"1280 E Big Beaver Rd, Troy, MI 48083",lat:42.5612,lng:-83.1312},
  {business_name:"National Business Supply",address:"2595 Bellingham Rd, Troy, MI 48083",lat:42.5523,lng:-83.1467},
  {business_name:"Mondrian Properties LLC.",address:"2113 Kohli Dr, Troy, MI 48083",lat:42.5389,lng:-83.1498},
  {business_name:"M & N General Contracting LLC",address:"972 Rankin St, Troy, MI 48083",lat:42.5423,lng:-83.1576},
  {business_name:"Michigan Multi-King Inc",address:"4897 Rochester Rd, Troy, MI 48085",lat:42.5789,lng:-83.1087},
  {business_name:"Joseph Philip Craig Inc",address:"2025 W Long Lake Rd, Troy, MI 48098",lat:42.5534,lng:-83.1823},
  {business_name:"Integrated Design Solutions",address:"1441 W Long Lake Rd #200, Troy, MI 48098",lat:42.5534,lng:-83.1734},
  {business_name:"Gold Star Commercial, INC",address:"264 Executive Dr, Troy, MI 48083",lat:42.5545,lng:-83.1489},
  {business_name:"Gio-Con",address:"2145 Crooks Rd #210, Troy, MI 48084",lat:42.5678,lng:-83.1534},
  {business_name:"Gillete Brothers Pool & Spa",address:"392 Oliver, Troy, MI 48084",lat:42.5623,lng:-83.1645},
  {business_name:"Fairview Construction",address:"1700 W Big Beaver Rd #120, Troy, MI 48084",lat:42.5612,lng:-83.1745},
  {business_name:"Excel Floors, Inc",address:"1715 Larchwood Ave, Troy, MI 48083",lat:42.5534,lng:-83.1423},
  {business_name:"Ehresman Architects",address:"801 W Big Beaver Rd #250, Troy, MI 48084",lat:42.5612,lng:-83.1623},
  {business_name:"Cutting Edge Stonecraft, Inc.",address:"24420 Indoplex Cir, Farmington Hills, MI 48335",lat:42.4876,lng:-83.3767},
  {business_name:"Continental Interiors Inc",address:"1210 E Maple Rd, Troy, MI 48083",lat:42.5445,lng:-83.1312},
  {business_name:"BEI Architects",address:"1333 Rochester Rd, Troy, MI 48083",lat:42.5467,lng:-83.1198},
  {business_name:"Eldorado Tile & Marble",address:"6506 Cotter Ave, Sterling Heights, MI 48314",lat:42.6123,lng:-83.0265},
  {business_name:"Stone Warehouse USA - Michigan",address:"7235 19 Mile Rd, Sterling Heights, MI 48314",lat:42.6012,lng:-83.0187},
  {business_name:"PMS Brick Pavers We're The Guys",address:"5540 Bridgewood Dr, Sterling Heights, MI 48310",lat:42.5823,lng:-83.0654},
  {business_name:"Majestic Home Solutions LLC",address:"42886 Mound Rd, Sterling Heights, MI 48314",lat:42.6189,lng:-83.0087},
  {business_name:"Floorz Supplies Plus INC",address:"34832 Mound Rd, Sterling Heights, MI 48310",lat:42.5467,lng:-83.0087},
  {business_name:"Floor 4 Life",address:"34800 Mound Rd, Sterling Heights, MI 48310",lat:42.5465,lng:-83.0087},
  {business_name:"Eastside Tile And Marble",address:"42700 Mound Rd, Sterling Heights, MI 48314",lat:42.6178,lng:-83.0087},
  {business_name:"Great Lakes Tile & Contracting",address:"42730 Mound Rd, Sterling Heights, MI 48314",lat:42.6181,lng:-83.0087},
  {business_name:"DAS Architects",address:"7341 Triangle Dr, Sterling Heights, MI 48314",lat:42.6045,lng:-83.0298},
  {business_name:"The Cabinet Shoppe",address:"32303 Harper Ave, St Clair Shores, MI 48082",lat:42.5234,lng:-82.9087},
  {business_name:"Woodmaster Kitchens of Michigan",address:"24420 Harper Ave, St Clair Shores, MI 48080",lat:42.4345,lng:-82.9087},
  {business_name:"Red Baron Enterprises",address:"20315 E 9 Mile Rd, St Clair Shores, MI 48080",lat:42.4759,lng:-82.8976},
  {business_name:"Rabaut's Interiors",address:"19513 Mack Ave, Grosse Pointe Woods, MI 48236",lat:42.4412,lng:-82.9123},
  {business_name:"North American Construction Enterprises, LLC",address:"22920 E Industrial Dr, St Clair Shores, MI 48080",lat:42.4567,lng:-82.8865},
  {business_name:"Arkay-Walker Paint and Interior Design",address:"27110 Harper Ave, St Clair Shores, MI 48081",lat:42.4645,lng:-82.9087},
  {business_name:"ZeinaDesigns",address:"29145 Telegraph Rd, Southfield, MI 48034",lat:42.4978,lng:-83.2789},
  {business_name:"Lockwood Companies",address:"27777 Franklin Rd #1410, Southfield, MI 48034",lat:42.4823,lng:-83.2654},
  {business_name:"Land Design Studio",address:"18161 13 Mile Rd # B4, Southfield, MI 48076",lat:42.5089,lng:-83.2134},
  {business_name:"GREENWORKS Studio",address:"28411 Northwestern Hwy #320, Southfield, MI 48034",lat:42.4889,lng:-83.2567},
  {business_name:"Tableau",address:"50215 Schoenherr Rd, Shelby Township, MI 48315",lat:42.6523,lng:-82.9876},
  {business_name:"Szczesny Floor Covering",address:"14240 Industrial Center Dr, Shelby Township, MI 48315",lat:42.6134,lng:-82.9987},
  {business_name:"Shelby Floor and Tile",address:"46511 Van Dyke Ave, Shelby Township, MI 48317",lat:42.6412,lng:-83.0236},
  {business_name:"J M P Design & Build Inc.",address:"51456 Oro Rd, Shelby Township, MI 48315",lat:42.6645,lng:-82.9765},
  {business_name:"Bobak Construction LLC",address:"54441 Arrowhead Dr, Shelby Township, MI 48315",lat:42.6878,lng:-82.9654},
  {business_name:"Frank Salamone",address:"48701 Hayes Rd, Shelby Township, MI 48315",lat:42.6489,lng:-82.9654},
  {business_name:"Anderson, Eckstein & Westrick, Inc.",address:"51301 Schoenherr Rd, Shelby Township, MI 48315",lat:42.6634,lng:-82.9876},
  {business_name:"Nu-Way Kitchen & Bath",address:"5227 Auburn Rd, Shelby Township, MI 48317",lat:42.6123,lng:-83.0523},
  {business_name:"Xstyles bath+more",address:"4812 Delemere Ave, Royal Oak, MI 48076",lat:42.5234,lng:-83.1654},
  {business_name:"Wightman - Royal Oak",address:"306 S Washington Ave Suite 200, Royal Oak, MI 48067",lat:42.4889,lng:-83.1445},
  {business_name:"Whiski Kitchen Design Studio",address:"1201 N Main St, Royal Oak, MI 48067",lat:42.5012,lng:-83.1445},
  {business_name:"Von Staden Architects",address:"504 S Washington Ave, Royal Oak, MI 48067",lat:42.4867,lng:-83.1445},
  {business_name:"TVI Inc.",address:"28966 Woodward Ave, Royal Oak, MI 48067",lat:42.4978,lng:-83.1489},
  {business_name:"Space Care Interiors",address:"210 W 6th St, Royal Oak, MI 48067",lat:42.4823,lng:-83.1467},
  {business_name:"Shelter Design Studio",address:"104 W 4th St #303, Royal Oak, MI 48067",lat:42.4845,lng:-83.1456},
  {business_name:"Richard Ross Designs",address:"2051 Villa Rd #104, Birmingham, MI 48009",lat:42.5456,lng:-83.2123},
  {business_name:"R J Laney Design",address:"4535 Fernlee Ave, Royal Oak, MI 48073",lat:42.5134,lng:-83.1567},
  {business_name:"PARTNR HAUS Commercial Interiors",address:"2120 E 11 Mile Rd, Royal Oak, MI 48067",lat:42.4982,lng:-83.1234},
  {business_name:"Mosher Dolan",address:"2725 Nakota Rd, Royal Oak, MI 48073",lat:42.5089,lng:-83.1489},
  {business_name:"Moiseev-Gordon & Associates Inc",address:"4351 Delemere Ct, Royal Oak, MI 48073",lat:42.5167,lng:-83.1654},
  {business_name:"Live Well Custom Homes",address:"626 E 4th St, Royal Oak, MI 48067",lat:42.4845,lng:-83.1389},
  {business_name:"Krieger Klatt Architects",address:"400 E Lincoln Ave, Royal Oak, MI 48067",lat:42.4912,lng:-83.1389},
  {business_name:"Jeff Dawkins . Architect",address:"2565 W Maple Rd #101, Troy, MI 48084",lat:42.5445,lng:-83.1867},
  {business_name:"italmoda Modern Furniture",address:"950 W Maple Rd, Troy, MI 48084",lat:42.5445,lng:-83.1645},
  {business_name:"ISCG - Haworth Dealer",address:"612 N Main St, Royal Oak, MI 48067",lat:42.4934,lng:-83.1445},
  {business_name:"GMB",address:"1041 S Main St #200, Royal Oak, MI 48067",lat:42.4823,lng:-83.1445},
  {business_name:"G H Forbes Associates",address:"816 E 4th St, Royal Oak, MI 48067",lat:42.4845,lng:-83.1367},
  {business_name:"Executive Kitchens, Inc",address:"32314 Woodward Ave, Royal Oak, MI 48073",lat:42.5267,lng:-83.1489},
  {business_name:"Detroit Build, Inc.",address:"1201 N Main St, Royal Oak, MI 48067",lat:42.5012,lng:-83.1445},
  {business_name:"D MET studio architecture and design",address:"832 W 11 Mile Rd, Royal Oak, MI 48067",lat:42.4982,lng:-83.1523},
  {business_name:"Comprehensive Design Group",address:"628 E Parent Ave #103, Royal Oak, MI 48067",lat:42.4889,lng:-83.1378},
  {business_name:"Building Detail",address:"1600 Rochester Rd, Royal Oak, MI 48067",lat:42.4956,lng:-83.1198},
  {business_name:"Bourlier's Barbecue and Fireplace Inc.",address:"32128 Woodward Ave, Royal Oak, MI 48073",lat:42.5245,lng:-83.1489},
  {business_name:"Art-Harrison Interior Design",address:"4339 Delemere Blvd, Royal Oak, MI 48073",lat:42.5156,lng:-83.1654},
  {business_name:"Anderson-Miller",address:"123 S Main St #230, Royal Oak, MI 48067",lat:42.4878,lng:-83.1445},
  {business_name:"Shores Tile Co",address:"29975 Little Mack Ave, Roseville, MI 48066",lat:42.4967,lng:-82.9265},
  {business_name:"Shock Brothers Floor Covering",address:"20320 Cornillie Dr, Roseville, MI 48066",lat:42.4534,lng:-82.9456},
  {business_name:"Serra-Marko & Associates",address:"1055 E South Blvd, Rochester Hills, MI 48307",lat:42.6545,lng:-83.1234},
  {business_name:"Perfect Floors",address:"1015 John R Rd, Rochester Hills, MI 48307",lat:42.6523,lng:-83.1345},
  {business_name:"Bolyard Lumber & Design",address:"3770 S Rochester Rd, Rochester Hills, MI 48307",lat:42.6234,lng:-83.1198},
  {business_name:"Mercury Project",address:"1806 Rochester Industrial Dr #200, Rochester Hills, MI 48309",lat:42.6712,lng:-83.1567},
  {business_name:"Luxury Tile & Marble Co",address:"3675 W Auburn Rd, Rochester Hills, MI 48309",lat:42.6678,lng:-83.1745},
  {business_name:"L+A Architects",address:"441 S Livernois Rd #265, Rochester Hills, MI 48307",lat:42.6489,lng:-83.1234},
  {business_name:"EEI Global",address:"1601 W Hamlin Rd, Rochester Hills, MI 48309",lat:42.6823,lng:-83.1823},
  {business_name:"Design by Choice LLC",address:"1700 Stutz Dr #104A, Troy, MI 48084",lat:42.5612,lng:-83.1523},
  {business_name:"D'Anna Associates",address:"1055 E South Blvd #200, Rochester Hills, MI 48307",lat:42.6545,lng:-83.1234},
  {business_name:"Spire Design Group",address:"115 E 4th St, Rochester, MI 48307",lat:42.6801,lng:-83.1334},
  {business_name:"Niagara Murano LLC",address:"2215 Cole St, Birmingham, MI 48009",lat:42.5489,lng:-83.2145},
  {business_name:"LoChirco Custom Homes",address:"202 Walnut Blvd Suite B, Rochester, MI 48307",lat:42.6812,lng:-83.1345},
  {business_name:"Kendal & Company",address:"1429 N Rochester Rd, Rochester Hills, MI 48307",lat:42.6623,lng:-83.1198},
  {business_name:"French Associates",address:"236 Mill St, Rochester, MI 48307",lat:42.6789,lng:-83.1356},
  {business_name:"DMJ Interiors",address:"312 East St, Rochester, MI 48307",lat:42.6798,lng:-83.1378},
  {business_name:"Dillman & Upton",address:"607 Woodward Ave, Rochester, MI 48307",lat:42.6823,lng:-83.1367},
  {business_name:"Auger Klein Aller Architects",address:"303 E 3rd St #100, Rochester, MI 48307",lat:42.6789,lng:-83.1323},
  {business_name:"TDG Architects",address:"79 Oakland Ave, Pontiac, MI 48342",lat:42.6389,lng:-83.2901},
  {business_name:"Studio 5",address:"40 W Howard St, Pontiac, MI 48342",lat:42.6378,lng:-83.2912},
  {business_name:"Heller & Associates",address:"7 S Perry St, Pontiac, MI 48342",lat:42.6367,lng:-83.2889},
  {business_name:"Sage Home Décor",address:"795 S Lapeer Rd, Oxford, MI 48371",lat:42.8167,lng:-83.2645},
  {business_name:"All American Floors",address:"1772 S Ortonville Rd, Ortonville, MI 48462",lat:42.8412,lng:-83.4456},
  {business_name:"PCI-Dailey Company",address:"21717 Republic Ave, Oak Park, MI 48237",lat:42.4623,lng:-83.1823},
  {business_name:"Alexandria Interiors LLC",address:"43155 Main St, Novi, MI 48375",lat:42.4789,lng:-83.4756},
  {business_name:"Vistal Homes",address:"46870 W Seven Mile Rd, Northville, MI 48167",lat:42.4178,lng:-83.5089},
  {business_name:"Martone Design Studio",address:"120 W Main St, Northville, MI 48167",lat:42.4312,lng:-83.4834},
  {business_name:"GTR Companies LLC",address:"65 Macomb Pl, Mt Clemens, MI 48043",lat:42.5978,lng:-82.8789},
  {business_name:"Partners in Architecture, PLC",address:"65 Market St #200, Mt Clemens, MI 48043",lat:42.5967,lng:-82.8801},
  {business_name:"Blackstock Alessandri Associates Llc",address:"70 Macomb Pl Suite 220, Mt Clemens, MI 48043",lat:42.5978,lng:-82.8789},
  {business_name:"Innovative Corporation Int",address:"32384 Edward Ave, Madison Heights, MI 48071",lat:42.5156,lng:-83.1089},
  {business_name:"Silva Custom Design LLC",address:"515 E 10 Mile Rd, Madison Heights, MI 48071",lat:42.5089,lng:-83.0989},
  {business_name:"NCS Construction Services LLC",address:"876 Horace Brown Dr, Madison Heights, MI 48071",lat:42.5034,lng:-83.1067},
  {business_name:"Namou Hotel Group",address:"31100 Stephenson Hwy, Madison Heights, MI 48071",lat:42.5023,lng:-83.1156},
  {business_name:"Kitchen & Bath By Rite-Way",address:"32090 John R Rd, Madison Heights, MI 48071",lat:42.5145,lng:-83.1345},
  {business_name:"Design Fabrications (DFab)",address:"1100 E Mandoline Ave suite a, Madison Heights, MI 48071",lat:42.5067,lng:-83.0945},
  {business_name:"Heritage Oaks",address:"51194 Romeo Plank Rd #453, Macomb, MI 48042",lat:42.6745,lng:-82.9345},
  {business_name:"Quicken Stones LLC",address:"44884 Heydenreich Rd, Clinton Township, MI 48038",lat:42.6234,lng:-82.9456},
  {business_name:"Musante Tile",address:"48895 Fairchild Rd, Macomb, MI 48042",lat:42.6567,lng:-82.9234},
  {business_name:"Hubert Contracting LLC",address:"51410 Milano Dr, Macomb, MI 48042",lat:42.6789,lng:-82.9156},
  {business_name:"Cwc Finished Basements",address:"23035 Angel Park Dr, Macomb, MI 48042",lat:42.5823,lng:-82.9567},
  {business_name:"Blue Mountain Construction Group",address:"20371 Hall Rd, Macomb, MI 48044",lat:42.5956,lng:-82.8734},
  {business_name:"SAA Architects",address:"214 S Broadway St, Lake Orion, MI 48362",lat:42.7834,lng:-83.2401},
  {business_name:"AV Design Kitchen + Bath",address:"169w Clarkston Rd Suite 100, Orion Township, MI 48362",lat:42.7645,lng:-83.2567},
  {business_name:"Stellar Building and Development",address:"24410 John R Rd, Hazel Park, MI 48030",lat:42.4456,lng:-83.1345},
  {business_name:"Designstruct Inc.",address:"23617 John R Rd, Hazel Park, MI 48030",lat:42.4367,lng:-83.1345},
  {business_name:"Continental Contracting Co., LLC",address:"23450 Telegraph Rd, Southfield, MI 48033",lat:42.4334,lng:-83.2789},
  {business_name:"Omega Floors",address:"35370 Union Lake Rd, Harrison Township, MI 48045",lat:42.5634,lng:-82.8123},
  {business_name:"American Community Developers",address:"20250 Harper Ave, Harper Woods, MI 48225",lat:42.4289,lng:-82.9234},
  {business_name:"Steven C Flum Inc",address:"3105 Holbrook, Hamtramck, MI 48212",lat:42.3989,lng:-83.0534},
  {business_name:"Nitsas Interiors",address:"20445 Mack Ave, Grosse Pointe Woods, MI 48236",lat:42.4456,lng:-82.9034},
  {business_name:"Ann-Marie Anton",address:"1835 Fleetwood Dr, Grosse Pointe Woods, MI 48236",lat:42.4534,lng:-82.8967},
  {business_name:"Decor and More Design Studio",address:"319 Fisher Rd, Grosse Pointe, MI 48230",lat:42.4234,lng:-82.9123},
  {business_name:"Diane Woolsey Interiors LLC",address:"86 Kercheval Ave, Grosse Pointe Farms, MI 48236",lat:42.4345,lng:-82.8989},
  {business_name:"Russo Bennett Associates",address:"34517 Utica Rd, Fraser, MI 48026",lat:42.5456,lng:-82.9567},
  {business_name:"Rapid Recovery Service",address:"18377 E 14 Mile Rd, Fraser, MI 48026",lat:42.5523,lng:-82.9234},
  {business_name:"32205 Groesbeck Hwy",address:"32205 Groesbeck Hwy, Fraser, MI 48026",lat:42.5267,lng:-82.9456},
  {business_name:"CONSTRUCTEAM",address:"31780 Groesbeck Hwy, Fraser, MI 48026",lat:42.5234,lng:-82.9456},
  {business_name:"Zoyes Creative - Ferndale",address:"1280 Hilton Rd, Ferndale, MI 48220",lat:42.4612,lng:-83.1234},
  {business_name:"Zoyes Creative - Brand Studio",address:"2111 Woodward Ave Suite 400, Detroit, MI 48201",lat:42.3389,lng:-83.0567},
  {business_name:"United Building Service Co",address:"2870 Hilton Rd, Ferndale, MI 48220",lat:42.4689,lng:-83.1234},
  {business_name:"Towers Interior Group",address:"31500 Northwestern Hwy, Farmington Hills, MI 48334",lat:42.5089,lng:-83.3234},
  {business_name:"Northern Equities Group",address:"39000 Country Club Dr, Farmington Hills, MI 48331",lat:42.5456,lng:-83.3567},
  {business_name:"MFG Interiors",address:"39255 Country Club Dr, Farmington Hills, MI 48331",lat:42.5467,lng:-83.3567},
  {business_name:"Interior Image",address:"37680 Hills Tech Dr, Farmington Hills, MI 48331",lat:42.5345,lng:-83.3489},
  {business_name:"Waldorf Floors LLC",address:"24798 Crestview, Farmington Hills, MI 48335",lat:42.4878,lng:-83.3723},
  {business_name:"Empire Tile & Marble Co.",address:"17255 Stephens Rd, Eastpointe, MI 48021",lat:42.4645,lng:-82.9567},
  {business_name:"Sterling Group",address:"Fort Washington Plaza, 333 W Fort St #1350, Detroit, MI 48226",lat:42.3278,lng:-83.0523},
  {business_name:"Scales & Associates Inc",address:"28 W Adams Ave # 1100, Detroit, MI 48226",lat:42.3289,lng:-83.0478},
  {business_name:"RVSN Studios",address:"300 Riverfront Dr, Detroit, MI 48226",lat:42.3267,lng:-83.0412},
  {business_name:"Resendes Design Group",address:"7451 3rd Ave, Detroit, MI 48202",lat:42.3789,lng:-83.0689},
  {business_name:"Redbird Detroit",address:"4474 3rd Ave, Detroit, MI 48201",lat:42.3456,lng:-83.0689},
  {business_name:"Populous",address:"19 Clifford St Suite 08-101, Detroit, MI 48226",lat:42.3312,lng:-83.0445},
  {business_name:"Pophouse",address:"1150 Griswold St, Detroit, MI 48226",lat:42.3323,lng:-83.0467},
  {business_name:"NXT Design",address:"1420 Washington Blvd #301, Detroit, MI 48226",lat:42.3334,lng:-83.0501},
  {business_name:"NORR",address:"150 W Jefferson Ave Suite 1300, Detroit, MI 48226",lat:42.3289,lng:-83.0478},
  {business_name:"M1DTW Architects",address:"1948 Division St, Detroit, MI 48207",lat:42.3456,lng:-83.0234},
  {business_name:"Las Vegas Stone Flooring Inc",address:"11343 Schaefer Hwy, Detroit, MI 48227",lat:42.3934,lng:-83.1823},
  {business_name:"Infuz Architects",address:"1451 Bagley St Suite 7, Detroit, MI 48216",lat:42.3312,lng:-83.0612},
  {business_name:"Harris Design Group",address:"15 E Kirby St, Detroit, MI 48202",lat:42.3612,lng:-83.0645},
  {business_name:"Hamilton Anderson Associates",address:"1435 Randolph Street #200, Detroit, MI 48226",lat:42.3334,lng:-83.0445},
  {business_name:"Gensler",address:"1265 Griswold St, Detroit, MI 48226",lat:42.3323,lng:-83.0467},
  {business_name:"Ferlito Group",address:"440 Selden St, Detroit, MI 48201",lat:42.3523,lng:-83.0634},
  {business_name:"Et Al Collaborative of Detroit",address:"2020 14th St, Detroit, MI 48216",lat:42.3289,lng:-83.0756},
  {business_name:"Drinks Design",address:"1051 Bellevue St, Detroit, MI 48207",lat:42.3445,lng:-83.0156},
  {business_name:"Bedrock",address:"630 Woodward Ave, Detroit, MI 48226",lat:42.3312,lng:-83.0456},
  {business_name:"Archive Design Studio",address:"615 Griswold St #916, Detroit, MI 48226",lat:42.3301,lng:-83.0467},
  {business_name:"Albert Kahn Associates, Inc.",address:"Fisher Bldg, 3011 W Grand Blvd #1800, Detroit, MI 48202",lat:42.3689,lng:-83.0789},
  {business_name:"Winton Flooring and Design",address:"8348 Richardson Rd, Commerce Township, MI 48382",lat:42.5934,lng:-83.4789},
  {business_name:"Ultra Floors, Inc.",address:"40210 Hayes Rd, Clinton Township, MI 48038",lat:42.5823,lng:-82.9323},
  {business_name:"SDA Architects",address:"42490 Garfield Rd Suite 204, Clinton Township, MI 48038",lat:42.6045,lng:-82.9198},
  {business_name:"SBW Architects LLC",address:"36358 Garfield Rd, Clinton Township, MI 48035",lat:42.5367,lng:-82.9198},
  {business_name:"Leonard C Carnaghi Inc",address:"24388 Sorrentino Ct, Clinton Township, MI 48035",lat:42.4389,lng:-82.9345},
  {business_name:"Kulbacki Inc",address:"35480 Forton Ct, Clinton Township, MI 48035",lat:42.5234,lng:-82.9456},
  {business_name:"Gable and Company",address:"39103 Garfield Rd, Clinton Township, MI 48038",lat:42.5734,lng:-82.9198},
  {business_name:"Innoative Engineered Solutions",address:"17001 19 Mile Rd, Clinton Township, MI 48038",lat:42.5645,lng:-82.9867},
  {business_name:"Complete Kitchen Design",address:"33827 Harper Ave, Clinton Township, MI 48035",lat:42.5312,lng:-82.8989},
  {business_name:"Cabinets by Cantu",address:"44930 Vic Wertz Dr, Clinton Township, MI 48036",lat:42.6234,lng:-82.9123},
  {business_name:"Advanced Landscape & Builders Supply Co.",address:"890 Rochester Rd, Clawson, MI 48017",lat:42.5334,lng:-83.1198},
  {business_name:"Studio Fraifogl",address:"6825 Dixie Hwy, Village of Clarkston, MI 48346",lat:42.7367,lng:-83.4189},
  {business_name:"Chris Morgan and Associates",address:"4435 Newcastle Dr, Village of Clarkston, MI 48348",lat:42.7489,lng:-83.4312},
  {business_name:"Window PlusHome Pro USA",address:"6490 E 10 Mile Rd, Center Line, MI 48015",lat:42.4823,lng:-83.0245},
  {business_name:"Quarry Gardens",address:"9376 Marine City Hwy, Casco, MI 48064",lat:42.7456,lng:-82.6234},
  {business_name:"Advance Tile & Marble Inc - Tile Installation with Professional Installers",address:"3250 Church Rd, Casco, MI 48064",lat:42.7234,lng:-82.6456},
  {business_name:"MWHS",address:"330 Enterprise Ct, Bloomfield Township, MI 48302",lat:42.5734,lng:-83.2456},
  {business_name:"SLS Designs Inc",address:"43700 Woodward Ave, Bloomfield Township, MI 48302",lat:42.5912,lng:-83.2389},
  {business_name:"Rariden Schumacher Mio & Co",address:"35980 Woodward Ave #150, Bloomfield Hills, MI 48304",lat:42.5478,lng:-83.2456},
  {business_name:"Penske Automotive Group, Inc.",address:"2555 S Telegraph Rd, Bloomfield Hills, MI 48302",lat:42.5534,lng:-83.2823},
  {business_name:"Marusich Architecture",address:"36880 Woodward Ave, Bloomfield Hills, MI 48304",lat:42.5589,lng:-83.2456},
  {business_name:"Kojaian Management Corporation",address:"39400 Woodward Ave #250, Bloomfield Hills, MI 48304",lat:42.5767,lng:-83.2456},
  {business_name:"Hunter Roberts Homes",address:"36800 Woodward Ave #200, Bloomfield Hills, MI 48304",lat:42.5578,lng:-83.2456},
  {business_name:"Edward Rose & Sons",address:"38525 Woodward Ave, Bloomfield Hills, MI 48304",lat:42.5689,lng:-83.2456},
  {business_name:"Dokan Construction",address:"42690 Woodward Ave, Bloomfield Hills, MI 48304",lat:42.5956,lng:-83.2456},
  {business_name:"Contour Companies",address:"40950 Woodward Ave #300, Bloomfield Hills, MI 48304",lat:42.5845,lng:-83.2456},
  {business_name:"McLeod Carpet One Floor & Home",address:"42598 Woodward Ave, Bloomfield Hills, MI 48304",lat:42.5945,lng:-83.2456},
  {business_name:"111 S Old Woodward Ave",address:"111 S Old Woodward Ave, Birmingham, MI 48009",lat:42.5445,lng:-83.2112},
  {business_name:"JSK Design",address:"31333 Southfield Rd, Beverly Hills, MI 48025",lat:42.5123,lng:-83.2234},
  {business_name:"Saroki Architecture",address:"430 N Old Woodward Ave, Birmingham, MI 48009",lat:42.5478,lng:-83.2112},
  {business_name:"Sanda Johnstone Design Association",address:"950 E Maple Rd, Birmingham, MI 48009",lat:42.5523,lng:-83.2023},
  {business_name:"Ron & Roman LLC",address:"275 E Frank St, Birmingham, MI 48009",lat:42.5467,lng:-83.2089},
  {business_name:"Posh Interior Studios",address:"107 Townsend St, Birmingham, MI 48009",lat:42.5434,lng:-83.2134},
  {business_name:"Pazzi Inc",address:"395 E Maple Rd, Birmingham, MI 48009",lat:42.5523,lng:-83.2067},
  {business_name:"NH Ziegelman Architects LLC",address:"800 N Old Woodward Ave, Birmingham, MI 48009",lat:42.5512,lng:-83.2112},
  {business_name:"Michael Willoughby & Associates-Architects",address:"880 S Old Woodward Ave #210, Birmingham, MI 48009",lat:42.5423,lng:-83.2112},
  {business_name:"Merien Daka Design Group",address:"187 S Old Woodward Ave # 250, Birmingham, MI 48009",lat:42.5434,lng:-83.2112},
  {business_name:"Meg Corley Interiors",address:"2051 Villa Rd #105, Birmingham, MI 48009",lat:42.5456,lng:-83.2123},
  {business_name:"McIntosh Poris Architects",address:"36801 Woodward Ave, Birmingham, MI 48009",lat:42.5578,lng:-83.2145},
  {business_name:"Marianne Jones Interior Design",address:"2003 Cole St, Birmingham, MI 48009",lat:42.5445,lng:-83.2134},
  {business_name:"Luckenbach Ziegelman Architects",address:"555 S Old Woodward Ave Suite 27L, Birmingham, MI 48009",lat:42.5412,lng:-83.2112},
  {business_name:"Kevin Hart Associates",address:"405 S Eton St, Birmingham, MI 48009",lat:42.5401,lng:-83.2089},
  {business_name:"Jeffrey King Interiors",address:"2253 Cole St, Birmingham, MI 48009",lat:42.5467,lng:-83.2134},
  {business_name:"James Douglas Interiors LLC - Interior Designs",address:"2007 Cole St, Birmingham, MI 48009",lat:42.5445,lng:-83.2134},
  {business_name:"Homework Interiors",address:"s Rail District, 2239 Cole St, Birmingham, MI 48009",lat:42.5467,lng:-83.2134},
  {business_name:"Gregory Aerts & Associates",address:"132 N Old Woodward Ave, Birmingham, MI 48009",lat:42.5456,lng:-83.2112},
  {business_name:"Glenda Meads Architects",address:"114 S Old Woodward Ave, Birmingham, MI 48009",lat:42.5445,lng:-83.2112},
  {business_name:"Designs Unlimited Custom Cabinetry",address:"104 Willits St, Birmingham, MI 48009",lat:42.5434,lng:-83.2123},
  {business_name:"DesignTeam Plus, Inc.",address:"975 E Maple Rd #210, Birmingham, MI 48009",lat:42.5523,lng:-83.2012},
  {business_name:"De Giulio Kitchen Studio",address:"34222 Woodward Ave, Birmingham, MI 48009",lat:42.5334,lng:-83.2145},
  {business_name:"Craig Steinhous & Associates Inc",address:"187 S Old Woodward Ave, Birmingham, MI 48009",lat:42.5434,lng:-83.2112},
  {business_name:"Brookside Residences",address:"369 N Old Woodward Ave, Birmingham, MI 48009",lat:42.5467,lng:-83.2112},
  {business_name:"Brian Neeper Architecture",address:"259 E Frank St, Birmingham, MI 48009",lat:42.5456,lng:-83.2089},
  {business_name:"Birmingham Kitchen Baths",address:"363 E Maple Rd, Birmingham, MI 48009",lat:42.5523,lng:-83.2078},
  {business_name:"PDC Designs",address:"31455 Southfield Rd, Beverly Hills, MI 48025",lat:42.5134,lng:-83.2234},
  {business_name:"Kalabat Development & Construction",address:"31333 Southfield Rd Suite 250, Beverly Hills, MI 48025",lat:42.5123,lng:-83.2234},
  {business_name:"Gala & Associates Inc",address:"31455 Southfield Rd # 202, Beverly Hills, MI 48025",lat:42.5134,lng:-83.2234},
  {business_name:"William Ellis Co",address:"3311 12 Mile Rd #2, Berkley, MI 48072",lat:42.5023,lng:-83.1823},
  {business_name:"D & S Contractors",address:"3500 W Eleven Mile Rd, Berkley, MI 48072",lat:42.4982,lng:-83.1945},
  {business_name:"Cobblestone Kitchen & Bath",address:"3311 12 Mile Rd, Berkley, MI 48072",lat:42.5023,lng:-83.1823},
  {business_name:"Avenue Group Real Estate",address:"2985 12 Mile Rd, Berkley, MI 48072",lat:42.5023,lng:-83.1789},
  {business_name:"Finished Spaces LLC",address:"3300 Auburn Rd Suite #210, Auburn Hills, MI 48326",lat:42.6867,lng:-83.2734},
  {business_name:"Fieldstone Architecture & Engineering",address:"3400 Auburn Rd #200, Auburn Hills, MI 48326",lat:42.6878,lng:-83.2756},
  {business_name:"Romeo Kitchen & Bath LLC",address:"80720 Capac Rd, Armada, MI 48005",lat:42.8456,lng:-82.8823},
  {business_name:"Designhaus Architecture",address:"3300 Auburn Rd Suite 300, Auburn Hills, MI 48326",lat:42.6867,lng:-83.2734},
  {business_name:"Thompson-Phelan Group Inc",address:"9834 Dixie Hwy, Ira Township, MI 48023",lat:42.6789,lng:-82.6123}
];

// Initialize App
function init() {
  const savedUser = getStoredUser();
  if (savedUser) {
    currentUser = savedUser;
    loadUserData();
    showApp();
  } else {
    showLoginModal();
  }
}

// Authentication
function handleLogin() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const errorEl = document.getElementById('loginError');

  if (username === 'chris' && password === 'beaver') {
    currentUser = { username: 'chris', type: 'owner' };
    storeUser(currentUser);
    loadUserData();
    showApp();
    hideLoginModal();
  } else {
    errorEl.textContent = 'Invalid credentials. Try username: chris, password: beaver';
    errorEl.classList.add('show');
  }
}

function handleGuestLogin() {
  currentUser = { username: 'guest_' + Date.now(), type: 'guest' };
  storeUser(currentUser);
  loadUserData();
  showApp();
  hideLoginModal();
}

function handleLogout() {
  clearStoredUser();
  window.location.reload();
}

function showLoginModal() {
  document.getElementById('loginModal').classList.remove('hidden');
}

function hideLoginModal() {
  document.getElementById('loginModal').classList.add('hidden');
}

function showApp() {
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('userInfo').textContent = `Logged in as: ${currentUser.username}`;
  initMap();
  renderAddressList();
  renderZoneLegend();
}

// Data Storage (using JavaScript variables instead of localStorage)
let userData = {};

function storeUser(user) {
  userData.currentUser = user;
}

function getStoredUser() {
  return userData.currentUser || null;
}

function clearStoredUser() {
  userData = {};
}

function storeLocations() {
  if (!currentUser) return;
  userData[currentUser.username + '_locations'] = locations;
  userData[currentUser.username + '_zones'] = zones;
  userData[currentUser.username + '_numZones'] = numZones;
  userData[currentUser.username + '_maxPerZone'] = maxPerZone;
}

function loadUserData() {
  if (!currentUser) return;
  
  const key = currentUser.username + '_locations';
  if (userData[key]) {
    locations = userData[key];
    zones = userData[currentUser.username + '_zones'] || [];
    numZones = userData[currentUser.username + '_numZones'] || 8;
    maxPerZone = userData[currentUser.username + '_maxPerZone'] || 30;
  } else {
    if (currentUser.type === 'owner') {
      locations = CHRIS_ADDRESSES.map((addr, idx) => ({
        id: idx + 1,
        business_name: addr.business_name,
        address: addr.address,
        lat: addr.lat,
        lng: addr.lng,
        zone: null
      }));
    } else {
      locations = [];
    }
    recalibrateZones();
  }
}

// Map Initialization
function initMap() {
  map = L.map('map').setView([42.5803, -83.0302], 10);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  updateMarkers();
}

function updateMarkers() {
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  locations.forEach(location => {
    const color = location.zone !== null ? ZONE_COLORS[location.zone % ZONE_COLORS.length] : '#999999';
    
    const icon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [12, 12]
    });

    const marker = L.marker([location.lat, location.lng], { icon })
      .addTo(map)
      .bindPopup(createPopupContent(location));
    
    marker.on('popupopen', () => {
      const editBtn = document.getElementById('popup-edit-' + location.id);
      if (editBtn) {
        editBtn.onclick = () => openEditModal(location.id);
      }
    });

    markers.push(marker);
  });
}

function createPopupContent(location) {
  const zoneName = location.zone !== null ? `Zone ${String.fromCharCode(65 + location.zone)}` : 'Unassigned';
  return `
    <div class="popup-content">
      <h4>${location.business_name}</h4>
      <p>${location.address}</p>
      <p><strong>${zoneName}</strong></p>
      <button id="popup-edit-${location.id}" class="btn btn--primary btn--sm">Edit</button>
    </div>
  `;
}

// Zone Calculation (K-Means Clustering)
function recalibrateZones() {
  if (locations.length === 0) {
    zones = [];
    storeLocations();
    return;
  }

  const k = Math.min(numZones, locations.length);
  const points = locations.map(loc => [loc.lat, loc.lng]);
  
  // K-means clustering
  let centroids = initializeCentroids(points, k);
  let assignments = [];
  let changed = true;
  let iterations = 0;
  const maxIterations = 100;

  while (changed && iterations < maxIterations) {
    changed = false;
    const newAssignments = assignToCentroids(points, centroids);
    
    if (JSON.stringify(newAssignments) !== JSON.stringify(assignments)) {
      changed = true;
      assignments = newAssignments;
    }
    
    centroids = updateCentroids(points, assignments, k);
    iterations++;
  }

  // Assign zones to locations
  locations.forEach((loc, idx) => {
    loc.zone = assignments[idx];
  });

  // Check max per zone and redistribute if needed
  balanceZones();

  // Update zones array
  zones = Array.from({ length: k }, (_, i) => ({
    id: i,
    name: `Zone ${String.fromCharCode(65 + i)}`,
    color: ZONE_COLORS[i % ZONE_COLORS.length],
    count: locations.filter(loc => loc.zone === i).length
  }));

  storeLocations();
  if (map) {
    updateMarkers();
    renderZoneLegend();
    renderAddressList();
  }
  showNotification('Zones recalibrated successfully', 'success');
}

function initializeCentroids(points, k) {
  const centroids = [];
  const used = new Set();
  
  while (centroids.length < k) {
    const idx = Math.floor(Math.random() * points.length);
    if (!used.has(idx)) {
      centroids.push([...points[idx]]);
      used.add(idx);
    }
  }
  
  return centroids;
}

function assignToCentroids(points, centroids) {
  return points.map(point => {
    let minDist = Infinity;
    let assigned = 0;
    
    centroids.forEach((centroid, idx) => {
      const dist = distance(point, centroid);
      if (dist < minDist) {
        minDist = dist;
        assigned = idx;
      }
    });
    
    return assigned;
  });
}

function updateCentroids(points, assignments, k) {
  const centroids = [];
  
  for (let i = 0; i < k; i++) {
    const clusterPoints = points.filter((_, idx) => assignments[idx] === i);
    
    if (clusterPoints.length === 0) {
      centroids.push([42.5803, -83.0302]);
    } else {
      const avgLat = clusterPoints.reduce((sum, p) => sum + p[0], 0) / clusterPoints.length;
      const avgLng = clusterPoints.reduce((sum, p) => sum + p[1], 0) / clusterPoints.length;
      centroids.push([avgLat, avgLng]);
    }
  }
  
  return centroids;
}

function balanceZones() {
  const zoneCounts = Array(numZones).fill(0);
  locations.forEach(loc => {
    if (loc.zone !== null && loc.zone < numZones) {
      zoneCounts[loc.zone]++;
    }
  });

  let needsRebalance = zoneCounts.some(count => count > maxPerZone);
  
  if (needsRebalance) {
    locations.sort((a, b) => {
      const countA = zoneCounts[a.zone] || 0;
      const countB = zoneCounts[b.zone] || 0;
      return countB - countA;
    });

    zoneCounts.fill(0);
    locations.forEach(loc => {
      let minZone = 0;
      let minCount = zoneCounts[0];
      
      for (let i = 1; i < numZones; i++) {
        if (zoneCounts[i] < minCount && zoneCounts[i] < maxPerZone) {
          minCount = zoneCounts[i];
          minZone = i;
        }
      }
      
      loc.zone = minZone;
      zoneCounts[minZone]++;
    });
  }
}

function distance(p1, p2) {
  const dx = p1[0] - p2[0];
  const dy = p1[1] - p2[1];
  return Math.sqrt(dx * dx + dy * dy);
}

// UI Rendering
function renderZoneLegend() {
  const container = document.getElementById('zoneLegend');
  container.innerHTML = zones.map(zone => `
    <div class="zone-item">
      <div class="zone-color" style="background-color: ${zone.color};"></div>
      <div class="zone-info">
        <div class="zone-name">${zone.name}</div>
        <div class="zone-count">${zone.count} locations</div>
      </div>
    </div>
  `).join('');
}

function renderAddressList() {
  const container = document.getElementById('addressList');
  
  if (locations.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); padding: 20px;">No locations added yet. Click "Add Address" to get started.</p>';
    return;
  }

  container.innerHTML = locations.map(location => {
    const zoneName = location.zone !== null ? `Zone ${String.fromCharCode(65 + location.zone)}` : 'Unassigned';
    const zoneColor = location.zone !== null ? ZONE_COLORS[location.zone % ZONE_COLORS.length] : '#999999';
    
    return `
      <div class="address-item">
        <div class="address-info">
          <div class="address-name">${location.business_name}</div>
          <div class="address-details">${location.address}</div>
        </div>
        <div class="address-zone" style="background-color: ${zoneColor}20; color: ${zoneColor}; border: 1px solid ${zoneColor}40;">
          ${zoneName}
        </div>
        <div class="address-actions">
          <button class="btn btn--secondary btn--sm" onclick="openEditModal(${location.id})">Edit</button>
          <button class="btn btn--danger btn--sm" onclick="deleteLocation(${location.id})">Delete</button>
        </div>
      </div>
    `;
  }).join('');
}

function sortAddresses() {
  const sortBy = document.getElementById('sortBy').value;
  
  switch (sortBy) {
    case 'name-asc':
      locations.sort((a, b) => a.business_name.localeCompare(b.business_name));
      break;
    case 'name-desc':
      locations.sort((a, b) => b.business_name.localeCompare(a.business_name));
      break;
    case 'zone':
      locations.sort((a, b) => (a.zone || 999) - (b.zone || 999));
      break;
    case 'distance':
      const center = [42.5803, -83.0302];
      locations.sort((a, b) => {
        const distA = distance([a.lat, a.lng], center);
        const distB = distance([b.lat, b.lng], center);
        return distA - distB;
      });
      break;
  }
  
  renderAddressList();
}

// Location Management
function openAddModal() {
  editingLocationId = null;
  document.getElementById('editModalTitle').textContent = 'Add New Location';
  document.getElementById('editBusinessName').value = '';
  document.getElementById('editAddress').value = '';
  document.getElementById('editLat').value = '';
  document.getElementById('editLng').value = '';
  updateZoneSelect();
  document.getElementById('editZone').value = 'auto';
  document.getElementById('editModal').classList.remove('hidden');
}

function openEditModal(locationId) {
  editingLocationId = locationId;
  const location = locations.find(loc => loc.id === locationId);
  
  if (!location) return;
  
  document.getElementById('editModalTitle').textContent = 'Edit Location';
  document.getElementById('editBusinessName').value = location.business_name;
  document.getElementById('editAddress').value = location.address;
  document.getElementById('editLat').value = location.lat;
  document.getElementById('editLng').value = location.lng;
  updateZoneSelect();
  document.getElementById('editZone').value = location.zone !== null ? location.zone : 'auto';
  document.getElementById('editModal').classList.remove('hidden');
}

function closeEditModal() {
  document.getElementById('editModal').classList.add('hidden');
  document.getElementById('editError').classList.remove('show');
}

function updateZoneSelect() {
  const select = document.getElementById('editZone');
  select.innerHTML = '<option value="auto">Auto-assign</option>';
  zones.forEach((zone, idx) => {
    select.innerHTML += `<option value="${idx}">${zone.name}</option>`;
  });
}

function saveLocation() {
  const businessName = document.getElementById('editBusinessName').value.trim();
  const address = document.getElementById('editAddress').value.trim();
  const lat = parseFloat(document.getElementById('editLat').value);
  const lng = parseFloat(document.getElementById('editLng').value);
  const zoneValue = document.getElementById('editZone').value;
  const errorEl = document.getElementById('editError');

  if (!businessName || !address || isNaN(lat) || isNaN(lng)) {
    errorEl.textContent = 'Please fill in all fields with valid data';
    errorEl.classList.add('show');
    return;
  }

  if (editingLocationId) {
    const location = locations.find(loc => loc.id === editingLocationId);
    if (location) {
      location.business_name = businessName;
      location.address = address;
      location.lat = lat;
      location.lng = lng;
      
      if (zoneValue === 'auto') {
        recalibrateZones();
      } else {
        location.zone = parseInt(zoneValue);
        zones[location.zone].count = locations.filter(loc => loc.zone === location.zone).length;
      }
    }
    showNotification('Location updated successfully', 'success');
  } else {
    const newLocation = {
      id: locations.length > 0 ? Math.max(...locations.map(l => l.id)) + 1 : 1,
      business_name: businessName,
      address: address,
      lat: lat,
      lng: lng,
      zone: zoneValue === 'auto' ? null : parseInt(zoneValue)
    };
    locations.push(newLocation);
    
    if (zoneValue === 'auto') {
      recalibrateZones();
    } else {
      zones[newLocation.zone].count++;
    }
    
    showNotification('Location added successfully', 'success');
  }

  storeLocations();
  updateMarkers();
  renderAddressList();
  renderZoneLegend();
  closeEditModal();
}

function deleteLocation(locationId) {
  if (!confirm('Are you sure you want to delete this location?')) return;
  
  const index = locations.findIndex(loc => loc.id === locationId);
  if (index > -1) {
    locations.splice(index, 1);
    recalibrateZones();
    storeLocations();
    updateMarkers();
    renderAddressList();
    renderZoneLegend();
    showNotification('Location deleted successfully', 'success');
  }
}

// Zone Settings
function openZoneModal() {
  document.getElementById('maxPerZone').value = maxPerZone;
  document.getElementById('numZones').value = numZones;
  document.getElementById('zoneModal').classList.remove('hidden');
}

function closeZoneModal() {
  document.getElementById('zoneModal').classList.add('hidden');
}

function updateMaxPerZone() {
  const newMax = parseInt(document.getElementById('maxPerZone').value);
  if (newMax > 0) {
    maxPerZone = newMax;
    recalibrateZones();
    showNotification('Max per zone updated', 'success');
  }
}

function updateNumZones() {
  const newNum = parseInt(document.getElementById('numZones').value);
  if (newNum >= 1 && newNum <= 12) {
    numZones = newNum;
    recalibrateZones();
    showNotification('Zones recalibrated', 'success');
  }
}

// Notifications
function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.classList.remove('hidden');
  
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 3000);
}

// Initialize on load
init();