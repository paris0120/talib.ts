import {Series} from "numbers.ts";

export class TALib {
    public static sma(value: (number | null)[] | undefined, period: number): {sma: Series} {
        return {sma: new Series(value).simpleMovingAverage(period)};
    }

    public static ema(value: (number | null)[] | undefined, period: number, smoothing: number): {ema: Series} {
        return {ema: new Series(value).simpleMovingAverage(period)};
    }

    /**
     * Modified moving average
     * @param value
     * @param period
     */
    public static mma(value: (number | null)[] | undefined, period: number): {mma: Series} {
        return {mma: new Series(value).simpleMovingAverage(period)};
    }


    public static wsma(value: (number | null)[] | undefined, weight: (number | null)[] | undefined, period: number):{mma: Series} {
        return {mma: new Series(value).weightedSimpleMovingAverage(new Series(weight), period)};
    }

    public static wema(value: (number | null)[] | undefined, weight: (number | null)[] | undefined, period: number, smoothing: number):{wema: Series} {
        return {wema: new Series(value).weightedExponentialMovingAverage(new Series(weight), period, smoothing)};
    }

    public static distance(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number):{distance: Series} {
        if(typeof value2 == 'number') return {distance: new Series(value1).distance(value2)};
        else return {distance: new Series(value1).distance(new Series(value2))};
    }

    public static subtract(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number):{subtract: Series} {
        if(typeof value2 == 'number') return {subtract: new Series(value1).subtract(value2)};
        else return {subtract: new Series(value1).subtract(new Series(value2))};
    }


    public static add(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number):{add: Series} {
        if(typeof value2 == 'number') return {add: new Series(value1).add(value2)};
        else return {add: new Series(value1).add(new Series(value2))};
    }


    public static modulo(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number):{modulo: Series} {
        if(typeof value2 == 'number') return {modulo: new Series(value1).modulo(value2)};
        else return {modulo: new Series(value1).modulo(new Series(value2))};
    }


    public static multiply(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number):{multiply: Series} {
        if(typeof value2 == 'number') return {multiply: new Series(value1).multiply(value2)};
        else return {multiply: new Series(value1).multiply(new Series(value2))};
    }



    public static divide(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number):{divide: Series} {
        if(typeof value2 == 'number') return {divide: new Series(value1).divide(value2)};
        else return {divide: new Series(value1).divide(new Series(value2))};
    }

    public static stdDev(value: (number | null)[] | undefined, average: (number | null)[] | undefined | number, period: number): {stdDev: Series}  {
        if(typeof average == 'number') return {stdDev: new Series(value).stdDev(average, period)};
        else return {stdDev: new Series(value).stdDev(new Series(average), period)};
    }


    /**
     * Variance
     * @param value
     * @param average
     * @param period
     */
    public static var(value: (number | null)[] | undefined, average: (number | null)[] | undefined, period: number): {var: Series}  {
        if(typeof average == 'number') return {var: new Series(value).variance(average, period)};
        else return {var: new Series(value).variance(new Series(average), period)};
    }

    public static macdDefault = {fastPeriod: 12, slowPeriod: 26, signalPeriod: 9};
    public static macd(close: (number | null)[] | undefined, fastPeriod: number, slowPeriod: number, signalPeriod: number): { macd: Series, macdSignal: Series, macdHist: Series } {
        let series = new Series(close);
        if (fastPeriod <= 0) throw Error("Fast period must be a positive integer.");
        if (slowPeriod <= 0) throw Error("Slow period must be a positive integer.");
        if (signalPeriod <= 0) throw Error("Signal period must be a positive integer.");
        if (slowPeriod <= fastPeriod) throw Error("Slow period must be longer than fast period.");
        let fast = series.exponentialMovingAverage(fastPeriod, 2);
        let slow = series.exponentialMovingAverage(slowPeriod, 2);

        let macd = fast.subtract(slow);
        let signal = macd.exponentialMovingAverage(signalPeriod, 2);
        let hist = macd.subtract(signal);
        return {
            macd: macd,
            macdSignal: signal,
            macdHist: hist
        }
    }

    public avgPrice(open: (number | null)[] | undefined, high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined): {avgPrice: Series} {
        if (open == undefined) throw Error("Missing open.");
        if (high == undefined) throw Error("Missing high.");
        if (low == undefined) throw Error("Missing low.");
        if (close == undefined) throw Error("Missing close.");
        if (open.length != high.length) throw Error("Open and high must have the same length.");
        if (open.length != low.length) throw Error("Open and low must have the same length.");
        if (open.length != close.length) throw Error("Open and close must have the same length.");
        return {avgPrice: new Series(open).add(new Series(high)).add(new Series(low)).add(new Series(close)).divide(4)};
    }

    /**
     * Balance Of Power
     * @param open
     * @param high
     * @param low
     * @param close
     */
    public static bop(open: (number | null)[] | undefined,high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): {bop: Series} {
        if (open == undefined) throw Error("Missing open.");
        if (high == undefined) throw Error("Missing high.");
        if (low == undefined) throw Error("Missing low.");
        if (close == undefined) throw Error("Missing close.");
        if (period <= 0 || !Number.isInteger(period)) throw Error("Fast period must be a positive integer.");
        return {bop: new Series(close).subtract(new Series(open)).divide(new Series(high).subtract(new Series(low))).simpleMovingAverage(period)}
    }

    public static bopDefault = {
        period: 14
    }


    /**
     * Commodity Channel Index
     * @param high
     * @param low
     * @param close
     * @param period
     */

    public static cci(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): {cci: Series} {
        if (high == undefined) throw Error("Missing high.");
        if (low == undefined) throw Error("Missing low.");
        if (close == undefined) throw Error("Missing close.");
        if (period <= 0 || !Number.isInteger(period)) throw Error("Fast period must be a positive integer.");
        let tp = this.typPrice(high, low, close).typPrice;
        let ma = tp.simpleMovingAverage(period);
        return {cci: tp.subtract(ma).divide(0.015).divide(tp.meanDev(ma, period))}
    }
    public static cciDefault = {
        period: 14
    }


    public static bbandsDefault = {
        period: 5,
        bandWidth: 2,
    }
    public static bbands(close: (number | null)[] | undefined, period: number, bandWidth: number): { bbandsUpper: Series; bbandsSma: Series; bbandsLower: Series } {
        if (close == undefined) throw Error("Missing close.");
        if (period <= 0) throw Error("Fast period must be a positive integer.");
        let c = new Series(close);
        let sma = c.simpleMovingAverage(period);
        let dev = c.stdDev(sma, period).multiply(bandWidth);
        let upper = sma.add(dev);
        let lower = sma.subtract(dev);
        return {
            bbandsUpper: upper,
            bbandsSma: sma,
            bbandsLower: lower,
        }
    }



    /**
     * Typical Price
     * @param high
     * @param low
     * @param close
     * @constructor
     */
    public static typPrice(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined): {typPrice: Series} {
        if (high == undefined) throw Error("Missing high.");
        if (low == undefined) throw Error("Missing low.");
        if (close == undefined) throw Error("Missing close.");
        if (high.length != low.length) throw Error("High and low must have the same length.");
        if (high.length != close.length) throw Error("High and close must have the same length.");
        return {typPrice: new Series(high).add(new Series(low)).add(new Series(close)).divide(3)};

    }


    /**
     * Weighted Close Price
     * @param high
     * @param low
     * @param close
     */
    public static wClPrice(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined): {wClPrice: Series} {
        if (high == undefined) throw Error("Missing high.");
        if (low == undefined) throw Error("Missing low.");
        if (close == undefined) throw Error("Missing close.");
        if (high.length != low.length) throw Error("High and low must have the same length.");
        if (high.length != close.length) throw Error("High and close must have the same length.");
        return { wClPrice: new Series(high).add(new Series(low)).add(new Series(close).multiply(2)).divide(4)};
    }



    /**
     * Volume-Weighted Average Price
     * @param close
     * @param volume
     * @param period
     */
    public static vwap(close: (number | null)[] | undefined, volume: (number | null)[] | undefined, period: number): {vwap: Series} {
        return {vwap: new Series(close).weightedSimpleMovingAverage(new Series(volume), period)};
    }



    /**
     * Volume-Weighted Exponential Average Price
     * @param close
     * @param volume
     * @param period
     */
    public static vweap(close: (number | null)[] | undefined, volume: (number | null)[] | undefined, period: number, smoothing: number): {vweap: Series} {
        return {vweap: new Series(close).weightedExponentialMovingAverage(new Series(volume), period, smoothing)};
    }


    /**
     * True Range
     * https://www.investopedia.com/terms/a/atr.asp
     * @param high
     * @param low
     * @param close
     */
    public static tRange(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined): {tRange: Series} {
        if (high == undefined) throw Error("Missing high value.");
        if (low == undefined) throw Error("Missing low value.");
        if (close == undefined) throw Error("Missing close average.");
        if (high.length != low.length) throw Error("High and low must have the same length.");
        if (high.length != close.length) throw Error("High and close must have the same length.");

        let c = new Series(close).lag(1);
        let h = new Series(high);
        let l = new Series(low);
        return{tRange: h.subtract(l).max(h.distance(c)).max(l.distance(c))};
    }


    /**
     * Average True Range
     * https://www.investopedia.com/terms/a/atr.asp
     *
     * @param high
     * @param low
     * @param close
     * @param period
     */
    public static atr(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): {atr: Series} {
        return {atr: this.tRange(high, low, close).tRange.simpleMovingAverage(period)};
    }
    public static atrDefault = {"period": 14};

    /**
     * Chaikin A/D Line
     * @param high
     * @param low
     * @param close
     * @param volume
     */
    public static ad(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, volume: (number | null)[] | undefined): {ad: Series} {
        if (high == undefined) throw Error("Missing high value.");
        if (low == undefined) throw Error("Missing low value.");
        if (close == undefined) throw Error("Missing close average.");
        if (volume == undefined) throw Error("Missing volume average.");
        if (high.length != low.length) throw Error("High and low must have the same length.");
        if (high.length != close.length) throw Error("High and close must have the same length.");
        if (high.length != volume.length) throw Error("High and volume must have the same length.");

        let h = new Series(high);
        let l = new Series(low);
        let c = new Series(close);
        let v = new Series(volume);
        return {ad: v.multiply(c.subtract(l).subtract(h.subtract(c)).divide(h.subtract(l)).fillNull(0)).carry()};
    }



    /**
     * Chaikin A/D Oscillator
     * https://www.investopedia.com/terms/c/chaikinoscillator.asp#:~:text=To%20calculate%20the%20Chaikin%20oscillator,around%20the%20accumulation%2Ddistribution%20line.
     * @param high
     * @param low
     * @param close
     * @param volume
     * @param fastPeriod
     * @param slowPeriod
     */
    public static adOsc(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, volume: (number | null)[] | undefined, fastPeriod: number, slowPeriod: number): {adOsc: Series} {
        let ad = this.ad(high, low, close, volume).ad;
        return {adOsc: ad.exponentialMovingAverage(fastPeriod, 2).subtract(ad.exponentialMovingAverage(slowPeriod, 2))}
    }
    public static adOscDefault = {fastPeriod: 3, slowPeriod: 10};


    /**
     * Average Directional Movement Index
     * @param high
     * @param low
     * @param close
     * @param period
     */
    public static adx(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): {adx: Series} {
        return{adx: this.dx(high, low, close, period).dx.modifiedMovingAverage(period)};
    }
    public static adxDefault = {period: 14};



    /**
     * Average Directional Movement Index Rating
     * https://www.daytrading.com/adx-adxr
     * @param high
     * @param low
     * @param close
     * @param lagPeriod
     * @param adxPeriod: period used to calulate adx
     */
    public static adxr(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, lagPeriod: number, adxPeriod: number): {adxr: Series} {
        if(lagPeriod<0) throw Error("Period must be greater than 0.")
        let adx = this.adx(high, low, close, adxPeriod);
        return {adxr: adx.adx.add(adx.adx.lag(lagPeriod)).divide(2)};
    }
    public static adxrDefault = {lagPeriod: 10, adxPeriod: 14};

    /**
     * Absolute Price Oscillator
     * @param close
     * @param fastPeriod
     * @param slowPeriod
     */
    public static apo(close: (number | null)[] | undefined, fastPeriod: number, slowPeriod: number): { apo: Series } {
        if (close == undefined) throw Error("Missing close.");
        if (fastPeriod <= 0) throw Error("Fast period must be a positive integer.");
        if (slowPeriod <= 0) throw Error("Slow period must be a positive integer.");
        if (slowPeriod <= fastPeriod) throw Error("Slow period must be longer than fast period.");
        let c = new Series(close);
        return {apo: c.exponentialMovingAverage(slowPeriod, 2).subtract(c.exponentialMovingAverage(fastPeriod, 2))};
    }

    public static apoDefault = {fastPeriod: 12, slowPeriod: 26, signalPeriod: 9};


    public static aroon(high: (number | null)[] | undefined, low: (number | null)[] | undefined, period: number): {'aroonUp':Series, 'aroonDown':Series} {
        if (high == undefined) throw Error("Missing high.");
        if (low == undefined) throw Error("Missing low.");
        if (period <= 0 || !Number.isInteger(period)) throw Error("Period must be a positive integer.");

        return {
            aroonUp: new Series(high).movingMaxDistance(period).divide(period).subtract(1).absolute(),
            aroonDown: new Series(low).movingMinDistance(period).divide(period).subtract(1).absolute()
        };
    }
    public static aroonDefault = {period: 25};


    public static aroonOsc (high: (number | null)[] | undefined, low: (number | null)[] | undefined, period: number): {'aroonOsc':Series} {
        let aroon = this.aroon(high, low, period);
        return {aroonOsc: aroon.aroonUp.subtract(aroon.aroonDown)}
    }

    public static aroonOscDefault = {period: 25};

    /**
     * Directional Movement
     * @param high
     * @param low
     */
    public static dm(high: (number | null)[] | undefined, low: (number | null)[] | undefined): {pdm: Series, ndm: Series} {
        if (high == undefined) throw Error("Missing high value.");
        if (low == undefined) throw Error("Missing low value.");
        if (high.length != low.length) throw Error("High and low must have the same length.");
        let h = new Series(high);
        let l = new Series(low);

        let up = h.subtract(h.lag(1));
        let down = l.lag(1).subtract(l);

        return {
            pdm: up.greaterThan(down).and(up.greaterThan(0)).multiply(up),
            ndm: down.greaterThan(up).and(down.greaterThan(0)).multiply(down)
        };
    }


    /**
     * Directional Index
     * https://www.investopedia.com/terms/a/adx.asp#:~:text=To%20get%20the%20ADX%2C%20continue,%2B%20current%20DX)%20%2F%2014.
     * https://www.investopedia.com/terms/p/positivedirectionalindicator.asp
     * https://en.wikipedia.org/wiki/Average_directional_movement_index
     * @param high
     * @param low
     * @param close
     * @param period
     */
    public static di(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): {pdi: Series, ndi: Series} {
        let atr =this.tRange(high, low, close).tRange.modifiedMovingAverage(period);
        let dm = this.dm(high, low);
        return {
            pdi: dm.pdm.modifiedMovingAverage(period).divide(atr).multiply(100),
            ndi: dm.ndm.modifiedMovingAverage(period).divide(atr).multiply(100)
        };
    }
    public static diDefault = {period: 14};


    /**
     * Directional Index
     * https://www.investopedia.com/terms/a/adx.asp#:~:text=To%20get%20the%20ADX%2C%20continue,%2B%20current%20DX)%20%2F%2014.
     * https://www.investopedia.com/terms/p/positivedirectionalindicator.asp
     * https://en.wikipedia.org/wiki/Average_directional_movement_index
     * @param high
     * @param low
     * @param close
     * @param period
     */
    public static dx(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): {dx:Series} {
        let di = this.di(high, low, close, period);
        return {dx: di.pdi.subtract(di.ndi).divide(di.pdi.add(di.ndi)).multiply(100)}
    }
    public static dxDefault = {period: 14};

    /**
     * Highest value over a specified period
     * @param value
     * @param period
     */
    public static movingMax(value: (number | null)[] | undefined, period:number): {movingMax: Series} {
        if(value==undefined) throw Error("Value is missing.");
        return {movingMax: new Series(value).movingMax(period)};
    }
    /**
     * Index of highest value over a specified period
     * @param value
     * @param period
     */
    public static movingMaxIndex(value: (number | null)[] | undefined, period:number): {movingMaxIndex: Series} {
        if(value==undefined) throw Error("Value is missing.");
        return {movingMaxIndex: new Series(value).movingMaxIndex(period)};
    }


    /**
     * Lowest value over a specified period
     * @param value
     * @param period
     */
    public static movingMin(value: (number | null)[] | undefined, period:number): {movingMin: Series} {
        if(value==undefined) throw Error("Value is missing.");
        return {movingMin: new Series(value).movingMin(period)};
    }


    /**
     * Index of lowest value over a specified period
     * @param value
     * @param period
     */
    public static movingMinIndex(value: (number | null)[] | undefined, period:number): {movingMinIndex: Series} {
        if(value==undefined) throw Error("Value is missing.");
        return {movingMinIndex: new Series(value).movingMinIndex(period)};
    }

}