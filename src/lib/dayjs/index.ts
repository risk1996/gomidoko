import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ja";
import DurationPlugin from "dayjs/plugin/duration";

dayjs.extend(DurationPlugin);

export default dayjs;
