const helpers = {
    ifEqual: (x, y) => {
        if (x === y) {
            return true;
        } else {
            return false;
        };
    },
    format_date: (date) => {
        return date.toLocaleDateString();
    }
};

export default helpers;