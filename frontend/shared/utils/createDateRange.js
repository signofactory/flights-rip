// Stuff related to the date
import moment from 'moment';
import { STANDARD_DATE_FORMAT } from 'shared/config/globals';
const dateFormat = STANDARD_DATE_FORMAT;

// Helper function to create n-dimentional date range around a seed
export function createDateRange(seed, dim){
  var dates = [];
  
  for (var i=-2; i<3; i++){
    var newDay = moment(seed).clone().add(i, 'days').format(dateFormat);
    dates.push(newDay);
  }

  return dates
}