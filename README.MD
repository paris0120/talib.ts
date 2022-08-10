#TALib.js
This library is a replication of TA-Lib with Typescript. This library will include with all functions from the original TA-Lib (https://www.ta-lib.org/function.html) and more. Compared with the other wrapped versions of TA-Lib, this library is implemented with pure Typescript, so it can be used at both front and back ends. This library also corrects the calculation errors in the original TA-Lib (marked with *).

## Quick Guide

### Install

npm install talib.ts@latest --S

### Import
import {TALib} from "talib.ts";

### Input
The input columns must be an array of numbers or null. All the time frame with null input values will be skipped. 

### Output
The output is a map with all the output field(s).

### Default Parameters
For some functions, the default parameters can be found from TALib.[function name]Default. For example for MACD the default values are stored in TALib.macdDefault

### Example
import { TALib } from 'talibjs';
 
close = [your close price array];

//For MACD with the default parameters

output = TALib.macd(index, close, TALib.macdDefault.fastPeriod, TALib.macdDefault.slowPeriod, TALib.macdDefault.signalPeriod);

let macd = output.get('macd');

let signal = output.get('signal');

let hist = output.get('hist');

 
## Function List:

### TA-Lib function list (Partially implemented): 

AD: Chaikin A/D Line

ADOSC: Chaikin A/D 

ADX*: Average Directional Movement Index

ADXR: Average Directional Movement Index Rating

APO: Absolute Price Oscillator

AROON: Aroon

AROONOSC: Aroon Oscillator

ATR*: Average True Range

AVGPRICE: Average Price

BBANDS: Bollinger Bands

BETA                Beta

BOP: Balance Of Power

CCI: Commodity Channel Index

CDL2CROWS           Two Crows

CDL3BLACKCROWS      Three Black Crows

CDL3INSIDE          Three Inside Up/Down

CDL3LINESTRIKE      Three-Line Strike

CDL3OUTSIDE         Three Outside Up/Down

CDL3STARSINSOUTH    Three Stars In The South

CDL3WHITESOLDIERS   Three Advancing White Soldiers

CDLABANDONEDBABY    Abandoned Baby

CDLADVANCEBLOCK     Advance Block

CDLBELTHOLD         Belt-hold

CDLBREAKAWAY        Breakaway

CDLCLOSINGMARUBOZU  Closing Marubozu

CDLCONCEALBABYSWALL Concealing Baby Swallow

CDLCOUNTERATTACK    Counterattack

CDLDARKCLOUDCOVER   Dark Cloud Cover

CDLDOJI             Doji

CDLDOJISTAR         Doji Star

CDLDRAGONFLYDOJI    Dragonfly Doji

CDLENGULFING        Engulfing Pattern

CDLEVENINGDOJISTAR  Evening Doji Star

CDLEVENINGSTAR      Evening Star

CDLGAPSIDESIDEWHITE Up/Down-gap side-by-side white lines

CDLGRAVESTONEDOJI   Gravestone Doji

CDLHAMMER           Hammer

CDLHANGINGMAN       Hanging Man

CDLHARAMI           Harami Pattern

CDLHARAMICROSS      Harami Cross Pattern

CDLHIGHWAVE         High-Wave Candle

CDLHIKKAKE          Hikkake Pattern

CDLHIKKAKEMOD       Modified Hikkake Pattern

CDLHOMINGPIGEON     Homing Pigeon

CDLIDENTICAL3CROWS  Identical Three Crows

CDLINNECK           In-Neck Pattern

CDLINVERTEDHAMMER   Inverted Hammer

CDLKICKING          Kicking

CDLKICKINGBYLENGTH  Kicking - bull/bear determined by the longer marubozu

CDLLADDERBOTTOM     Ladder Bottom

CDLLONGLEGGEDDOJI   Long Legged Doji

CDLLONGLINE         Long Line Candle

CDLMARUBOZU         Marubozu

CDLMATCHINGLOW      Matching Low

CDLMATHOLD          Mat Hold

CDLMORNINGDOJISTAR  Morning Doji Star

CDLMORNINGSTAR      Morning Star

CDLONNECK           On-Neck Pattern

CDLPIERCING         Piercing Pattern

CDLRICKSHAWMAN      Rickshaw Man

CDLRISEFALL3METHODS Rising/Falling Three Methods

CDLSEPARATINGLINES  Separating Lines

CDLSHOOTINGSTAR     Shooting Star

CDLSHORTLINE        Short Line Candle

CDLSPINNINGTOP      Spinning Top

CDLSTALLEDPATTERN   Stalled Pattern

CDLSTICKSANDWICH    Stick Sandwich

CDLTAKURI           Takuri (Dragonfly Doji with very long lower shadow)

CDLTASUKIGAP        Tasuki Gap

CDLTHRUSTING        Thrusting Pattern

CDLTRISTAR          Tristar Pattern

CDLUNIQUE3RIVER     Unique 3 River

CDLUPSIDEGAP2CROWS  Upside Gap Two Crows

CDLXSIDEGAP3METHODS Upside/Downside Gap Three Methods

CMO: Chande Momentum Oscillator

CORREL              Pearson's Correlation Coefficient (r)

DEMA: Double Exponential Moving Average

DX: Directional Movement Index

EMA: Exponential Moving Average

HT_DCPERIOD         Hilbert Transform - Dominant Cycle Period

HT_DCPHASE          Hilbert Transform - Dominant Cycle Phase

HT_PHASOR           Hilbert Transform - Phasor Components

HT_SINE             Hilbert Transform - SineWave

HT_TRENDLINE        Hilbert Transform - Instantaneous Trendline

HT_TRENDMODE        Hilbert Transform - Trend vs Cycle Mode

KAMA                Kaufman Adaptive Moving Average

LINEARREG           Linear Regression

LINEARREG_ANGLE     Linear Regression Angle
 
LINEARREG_INTERCEPT Linear Regression Intercept

LINEARREG_SLOPE     Linear Regression Slope

MACD: Moving Average Convergence/Divergence

MAMA                MESA Adaptive Moving Average

MAX: Highest value over a specified period (renamed to MOVINGMAX)

MAXINDEX: Index of highest value over a specified period (renamed to MOVINGMAXINDEX)

MEDPRICE            Median Price

MFI: Money Flow Index

MIDPOINT            MidPoint over period

MIDPRICE            Midpoint Price over period

MIN: Lowest value over a specified period (renamed to MOVINGMIN)

MININDEX: Index of lowest value over a specified period (renamed to MOVINGMININDEX)

MINMAX              Lowest and highest values over a specified period

MINMAXINDEX         Indexes of lowest and highest values over a specified period

MINUS_DI: Minus Directional Indicator (included in DI as ndi)

MINUS_DM: Minus Directional Movement (included in DM as ndm)

MOM                 Momentum

NATR                Normalized Average True Range

OBV                 On Balance Volume

PLUS_DI: Plus Directional Indicator (included in DI as pdi)

PLUS_DM: Plus Directional Movement (included in Dm as pdm)

PPO                 Percentage Price Oscillator

ROC                 Rate of change : ((price/prevPrice)-1)*100

ROCP                Rate of change Percentage: (price-prevPrice)/prevPrice

ROCR                Rate of change ratio: (price/prevPrice)

ROCR100             Rate of change ratio 100 scale: (price/prevPrice)*100

RSI: Relative Strength Index

SAR: Parabolic SAR

SAREXT              Parabolic SAR - Extended

SMA: Simple Moving Average

STDDEV: Standard Deviation

STOCH               Stochastic

STOCHF              Stochastic Fast

STOCHRSI: Stochastic Relative Strength Index

SUM                 Summation

T3                  Triple Exponential Moving Average (T3)

TEMA                Triple Exponential Moving Average

TRANGE              True Range

TRIMA               Triangular Moving Average

TRIX                1-day Rate-Of-Change (ROC) of a Triple Smooth EMA

TSF                 Time Series Forecast

TYPPRICE: Typical Price

ULTOSC              Ultimate Oscillator

VAR: Variance

WCLPRICE: Weighted Close Price

WILLR               Williams' %R

WMA                 Weighted Moving Average



### Extra function list:

#### Basic operators:

Minus

Plus

Multiply

Divide

Modulo

#### Indicators:

DI: Directional Index

DM: Directional Movement

MMA: Modified moving average

VWAP: Volume-Weighted Average Price

VWEAP: Volume-Weighted Exponential Average Price

WEMA: Weighted Exponential Moving Average

WSMA: Weighted Moving Average
