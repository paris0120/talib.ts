import {TALib} from "../index";

describe('testing index file', () => {
    let open = [146.28,145.7,145.47,145.47,145.12,145.02,145.25,145.19,144.97,144.95];
    let high = [146.59,145.74,145.7,145.47,145.12,145.26,145.27,145.25,145.01,145.13];
    let low = [145.85,145.53,145.4,145.0,144.92,145.0,145.12,144.91,144.92,144.93];
    let close = [146.2,145.58,145.47,145.12,145.03,145.11,145.25,144.98,144.98,145.1];
    let volume = [9294955,1013555,1010936,1036917,841699,947339,771789,1480890,1308324,967320];
    test('+ - * / % ^', () => {
        expect(TALib.adx(high, low, close, 4).adx.getValue()).toEqual([null, null, null, null, null, null, null, -76.36825350866403, -76.01342634661, -65.40211226154518]);
        expect(TALib.tRange(high, low, close).tRange.getValue()).toEqual([null, 0.6699999999999875, 0.29999999999998295, 0.46999999999999886, 0.20000000000001705, 0.2599999999999909, 0.1599999999999966, 0.3400000000000034, 0.09000000000000341, 0.19999999999998863,]);
    });

});