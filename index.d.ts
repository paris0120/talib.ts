import { Series } from "numbers.ts";
export declare class TALib {
    static sma(value: (number | null)[] | undefined, period: number): {
        sma: Series;
    };
    static ema(value: (number | null)[] | undefined, period: number, smoothing: number): {
        ema: Series;
    };
    static dema(value: (number | null)[] | undefined, period: number, smoothing: number): {
        dema: Series;
    };
    /**
     * Modified moving average
     * @param value
     * @param period
     */
    static mma(value: (number | null)[] | undefined, period: number): {
        mma: Series;
    };
    static wsma(value: (number | null)[] | undefined, weight: (number | null)[] | undefined, period: number): {
        mma: Series;
    };
    static wema(value: (number | null)[] | undefined, weight: (number | null)[] | undefined, period: number, smoothing: number): {
        wema: Series;
    };
    static distance(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number): {
        distance: Series;
    };
    static subtract(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number): {
        subtract: Series;
    };
    static add(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number): {
        add: Series;
    };
    static modulo(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number): {
        modulo: Series;
    };
    static multiply(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number): {
        multiply: Series;
    };
    static divide(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number): {
        divide: Series;
    };
    static stdDev(value: (number | null)[] | undefined, average: (number | null)[] | undefined | number, period: number): {
        stdDev: Series;
    };
    /**
     * Variance
     * @param value
     * @param average
     * @param period
     */
    static var(value: (number | null)[] | undefined, average: (number | null)[] | undefined, period: number): {
        var: Series;
    };
    static macdDefault: {
        fastPeriod: number;
        slowPeriod: number;
        signalPeriod: number;
    };
    static macd(close: (number | null)[] | undefined, fastPeriod: number, slowPeriod: number, signalPeriod: number): {
        macd: Series;
        macdSignal: Series;
        macdHist: Series;
    };
    avgPrice(open: (number | null)[] | undefined, high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined): {
        avgPrice: Series;
    };
    /**
     * Balance Of Power
     * @param open
     * @param high
     * @param low
     * @param close
     */
    static bop(open: (number | null)[] | undefined, high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): {
        bop: Series;
    };
    static bopDefault: {
        period: number;
    };
    /**
     * Commodity Channel Index
     * @param high
     * @param low
     * @param close
     * @param period
     */
    static cci(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): {
        cci: Series;
    };
    static cciDefault: {
        period: number;
    };
    static bbandsDefault: {
        period: number;
        bandWidth: number;
    };
    static bbands(close: (number | null)[] | undefined, period: number, bandWidth: number): {
        bbandsLower: Series;
        bbandsSma: Series;
        bbandsUpper: Series;
    };
    /**
     * Typical Price
     * @param high
     * @param low
     * @param close
     * @constructor
     */
    static typPrice(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined): {
        typPrice: Series;
    };
    /**
     * Weighted Close Price
     * @param high
     * @param low
     * @param close
     */
    static wClPrice(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined): {
        wClPrice: Series;
    };
    /**
     * Volume-Weighted Average Price
     * @param close
     * @param volume
     * @param period
     */
    static vwap(close: (number | null)[] | undefined, volume: (number | null)[] | undefined, period: number): {
        vwap: Series;
    };
    /**
     * Volume-Weighted Exponential Average Price
     * @param close
     * @param volume
     * @param period
     */
    static vweap(close: (number | null)[] | undefined, volume: (number | null)[] | undefined, period: number, smoothing: number): {
        vweap: Series;
    };
    /**
     * True Range
     * https://www.investopedia.com/terms/a/atr.asp
     * @param high
     * @param low
     * @param close
     */
    static tRange(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined): {
        tRange: Series;
    };
    /**
     * Average True Range
     * https://www.investopedia.com/terms/a/atr.asp
     *
     * @param high
     * @param low
     * @param close
     * @param period
     */
    static atr(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): {
        atr: Series;
    };
    static atrDefault: {
        period: number;
    };
    /**
     * Money Flow Index
     * @param high
     * @param low
     * @param close
     * @param volume
     * @param period
     */
    static mfi(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, volume: (number | null)[] | undefined, period: number): {
        mfi: Series;
    };
    static mfiDefault: {
        period: number;
    };
    /**
     * Chande Momentum Oscillator
     * @param close
     * @param period
     */
    static cmo(close: (number | null)[] | undefined, period: number): {
        cmo: Series;
    };
    static cmoDefault: {
        period: number;
    };
    /**
     * Chaikin A/D Line
     * @param high
     * @param low
     * @param close
     * @param volume
     */
    static ad(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, volume: (number | null)[] | undefined): {
        ad: Series;
    };
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
    static adOsc(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, volume: (number | null)[] | undefined, fastPeriod: number, slowPeriod: number): {
        adOsc: Series;
    };
    static adOscDefault: {
        fastPeriod: number;
        slowPeriod: number;
    };
    /**
     * Average Directional Movement Index
     * @param high
     * @param low
     * @param close
     * @param period
     */
    static adx(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): {
        adx: Series;
    };
    static adxDefault: {
        period: number;
    };
    /**
     * Average Directional Movement Index Rating
     * https://www.daytrading.com/adx-adxr
     * @param high
     * @param low
     * @param close
     * @param lagPeriod
     * @param adxPeriod: period used to calulate adx
     */
    static adxr(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, lagPeriod: number, adxPeriod: number): {
        adxr: Series;
    };
    static adxrDefault: {
        lagPeriod: number;
        adxPeriod: number;
    };
    /**
     * Absolute Price Oscillator
     * @param close
     * @param fastPeriod
     * @param slowPeriod
     */
    static apo(close: (number | null)[] | undefined, fastPeriod: number, slowPeriod: number): {
        apo: Series;
    };
    static apoDefault: {
        fastPeriod: number;
        slowPeriod: number;
        signalPeriod: number;
    };
    static aroon(high: (number | null)[] | undefined, low: (number | null)[] | undefined, period: number): {
        'aroonUp': Series;
        'aroonDown': Series;
    };
    static aroonDefault: {
        period: number;
    };
    static aroonOsc(high: (number | null)[] | undefined, low: (number | null)[] | undefined, period: number): {
        'aroonOsc': Series;
    };
    static aroonOscDefault: {
        period: number;
    };
    /**
     * Directional Movement
     * @param high
     * @param low
     */
    static dm(high: (number | null)[] | undefined, low: (number | null)[] | undefined): {
        pdm: Series;
        ndm: Series;
    };
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
    static di(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): {
        pdi: Series;
        ndi: Series;
    };
    static diDefault: {
        period: number;
    };
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
    static dx(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): {
        dx: Series;
    };
    static dxDefault: {
        period: number;
    };
    /**
     * Relative Strength Index
     * @param close
     * @param period
     */
    static rsi(close: (number | null)[] | undefined, period: number): {
        rsi: Series;
    };
    static rsiDefault: {
        period: number;
    };
    static stochRsi(close: (number | null)[] | undefined, rsiPeriod: number, period: number): {
        stochRsi: Series;
    };
    static stochRsiDefault: {
        rsiPeriod: number;
        period: number;
    };
    /**
     * Parabolic SAR
     * @param high
     * @param low
     * @param af
     * @param maxAf
     */
    static sar(high: (number | null)[], low: (number | null)[], af: number, maxAf: number): {
        rpsar: Series;
        fpsar: Series;
    };
    static sarDefault: {
        af: number;
        maxAf: number;
    };
    /**
     * Highest value over a specified period
     * @param value
     * @param period
     */
    static movingMax(value: (number | null)[] | undefined, period: number): {
        movingMax: Series;
    };
    /**
     * Index of highest value over a specified period
     * @param value
     * @param period
     */
    static movingMaxIndex(value: (number | null)[] | undefined, period: number): {
        movingMaxIndex: Series;
    };
    /**
     * Lowest value over a specified period
     * @param value
     * @param period
     */
    static movingMin(value: (number | null)[] | undefined, period: number): {
        movingMin: Series;
    };
    /**
     * Index of lowest value over a specified period
     * @param value
     * @param period
     */
    static movingMinIndex(value: (number | null)[] | undefined, period: number): {
        movingMinIndex: Series;
    };
}
