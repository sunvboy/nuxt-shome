import dayjs, { locale } from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import localeVi from "dayjs/locale/vi"
dayjs.locale(localeVi)
dayjs.extend(relativeTime);

export default function(option,inject){
    inject('dayjs',dayjs)
}