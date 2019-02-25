import {SPEND} from 'modules/budget';
import moment from 'moment';

const achievementTypes = {
  spendCount: {
    triggers: [SPEND],
    check: ({amount}, {history: {list}}) => {
      return list.length >= amount;
    }
  },
  streak: {
    triggers: [SPEND],
    check: ({days, countPerDay}, {history: {list}}) => {
      var j = list.length - 1;
      var today = moment().startOf("day");
      for (var i = 0; i != days; ++i) {
        var dayCount = 0;
        var targetDay = moment(today).subtract(i, 'days');
        var nextDay = moment(targetDay).add(1, 'day');
        for (; j >= 0; --j) {
          var transDate = moment(list[j].date);
          if (transDate.isAfter(nextDay)) continue;
          if (transDate.isBefore(targetDay)) {
            if (dayCount < countPerDay) {
              return false;
            }
            break;
          } else {
            dayCount++;
          }
        }
      }
      return true;
    }
  }
}

export default achievementTypes;
