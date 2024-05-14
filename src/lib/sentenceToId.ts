export const sentenceToId = (sentence: string, numOfWords = 5) => {
  return sentence.split(' ').slice(0, numOfWords).join('-').toLowerCase();
};
