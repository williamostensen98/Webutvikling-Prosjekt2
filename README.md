# Dokumentasjon

## Innhold & Funksjonalitet

Prosjekt 2 i IT2810 Webutvikling omhandler å lage en webapplikasjon som inneholder en utstilling som består av ulike kombinasjoner av lyd, tekst og SVG-grafikk. Utstillingen skal være interaktiv i form av at kombinasjonene som vises skal være brukerstyrte. 

Brukeren får muligheten til å velge én av tre kategorier innen både lyd, tekst og bilde ved å trykke på knapper ved der kategoriene er listet opp. Med en gang nevnte kategorier er valgt, vil det komme fire ulike kombinasjoner i fire ulike faner. Ved å navigere seg frem og tilbake mellom disse fanene, vil brukeren kunne se utstillingen som er basert på vedkommendes ønske. Dersom brukeren velger å bytte kategori innenfor minst én av medietypene, vil en ny utstilling bestående av nye kombinasjoner vises i fanene umiddelbart. 

Brukeren har også muligheten til å lagre sin favorittkombinasjon av kategorier dersom dette skulle være ønskelig. Denne kan hentes ut igjen ved senere anledning selv om brukeren lager andre kombinasjoner i mellomtiden, eller velger å lukke nettleservinduet. 


## Krav til Teknologi

### React

Dette prosjektet er laget i [React](https://reactjs.org/) og baserer seg på _JSX_ og _Javascript ES6_ som fører med seg ny syntaks og features som skal gjøre koden mer leselig og moderne. Med ES6 blir det introdusert bl.a. _arrow functions_, _klasser_ og _arv_ mm. 

Prosjektet er bygget opp av både funksjonelle- og klassekomponenter. Funksjonelle komponenter er enklere å lese og teste da det er ren Javascript som ikke baseres på `state` eller `lifecycles`. Dette gjør at man ender opp med mindre kode. 
Når det brukes state- eller lifecycle-metoder er det hensiktsmessig å bruke klasse-baserte funksjoner, da man ikke kan endre tilstand gjennom `setState()` i funksjonelle komponenter. Det har derfor blitt brukt funksjonelle komponenter der det ikke har vært behov for state. Dette forenkler kode og leselighet, samt testing (eks. Header, Footer og Tab komponentene). Klassekomponenter brukes der det har er nødvendig med endring av tilstand og lifecycle-methoder som `componentDidMount()` og `componentDidUpdate()`. 
UI-komponenter er implementert fra bunnen av, og prosjektet er bygget på en komponentstruktur vi synes var hensiktsmessig og komfortable med. 

### Ajax

I dette prosjektet var det et krav om å benytte Ajax (Asynchronous JavaScript and XML). Dette har vi valgt å løse ved å bruke fetch()-funksjonen for å laste inn JSON- og SVG-filer. 
Det er definert én get-metode hver for SVG-, JSON- og mp3-fil i TabContent.js. For å unngå hardkoding av hver fil som skal fetches, konstrueres det en string som angir pathen til filen basert på hvilke props som sendes ned til TabContent-komponenten. 
I praksis ser det slik ut for getImage()-metoden:

```javascript	 
fetch("./media/svg/" + this.props.selectedButton.image + "/"
 	+ this.props.activeTab + ".svg")
 ```

der `this.props.selectedButton.image` er enten “Animals”, “Vehicles” eller “Nature”, og `this.props.activeTab` er 1, 2, 3 eller 4.

Dette fungerer fordi mappene og filene i media-mappen er navngitt i tråd med hvilke kategorier og hvilken fane som er valgt, og dermed lagret i state i App.js.
Eksempelvis ser hierarkiet for SVG-filene slik ut:

```
|-- svg
   |-- Animals
       |-- 1.svg
	   |-- 2.svg
	   |-- 3.svg
	   |-- 4.svg
	        .
	        .
	        .
```

Tilsvarende løsninger er gjort for å hente ut data fra JSON- og mp3-filer. 

Kun ett medie-element hentes ut om gangen, da filene kun blir lastet hvis de blir brukt. Kall til get-metodene gjøres dersom brukeren skifter aktiv fane eller kategori, og utilsiktede kall forhindres ved at livssyklusmetodene `componentDidMount()` og `componentDidUpdate()` har betingelser ved å kun kalle get-metodene dersom det skjer endringer.


### Caching
For å unngå at filer lastes inn flere ganger har caching blitt implementert gjennom Apache2, som brukes som webserver. 
For å få til dette ble [denne](https://www.digitalocean.com/community/tutorials/how-to-configure-apache-content-caching-on-ubuntu-14-04) guiden fulgt. Ved å bruke Chrome Developer Tools og se under Network-fanen, bekreftes det at bildet caches lokalt på maskinen. 

### HTML Web Storage
Både session storage og local storage er tatt i bruk i dette prosjektet. Local storage brukes slik at brukeren kan lagre en favorittkombinasjon. Neste gang brukeren besøker nettsiden, vil nettsiden se at brukeren har en favoritt, og dermed presentere en “Apply favorite”-knapp.
Man kan også fjerne local storage ved å trykke på “Remove favorite”. Det har blitt lagt til betingelser slik at brukeren kun får presentert knappene dersom funksjonaliteten er tilgjengelig. 

For session storage har en enklere løsning blitt valgt. Under valgene for mediekategori er det en klikkteller som inkrementeres hver gang brukeren klikker et vilkårlig sted på nettsiden.
Dersom brukeren lukker fanen vil telleren tilbakestilles, men om siden oppdateres husker den hvor du var.

### Responsive Web Design

Siden har en fleksibel layout ved at den tilpasser seg skjerm og orientering på skjerm. 
Dette skjer blant annet gjennom bruk av CSS Flexbox som ved å bruke  
  `flex-wrap: wrap` gjør at elementer som ikke får plass i bredden legger seg under de andre elementene.
Dette er for eksempel brukt på `Favorite`-knappen og kategoriene når man går fra iPad eller mobil i liggende stilling til mobil i stående. 
Da går knappen(e) og kategoriene fra bredde til høydeformat lik bildet og tekst. 

I `index.html` er det også brukt _Viewport_ i `<meta>`-taggen. Denne styrer enhetens synlige område og sier noe om hvordan siden skal skaleres i forhold til enheten.
For å bytte mellom breddeformat og høydeformat på layouten mellom mobil/iPad og desktop, er det brukt media queries i CSS. 
Siden Flexbox er fleksibel på layout med skalering, trengtes det kun en query som går på når skjermen er mindre enn 768 px (mobil og iPad). 
Da byttes layouten til høydeformat, bildene skaleres til hele skjermen og marginene fikses. 

Det er også brukt `Viewbox` på SVG-bildene, da dette sørger for at bildene blir riktig skalert til skjermen når dette endres.

### Testing


***Testing med Jest***    
  
I dette prosjektet har det blitt utført snapshot-testing med Jest. Snapshot-testing fungerer ved at man renderer DOMet til applikasjonen og tar en snapshot av det som sier noe om hvordan nettsiden har blitt konstruert. 
Når testene kjøres ved senere anledning renderes DOMet på nytt, en ny snapshot blir tatt og den blir sammenlignet med snapshotten fra tidligere. Dersom testen feiler betyr det at nettsiden har renderet på en annen måte, noe som skyldes noe som har blitt gjort under utviklingen av applikasjonen. 
Dersom endringen var intensjonell må den gamle snapshotten oppdateres med den nye. Denne typen testing er hensiktsmessig da den forteller om grensesnittet har forandret seg siden sist test. 

Testene skrevet for denne webapplikasjonen er for komponentene App.js, categoryData.js, Footer.js, Header.js og MediaCategory.js. 

***Testing Av Responsive Design***
    
Siden er blitt testet på 3 ulike enheter, iPhone 7, iPad Pro og PC (desktop), og da både ved vertikal og horisontal orientering. Her har det blitt sjekket om alle bildene skalerer riktig til skjermstørrelsen, og om layouten er riktig (bredde-/høydeformat) på de ulike enhetene.
Hvordan dette funker og er satt opp kan man lese om under _Responsive Web Design_. 


### Bruk av Git og GitLab
Gruppen har hatt en aktiv bruk av Git under utviklingen av webapplikasjonen. Det ble tidlig bestemt at gruppen skulle bruke branchen _dev_ som en "midlertidig masterbranch", og ta utgangspunkt i denne ved merging fra andre brancher. Det var ønskelig å merge _dev_ med _master_ etter at det var sikkerhet rundt at all koden fungerte som den skulle. Ellers har det vært forsøkt på en konvensjon rundt navngivning av andre brancher som innebærer at navnet på branchen skal si noe om hva som jobbes med.

Arbeidsoppgaver har blitt uttrykt som issues på GitLab, men det har vært litt uryddighet rundt hvordan disse skal formuleres og på hvilket språk. Det har likevel ikke vært til hinder for gjennomførelsen av prosjektet. Issuene ble closet når branchen som gjorde dens oppgave ble fullført og merget med _dev_, men dette måtte gjøres manuelt da det ikke skjedde til tross for at issuenummeret ble skrevet i commit-meldingen. Dette fant vi ut i ettertid at var på grunn av at vi ikke hadde satt _dev_-branchen som default.