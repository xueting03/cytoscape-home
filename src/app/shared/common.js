import organismsData from '@/data/organisms.json'

export const geneManiaOrganisms = organismsData

export const parseGeneList = (searchText) => {
  if (searchText.length > 0) {
    let parts = searchText.split(/[\s,]+/)
    parts = parts.filter(el => el.length > 0)
    return [...new Set(parts)]
  }
  return []
}

export const searchNDEx = (searchText) =>  {
  if (searchText.length > 0) {
    const parts = parseGeneList(searchText)
    if (parts.length > 0) {
      const genes = parts.join('%2C')
      const url = `https://www.ndexbio.org/iquery/?genes=${genes}`
      window.open(url, '_blank').focus()
    }
  }
}

export const searchGeneMania = (searchText, orgName='homo-sapiens') =>  {
  if (orgName && searchText && searchText.length > 0) {
    const parts = parseGeneList(searchText)
    if (parts.length > 0) {
      const genes = parts.join('/')
      const url = `https://genemania.org/search/${orgName}/${genes}`
      window.open(url, '_blank').focus()
    }
  }
}

export const searchWikiPathways = (searchText) =>  {
  if (searchText.length > 0) {
    const parts = parseGeneList(searchText)
    if (parts.length > 0) {
      const genes = parts.join('%20')
      const url = `https://www.wikipathways.org/search.html?query=${genes}`
      window.open(url, '_blank').focus()
    }
  }
}

