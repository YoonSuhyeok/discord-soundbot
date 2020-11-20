// Parses a string of the form [[hh:]mm:]ss[.xxx]) and returns a number representing the seconds
//   from that time
const getSecondsFromTime = (time: string): number => {
  if (!time.match(/(\d{1,2}:)?(\d{1,2}:)?(\d{1,2})(\.\d{1,3})?/)) {
    throw Error('Input does not represent a timestamp');
  }

  const [front, millis = '0'] = time.split('.');
  const [seconds, minutes = '0', hours = '0'] = front.split(':').reverse();

  return (
    parseInt(hours) * 60 * 60 +
    parseInt(minutes) * 60 +
    parseInt(seconds) +
    parseFloat(`0.${millis}`)
  );
};

export default getSecondsFromTime;