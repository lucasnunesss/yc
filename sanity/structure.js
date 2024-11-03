// https://www.sanity.io/docs/structure-builder-cheat-sheet

// Como vc quer agrupar seus esquemas
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('author').title("Authors"),
      S.documentTypeListItem('startup').title("Startups"),
    ])
