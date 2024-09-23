function convertTime(isoDate) {
    const now = new Date();
    const time = new Date(isoDate);
    const diff = (now - time) / 1000; // tính thời gian chênh lệch bằng giây
    
    const intervals = {
        year: 365*24*60*60,
        month: 30*24*60*60,
        week: 7*24*60*60,
        day: 24*60*60,
        hour: 60*60,
        minute: 60,
        second: 1,
    };

    let unit = "second";
    let value = diff;

    // Nếu chênh lệch quá 3 ngày, trả về ngày cụ thể theo định dạng dd/mm/yyyy
    if (diff >= intervals.day * 3) {
        const day = time.getDate().toString().padStart(2, '0');
        const month = (time.getMonth() + 1).toString().padStart(2, '0'); // getMonth() trả về tháng từ 0-11
        const year = time.getFullYear();
        return `${day}/${month}/${year}`; // Trả về ngày cụ thể
    }

    // Tìm đơn vị thời gian phù hợp
    for (const [key, seconds] of Object.entries(intervals)) {
        if (diff >= seconds) {
            unit = key;
            value = Math.floor(diff / seconds);
            break;
        }
    }

    // Sử dụng Intl.RelativeTimeFormat để hiển thị thời gian
    const rtf = new Intl.RelativeTimeFormat('vi', { numeric: 'auto' });
    return rtf.format(-value, unit);
}

export default convertTime;

// Ví dụ sử dụng
// const isoDate = "2024-09-14T00:51:04.034Z";
// console.log(convertTime(isoDate));  // Kết quả sẽ là ngày cụ thể nếu hơn 3 ngày trước
