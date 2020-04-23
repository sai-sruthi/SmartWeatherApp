package com.swe.smartweatherapi.controller;

import com.swe.smartweatherapi.entity.Notification;
import com.swe.smartweatherapi.entity.User;
import com.swe.smartweatherapi.fcm.MessagingService;
import com.swe.smartweatherapi.service.UserService;
import com.swe.smartweatherapi.util.DistanceUtil;
import okhttp3.OkHttpClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/notifications")
public class NotificationController {
    private final UserService service;
    private final DistanceUtil distanceUtil;
    // the range which will determine which
    // users get a promotional notification
    private final Double RANGE = 2.0;
    private final String TITLE = "title";
    private final String BODY = "body";
    private final String BASE_URL = "https://exp.host/--/api/v2/";
    private final String NOTIFICATIONS_SENT = "Notifications sent successfully!";

    public NotificationController(UserService service, DistanceUtil distanceUtil) {
        this.service = service;
        this.distanceUtil = distanceUtil;
    }

    @RequestMapping(
            value = "/all/{check}",
            method = RequestMethod.POST)
    public ResponseEntity triggerNotifications(@RequestBody Notification notification,
                                               @PathVariable(value = "check") String check,
                                               @RequestParam(value = "userId", defaultValue = "-1") String userId) {
        // bad coding alert (-_-)
        // this logic should be moved elsewhere,
        // coding here for the time being
        List<User> users = service.findAll();
        List<String> tokens = null;
        if (Boolean.parseBoolean(check)) {
            tokens = users.stream()
                    .map(curr -> curr.getUserToken())
                    .collect(Collectors.toList());
        } else {
            User user = service.getOne(Long.parseLong(userId));
            Double lat1 = user.getLatitude(), lon1 = user.getLongitude();
            tokens = users.stream()
                    .filter(curr -> curr.getUpdates() &&
                            !curr.getUserId().equals(user.getUserId()) &&
                            distanceUtil.distance(lat1, lon1, curr.getLatitude(), curr.getLongitude()) <= RANGE)
                    .map(curr -> curr.getUserToken())
                    .collect(Collectors.toList());
        }
        notification.setTo(tokens);
        Map<String, String> data = new HashMap<>();
        data.put(TITLE, notification.getTitle());
        data.put(BODY, notification.getBody());
        notification.setData(data);
        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .client(httpClient.build())
                .build();
        MessagingService msgService = retrofit.create(MessagingService.class);
        Call<Object> call = msgService.triggerNotifications(notification);
        try {
            call.execute();
        } catch (Exception ex) {
            // handle this later
            ex.printStackTrace();
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(NOTIFICATIONS_SENT);
    }

}
