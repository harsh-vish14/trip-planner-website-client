const DateConverter = (day = 0, month = 0, year = 0) => {
        var sday = day.toString();
        var smonth = month.toString();
        var syear = year.toString();
        if (sday.length == 1) {
            sday = '0' + sday;
        }
        if (smonth.length == 1) {
            smonth = '0' + smonth;
        }
        return sday + '-' + smonth + '-' + syear
}
export default DateConverter;