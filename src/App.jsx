import ScrollStage from './components/ScrollStage'
import { sceneContent } from './data/sceneContent'
import AmbientOutro from './scenes/AmbientOutro'
import BloomReveal from './scenes/BloomReveal'
import BootSequence from './scenes/BootSequence'
import DownloadScene from './scenes/DownloadScene'
import HelpScene from './scenes/HelpScene'
import MarketplaceScene from './scenes/MarketplaceScene'
import ModpackInstallerScene from './scenes/ModpackInstallerScene'
import WidgetsScene from './scenes/WidgetsScene'

const sceneComponents = {
  boot: BootSequence,
  reveal: BloomReveal,
  widgets: WidgetsScene,
  help: HelpScene,
  marketplace: MarketplaceScene,
  importer: ModpackInstallerScene,
  download: DownloadScene,
  outro: AmbientOutro,
}

const scenes = sceneContent.map((scene) => ({
  ...scene,
  Component: sceneComponents[scene.id],
}))

function App() {
  return <ScrollStage scenes={scenes} />
}

export default App
