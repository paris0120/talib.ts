"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TALib = void 0;
const numbers_ts_1 = require("numbers.ts");
class TALib {
    static sma(value, period) {
        return { sma: new numbers_ts_1.Series(value).simpleMovingAverage(period) };
    }
    static ema(value, period, smoothing) {
        return { ema: new numbers_ts_1.Series(value).exponentialMovingAverage(period, smoothing) };
    }
    static dema(value, period, smoothing) {
        let ema = new numbers_ts_1.Series(value).exponentialMovingAverage(period, smoothing);
        return { dema: ema.multiply(2).subtract(ema.exponentialMovingAverage(period, smoothing)) };
    }
    /**
     * Modified moving average
     * @param value
     * @param period
     */
    static mma(value, period) {
        return { mma: new numbers_ts_1.Series(value).modifiedMovingAverage(period) };
    }
    static wsma(value, weight, period) {
        return { mma: new numbers_ts_1.Series(value).weightedSimpleMovingAverage(new numbers_ts_1.Series(weight), period) };
    }
    static wema(value, weight, period, smoothing) {
        return { wema: new numbers_ts_1.Series(value).weightedExponentialMovingAverage(new numbers_ts_1.Series(weight), period, smoothing) };
    }
    static distance(value1, value2) {
        if (typeof value2 == 'number')
            return { distance: new numbers_ts_1.Series(value1).distance(value2) };
        else
            return { distance: new numbers_ts_1.Series(value1).distance(new numbers_ts_1.Series(value2)) };
    }
    static subtract(value1, value2) {
        if (typeof value2 == 'number')
            return { subtract: new numbers_ts_1.Series(value1).subtract(value2) };
        else
            return { subtract: new numbers_ts_1.Series(value1).subtract(new numbers_ts_1.Series(value2)) };
    }
    static add(value1, value2) {
        if (typeof value2 == 'number')
            return { add: new numbers_ts_1.Series(value1).add(value2) };
        else
            return { add: new numbers_ts_1.Series(value1).add(new numbers_ts_1.Series(value2)) };
    }
    static modulo(value1, value2) {
        if (typeof value2 == 'number')
            return { modulo: new numbers_ts_1.Series(value1).modulo(value2) };
        else
            return { modulo: new numbers_ts_1.Series(value1).modulo(new numbers_ts_1.Series(value2)) };
    }
    static multiply(value1, value2) {
        if (typeof value2 == 'number')
            return { multiply: new numbers_ts_1.Series(value1).multiply(value2) };
        else
            return { multiply: new numbers_ts_1.Series(value1).multiply(new numbers_ts_1.Series(value2)) };
    }
    static divide(value1, value2) {
        if (typeof value2 == 'number')
            return { divide: new numbers_ts_1.Series(value1).divide(value2) };
        else
            return { divide: new numbers_ts_1.Series(value1).divide(new numbers_ts_1.Series(value2)) };
    }
    static stdDev(value, average, period) {
        if (typeof average == 'number')
            return { stdDev: new numbers_ts_1.Series(value).stdDev(average, period) };
        else
            return { stdDev: new numbers_ts_1.Series(value).stdDev(new numbers_ts_1.Series(average), period) };
    }
    /**
     * Variance
     * @param value
     * @param average
     * @param period
     */
    static var(value, average, period) {
        if (typeof average == 'number')
            return { var: new numbers_ts_1.Series(value).variance(average, period) };
        else
            return { var: new numbers_ts_1.Series(value).variance(new numbers_ts_1.Series(average), period) };
    }
    static macd(close, fastPeriod, slowPeriod, signalPeriod) {
        let series = new numbers_ts_1.Series(close);
        if (fastPeriod <= 0)
            throw Error("Fast period must be a positive integer.");
        if (slowPeriod <= 0)
            throw Error("Slow period must be a positive integer.");
        if (signalPeriod <= 0)
            throw Error("Signal period must be a positive integer.");
        if (slowPeriod <= fastPeriod)
            throw Error("Slow period must be longer than fast period.");
        let fast = series.exponentialMovingAverage(fastPeriod, 2);
        let slow = series.exponentialMovingAverage(slowPeriod, 2);
        let macd = fast.subtract(slow);
        let signal = macd.exponentialMovingAverage(signalPeriod, 2);
        let hist = macd.subtract(signal);
        return {
            macd: macd,
            macdSignal: signal,
            macdHist: hist
        };
    }
    avgPrice(open, high, low, close) {
        if (open == undefined)
            throw Error("Missing open.");
        if (high == undefined)
            throw Error("Missing high.");
        if (low == undefined)
            throw Error("Missing low.");
        if (close == undefined)
            throw Error("Missing close.");
        if (open.length != high.length)
            throw Error("Open and high must have the same length.");
        if (open.length != low.length)
            throw Error("Open and low must have the same length.");
        if (open.length != close.length)
            throw Error("Open and close must have the same length.");
        return { avgPrice: new numbers_ts_1.Series(open).add(new numbers_ts_1.Series(high)).add(new numbers_ts_1.Series(low)).add(new numbers_ts_1.Series(close)).divide(4) };
    }
    /**
     * Balance Of Power
     * @param open
     * @param high
     * @param low
     * @param close
     */
    static bop(open, high, low, close, period) {
        if (open == undefined)
            throw Error("Missing open.");
        if (high == undefined)
            throw Error("Missing high.");
        if (low == undefined)
            throw Error("Missing low.");
        if (close == undefined)
            throw Error("Missing close.");
        if (period <= 0 || !Number.isInteger(period))
            throw Error("Fast period must be a positive integer.");
        return { bop: new numbers_ts_1.Series(close).subtract(new numbers_ts_1.Series(open)).divide(new numbers_ts_1.Series(high).subtract(new numbers_ts_1.Series(low))).simpleMovingAverage(period) };
    }
    /**
     * Commodity Channel Index
     * @param high
     * @param low
     * @param close
     * @param period
     */
    static cci(high, low, close, period) {
        if (high == undefined)
            throw Error("Missing high.");
        if (low == undefined)
            throw Error("Missing low.");
        if (close == undefined)
            throw Error("Missing close.");
        if (period <= 0 || !Number.isInteger(period))
            throw Error("Fast period must be a positive integer.");
        let tp = this.typPrice(high, low, close).typPrice;
        let ma = tp.simpleMovingAverage(period);
        return { cci: tp.subtract(ma).divide(0.015).divide(tp.meanDev(ma, period)) };
    }
    static bbands(close, period, bandWidth) {
        if (close == undefined)
            throw Error("Missing close.");
        if (period <= 0)
            throw Error("Fast period must be a positive integer.");
        let c = new numbers_ts_1.Series(close);
        let sma = c.simpleMovingAverage(period);
        let dev = c.stdDev(sma, period).multiply(bandWidth);
        let upper = sma.add(dev);
        let lower = sma.subtract(dev);
        return {
            bbandsLower: lower,
            bbandsSma: sma,
            bbandsUpper: upper,
        };
    }
    /**
     * Typical Price
     * @param high
     * @param low
     * @param close
     * @constructor
     */
    static typPrice(high, low, close) {
        if (high == undefined)
            throw Error("Missing high.");
        if (low == undefined)
            throw Error("Missing low.");
        if (close == undefined)
            throw Error("Missing close.");
        if (high.length != low.length)
            throw Error("High and low must have the same length.");
        if (high.length != close.length)
            throw Error("High and close must have the same length.");
        return { typPrice: new numbers_ts_1.Series(high).add(new numbers_ts_1.Series(low)).add(new numbers_ts_1.Series(close)).divide(3) };
    }
    /**
     * Weighted Close Price
     * @param high
     * @param low
     * @param close
     */
    static wClPrice(high, low, close) {
        if (high == undefined)
            throw Error("Missing high.");
        if (low == undefined)
            throw Error("Missing low.");
        if (close == undefined)
            throw Error("Missing close.");
        if (high.length != low.length)
            throw Error("High and low must have the same length.");
        if (high.length != close.length)
            throw Error("High and close must have the same length.");
        return { wClPrice: new numbers_ts_1.Series(high).add(new numbers_ts_1.Series(low)).add(new numbers_ts_1.Series(close).multiply(2)).divide(4) };
    }
    /**
     * Volume-Weighted Average Price
     * @param close
     * @param volume
     * @param period
     */
    static vwap(close, volume, period) {
        return { vwap: new numbers_ts_1.Series(close).weightedSimpleMovingAverage(new numbers_ts_1.Series(volume), period) };
    }
    /**
     * Volume-Weighted Exponential Average Price
     * @param close
     * @param volume
     * @param period
     */
    static vweap(close, volume, period, smoothing) {
        return { vweap: new numbers_ts_1.Series(close).weightedExponentialMovingAverage(new numbers_ts_1.Series(volume), period, smoothing) };
    }
    /**
     * True Range
     * https://www.investopedia.com/terms/a/atr.asp
     * @param high
     * @param low
     * @param close
     */
    static tRange(high, low, close) {
        if (high == undefined)
            throw Error("Missing high value.");
        if (low == undefined)
            throw Error("Missing low value.");
        if (close == undefined)
            throw Error("Missing close average.");
        if (high.length != low.length)
            throw Error("High and low must have the same length.");
        if (high.length != close.length)
            throw Error("High and close must have the same length.");
        let c = new numbers_ts_1.Series(close).lag(1);
        let h = new numbers_ts_1.Series(high);
        let l = new numbers_ts_1.Series(low);
        return { tRange: h.subtract(l).max(h.distance(c)).max(l.distance(c)) };
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
    static atr(high, low, close, period) {
        return { atr: this.tRange(high, low, close).tRange.modifiedMovingAverage(period) };
    }
    /**
     * Money Flow Index
     * @param high
     * @param low
     * @param close
     * @param volume
     * @param period
     */
    static mfi(high, low, close, volume, period) {
        let tp = this.typPrice(high, low, close).typPrice;
        let mf = tp.multiply(new numbers_ts_1.Series(volume));
        let diff = tp.subtract(tp.lag(1));
        return { mfi: diff.greaterThan(0).multiply(mf).simpleMovingAverage(period).divide(diff.lessThan(0).multiply(mf).simpleMovingAverage(period)).subtract(1).power(-1).multiply(100).add(100) };
    }
    /**
     * Chande Momentum Oscillator
     * @param close
     * @param period
     */
    static cmo(close, period) {
        let diff = new numbers_ts_1.Series(close).subtract(new numbers_ts_1.Series(close).lag(1));
        let up = diff.greaterThan(0).multiply(diff).simpleMovingAverage(period);
        let down = diff.lessThan(0).multiply(diff).simpleMovingAverage(period);
        return { cmo: up.add(down).divide(up.subtract(down)).multiply(100) };
    }
    /**
     * Chaikin A/D Line
     * @param high
     * @param low
     * @param close
     * @param volume
     */
    static ad(high, low, close, volume) {
        if (high == undefined)
            throw Error("Missing high value.");
        if (low == undefined)
            throw Error("Missing low value.");
        if (close == undefined)
            throw Error("Missing close average.");
        if (volume == undefined)
            throw Error("Missing volume average.");
        if (high.length != low.length)
            throw Error("High and low must have the same length.");
        if (high.length != close.length)
            throw Error("High and close must have the same length.");
        if (high.length != volume.length)
            throw Error("High and volume must have the same length.");
        let h = new numbers_ts_1.Series(high);
        let l = new numbers_ts_1.Series(low);
        let c = new numbers_ts_1.Series(close);
        let v = new numbers_ts_1.Series(volume);
        return { ad: v.multiply(c.subtract(l).subtract(h.subtract(c)).divide(h.subtract(l)).fillError(0)).carry() };
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
    static adOsc(high, low, close, volume, fastPeriod, slowPeriod) {
        let ad = this.ad(high, low, close, volume).ad;
        return { adOsc: ad.exponentialMovingAverage(fastPeriod, 2).subtract(ad.exponentialMovingAverage(slowPeriod, 2)) };
    }
    /**
     * Average Directional Movement Index
     * @param high
     * @param low
     * @param close
     * @param period
     */
    static adx(high, low, close, period) {
        return { adx: this.dx(high, low, close, period).dx.modifiedMovingAverage(period) };
    }
    /**
     * Average Directional Movement Index Rating
     * https://www.daytrading.com/adx-adxr
     * @param high
     * @param low
     * @param close
     * @param lagPeriod
     * @param adxPeriod: period used to calulate adx
     */
    static adxr(high, low, close, lagPeriod, adxPeriod) {
        if (lagPeriod < 0)
            throw Error("Period must be greater than 0.");
        let adx = this.adx(high, low, close, adxPeriod);
        return { adxr: adx.adx.add(adx.adx.lag(lagPeriod)).divide(2) };
    }
    /**
     * Absolute Price Oscillator
     * @param close
     * @param fastPeriod
     * @param slowPeriod
     */
    static apo(close, fastPeriod, slowPeriod) {
        if (close == undefined)
            throw Error("Missing close.");
        if (fastPeriod <= 0)
            throw Error("Fast period must be a positive integer.");
        if (slowPeriod <= 0)
            throw Error("Slow period must be a positive integer.");
        if (slowPeriod <= fastPeriod)
            throw Error("Slow period must be longer than fast period.");
        let c = new numbers_ts_1.Series(close);
        return { apo: c.exponentialMovingAverage(slowPeriod, 2).subtract(c.exponentialMovingAverage(fastPeriod, 2)) };
    }
    static aroon(high, low, period) {
        if (high == undefined)
            throw Error("Missing high.");
        if (low == undefined)
            throw Error("Missing low.");
        if (period <= 0 || !Number.isInteger(period))
            throw Error("Period must be a positive integer.");
        return {
            aroonUp: new numbers_ts_1.Series(high).movingMaxDistance(period).divide(period).subtract(1).absolute(),
            aroonDown: new numbers_ts_1.Series(low).movingMinDistance(period).divide(period).subtract(1).absolute()
        };
    }
    static aroonOsc(high, low, period) {
        let aroon = this.aroon(high, low, period);
        return { aroonOsc: aroon.aroonUp.subtract(aroon.aroonDown) };
    }
    /**
     * Directional Movement
     * @param high
     * @param low
     */
    static dm(high, low) {
        if (high == undefined)
            throw Error("Missing high value.");
        if (low == undefined)
            throw Error("Missing low value.");
        if (high.length != low.length)
            throw Error("High and low must have the same length.");
        let h = new numbers_ts_1.Series(high);
        let l = new numbers_ts_1.Series(low);
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
    static di(high, low, close, period) {
        let atr = this.tRange(high, low, close).tRange.modifiedMovingAverage(period);
        let dm = this.dm(high, low);
        return {
            pdi: dm.pdm.modifiedMovingAverage(period).divide(atr).multiply(100),
            ndi: dm.ndm.modifiedMovingAverage(period).divide(atr).multiply(100)
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
    static dx(high, low, close, period) {
        //let di = this.di(high, low, close, period);
        let dm = this.dm(high, low);
        let pdi = dm.pdm.modifiedMovingAverage(period);
        let ndi = dm.ndm.modifiedMovingAverage(period);
        return { dx: pdi.subtract(ndi).divide(pdi.add(ndi)).multiply(100) };
    }
    /**
     * Relative Strength Index
     * @param close
     * @param period
     */
    static rsi(close, period) {
        let ret = new numbers_ts_1.Series(close).divide(new numbers_ts_1.Series(close)).subtract(1);
        return { rsi: ret.greaterThan(0).multiply(ret).simpleMovingAverage(period).divide(ret.lessThan(0).multiply(ret).simpleMovingAverage(period)).subtract(1).power(-1).multiply(100).add(100) };
    }
    static stochRsi(close, rsiPeriod, period) {
        let rsi = this.rsi(close, rsiPeriod).rsi;
        let min = rsi.movingMin(period);
        return { stochRsi: rsi.subtract(min).divide(rsi.max(period).subtract(min)) };
    }
    /**
     * Parabolic SAR
     * @param high
     * @param low
     * @param af
     * @param maxAf
     */
    static sar(high, low, af, maxAf) {
        let rpsar = new numbers_ts_1.Series([]);
        let fpsar = new numbers_ts_1.Series([]);
        let f = af;
        let r = true;
        let ep = 0;
        let sar = null;
        let first = null;
        for (let i = 0; i < high.length; i++) {
            if (high[i] != null && high[i] != null) {
                if (first == null) {
                    first = i;
                    rpsar.push(null);
                    fpsar.push(null);
                }
                else if (sar == null) {
                    if (high[first] + low[first] > high[i] + low[i]) {
                        r = false;
                        ep = Math.min(low[first], low[i]);
                        sar = Math.max(high[first], high[i]);
                        rpsar.push(null);
                        fpsar.push(sar);
                    }
                    else {
                        r = true;
                        ep = Math.max(high[first], high[i]);
                        sar = Math.min(low[first], low[i]);
                        fpsar.push(null);
                        rpsar.push(sar);
                    }
                }
                else {
                    sar += f * (ep - sar);
                    if (r) {
                        if (high[i] > ep) {
                            f = Math.min(af + f, maxAf);
                            ep = high[i];
                        }
                        if (low[i] <= sar) {
                            r = false;
                            sar = ep;
                            ep = low[i];
                            fpsar.push(sar);
                            rpsar.push(null);
                            f = af;
                        }
                        else {
                            rpsar.push(sar);
                            fpsar.push(null);
                        }
                    }
                    else {
                        if (low[i] < ep) {
                            f = Math.min(af + f, maxAf);
                            ep = low[i];
                        }
                        if (high[i] >= sar) {
                            r = true;
                            sar = ep;
                            ep = high[i];
                            rpsar.push(sar);
                            fpsar.push(null);
                            f = af;
                        }
                        else {
                            fpsar.push(sar);
                            rpsar.push(null);
                        }
                    }
                }
            }
            else {
                rpsar.push(null);
                fpsar.push(null);
            }
        }
        return { rpsar: rpsar, fpsar: fpsar };
    }
    /**
     * Highest value over a specified period
     * @param value
     * @param period
     */
    static movingMax(value, period) {
        if (value == undefined)
            throw Error("Value is missing.");
        return { movingMax: new numbers_ts_1.Series(value).movingMax(period) };
    }
    /**
     * Index of highest value over a specified period
     * @param value
     * @param period
     */
    static movingMaxIndex(value, period) {
        if (value == undefined)
            throw Error("Value is missing.");
        return { movingMaxIndex: new numbers_ts_1.Series(value).movingMaxIndex(period) };
    }
    /**
     * Lowest value over a specified period
     * @param value
     * @param period
     */
    static movingMin(value, period) {
        if (value == undefined)
            throw Error("Value is missing.");
        return { movingMin: new numbers_ts_1.Series(value).movingMin(period) };
    }
    /**
     * Index of lowest value over a specified period
     * @param value
     * @param period
     */
    static movingMinIndex(value, period) {
        if (value == undefined)
            throw Error("Value is missing.");
        return { movingMinIndex: new numbers_ts_1.Series(value).movingMinIndex(period) };
    }
}
exports.TALib = TALib;
TALib.macdDefault = { fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 };
TALib.bopDefault = {
    period: 14
};
TALib.cciDefault = {
    period: 14
};
TALib.bbandsDefault = {
    period: 5,
    bandWidth: 2,
};
TALib.atrDefault = { "period": 14 };
TALib.mfiDefault = { "period": 14 };
TALib.cmoDefault = { "period": 14 };
TALib.adOscDefault = { fastPeriod: 3, slowPeriod: 10 };
TALib.adxDefault = { period: 14 };
TALib.adxrDefault = { lagPeriod: 10, adxPeriod: 14 };
TALib.apoDefault = { fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 };
TALib.aroonDefault = { period: 25 };
TALib.aroonOscDefault = { period: 25 };
TALib.diDefault = { period: 14 };
TALib.dxDefault = { period: 14 };
TALib.rsiDefault = { period: 14 };
TALib.stochRsiDefault = { rsiPeriod: 14, period: 14 };
TALib.sarDefault = { af: 0.02, maxAf: 0.2 };
