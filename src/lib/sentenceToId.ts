export const sentenceToId = (sentance: string, numOfWords = 5) => {
  return sentance.split(' ').slice(0, numOfWords).join('-').toLowerCase();
};
