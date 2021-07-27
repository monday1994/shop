//all utils methods like toLowerCaseFormatter, id generators etc
import moment from 'moment';

export const getTimestamp = () => {
  return moment().format();
}
