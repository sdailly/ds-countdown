class Countdown {
  constructor(options = {}) {
    this.options = options;
    this.now = new Date().getTime();
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
    if (!(this.options.hasOwnProperty('targetTime')) || !(this.options.hasOwnProperty('id'))) {
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
      this.separator = (this.options.separator && typeof this.options.separator == "string") ? this.options.separator : ":"
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
      this.checkTimeOutorNot();
  }

  checkTimeOutorNot() {
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
    let tmp = this.targetTime - this.now;
    tmp = Math.floor(tmp/1000);
    this.timer.sec = tmp % 60;
    this.timer.sec = (this.timer.sec < 10) ? `0${this.timer.sec}` : this.timer.sec;

    tmp = Math.floor((tmp-this.timer.sec)/60);
    this.timer.min = tmp % 60;
    this.timer.min = (this.timer.min < 10) ? `0${this.timer.min}` : this.timer.min;

    tmp = Math.floor((tmp-this.timer.min)/60);
    this.timer.hour = (this.noDay) ? tmp : tmp % 24;
    this.timer.hour = (this.timer.hour < 10) ? `0${this.timer.hour}` : this.timer.hour;

    if (this.noDay) return;
    tmp = Math.floor((tmp-this.timer.hour)/24);
    this.timer.day = tmp;
    this.timer.day = (this.timer.day < 10) ? `0${this.timer.day}` : this.timer.day;
  }


  render() {
    let {tplDay, tpl} = this.createTemplate();

    this.el = document.getElementById(this.options.id);
    this.el.innerHTML = (this.hideDay() || this.noDay) ? tpl : tplDay+tpl;
  }

  createTemplate() {
    let tplDay = `<span class="ds-Countdown-item ds-Countdown-item--day">${this.timer.day}</span>${this.separator}`
    let tpl = `<span class="ds-Countdown-item ds-Countdown-item--hour">${this.timer.hour}</span>${this.separator}<span class="ds-Countdown-item ds-Countdown-item--min">${this.timer.min}</span>${this.separator}<span class="ds-Countdown-item ds-Countdown-item--sec">${this.timer.sec}</span>`;
    return {tplDay, tpl};
  }
}


module.exports = Countdown;
