package com.swe.smartweatherapi.fcm;

import com.swe.smartweatherapi.entity.Notification;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface MessagingService {

    @POST(value = "push/send")
    public Call<Object> triggerNotifications(@Body Notification notification);

}
