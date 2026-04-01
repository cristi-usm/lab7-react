// ─── Mărci ────────────────────────────────────────────────────────────────────

export const MARCI = [
  { id: "dacia",      nume: "Dacia",      tara: "🇷🇴", culoare: "#1a6fc4" },
  { id: "volkswagen", nume: "Volkswagen", tara: "🇩🇪", culoare: "#001e50" },
  { id: "bmw",        nume: "BMW",        tara: "🇩🇪", culoare: "#0066b1" },
  { id: "mercedes",   nume: "Mercedes",   tara: "🇩🇪", culoare: "#333333" },
  { id: "ford",       nume: "Ford",       tara: "🇺🇸", culoare: "#003478" },
  { id: "renault",    nume: "Renault",    tara: "🇫🇷", culoare: "#efdf00" },
  { id: "toyota",     nume: "Toyota",     tara: "🇯🇵", culoare: "#eb0a1e" },
  { id: "opel",       nume: "Opel",       tara: "🇩🇪", culoare: "#ffd700" },
];

// ─── Modele ───────────────────────────────────────────────────────────────────

export const MODELE = {
  dacia:      [{ id:"sandero", nume:"Sandero" },{ id:"duster", nume:"Duster" },{ id:"logan", nume:"Logan" },{ id:"spring", nume:"Spring" }],
  volkswagen: [{ id:"golf", nume:"Golf" },{ id:"passat", nume:"Passat" },{ id:"polo", nume:"Polo" },{ id:"tiguan", nume:"Tiguan" }],
  bmw:        [{ id:"seria3", nume:"Seria 3" },{ id:"seria5", nume:"Seria 5" },{ id:"x5", nume:"X5" },{ id:"x3", nume:"X3" }],
  mercedes:   [{ id:"classa", nume:"Clasa A" },{ id:"classc", nume:"Clasa C" },{ id:"glc", nume:"GLC" },{ id:"classe", nume:"Clasa E" }],
  ford:       [{ id:"focus", nume:"Focus" },{ id:"fiesta", nume:"Fiesta" },{ id:"kuga", nume:"Kuga" },{ id:"puma", nume:"Puma" }],
  renault:    [{ id:"clio", nume:"Clio" },{ id:"megane", nume:"Megane" },{ id:"captur", nume:"Captur" },{ id:"kadjar", nume:"Kadjar" }],
  toyota:     [{ id:"yaris", nume:"Yaris" },{ id:"corolla", nume:"Corolla" },{ id:"rav4", nume:"RAV4" },{ id:"camry", nume:"Camry" }],
  opel:       [{ id:"astra", nume:"Astra" },{ id:"corsa", nume:"Corsa" },{ id:"insignia", nume:"Insignia" },{ id:"mokka", nume:"Mokka" }],
};

// ─── Ani ──────────────────────────────────────────────────────────────────────

export const ANI = ["2024","2023","2022","2021","2020","2019","2018","2017","2016","2015","2014","2013"];

// ─── Motorizări ───────────────────────────────────────────────────────────────

export const MOTORIZARI = {
  dacia:      ["1.0 TCe 90 CP","1.3 TCe 130 CP","1.5 dCi 95 CP","Electric 65 CP"],
  volkswagen: ["1.0 TSI 110 CP","1.5 TSI 150 CP","2.0 TDI 150 CP","2.0 TSI 245 CP"],
  bmw:        ["116d 116 CP","118i 136 CP","320d 190 CP","330i 258 CP"],
  mercedes:   ["A 180 136 CP","C 200 204 CP","GLC 220d 194 CP","E 300 258 CP"],
  ford:       ["1.0 EcoBoost 125 CP","1.5 EcoBoost 182 CP","1.5 EcoBlue 120 CP","2.0 EcoBlue 190 CP"],
  renault:    ["1.0 SCe 75 CP","1.3 TCe 140 CP","1.5 dCi 115 CP","1.6 E-Tech 145 CP"],
  toyota:     ["1.0 VVT-i 72 CP","1.5 Hybrid 116 CP","2.0 Hybrid 197 CP","2.5 Hybrid 218 CP"],
  opel:       ["1.2 Turbo 110 CP","1.4 Turbo 130 CP","1.5 CDTI 122 CP","2.0 CDTI 174 CP"],
};

// ─── Categorii ────────────────────────────────────────────────────────────────

export const CAT_CFG = {
  Motor:      { bg:"#e8610a22", text:"#f0832e", border:"#e8610a55", acc:"#e8610a" },
  "Frâne":    { bg:"#c0392b22", text:"#e05c4b", border:"#c0392b55", acc:"#c0392b" },
  Suspensie:  { bg:"#2980b922", text:"#5baee8", border:"#2980b955", acc:"#2980b9" },
  "Electrică":{ bg:"#8e44ad22", text:"#b97fe0", border:"#8e44ad55", acc:"#8e44ad" },
  Caroserie:  { bg:"#27ae6022", text:"#4ecb80", border:"#27ae6055", acc:"#27ae60" },
  Interior:   { bg:"#d6891022", text:"#e8b44a", border:"#d6891055", acc:"#d68910" },
};

// ─── Catalog piese ────────────────────────────────────────────────────────────

export const CATALOG = [
  { id:1,  nume:"Filtru ulei Mann",           cat:"Motor",      pret:55,   marci:["dacia","volkswagen","ford","opel"],                                        desc:"Filtru OEM pentru motoare pe benzină și diesel." },
  { id:2,  nume:"Curea distribuție Gates",    cat:"Motor",      pret:195,  marci:["volkswagen","ford","renault","opel"],                                      desc:"Set complet: curea + role tensionare." },
  { id:3,  nume:"Bujii NGK Iridium (×4)",     cat:"Motor",      pret:220,  marci:["dacia","volkswagen","ford","renault","toyota","opel"],                     desc:"Iridiu, durată 80.000 km." },
  { id:4,  nume:"Radiator apă Valeo",          cat:"Motor",      pret:680,  marci:["bmw","mercedes","volkswagen"],                                            desc:"Aluminiu, include garnituri de montaj." },
  { id:5,  nume:"Filtru aer K&N",              cat:"Motor",      pret:145,  marci:["dacia","volkswagen","ford","renault","toyota","opel","bmw","mercedes"],    desc:"Sport washable, +10% flux aer." },
  { id:6,  nume:"Plăcuțe frână Brembo față",  cat:"Frâne",      pret:215,  marci:["bmw","mercedes","volkswagen","ford","toyota"],                            desc:"Ceramic, zgomot și praf minim." },
  { id:7,  nume:"Discuri frână Textar față",  cat:"Frâne",      pret:310,  marci:["dacia","renault","opel","ford"],                                          desc:"Ventilate, 280 mm, tratament anticoroziv." },
  { id:8,  nume:"Lichid frână DOT 4+",        cat:"Frâne",      pret:42,   marci:["dacia","volkswagen","ford","renault","toyota","opel","bmw","mercedes"],    desc:"Temp. fierbere 265°C, compatibil ABS/ESP." },
  { id:9,  nume:"Etrier frână față",           cat:"Frâne",      pret:450,  marci:["bmw","mercedes"],                                                        desc:"Remanufacturat, pistoane noi, testat 200 bar." },
  { id:10, nume:"Amortizor Bilstein față",     cat:"Suspensie",  pret:490,  marci:["volkswagen","bmw","mercedes","ford"],                                    desc:"Gaz monoțeavă, control superior al șasiului." },
  { id:11, nume:"Arc elicoidal față",          cat:"Suspensie",  pret:195,  marci:["dacia","renault","opel","toyota"],                                       desc:"Oțel aliat, înălțime originală." },
  { id:12, nume:"Bucșă bară stabilizatoare",  cat:"Suspensie",  pret:65,   marci:["dacia","volkswagen","ford","renault","toyota","opel","bmw","mercedes"],    desc:"Poliuretan, 3× mai durabil vs. cauciuc." },
  { id:13, nume:"Cap de bara articulat",       cat:"Suspensie",  pret:88,   marci:["dacia","volkswagen","ford","renault","opel"],                            desc:"Rulment etanș, protecție sporită." },
  { id:14, nume:"Baterie Bosch AGM 70Ah",      cat:"Electrică",  pret:790,  marci:["bmw","mercedes","volkswagen","ford","toyota"],                           desc:"Start/Stop, CCA 760A, garanție 4 ani." },
  { id:15, nume:"Alternator Valeo 90A",        cat:"Electrică",  pret:970,  marci:["dacia","renault","opel"],                                                desc:"Remanufacturat, include regulator de tensiune." },
  { id:16, nume:"Becuri LED Osram H7",         cat:"Electrică",  pret:315,  marci:["dacia","volkswagen","ford","renault","toyota","opel","bmw","mercedes"],   desc:"6000 lm, 6000K, Canbus ready." },
  { id:17, nume:"Senzor oxygen Denso",         cat:"Electrică",  pret:190,  marci:["toyota","ford"],                                                         desc:"Wideband, pre-CAT, 4 pini OBD2." },
  { id:18, nume:"Bara față sport",             cat:"Caroserie",  pret:1280, marci:["bmw","mercedes","volkswagen"],                                           desc:"ABS, locașuri senzori parcare, vopsibilă." },
  { id:19, nume:"Oglindă electrică stânga",    cat:"Caroserie",  pret:395,  marci:["dacia","renault","opel","ford","toyota"],                                desc:"Cu încălzire și geam asferic." },
  { id:20, nume:"Covorașe cauciuc premium",    cat:"Interior",   pret:198,  marci:["dacia","volkswagen","ford","renault","toyota","opel","bmw","mercedes"],   desc:"Set 4 buc., borduri anti-scurgere, lavabile." },
  { id:21, nume:"Husă volan piele naturală",   cat:"Interior",   pret:125,  marci:["dacia","volkswagen","ford","renault","toyota","opel","bmw","mercedes"],   desc:"Cusută manual, Ø 38 cm." },
  { id:22, nume:"Organizator portbagaj",       cat:"Interior",   pret:155,  marci:["dacia","volkswagen","ford","renault","toyota","opel","bmw","mercedes"],   desc:"Pliabil, velcro, compartimente multiple." },
];

// ─── Pași wizard ──────────────────────────────────────────────────────────────

export const PASI = [
  { nr:1, titlu:"Marcă",   sub:"Producătorul" },
  { nr:2, titlu:"Vehicul", sub:"Model & an" },
  { nr:3, titlu:"Piese",   sub:"Componente" },
  { nr:4, titlu:"Sumar",   sub:"Finalizare" },
];
