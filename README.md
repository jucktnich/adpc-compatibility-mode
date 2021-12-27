# adpc-compatibility-mode
ATTENTION: This is not official and not linked to the creators of ADPC.
## Scope of this module
The Scope of this module is, to provide a fallback for the usage of [ADPC](https://www.dataprotectioncontrol.org). Just import this module to your code and make a request, the rest is handled by this module.
## How-to
### Import
```js
import adpc from './lib/adpc-compatibility-mode.js'
```
### Ask for permission (if you redo this with the same parameters, the user won't be bothered with a new querying)
```js
document.addEventListener('adpc-decisionchange', (event) => {console.log("User decision: " + JSON.stringify(event.detail.userDecisions))});
adpc([{"id": "put an identifier here", "text": "provide an description text for the request"}, {"id": "this is the id for the second request", "text": "bla bla bla"}], [/*put here an array with the languages you want the UI in (no worries, if we dont find a supported language, we'll use the browser language and as a last ressort english*/"de", "en"])
```
### Handle the result (adpc-decisionchange) event
The result is in [this](https://www.dataprotectioncontrol.org/spec/#giving-withdrawing-objecting-js) format.
