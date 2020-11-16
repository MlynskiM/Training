// Można napisać module.exports.getDate = getDate; 
// Używane jeżeli mamy więcej funkcji.

//module.exports=getDate;
// /module.exports.getDate = ()=>  {
exports.getDate = ()=>  {

    const today = new Date();
        const options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        };
    return  today.toLocaleDateString('pl-GB', options);
}