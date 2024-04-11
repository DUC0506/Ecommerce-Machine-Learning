import DatauriParser from 'datauri/parser';

const parser = new DatauriParser();

// Data URI helper function
const dataUriVideo = (file) => parser.format('webm', file.buffer);

export default dataUriVideo;
