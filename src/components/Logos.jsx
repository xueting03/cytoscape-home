import appLogomarkSvg from '../images/logos/app-logomark.svg';
import appLogoSvg from '../images/logos/app-logo.svg';
import cytoscapeLogoSvg from '../images/logos/cytoscape-logo.svg';
import cytoscapeWebLogoSvg from '../images/logos/cytoscapeweb-logo.svg';
import wikiPathwaysLogoSvg from '../images/logos/wikipathways-logo.svg';
import NDEXSvg from '../images/logos/ndex-logo.svg';
import geneManiaSvg from '../images/logos/genemania-logo.svg';
import enrichmentMapSvg from '../images/logos/enrichmentmap-logo.svg';

export function AppLogomark(props) {
  return <img src={appLogomarkSvg} alt="App Logomark" {...props} />;
}

export function AppLogo(props) {
  return <img src={appLogoSvg} alt="App Logo" {...props} />;
}

export function CytoscapeLogo(props) {
  return <img src={cytoscapeLogoSvg} alt="Cytoscape Logo" {...props} />;
}

export function NDExLogo(props) {
  return <img src={NDEXSvg} alt="NDEx Logo" {...props} />;
}

export function GeneManiaLogo(props) {
  return <img src={geneManiaSvg} alt="GeneMania Logo" {...props} />;
}

export function EnrichmentMapLogo(props) {
  return <img src={enrichmentMapSvg} alt="Enrichment Map Logo" {...props} />;
}

export function WikiPathwaysLogo(props) {
  return <img src={wikiPathwaysLogoSvg} alt="WikiPathways Logo" {...props} />;
}

export function CytoscapeWebLogo(props) {
  return <img src={cytoscapeWebLogoSvg} alt="Cytoscape Web Logo" {...props} />;
}