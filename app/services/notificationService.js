import axios from 'axios';
import config from '../../config';

const SUCCESS_MESSAGE = "Notifications sent successfully!";

export const sendNotifications = async (userId, notification) => {
    let check = false;
    axios.post(config.server + "/notifications/all/false?userId=" + userId, notification)
        .then(function (response) {
            if (response.data == SUCCESS_MESSAGE) {
                check = true;
            }
        })
        .catch(function (error) {
            // display a toast, ask to try again
        })
        .finally(function () {
            if (check) {
                alert("Promotional notifications sent successfully!");
            } else {
                // display a toast
                console.log(check);
            }
        });
}