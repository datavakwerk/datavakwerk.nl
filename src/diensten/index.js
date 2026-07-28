// Inhoud van de dienstpagina's (/diensten/<slug>).
// Elke sectie heeft een titel met paragrafen en/of een lijst van punten.

export const diensten = [
  {
    slug: 'stuurinformatie',
    icon: '📊',
    title: 'Stuur- en managementinformatie',
    lead:
      'Dashboards en rapportages waarmee directie en lijnmanagement dagelijks kunnen sturen — één definitie, één bron, gevalideerd en herleidbaar.',
    sections: [
      {
        title: 'Herkenbaar?',
        paragraphs: [
          'Elke afdeling heeft eigen lijstjes met eigen definities. De maandrapportage kost dagen handwerk, en het MT-overleg begint steevast met een discussie over wiens cijfers kloppen in plaats van wat de cijfers betekenen.',
          'Het probleem is zelden de rapportagetool. Het is het ontbreken van één afgesproken definitie per KPI, één gevalideerde bron en een herleidbare weg daartussen.',
        ],
      },
      {
        title: 'Wat ik lever',
        items: [
          {
            t: 'Een KPI-woordenboek',
            d: 'per metric één eigenaar, één berekening en één bron. Het document dat cijferdiscussies beëindigt.',
          },
          {
            t: 'Dashboards die gebruikt worden',
            d: 'gebouwd in Power BI, SAS of SAP Analytics Cloud — afgestemd op wat directie en lijnmanagement daadwerkelijk nodig hebben om te sturen.',
          },
          {
            t: 'Gevalideerde en herleidbare datastromen',
            d: 'van dashboardcijfer terug naar brondata in een paar stappen, elke transformatie gedocumenteerd. Auditproof.',
          },
          {
            t: 'Overdracht en borging',
            d: 'documentatie en ingewerkte beheerders, zodat de organisatie er ook na mijn vertrek op kan bouwen.',
          },
        ],
      },
      {
        title: 'Hoe ik te werk ga',
        items: [
          {
            t: 'Definities eerst',
            d: 'voordat er iets gebouwd wordt, liggen de KPI-definities vast — met de mensen die er straks op sturen én de mensen die registreren.',
          },
          {
            t: 'De uitvoering als vertrekpunt',
            d: 'ik loop mee op de werkvloer om te zien welke velden betrouwbaar zijn en welke registratie-artefacten. De cijfers meten daarna het echte werk.',
          },
          {
            t: 'Iteratief bouwen',
            d: 'korte cycli met de gebruikers aan tafel. Een dashboard dat na twee weken bijgestuurd kan worden, wordt na twee jaar nog gebruikt.',
          },
        ],
      },
    ],
    tools: ['Power BI', 'SAS', 'SAP Analytics Cloud', 'SQL', 'Python', 'Excel'],
  },
  {
    slug: 'procesanalyse',
    icon: '🧭',
    title: 'Procesanalyse & herontwerp',
    lead:
      'Meelopen op de werkvloer, processen en knelpunten in kaart brengen en observaties vertalen naar verbetervoorstellen die uitvoerbaar zijn — met behoud van zorgvuldigheid en menselijke maat.',
    sections: [
      {
        title: 'Herkenbaar?',
        paragraphs: [
          'De doorlooptijden lopen op, de werkvoorraad groeit en niemand kan precies aanwijzen waar het knelt. De procesplaten kloppen — maar beschrijven het proces zoals het is ontworpen, niet zoals het elke dag wordt uitgevoerd.',
          'Het verschil daartussen zit in workarounds, definitieverschillen en afhankelijkheden die nergens zijn vastgelegd. Dat verschil vind je niet in een systeem; dat vind je op de werkvloer.',
        ],
      },
      {
        title: 'Wat ik lever',
        items: [
          {
            t: 'Een feitelijk procesbeeld',
            d: 'het proces zoals het écht loopt (BPMN), inclusief de varianten en workarounds die in geen enkele procesplaat staan.',
          },
          {
            t: 'Een knelpuntenanalyse met cijfers',
            d: 'observaties onderbouwd met data uit de systemen: waar zit de wachttijd, waar de terugstroom, wat kost het.',
          },
          {
            t: 'Uitvoerbare verbetervoorstellen',
            d: 'herontwerp dat aansluit op de doelen van het programma én op de praktijk van de uitvoering — gedragen door de mensen die het moeten doen.',
          },
          {
            t: 'Begeleiding van pilots tot uitrol',
            d: 'van voorstel naar pilot naar implementatie, met meetbare resultaten per stap.',
          },
        ],
      },
      {
        title: 'Hoe ik te werk ga',
        items: [
          {
            t: 'Eerst meelopen',
            d: 'in de eerste weken zit ik naast behandelaars en intake — niet als audit, maar als fundament onder de analyse.',
          },
          {
            t: 'Observaties en data combineren',
            d: 'wat ik zie op de werkvloer toets ik aan het event-log; wat de data zegt, toets ik terug op de werkvloer.',
          },
          {
            t: 'Herontwerpen mét de uitvoering',
            d: 'verbetervoorstellen ontstaan in sessies met de mensen die het werk doen. Er gaat niets "naar boven" dat het team niet herkent.',
          },
        ],
      },
    ],
    tools: ['meelopen', 'interviews', 'BPMN', 'process mining', 'pilots', 'scrum'],
  },
  {
    slug: 'businesscases',
    icon: '📋',
    title: 'Businesscases & advies',
    lead:
      "Kwalitatieve en kwantitatieve businesscases: impact, kosten, baten en risico's onderbouwd — inclusief toets aan de kaders voor privacy, informatiebeveiliging, architectuur en AI.",
    sections: [
      {
        title: 'Herkenbaar?',
        paragraphs: [
          'Er moet een besluit vallen — over automatisering, herverdeling van capaciteit of de inzet van AI — maar de onderbouwing ontbreekt. Wat op tafel ligt zijn meningen met een tabel erbij, en niemand kan de getallen controleren.',
          'Een beslisser hoeft geen dikker rapport. Een beslisser heeft scenario’s nodig die te wegen zijn: wat kost het, wat levert het op, wat zijn de risico’s en wat gebeurt er als we niets doen.',
        ],
      },
      {
        title: 'Wat ik lever',
        items: [
          {
            t: 'Doorgerekende scenario’s',
            d: 'twee of drie reële opties naast elkaar — inclusief "niets doen" — met fte’s, kosten, baten, terugverdientijd en risico’s.',
          },
          {
            t: 'Controleerbare onderbouwing',
            d: 'elk getal herleidbaar naar een berekening en een aanname. Wie een aanname betwist, kan zien wat er met de conclusie gebeurt.',
          },
          {
            t: 'Toets aan de kaders',
            d: 'AVG, BIO, architectuur en verantwoorde AI-inzet worden vanaf het begin meegewogen — niet achteraf gerepareerd.',
          },
          {
            t: 'Een advies dat gedragen wordt',
            d: 'stakeholders zijn onderweg aangehaakt, zodat het advies op de bestuurstafel geen verrassing is voor de werkvloer.',
          },
        ],
      },
      {
        title: 'Hoe ik te werk ga',
        items: [
          {
            t: 'Aannames expliciet',
            d: 'elke businesscase begint met een lijst aannames, afgestemd met de mensen die het kunnen weten.',
          },
          {
            t: 'Reproduceerbaar rekenen',
            d: 'berekeningen in notebooks of spreadsheets die de organisatie zelf kan naspelen en bijwerken als de wereld verandert.',
          },
          {
            t: 'Van analyse naar besluit',
            d: 'het eindproduct is een beslisdocument: scenario’s, afwegingen, advies en een implementatiepad — klaar om te wegen.',
          },
        ],
      },
    ],
    tools: ['Python', 'Excel', 'scenario-analyse', 'risicoanalyse', 'AVG/BIO-kaders'],
  },
]

export function findDienst(slug) {
  return diensten.find((d) => d.slug === slug)
}
