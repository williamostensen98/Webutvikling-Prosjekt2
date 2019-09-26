1. Etter å ha klonet prosjektet, skriv kommandoen "cd prosjekt_2" i terminalen. 
2. Skriv deretter "npm start" for å starte nettsiden på en lokal webserver og åpne nettsiden.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Dokumentasjon

## Innhold & Funksjonalitet

Prosjekt 2 i IT2810 Webutvikling omhandler å lage en webapplikasjon som inneholder en utstilling som består av ulike kombinasjoner av lyd, tekst og SVG-grafikk. Utstillingen skal være interaktiv i form av at kombinasjonene som vises skal være brukerstyrte. 

Brukeren får muligheten til å velge én av tre kategorier innen både lyd, tekst og bilde ved å trykke på knapper ved der kategoriene er listet opp. Med en gang nevnte kategorier er valgt, vil det komme fire ulike kombinasjoner i fire ulike faner. Ved å navigere seg frem og tilbake mellom disse fanene, vil brukeren kunne se utstillingen som er basert på vedkommendes ønske. Dersom brukeren velger å bytte kategori innenfor minst én av medietypene, vil en ny utstilling bestående av nye kombinasjoner vises i fanene umiddelbart. 

Brukeren har også muligheten til å lagre sin favorittkombinasjon av kategorier dersom dette skulle være ønskelig. Denne kan hentes ut igjen ved senere anledning selv om brukeren lager andre kombinasjoner i mellomtiden, eller velger å lukke nettleservinduet. 


## Krav til Teknologi

### React

Dette prosjektet er laget i [React](https://reactjs.org/) og baserer seg på _JSX_ og _Javascript ES6_ som fører med seg ny syntaks og features som skal gjøre koden mer leselig og moderne. Med ES6 blir det introdusert bl.a. _arrow functions_, _klasser_ og _arv_ mm. 

Prosjektet er bygget opp av både funksjonelle- og klasse komponenter. Funksjonelle komnponenter er gjerne enklere å lese og teste da det er kun ren Javascript som ikke baserer seg på `state` eller `lifecycles`. Dette gjør at man gjerne ender opp med mindre kode. 
Når man må bruke state eller lifecycle-metoder er det hensiktsmessig å bruke klasse-baserte funksjoner da man ikke kan endre tilstand gjennom `setState()` i funksjonelle komponenter. Vi har derfor brukt funksjonelle komponenter der vi ikke har hatt bruk for state for å forenkle kode og leselighet samt testing (eks. Header, Footer og Tab komponentene) og Classes der det har vært nødvendig med endring av tilstand og lifecycle-methods som `componentDidMount()` og `componentDidUpdate()`. 
UI-komponenter er implementert fra bunnen av og prosjektet er bygget på en komponentstruktur vi synes var hensiktsmessig og var komfortable med. 

### Ajax

I dette prosjektet var det et krav om å benytte Ajax (Asynchronous JavaScript and XML). Dette har vi valgt å løse ved å bruke fetch()-funksjonen for å laste inn JSON- og SVG-filer. 
Vi har valgt å definere én get-metode hver for SVG-, JSON- og mp3-fil i TabContent.js. For å slippe å hardkode hver fil som skal fetches, konstruerer vi en string som angir pathen til filen basert på hvilke props som sendes ned til TabContent-komponenten. 
I praksis ser det slik ut for getImage()-metoden:

```javascript	 
fetch("./media/svg/" + this.props.selectedButton.image + "/"
 	+ this.props.activeTab + ".svg")
 ```

der `this.props.selectedButton.image` er enten “Animals”, “Vehicles” eller “Nature”, og `this.props.activeTab` er 1, 2, 3 eller 4.

Dette fungerer fordi vi har valgt å navngi mapper og filer i media-mappen i tråd med hvilken kategori og tråd som er valgt og dermed lagret i state til App.js.
Hierarkiet i svg ser for eksempel slik ut:

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

Tilsvarende løsninger er gjort for å hente ut JSON og mp3-filer, slik at samme logikk benyttes konsekvent for å hente data. 

Filene blir kun lastet hvis de blir brukt, ettersom kall til get-metodene kun gjøres med tilhørende path-verdi dersom man enten skifter fane, eller endrer kategori i media-buttons. 
Dermed hentes alltid kun ett medie-element ut om gangen. For å forhindre utilsiktede kall til get-metodene benytter vi livssyklusmetodene `componentDidMount()` og `componentDidUpdate()` med betingelser om å kun gjøre kall til get-metodene dersom aktiv fane eller valgt kategori endrer seg. 


### Caching
For å unngå at filer lastes inn flere ganger har vi implementert caching gjennom Apache2, som brukes som web-server. 
For å få til dette fulgte vi [denne](https://www.digitalocean.com/community/tutorials/how-to-configure-apache-content-caching-on-ubuntu-14-04) guiden. Ved å bruke Chrome Developer Tools og se under Network fanen, får vi bekreftet at bildet caches lokalt på maskinen. 

### HTML Web Storage
Vi har tatt i bruk både session storage og local storage i dette prosjektet. Local storage brukes slik at brukeren kan lagre en favorittkombinasjon, og neste gang brukeren besøker nettsiden, vil nettsiden se at brukeren har en favoritt, og presentere en “Apply favorite”-knapp for brukeren.
Man kan også fjerne local storage ved å trykke på “Remove favorite”. Vi har lagt inn betingelser slik at brukeren kun får presentert knappene dersom funksjonaliteten er tilgjengelig. 

For session storage har vi valgt en enklere løsning. Under valgene for mediekategori er det en klikkteller som inkrementeres hver gang brukeren klikker et vilkårlig sted på siden.
Dersom brukeren lukker fanen tilbakestilles denne telleren, men om siden oppdateres husker den hvor du var.

### Responsive Web Design


Siden har en fleksibel layout ved at den tilpasser seg skjerm og orientering på skjerm. 
Dette skjer blant annet gjennom bruk av CSS Flexbox som ved å bruke  
  `flex-wrap: wrap` gjør at elementer som ikke får plass i bredden legger seg under de andre elementene.
Dette er for eksempel brukt på `Favorite`-knappen og kategoriene når man går fra Ipad eller mobil i liggende stilling til mobil stående. 
Da går knappen(e) og kategoriene fra bredde til høydeformat lik bildet og tekst. 

I `index.html` er det også brukt _Viewport_ i `<meta>`-taggen. Denne styrer enhetens synlige område og sier noe om hvordan siden skal skaleres i forhold til enheten.
For å bytte mellom breddeformat og høyde format på layouten mellom mobile/Ipad og Desktop er det brukt media queries i CSS. 
Siden Flexbox er fleksibel på layout med skalering trengtes det kun en query som går på når skjermen er mindre enn 768 px(for mobil og Ipad). 
Da byttes layouten til høyde format, bildene skaleres til hele skjermen og marginene fikses. 

Det er også brukt `Viewbox` på svg-bildene da dette sørger for at bildene blir riktig skalert til skjermen når dette endres.

### Testing


***Testing m/ JEST***

***Testing Av Responsive Design***
Siden er blitt testet på 3 ulike enheter, Iphone 7, Ipad Pro og Pc(Desktop) og da både ved vertikal og horisontal orientering. Her har vi sjekket om alle bildene skalerer riktig til skjermstørrelsen og om layouten er riktig(breddeformat vs. høydeformet) på de ulike enhetene.
Hvordan dette funker og satt opp kan man lese om under _Responsive Web Design_. 





## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
