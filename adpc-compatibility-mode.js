const currentUserDecisionsTemplate = {
    consent: [],
    withdraw: []
};
let currentUserDecisions;
var consentRequestsList;
let userLanguages = []
let firstSupportedLanguage = "";

const style =
`body {
  overflow: hidden;
}

.ADPC-Compatibility-Banner_slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: calc(1.5em + 8px);
  }
  
  .ADPC-Compatibility-Banner_slider:before {
    position: absolute;
    content: "";
    height: 1.5em;
    width: 1.5em;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
  }
  
  .ADPC-Compatibility-Banner input:checked + .ADPC-Compatibility-Banner_slider {
    background-color: #2196F3;
  }
  
  .ADPC-Compatibility-Banner input:focus + .ADPC-Compatibility-Banner_slider {
    box-shadow: 0 0 1px #2196F3;
  }
  
  .ADPC-Compatibility-Banner input:checked + .ADPC-Compatibility-Banner_slider:before {
    -webkit-transform: translateX(1.5em);
    -ms-transform: translateX(1.5em);
    transform: translateX(1.5em);
  }
  
  .ADPC-Compatibility-Banner button {
    font-weight: 500;
    font-size: 1em;
    background-color: #ccc;
    border: none;
    border-radius: 0.5em;
    padding: 0.375em;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  .ADPC-Compatibility-Banner button:hover {
    background-color: #2196F3;
    color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  .ADPC-Compatibility-Banner button:active {
    background-color: #eee;
    -webkit-transition: .2s;
    transition: .2s;
  }`
  const supportedLanguages = ["en", "de"];
  const localization_en = {
    "cookieBannerTitle": "This website is asking permission to set cookies",
    "ADPCTimeout_1": "There was a problem requesting you're cookie consent via ADPC, so you need to fill out this form. Click ",
    "ADPCTimeoutLink": "https://www.dataprotectioncontrol.org/",
    "ADPCTimeoutLinkTitle": "here",
    "ADPCTimeout_2": " for more information.",
    "nativeADPC_1": "This cookie-banner is powered by ADPC. Click ",
    "nativeADPCLink": "https://www.dataprotectioncontrol.org/",
    "nativeADPCLinkTitle": "here",
    "nativeADPC_2": " to learn more about it and get the best experience.",
    "rejectAllButton": "Reject All",
    "saveButton": "Save",
    "acceptAllButton": "Accept All"
  }
  const localization_de = {
    "cookieBannerTitle": "Diese Website möchte Cookies setzen",
    "ADPCTimeout_1": "Während der Anfrage über ADPC ist ein Fehler aufgetreten, deshalb muss die Anfrage hier beantwortet werden. Klicke ",
    "ADPCTimeoutLink": "https://www.dataprotectioncontrol.org/",
    "ADPCTimeoutLinkTitle": "hier",
    "ADPCTimeout_2": " für mehr Informationen.",
    "nativeADPC_1": "Dieser Cookie-Banner wird mit ADPC betrieben. Klicke ",
    "nativeADPCLink": "https://www.dataprotectioncontrol.org/",
    "nativeADPCLinkTitle": "hier",
    "nativeADPC_2": " um mehr zu erfahren und alle Vorteile zu genießen.",
    "rejectAllButton": "Alle ablehnen",
    "saveButton": "Speichern",
    "acceptAllButton": "Alle akzeptieren"
  }
  const bannerHTMLStructur = [
    "<div id='ADPC-Compatibility-Banner' class='ADPC-Compatibility-Banner' style='position: absolute; top: 0; left: 0; background: rgba(0, 0, 0, .8); width: 100vw; height: 100vh;'><div style='z-index: 999; position: absolute; top: 50%; left: 50%; margin-right: -50%; transform: translate(-50%, -50%); background-color: white; border-radius: 1.5em; padding: 1em;'><div style='display: flex; justify-content: center;'><h2>",
    "localized.cookieBannerTitle",
    "</h2></div>",
    "compute.timeoutWarning",
    "<div style='overflow-y: scroll; max-height: 50vh; padding-left: 1em; padding-right: 1em;'>",
    "compute.permissionList",
    "</div>",
    "compute.nativeADPC",
    "<div style='display: flex; justify-content: space-around;'><button id='ADPC-Compatibility-Banner_button_rejectAll'>",
    "localized.rejectAllButton",
    "</button><button id='ADPC-Compatibility-Banner_button_save'>",
    "localized.saveButton",
    "</button><button id='ADPC-Compatibility-Banner_button_acceptAll'>",
    "localized.acceptAllButton",
    "</button></div></div></div>"
  ]
  const timeoutWarningHTML = [
    "<p style='padding-left: 1em; padding-right: 1em; color: red;'>",
    "localized.ADPCTimeout_1",
    "<a style='color:#2196F3; text-decoration: none;' href='",
    "localized.ADPCTimeoutLink",
    "'>",
    "localized.ADPCTimeoutLinkTitle",
    "</a>",
    "localized.ADPCTimeout_2",
    "</p>"
  ]
  const nativeADPCHTML = [
    "<p style='padding-left: 1em; padding-right: 1em; font-weight: lighter; font-size: 0.75em;'>",
    "localized.nativeADPC_1",
    "<a style='color:#2196F3; text-decoration: none;' href='",
    "localized.nativeADPCLink",
    "'>",
    "localized.nativeADPCLinkTitle",
    "</a>",
    "localized.nativeADPC_2",
    "</p>"
  ]
  const permissionListHTML = [
    "<div style='display: flex; justify-content: space-between;'><div style='display: flex; min-height: calc(1.5em + 8px); align-items: center;'><label style='max-width: calc(100vw - 8em - 15px);'>",
    "permission.text",
    "</label></div><label style='margin-left: 1em; position: relative; display: inline-block; width: calc(3em + 8px); height: calc(1.5em + 8px);'><input style='opacity: 0; width: 0; height: 0;' type='checkbox' ",
    "permission.decision",
    " id='ADPC-Compatibility-Banner_slider_",
    "permission.id",
    "'><span class='ADPC-Compatibility-Banner_slider'></span></label></div>"
  ]

function compute(instruction, dueToError) {
    let returnString = ""
    switch (instruction) {
        case "timeoutWarning":
            if (dueToError) {
                returnString = JSONToHTML(timeoutWarningHTML, dueToError, {})
            }
            break;
        case "nativeADPC":
            if (!dueToError) {
                returnString = JSONToHTML(nativeADPCHTML, dueToError, {})
            }
            break;
        case "permissionList":
            for (let permission = 0; permission < consentRequestsList.length; permission++) {
                let enviroment = consentRequestsList[permission]
                returnString += JSONToHTML(permissionListHTML, dueToError, enviroment)
                if (permission < (consentRequestsList.length - 1)) {
                    returnString += "<hr>"
                }
            }
            break;
    }
    return returnString
}

function JSONToHTML(JSON, dueToError, enviroment) {
    let resultingHTML = "";
    for (let k = 0; k < JSON.length; k++) {
        if (k % 2 == 0) {
            resultingHTML += JSON[k]
        } else {
            let instruction = JSON[k]
            instruction = instruction.split(".")
            switch (instruction[0]) {
                case "compute":
                    resultingHTML += compute(instruction[1], dueToError)
                    break;
                case "localized":
                    let ressource = eval("localization_" + firstSupportedLanguage)
                    resultingHTML += ressource[instruction[1]]
                    break;
                case "permission":
                    if (instruction[1] == "decision") {
                      try {
                        let checked = false;
                        for (let j = 0; j < currentUserDecisions.consent.length; j++) {
                          if (currentUserDecisions.consent[j] == enviroment.id) {
                            checked = true;
                          }
                        }
                        if (checked) {
                          resultingHTML += "checked"
                        }
                      } catch (err) {

                      }
                    } else {
                      resultingHTML += enviroment[instruction[1]]
                    }
                    break;
            }
        }
    }
    return resultingHTML
}

function startCompatibilityMode(dueToError) {
  userLanguages.push(navigator.language || navigator.userLanguage);
  userLanguages.push("en");
  let i = 0;
  while (firstSupportedLanguage == "") {
      for (let j = 0; j < supportedLanguages.length; j++) {
          if (userLanguages[i] == supportedLanguages[j]) {
              firstSupportedLanguage = userLanguages[i]
          }
      }
      i++
  }
  let bannerHTML = JSONToHTML(bannerHTMLStructur, dueToError, {})
  document.getElementsByTagName("body")[0].innerHTML += bannerHTML

  var css = document.createElement('style');
  css.id = "ADPC-Compatibility-Banner_stylesheet"

  if (css.styleSheet)
      css.styleSheet.cssText = style;
  else
      css.appendChild(document.createTextNode(style));
  
  document.getElementsByTagName("head")[0].appendChild(css);

  document.getElementById("ADPC-Compatibility-Banner_button_rejectAll").addEventListener("click", function(){currentUserDecisions = currentUserDecisionsTemplate; currentUserDecisions.withdraw = ["*"]; updateUserDecisions(currentUserDecisions, true); stopCompatibilityMode()});
  document.getElementById("ADPC-Compatibility-Banner_button_save").addEventListener("click", function(){currentUserDecisions = currentUserDecisionsTemplate; for(let i = 0; i < consentRequestsList.length; i++){if (document.getElementById("ADPC-Compatibility-Banner_slider_" + consentRequestsList[i].id).checked) {currentUserDecisions.consent.push(consentRequestsList[i].id)} else {currentUserDecisions.withdraw.push(consentRequestsList[i].id)}}; updateUserDecisions(currentUserDecisions, true); stopCompatibilityMode()});
  document.getElementById("ADPC-Compatibility-Banner_button_acceptAll").addEventListener("click", function(){currentUserDecisions = currentUserDecisionsTemplate; for(let i = 0; i < consentRequestsList.length; i++){currentUserDecisions.consent.push(consentRequestsList[i].id)}; updateUserDecisions(currentUserDecisions, true); stopCompatibilityMode()});
}

function stopCompatibilityMode() {
    try {
        document.getElementById("ADPC-Compatibility-Banner").remove()
        document.getElementById("ADPC-Compatibility-Banner_stylesheet").remove()
    } catch(err) {
        console.log("Failed to remove ressources. Error: " + err)
    }
}

function updateUserDecisions(newUserDecisions, storeable) {
    currentUserDecisions = newUserDecisions;

    if (storeable) {
      document.cookie = 'adpc-compatibility-mode={"userDecisions": ' + JSON.stringify(currentUserDecisions) + ', "consentRequestsList": ' + JSON.stringify(consentRequestsList) + "}; expires=" + new Date(new Date().setFullYear(new Date().getFullYear() + 1)) + ";"
    }

    console.log(`ADPC: User cookie decisions are now:\n${JSON.stringify(currentUserDecisions, null, 2)}`);
    returnUserDecisions()
}

function returnUserDecisions() {
    document.dispatchEvent(new CustomEvent('adpc-decisionchange', {
        detail: {
            userDecisions: currentUserDecisions
        }
    }))
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export default async function (newConsentRequestsList, siteLanguages) {
    consentRequestsList = newConsentRequestsList
    userLanguages = siteLanguages
    if (navigator.dataProtectionControl) {
      // The browser supports ADPC!
      console.log("ADPC-Compatibility-Mode: The browser does support ADPC.")
      // Request consent; show a message if this fails (browser extension v0.0.1 failed to pass decisions back to the page).
      const willShowError = setTimeout(() => startCompatibilityMode(true, consentRequestsList), 100 ); // try-catch appears not to work…
      const userDecisions = await navigator.dataProtectionControl.request(consentRequestsList);
      clearTimeout(willShowError); stopCompatibilityMode(); // …so we hide the message if we got here.

      updateUserDecisions(userDecisions, false);

      // Keep listening for any changes to the user’s decisions.
      navigator.dataProtectionControl.addEventListener('decisionchange', (event) => {
        updateUserDecisions(event.userDecisions, false);
      });

    } else {
      console.log("ADPC-Compatibility-Mode: The browser does NOT support ADPC.")
      let cookieData = getCookie("adpc-compatibility-mode")
      if (cookieData != "") {
        cookieData = JSON.parse(cookieData)
        currentUserDecisions = cookieData.userDecisions
        cookieData = cookieData.consentRequestsList
      }
      if (JSON.stringify(cookieData) == JSON.stringify(consentRequestsList)) {
          returnUserDecisions()
      } else {
        startCompatibilityMode(false, consentRequestsList)
      }
    }
}
