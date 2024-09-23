// Hàm chuyển chuỗi có dấu thành không dấu
export function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
