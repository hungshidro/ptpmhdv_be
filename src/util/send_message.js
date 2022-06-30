const axios = require('axios').default;

module.exports = (id, context) => {
    const res = axios({
        url: 'https://api.telegram.org/bot5337417078:AAEjO9rw39AQClD-CciO_NYIi-zVpMMlgVY/sendMessage',
        method: 'post',
        data: {
            chat_id: id,
            text: context
        }
    })
    .then((res) => res.data)
    .catch((error) =>{console.log(error.toJSON())})
    .then((data) => {
        if(data.ok) console.log('Gui tin nhan thanh cong den id ' + String(id))
    })
}
