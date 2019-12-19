class Countdown {
  constructor(options = {}) {
    this.options = options;
    this.targetTime = new Date(this.options.targetTime).getTime();
    this.afterEnd = this.options.afterEnd;
    this.hideDayAtZero = this.options.hideDayAtZero || false;
    this.noDay = this.options.noDay || false;

    this.checkExceptions();
    this.defineSeparatorTpl();
    this.run()
  }

  checkExceptions() {
    this.optionsAreCorrectlyDefined();
    this.checkDateIsOutOfTargetDate();
  }

  optionsAreCorrectlyDefined() {
    const targetTimeOptionExist = this.options.hasOwnProperty('targetTime');
    const idOptionExist = this.options.hasOwnProperty('id');

    if (!targetTimeOptionExist || !idOptionExist) {
      throw new Error("Countdown : Date is not defined");
    }
  }

  checkDateIsOutOfTargetDate() {
    if (this.now > this.targetTime) {
      throw new Error("Countdown : Date defined > Date now");
    }
  }

  defineSeparatorTpl() {
    const separatorOptionSetToFalse = this.options.separator === false;
    if (separatorOptionSetToFalse) {
      this.separator = ""
    } else {
      this.separator = this.options.separator || ':';
    }
  }

  run() {
    this.refresh();
    this.interval = setInterval(() => {
      this.refresh();
    }, 1000);
  }

  refresh() {
      this.now = new Date().getTime();
      this.checkTimeOutOrNot();
  }

  checkTimeOutOrNot() {
    if (this.now > this.targetTime) {
      this.clearAndRunCallback();
    } else {
      this.defineTimer();
      this.render();
    }
  }

  clearAndRunCallback() {
    clearInterval(this.interval);
    if (this.afterEnd) this.afterEnd();
  }

  hideDay() {
    return !!(this.hideDayAtZero && (this.timer.day === 0 || this.timer.day === '00'));
  }

  defineTimer() {
    this.timer = {};
    let diffTime = this.targetTime - this.now;

    diffTime = Math.floor(diffTime / 1000);
    this.setTimerToSec(diffTime);

    diffTime = Math.floor((diffTime - this.timer.sec) / 60);
    this.setTimerToMin(diffTime);

    diffTime = Math.floor((diffTime - this.timer.min) / 60);
    this.setTimeToHours(diffTime);

    if (this.noDay) return;
    const remainingDay = Math.floor((diffTime - this.timer.hour) / 24);
    this.timer.day = remainingDay;
    this.addPadStartZero(remainingDay, "day");
  }


  addPadStartZero(time, timer) {
    if (time < 10) {
      this.timer[timer] = time.toString().padStart(2, '0');
    }
  }

  setTimeToHours(tmp) {
    const remainingHours =  (this.noDay) ? tmp : tmp % 24;
    this.timer.hour = remainingHours;
    this.addPadStartZero(remainingHours, "hour");
  }

  setTimerToMin(tmp) {
    const remainingMin =  tmp % 60;
    this.timer.min = remainingMin;
    this.addPadStartZero(remainingMin, "min");
  }

  setTimerToSec(tmp) {
    const remainingSec = tmp % 60;
    this.timer.sec = remainingSec;
    this.addPadStartZero(remainingSec, "sec");
  }

  render() {
    let {tplDay, tpl} = this.createTemplate();

    this.el = document.getElementById(this.options.id);
    this.el.innerHTML = (this.hideDay() || this.noDay) ? tpl : tplDay+tpl;
  }

  createItem(timer, modifier) {
    return `<span class="ds-Countdown-item ds-Countdown-item--${modifier}">${timer}</span>`;
  }

  createTemplate() {
    let tplDay = this.createItem(this.timer.day, 'day') + this.separator;
    let tpl = this.createItem(this.timer.hour, 'hour')
        + this.separator
        + this.createItem(this.timer.min, 'min')
        + this.separator
        + this.createItem(this.timer.sec, 'sec');
    return {tplDay, tpl};
  }
}


module.exports = Countdown;
