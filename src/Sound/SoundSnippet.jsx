import linkCoins from "../assets/soundEffects/coins.wav";
import linkMenuChoose from "../assets/soundEffects/menuChoose.wav";
import linkMenuOpen from "../assets/soundEffects/menuOpen.wav";
import linkOpen from "../assets/soundEffects/open.mp3";
import linkSelect from "../assets/soundEffects/select.wav";
import linkSettingsBtn from "../assets/soundEffects/settingsBtn.wav";

const SoundSnippet = ({ style, crop, settings }) => {
  // style - выбор звука
  // crop - обрезка

  console.log(settings);
  if (!settings.sounds) {
    return "";
  }

  let Sound = new Audio("");

  switch (style) {
    case 1:
      Sound = new Audio(linkMenuChoose);
      break;
    case 2:
      Sound = new Audio(linkMenuOpen);
      break;
    case 3:
      Sound = new Audio(linkOpen);
      break;
    case 4: 
      Sound = new Audio(linkSelect);
      break;
    case 5:
      Sound = new Audio(linkSettingsBtn);
      break;
    default:
      Sound = new Audio(linkCoins);
      break;
  }

  Sound.load();
  Sound.volume = settings.visual.volume;
  crop ? (Sound.currentTime = crop) : "";
  Sound.play();
};

export default SoundSnippet;
