/*export function getMap(level) {

}*/

export function getEmptyMap(rows, cols) {
    let map = new Array(rows);
    for (let i = 0; i < rows; i++) {
        map[i] = new Array(cols);
    }

    return map;
}
