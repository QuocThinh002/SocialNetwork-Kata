
export const getName = (fullName) => {
    const res = fullName.split(' ');
    return res[res.length - 1]
}