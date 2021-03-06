! function() {

    var today = moment();
    selected_dates = {}
    press = true;

    function Calendar(selector) {
        this.el = document.querySelector(selector);
        this.current = moment().date(1);
        this.draw();
    }

    Calendar.prototype.draw = function() {
        //Create Header
        this.drawHeader();

        //Draw Month
        this.drawMonth();

        //highlight selected
        var addselectedDates = function(self) {
            var current_dates = selected_dates[self.current.year() + "-" + self.current.month()]
            var next_month = (self.current.month() + 1) % 12;
            if (self.current.month() != 0) {
                var last_month = (self.current.month() - 1) % 12;
            } else {
                var last_month = 11;
            }
            if (next_month == 0) {
                var next_dates = selected_dates[(self.current.year() + 1) + "-" + next_month];
            } else {
                var next_dates = selected_dates[self.current.year() + "-" + next_month];
            }
            if (last_month == 11) {
                var last_dates = selected_dates[(self.current.year() - 1) + "-" + last_month];
            } else {
                var last_dates = selected_dates[self.current.year() + "-" + last_month];
            }
            for (var date in current_dates) {
                dates_obj = current_dates[date];
                document.querySelector(`[month="${dates_obj.month()}"][day="${dates_obj.date()}"][year="${dates_obj.year()}"]`).classList.add("selected");
            }
            for (var date in next_dates) {
                dates_obj = next_dates[date];
                var obj = document.querySelector(`[month="${dates_obj.month()}"][day="${dates_obj.date()}"][year="${dates_obj.year()}"]`);
                if (obj != null) {
                    obj.classList.add("selected");
                }
            }
            for (var date in last_dates) {
                dates_obj = last_dates[date];
                var obj = document.querySelector(`[month="${dates_obj.month()}"][day="${dates_obj.date()}"][year="${dates_obj.year()}"]`);
                if (obj != null) {
                    obj.classList.add("selected");
                }
            }
        }
        setTimeout(addselectedDates, 500, this);

    };
    Calendar.prototype.drawHeader = function() {
        var self = this;
        if (!this.header) {
            //Create the header elements
            this.header = createElement('div', 'header fadeIn first');
            this.header.className = 'header';

            this.title = createElement('h1');

            var right = createElement('div', 'right');
            right.addEventListener('click', function() {
                if (press) {
                    self.nextMonth();
                    press = false;
                    setTimeout(function() {
                        press = true;
                    }, 700);
                }
            });

            var left = createElement('div', 'left');
            left.addEventListener('click', function() {
                if (press) {
                    self.prevMonth();
                    press = false;
                    setTimeout(function() {
                        press = true;
                    }, 700);
                }
            });

            //Append the Elements
            this.header.appendChild(this.title);
            this.header.appendChild(right);
            this.header.appendChild(left);
            this.el.appendChild(this.header);
        }

        this.title.innerHTML = this.current.format('MMMM YYYY');
    };

    Calendar.prototype.drawMonth = function() {
        var self = this;


        if (this.month) {
            this.oldMonth = this.month;
            this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
            this.oldMonth.addEventListener('webkitAnimationEnd', function() {
                self.oldMonth.parentNode.removeChild(self.oldMonth);
                self.month = createElement('div', 'month');
                self.backFill();
                self.currentMonth();
                self.fowardFill();
                self.el.appendChild(self.month);
                window.setTimeout(function() {
                    self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
                }, 16);
            });
        } else {
            this.month = createElement('div', 'month fadeIn second');
            this.el.appendChild(this.month);
            this.backFill();
            this.currentMonth();
            this.fowardFill();
            this.month.className = 'month new';
        }

    };

    Calendar.prototype.backFill = function() {
        var clone = this.current.clone();
        var dayOfWeek = clone.day();

        if (!dayOfWeek) {
            return;
        }

        clone.subtract('days', dayOfWeek + 1);

        for (var i = dayOfWeek; i > 0; i--) {
            if (window.CP.shouldStopExecution(0)) break;
            this.drawDay(clone.add('days', 1));
        }
        window.CP.exitedLoop(0);
    };

    Calendar.prototype.fowardFill = function() {
        var clone = this.current.clone().add('months', 1).subtract('days', 1);
        var dayOfWeek = clone.day();

        if (dayOfWeek === 6) {
            return;
        }

        for (var i = dayOfWeek; i < 6; i++) {
            if (window.CP.shouldStopExecution(1)) break;
            this.drawDay(clone.add('days', 1));
        }
        window.CP.exitedLoop(1);
    };

    Calendar.prototype.currentMonth = function() {
        var clone = this.current.clone();

        while (clone.month() === this.current.month()) {
            if (window.CP.shouldStopExecution(2)) break;
            this.drawDay(clone);
            clone.add('days', 1);
        }
        window.CP.exitedLoop(2);
    };

    Calendar.prototype.getWeek = function(day) {
        if (!this.week || day.day() === 0) {
            this.week = createElement('div', 'week');
            this.month.appendChild(this.week);
        }
    };

    Calendar.prototype.drawDay = function(day) {
        var self = this;
        this.getWeek(day);

        //Outer Day
        var outer = createElement('div', this.getDayClass(day));
        outer.addEventListener('click', function() {
            self.openDay(this);
        });

        outer.setAttribute("year", day.year())
        outer.setAttribute("month", day.month())
        outer.setAttribute("day", day.date())


        //Day Name
        var name = createElement('div', 'day-name', day.format('ddd'));

        //Day Number
        var number = createElement('div', 'day-number', day.format('DD'));


        //Events
        var events = createElement('div', 'day-events');
        this.drawEvents(day, events);

        outer.appendChild(name);
        outer.appendChild(number);
        this.week.appendChild(outer);
    };

    Calendar.prototype.drawEvents = function(day, element) {
        if (day.month() === this.current.month()) {}
    };

    Calendar.prototype.getDayClass = function(day) {
        classes = ['day'];
        if (day.month() !== this.current.month()) {
            classes.push('other');
        } else if (today.isSame(day, 'day')) {
            classes.push('today');
        }
        return classes.join(' ');
    };

    Calendar.prototype.openDay = function(el) {

        var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
        var day = this.current.clone().date(dayNumber);

        day.month(Number(el.getAttribute("month")));
        day.year(el.getAttribute("year"))
        var index = day.year() + "-" + day.month();

        if (el.classList.contains("selected")) {
            el.classList.remove("selected");

            delete selected_dates[index][day.date()]

        } else {
            el.classList.add("selected");
            if (selected_dates[index] === undefined) {
                selected_dates[index] = {}
            }
            selected_dates[index][day.date()] = day

        }

    };



    Calendar.prototype.nextMonth = function() {
        this.current.add('months', 1);
        this.next = true;
        this.draw();
    };

    Calendar.prototype.prevMonth = function() {
        this.current.subtract('months', 1);
        this.next = false;
        this.draw();
    };

    window.Calendar = Calendar;

    function createElement(tagName, className, innerText) {
        var ele = document.createElement(tagName);
        if (className) {
            ele.className = className;
        }
        if (innerText) {
            ele.innderText = ele.textContent = innerText;
        }
        return ele;
    }
}();

! function() {


    function addDate(ev) {

    }

    var calendar = new Calendar('#calendarContent');

}();