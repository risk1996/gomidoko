import day from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ja";
import DurationPlugin from "dayjs/plugin/duration";

day.extend(DurationPlugin);

export default day;
