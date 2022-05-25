import {Series} from "numbers.ts/lib";

export class TALib {
    public static sma(value: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        let series = new Series(value);
        return new Map([["sma", series.simpleMovingAverage(period).getValue()]]);
    }

    public static ema(value: (number | null)[] | undefined, period: number, smoothing: number): Map<string, (number | null)[]> {
        let series = new Series(value);
        return new Map([["sma", series.exponentialMovingAverage(period, smoothing).getValue()]]);
    }

    /**
     * Modified moving average
     * @param value
     * @param period
     */
    public static mma(value: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        let series = new Series(value);
        return new Map([["sma", series.modifiedMovingAverage(period).getValue()]]);
    }


    public static wsma(value: (number | null)[] | undefined, weight: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        let series = new Series(value);
        let seriesWeight = new Series(weight);
        return new Map([["sma", series.weightedSimpleMovingAverage(seriesWeight, period).getValue()]]);
    }

    public static wema(value: (number | null)[] | undefined, weight: (number | null)[] | undefined, period: number, smoothing: number): Map<string, (number | null)[]> {
        let series = new Series(value);
        let seriesWeight = new Series(weight);
        return new Map([["sma", series.weightedExponentialMovingAverage(seriesWeight, period, smoothing).getValue()]]);
    }



    public static distance(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number): Map<string, (number | null)[]> {
        let series = new Series(value1);
        if(typeof value2 == 'number') return new Map([["distance", series.distance(value2).getValue()]]);
        else return new Map([["distance", series.distance(new Series(value2)).getValue()]]);
    }


    public static subtract(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number): Map<string, (number | null)[]> {
        let series = new Series(value1);
        if(typeof value2 == 'number') return new Map([["subtract", series.subtract(value2).getValue()]]);
        else return new Map([["subtract", series.subtract(new Series(value2)).getValue()]]);
    }

    public static add(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number): Map<string, (number | null)[]> {
        let series = new Series(value1);
        if(typeof value2 == 'number') return new Map([["add", series.add(value2).getValue()]]);
        else return new Map([["add", series.add(new Series(value2)).getValue()]]);
    }


    public static modulo(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number): Map<string, (number | null)[]> {
        let series = new Series(value1);
        if(typeof value2 == 'number') return new Map([["modulo", series.modulo(value2).getValue()]]);
        else return new Map([["modulo", series.modulo(new Series(value2)).getValue()]]);
    }

    public static multiply(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number): Map<string, (number | null)[]> {
        let series = new Series(value1);
        if(typeof value2 == 'number') return new Map([["multiply", series.multiply(value2).getValue()]]);
        else return new Map([["multiply", series.multiply(new Series(value2)).getValue()]]);
    }


    public static divide(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number): Map<string, (number | null)[]> {
        let series = new Series(value1);
        if(typeof value2 == 'number') return new Map([["divide", series.divide(value2).getValue()]]);
        else return new Map([["divide", series.divide(new Series(value2)).getValue()]]);
    }

    public static stddev(value: (number | null)[] | undefined, average: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        let series = new Series(value);
        let seriesAverage = new Series(average);
        return new Map([["stddev", series.stdDev(seriesAverage, period).getValue()]]);
    }


    /**
     * Variance
     * @param value
     * @param average
     * @param period
     */
    public static var(value: (number | null)[] | undefined, average: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        let series = new Series(value);
        let seriesAverage = new Series(average);
        return new Map([["var", series.variance(seriesAverage, period).getValue()]]);
    }

    public static macdDefault = new Map([["fastPeriod", 12],["slowPeriod", 26],["signalPeriod", 9]]);

    public static macd(close: (number | null)[] | undefined, fastPeriod: number, slowPeriod: number, signalPeriod: number): Map<string, (number | null)[]> {
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

        // @ts-ignore
        return new Map([
            ["macd", macd.getValue()],
            ["macd_signal", signal.getValue()],
            ["macd_hist", hist.getValue()],
        ]);
    }

    public avgPrice(open: (number | null)[] | undefined, high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined) {
        if (open == undefined) throw Error("Missing open.");
        if (high == undefined) throw Error("Missing high.");
        if (low == undefined) throw Error("Missing low.");
        if (close == undefined) throw Error("Missing close.");
        if (open.length != high.length) throw Error("Open and high must have the same length.");
        if (open.length != low.length) throw Error("Open and low must have the same length.");
        if (open.length != close.length) throw Error("Open and close must have the same length.");
        return new Map([["avgPrice", new Series(open).add(new Series(high)).add(new Series(low)).add(new Series(close)).divide(4).getValue()]]);

    }


    public static bbandsDefault = new Map([["period", 5],["bandWidth", 2]]);
    public static bbands(close: (number | null)[] | undefined, period: number, bandWidth: number): Map<string, (number | null)[]> {
        if (close == undefined) throw Error("Missing close.");
        if (period <= 0) throw Error("Fast period must be a positive integer.");
        let c = new Series(close);
        let sma = c.simpleMovingAverage(period);
        let dev = c.stdDev(sma, period).multiply(bandWidth);
        let upper = c.add(dev);
        let lower = c.subtract(dev);

        // @ts-ignore
        return new Map([
            ["bbands_upper", upper.getValue()],
            ["bbands_sma", sma.getValue()],
            ["bbands_lower", lower.getValue()],
        ]);
    }



    /**
     * Typical Price
     * @param high
     * @param low
     * @param close
     * @constructor
     */
    public TypPrice(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined) {
        if (high == undefined) throw Error("Missing high.");
        if (low == undefined) throw Error("Missing low.");
        if (close == undefined) throw Error("Missing close.");
        if (high.length != low.length) throw Error("High and low must have the same length.");
        if (high.length != close.length) throw Error("High and close must have the same length.");



        let avgPrice: (number | null)[] = [];
        for(let i = 0; i<open.length; i++) {
            if(high[i]==null || low[i]==null || close[i]==null) avgPrice.push(null);
            else { // @ts-ignore
                avgPrice.push((high[i] + low[i] + close[i])/3);
            }
        }
        return new Map([["TypPrice", new Series(high).add(new Series(low)).add(new Series(close)).divide(3).getValue()]]);

    }


    /**
     * Weighted Close Price
     * @param high
     * @param low
     * @param close
     */
    public wClPrice(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined) {
        if (high == undefined) throw Error("Missing high.");
        if (low == undefined) throw Error("Missing low.");
        if (close == undefined) throw Error("Missing close.");
        if (high.length != low.length) throw Error("High and low must have the same length.");
        if (high.length != close.length) throw Error("High and close must have the same length.");
        return new Map([["wClPrice", new Series(high).add(new Series(low)).add(new Series(close).multiply(2)).divide(4).getValue()]]);

    }



    /**
     * Volume-Weighted Average Price
     * @param close
     * @param volume
     * @param period
     */
    public static vwap(close: (number | null)[] | undefined, volume: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {

        return new Map([
            ["vwap", new Series(close).weightedSimpleMovingAverage(new Series(volume), period).getValue()]
        ]);
    }



    /**
     * Volume-Weighted Exponential Average Price
     * @param close
     * @param volume
     * @param period
     */
    public static vweap(close: (number | null)[] | undefined, volume: (number | null)[] | undefined, period: number, smoothing: number): Map<string, (number | null)[]> {

        return new Map([
            ["vweap", new Series(close).weightedExponentialMovingAverage(new Series(volume), period, smoothing).getValue()]
        ]);
    }


    /**
     * True Range
     * https://www.investopedia.com/terms/a/atr.asp
     * @param high
     * @param low
     * @param close
     */
    public static tRange(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined): Map<string, (number | null)[]> {
        if (high == undefined) throw Error("Missing high value.");
        if (low == undefined) throw Error("Missing low value.");
        if (close == undefined) throw Error("Missing close average.");
        if (high.length != low.length) throw Error("High and low must have the same length.");
        if (high.length != close.length) throw Error("High and close must have the same length.");

        let c = new Series(close).lag(1);
        let h = new Series(high);
        let l = new Series(low);
        return new Map([["tRange", h.subtract(l).max(h.distance(c)).max(l.distance(c)).getValue()]]);
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
    public static atr(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        let tr = new Series(this.tRange(high, low, close).get('tRange'));
        // @ts-ignore
        return new Map([["atr", tr.simpleMovingAverage(period).getValue()]]);
    }
    public static atrDefault = new Map([["period", 14]]);


    /**
     * Chaikin A/D Line
     * @param high
     * @param low
     * @param close
     * @param volume
     */
    public static ad(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, volume: (number | null)[] | undefined): Map<string, (number | null)[]> {
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
        return new Map([["ad", v.multiply(c.subtract(l).subtract(h.add(c))).divide(h.subtract(l)).carry().getValue()]]);
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
    public static adOsc(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, volume: (number | null)[] | undefined, fastPeriod: number, slowPeriod: number): Map<string, (number | null)[]> {
        let ad = new Series(this.ad(high, low, close, volume).get("ad"));
        // @ts-ignore
        return new Map([["adOsc", ad.exponentialMovingAverage(fastPeriod).subtract(ad.exponentialMovingAverage(slowPeriod)).getValue()]]);
    }
    public static adOscDefault = new Map([["fastPeriod", 3], ["slowPeriod", 10]]);


    /**
     * Average Directional Movement Index
     * @param high
     * @param low
     * @param close
     * @param period
     */
    public static adx(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        return new Map([["adx", new Series(this.dx(high, low, close, period).get('dx')).modifiedMovingAverage(period).getValue()]]);
    }
    public static adxDefault = new Map([["period", 14]]);



    /**
     * Average Directional Movement Index Rating
     * https://www.daytrading.com/adx-adxr
     * @param high
     * @param low
     * @param close
     * @param lagPeriod
     * @param adxPeriod: period used to calulate adx
     */
    public static adxr(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, lagPeriod: number, adxPeriod: number): Map<string, (number | null)[]> {
        if(lagPeriod<0) throw Error("Period must be greater than 0.")
        let adx = new Series(this.adx(high, low, close, adxPeriod).get('adx'));
        return new Map([["adxr", adx.add(adx.lag(lagPeriod)).divide(2).getValue()]]);
    }
    public static adxrDefault = new Map([["period", 10],["adxPeriod", 14]]);



    /**
     * Absolute Price Oscillator
     * @param close
     * @param fastPeriod
     * @param slowPeriod
     */
    public static apo(close: (number | null)[] | undefined, fastPeriod: number, slowPeriod: number): Map<string, (number | null)[]> {
        if (close == undefined) throw Error("Missing close.");
        if (fastPeriod <= 0) throw Error("Fast period must be a positive integer.");
        if (slowPeriod <= 0) throw Error("Slow period must be a positive integer.");
        if (slowPeriod <= fastPeriod) throw Error("Slow period must be longer than fast period.");
        let c = new Series(close);
        return new Map([["apo", c.exponentialMovingAverage(slowPeriod, 2).subtract(c.exponentialMovingAverage(fastPeriod, 2)).getValue()]]);
    }

    public static apoDefault = new Map([["fastPeriod", 12],["slowPeriod", 26],["signalPeriod", 9]]);


    /**
     * Directional Movement
     * @param high
     * @param low
     */
    public static dm(high: (number | null)[] | undefined, low: (number | null)[] | undefined): Map<string, (number | null)[]> {
        if (high == undefined) throw Error("Missing high value.");
        if (low == undefined) throw Error("Missing low value.");
        if (high.length != low.length) throw Error("High and low must have the same length.");
        let h = new Series(high);
        let l = new Series(low);

        let up = h.subtract(h.lag(1));
        let down = l.lag(1).subtract(l);

        return new Map([
            ["pdm", up.greaterThan(down).and(up.greaterThan(0)).multiply(up).getValue()],
            ["ndm", down.greaterThan(up).and(down.greaterThan(0)).multiply(down).getValue()]
        ]);
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
    public static di(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        // @ts-ignore
        let atr = new Series(this.atr(high, low, close, period).get('atr'));
        let dm = this.dm(high, low);
        return new Map([
            ["pdi",  new Series(dm.get('pdm')).modifiedMovingAverage(period).divide(atr).multiply(100).getValue()],
            ["ndi",  new Series(dm.get('ndm')).modifiedMovingAverage(period).divide(atr).multiply(100).getValue()]
        ]);
    }
    public static diDefault = new Map([["period", 14]]);


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
    public static dx(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        // @ts-ignore
        let di = this.di(high, low, close, period);
        let pdi = new Series(di.get('pdi'));
        let ndi = new Series(di.get('ndi'));
        return new Map([["dx", pdi.subtract(ndi).divide(pdi.add(ndi)).multiply(100).getValue()]]);
    }
    public static dxDefault = new Map([["period", 14]]);




    /**
     * Highest value over a specified period
     * @param value
     * @param period
     */
    public static movingMax(value: (number | null)[] | undefined, period:number): Map<string, (number | null)[]> {
        if(value==undefined) throw Error("Value is missing.");
        return new Map([["movingMax", new Series(value).movingMax(period).getValue()]]);
    }
    /**
     * Index of highest value over a specified period
     * @param value
     * @param period
     */
    public static movingMaxIndex(value: (number | null)[] | undefined, period:number): Map<string, (number | null)[]> {
        if(value==undefined) throw Error("Value is missing.");
        return new Map([["movingMaxIndex", new Series(value).movingMaxIndex(period).getValue()]]);
    }


    /**
     * Lowest value over a specified period
     * @param value
     * @param period
     */
    public static movingMin(value: (number | null)[] | undefined, period:number): Map<string, (number | null)[]> {
        if(value==undefined) throw Error("Value is missing.");
        return new Map([["movingMin", new Series(value).movingMin(period).getValue()]]);
    }


    /**
     * Index of lowest value over a specified period
     * @param value
     * @param period
     */
    public static movingMinIndex(value: (number | null)[] | undefined, period:number): Map<string, (number | null)[]> {
        if(value==undefined) throw Error("Value is missing.");
        return new Map([["movingMinIndex", new Series(value).movingMinIndex(period).getValue()]]);
    }

}