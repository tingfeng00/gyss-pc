export const calculatetolPage = (count, Rows) => { // 获取两个值第一个总条数第二个每页条数
    let AllData = count
    if (AllData % Rows != 0) {
        let result = ((AllData - AllData % Rows) / Rows + 1) * 10
        return parseInt(result)
    } else {
        let result = (AllData / Rows) * 10
        return parseInt(result)
    }
}
