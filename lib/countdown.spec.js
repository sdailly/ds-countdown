const countdown = require('./countdown.es6.js');

describe('Initialize & should be return throw exception', () => {
    it('When no have targetTime property in options object', () => {
        try {
            new countdown();
        } catch (e) {
            expect(e.message).toBe('Countdown : Date is not defined')
        }
    });

    it('When no have id property in options object ', () => {
        try {
            new countdown({
                targetTime: '2020-01-01 00:00:00'
            });
        } catch (e) {
            expect(e.message).toBe('Countdown : Date is not defined')
        }
    });

    it('When date is already out ', () => {
        try {
            new countdown({
                id: 'selector',
                targetTime: '2010-01-01 00:00:00'
            });
        } catch (e) {
            expect(e.message).toBe('Countdown : Date defined > Date now')
        }
    });
});

describe('Check separator template', () => {
    it('separator is ":" when have no option', () => {
        const ds = new countdown({
            id: 'selector',
            targetTime: '2020-01-01 00:00:00'
        });
        ds.render = jest.fn();

        expect(ds.separator).toBe(':')
    });

    it('should be return empty separator template when option is set to false', () => {
        const ds = new countdown({
            id: 'selector',
            targetTime: '2020-01-01 00:00:00',
            separator: false
        });

        expect(ds.separator).toBe('')
    });

    it('should be return ? separator when option is set "?" ', () => {
        const ds = new countdown({
            id: 'selector',
            targetTime: '2020-01-01 00:00:00',
            separator: "?"
        });

        expect(ds.separator).toBe('?');
    });
});

describe('check timer', () => {

    const setCountdown = (now = 1576683353935) => {
        const cd = new countdown({
            id: 'selector',
            targetTime: '2020-01-01 00:00:00',
            separator: false
        });
        cd.now = now;
        cd.defineTimer();
        return cd;
    };

    describe('check values with 0 padStart', () => {
        const now = new Date('2019-12-30 22:51:55').getTime()
        const ds = setCountdown(now);
        it('timer.day should be return 01 ', () => {
            expect(ds.timer.day).toBe('01')
        });

        it('timer.hour should be return 01 ', () => {
            expect(ds.timer.hour).toBe('01')
        });

        it('timer.min should be return 08 ', () => {
            expect(ds.timer.min).toBe('08')
        });

        it('timer.sec should be return 05 ', () => {
            expect(ds.timer.sec).toBe('05')
        });
    });


    describe('check value of timer - when dateNow = 1576683353935 & targetTime = 2020-01-01 00:00:00', () => {
        const ds = setCountdown();
        it('timer.day should be return 13 ', () => {
            expect(ds.timer.day).toBe(13)
        });

        it('timer.min should be return 24', () => {
            expect(ds.timer.min).toBe(24)
        });

        it('timer.hour should be return 07', () => {
            expect(ds.timer.hour).toBe('07')
        });
    });

    describe('check template values', () => {
        const ds = setCountdown();
        it('all dates', () => {
            const {tpl, tplDay} = ds.createTemplate();
            const expectTemplate = `<span class="ds-Countdown-item ds-Countdown-item--hour">07</span><span class="ds-Countdown-item ds-Countdown-item--min">24</span><span class="ds-Countdown-item ds-Countdown-item--sec">06</span>`;
            expect(tpl).toEqual(expectTemplate);
        });

        it('day only', () => {
            const {tpl, tplDay} = ds.createTemplate();
            const expectTemplate = `<span class="ds-Countdown-item ds-Countdown-item--day">13</span>`;
            expect(tplDay).toEqual(expectTemplate);
        })
    });

    describe('check template values with noday property', () => {
        const ds = new countdown({
            id: 'selector',
            targetTime: '2020-01-01 00:00:00',
            separator: false,
            noDay: true,
        });
        ds.now = 1576683353935;
        ds.defineTimer();
        ds.render = jest.fn();


        it('should be return 319H', () => {
            const {tpl, tplDay} = ds.createTemplate();
            const expectTemplate = `<span class="ds-Countdown-item ds-Countdown-item--hour">319</span><span class="ds-Countdown-item ds-Countdown-item--min">24</span><span class="ds-Countdown-item ds-Countdown-item--sec">06</span>`;
            expect(tpl).toEqual(expectTemplate);
        });

        it('check if clearAndRunCallback methods has be called after time out', () => {
            ds.clearAndRunCallback = jest.fn();
            ds.now = 1580511600000; // 2020-02-01 00:00:00
            ds.checkTimeOutOrNot();
            expect(ds.clearAndRunCallback).toBeCalled();
        });

        it('check if clearAndRunCallback methods has be called after time out', () => {
            ds.clearAndRunCallback = jest.fn();
            ds.defineTimer = jest.fn();
            ds.now = 1576683353935; // 2020-02-01 00:00:00
            ds.checkTimeOutOrNot();
            expect(ds.defineTimer).toBeCalled();
        });
    });

    it('hideDay return true when hideDayAtZeroOpts option is set to true et timer.day === 0 ', () => {
        const ds = new countdown({
            id: 'selector',
            targetTime: '2019-12-19 20:00:00',
            separator: false,
            hideDayAtZero: true,
        });
        expect(ds.hideDay()).toBe(true);
    });
});
