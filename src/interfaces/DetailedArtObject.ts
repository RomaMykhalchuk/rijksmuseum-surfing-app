export interface DetailedArtObject {
  'artObject': {
    'id': string,
    'objectNumber': string,
    'title': string,
    'webImage': {
      'url': string
    },
    'description': string,
    'principalMaker': string,
    'objectTypes': string[]
  };
}
