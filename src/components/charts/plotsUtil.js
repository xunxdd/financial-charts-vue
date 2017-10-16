let d3 = window.d3;
let techan = window.techan;

export default {

  getScale(indicatorTop, dimension) {
    return d3.scaleLinear()
      .range([indicatorTop(0) + dimension.indicator.height, indicatorTop(0)]);
  },

  getRsi(x, y, xAxis, yAxis, dimension, indicatorTop) {
    var rsiScale = this.getScale(indicatorTop, dimension);

    var rsi = techan.plot.rsi()
      .xScale(x)
      .yScale(rsiScale);

    var rsiAxis = d3.axisRight(rsiScale)
      .ticks(3);

    var rsiAnnotation = techan.plot.axisannotation()
      .axis(rsiAxis)
      .orient('right')
      .format(d3.format(',.2f'))
      .translate([x(1), 0]);

    var rsiAxisLeft = d3.axisLeft(rsiScale)
      .ticks(3);

    var rsiAnnotationLeft = techan.plot.axisannotation()
      .axis(rsiAxisLeft)
      .orient('left')
      .format(d3.format(',.2f'));
    var timeAnnotation = this.getTimeAnnotation(xAxis, yAxis, dimension)

    var rsiCrosshair = techan.plot.crosshair()
      .xScale(timeAnnotation.axis().scale())
      .yScale(rsiAnnotation.axis().scale())
      .xAnnotation(timeAnnotation)
      .yAnnotation([rsiAnnotation, rsiAnnotationLeft])
      .verticalWireRange([0, dimension.plot.height])

    return {
      crosshair: rsiCrosshair,
      plot: rsi,
      scale: rsiScale,
      axis: rsiAxis,
      annotation: rsiAnnotation,
      axisLeft: rsiAxisLeft,
      annotationLeft: rsiAnnotationLeft
    }
  },

  getMacd(x, y, xAxis, yAxis, dimension, indicatorTop) {
    var timeAnnotation = this.getTimeAnnotation(xAxis, yAxis, dimension)
    var macdScale = d3.scaleLinear()
      .range([indicatorTop(0) + dimension.indicator.height, indicatorTop(0)]);

    var macd = techan.plot.macd()
      .xScale(x)
      .yScale(macdScale);

    var macdAxis = d3.axisRight(macdScale)
      .ticks(3);

    var macdAnnotation = techan.plot.axisannotation()
      .axis(macdAxis)
      .orient('right')
      .format(d3.format(',.2f'))
      .translate([x(1), 0]);

    var macdAxisLeft = d3.axisLeft(macdScale)
      .ticks(3);

    var macdAnnotationLeft = techan.plot.axisannotation()
      .axis(macdAxisLeft)
      .orient('left')
      .format(d3.format(',.2f'));

    var macdCrosshair = techan.plot.crosshair()
      .xScale(timeAnnotation.axis().scale())
      .yScale(macdAnnotation.axis().scale())
      .xAnnotation(timeAnnotation)
      .yAnnotation([macdAnnotation, macdAnnotationLeft])
      .verticalWireRange([0, dimension.plot.height]);

    return {
      crosshair: macdCrosshair,
      scale: macdScale,
      annotationLeft: macdAnnotationLeft,
      axisLeft: macdAxisLeft,
      annotation: macdAnnotation,
      axis: macdAxis,
      plot: macd
    }
  },

  setUpOhlcSelection(svg, x, y) {
    var ohlcSelection = svg.append('g')
      .attr('class', 'ohlc')
      .attr('transform', 'translate(0,0)');

    ohlcSelection.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + x(1) + ',0)')
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -12)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Price ($)');

    ohlcSelection.append('g')
      .attr('class', 'close annotation up');

    ohlcSelection.append('g')
      .attr('class', 'volume')
      .attr('clip-path', 'url(#ohlcClip)');

    ohlcSelection.append('g')
      .attr('class', 'candlestick')
      .attr('clip-path', 'url(#ohlcClip)');

    ohlcSelection.append('g')
      .attr('class', 'indicator sma ma-0')
      .attr('clip-path', 'url(#ohlcClip)');

    ohlcSelection.append('g')
      .attr('class', 'indicator sma ma-1')
      .attr('clip-path', 'url(#ohlcClip)');

    ohlcSelection.append('g')
      .attr('class', 'indicator ema ma-2')
      .attr('clip-path', 'url(#ohlcClip)');

    ohlcSelection.append('g')
      .attr('class', 'percent axis');

    ohlcSelection.append('g')
      .attr('class', 'volume axis');

    return ohlcSelection;
  },

  setUpIndicatorSelection(svg, x, y) {
    var indicatorSelection = svg.selectAll('svg > g.indicator').data(['macd', 'rsi']).enter()
      .append('g')
      .attr('class', function(d) {
        return d + ' indicator';
      });

    indicatorSelection.append('g')
      .attr('class', 'axis right')
      .attr('transform', 'translate(' + x(1) + ',0)');

    indicatorSelection.append('g')
      .attr('class', 'axis left')
      .attr('transform', 'translate(' + x(0) + ',0)');

    indicatorSelection.append('g')
      .attr('class', 'indicator-plot')
      .attr('clip-path', function(d, i) {
        return 'url(#indicatorClip-' + i + ')';
      });

    return indicatorSelection
  },

  setUpPlotLines(svg) {
    svg.append('g')
      .attr('class', 'crosshair ohlc');

    svg.append('g')
      .attr('class', 'tradearrow')
      .attr('clip-path', 'url(#ohlcClip)');

    svg.append('g')
      .attr('class', 'crosshair macd');

    svg.append('g')
      .attr('class', 'crosshair rsi');

    svg.append('g')
      .attr('class', 'trendlines analysis')
      .attr('clip-path', 'url(#ohlcClip)');
    svg.append('g')
      .attr('class', 'supstances analysis')
      .attr('clip-path', 'url(#ohlcClip)');
  },

  getTradeArrow(x, y) {
    return techan.plot.tradearrow()
      .xScale(x)
      .yScale(y)
      .y(function(d) {
        // Display the buy and sell arrows a bit above and below the price, so the price is still visible
        if (d.type === 'buy') return y(d.low) + 5;
        if (d.type === 'sell') return y(d.high) - 5;
        else return y(d.price);
      });
  },

  getSma(x, y) {
    return techan.plot.sma()
      .xScale(x)
      .yScale(y);
  },

  getEma(x, y) {
    return techan.plot.ema()
      .xScale(x)
      .yScale(y);
  },

  getTimeAnnotation(xAxis, yAxis, dim) {
    return techan.plot.axisannotation()
      .axis(xAxis)
      .orient('bottom')
      .format(d3.timeFormat('%Y-%m-%d'))
      .width(65)
      .translate([0, dim.plot.height])
  },

  getCandleStick(x, y) {
    return techan.plot.candlestick()
      .xScale(x)
      .yScale(y);
  },

  getVolume(x, y) {
    var candlestick = this.getCandleStick(x, y);
    return techan.plot.volume()
      .accessor(candlestick.accessor()) // Set the accessor to a ohlc accessor so we get highlighted bars
      .xScale(x)
      .yScale(this.getYvolume(x, y));
  },

  getYvolume(x, y) {
    return d3.scaleLinear()
      .range([y(0), y(0.2)]);
  },

  getTrendline(x, y) {
    return techan.plot.trendline()
      .xScale(x)
      .yScale(y);
  },

  getSupstance(x, y) {
    return techan.plot.supstance()
      .xScale(x)
      .yScale(y);
  },

  getOhlcAnnotation(xAxis, yAxis, x, y) {
    return techan.plot.axisannotation()
      .axis(yAxis)
      .orient('right')
      .format(d3.format(',.2f'))
      .translate([x(1), 0]);
  },

  getCloseAnnotation(xAxis, yAxis, x, y) {
    var candlestick = this.getCandleStick(x, y);
    return techan.plot.axisannotation()
      .axis(yAxis)
      .orient('right')
      .accessor(candlestick.accessor())
      .format(d3.format(',.2f'))
      .translate([x(1), 0]);
  },

  getPercentAxis(y) {
    var yPercent = y.copy();
    return d3.axisLeft(yPercent)
      .tickFormat(d3.format('+.1%'));
  },

  getPercentAnnotation(x, y) {
    return techan.plot.axisannotation()
      .axis(this.getPercentAxis(y))
      .orient('left');
  },

  getVolumeAxis(y) {
    var yVolume = d3.scaleLinear()
      .range([y(0), y(0.2)]);

    return d3.axisRight(yVolume)
      .ticks(3)
      .tickFormat(d3.format(',.3s'));
  },

  getVolumeAnnotation(y) {
    var volumeAxis = this.getVolumeAxis(y);

    return techan.plot.axisannotation()
      .axis(volumeAxis)
      .orient('right')
      .width(35);
  },

  getOhlcCrosshair(dim, xAxis, yAxis, x, y) {
    var timeAnnotation = this.getTimeAnnotation(xAxis, yAxis, dim);
    var ohlcAnnotation = this.getOhlcAnnotation(xAxis, yAxis, x, y);
    var volumeAnnotation = this.getVolumeAnnotation(y);
    var percentAnnotation = this.getPercentAnnotation(x, y);
    return techan.plot.crosshair()
      .xScale(timeAnnotation.axis().scale())
      .yScale(ohlcAnnotation.axis().scale())
      .xAnnotation(timeAnnotation)
      .yAnnotation([ohlcAnnotation, percentAnnotation, volumeAnnotation])
      .verticalWireRange([0, dim.plot.height])
  },

  getTradesData(data) {
    return [
      this.getTrade(data[67], 'buy'),
      this.getTrade(data[100], 'sell'),
      this.getTrade(data[130], 'buy'),
      this.getTrade(data[170], 'sell')
    ];
  },

  getTrade(data, action) {
    return {
      date: data.date,
      type: action,
      price: data.low,
      low: data.low,
      high: data.high
    };
  }
}
