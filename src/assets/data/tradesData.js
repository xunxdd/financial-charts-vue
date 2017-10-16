/* eslint-disable indent */
const TrendlineData = [{
    start: {
      date: new Date(2014, 2, 11),
      value: 72.50
    },
    end: {
      date: new Date(2014, 5, 9),
      value: 63.34
    }
  },
  {
    start: {
      date: new Date(2013, 10, 21),
      value: 43
    },
    end: {
      date: new Date(2014, 2, 17),
      value: 70.50
    }
  }
];
/* eslint-disable indent */
const supstanceData = [{
    start: new Date(2014, 2, 11),
    end: new Date(2014, 5, 9),
    value: 63.64
  },
  {
    start: new Date(2013, 10, 21),
    end: new Date(2014, 2, 17),
    value: 55.50
  }
];

export default {
  trendlines: TrendlineData,
  supstances: supstanceData
}
