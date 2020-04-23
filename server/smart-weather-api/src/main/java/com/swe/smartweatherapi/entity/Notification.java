package com.swe.smartweatherapi.entity;

import java.util.List;
import java.util.Map;

public class Notification {
    private List<String> to;
    private String title;
    private String body;
    private Map<String, String> data;

    public List<String> getTo() {
        return to;
    }

    public void setTo(List<String> to) {
        this.to = to;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Map<String, String> getData() {
        return data;
    }

    public void setData(Map<String, String> data) {
        this.data = data;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Notification{");
        sb.append("to=").append(to);
        sb.append(", title='").append(title).append('\'');
        sb.append(", body='").append(body).append('\'');
        sb.append(", data=").append(data);
        sb.append('}');
        return sb.toString();
    }
}
