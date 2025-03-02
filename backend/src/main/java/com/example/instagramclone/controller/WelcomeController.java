package com.example.instagramclone.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class WelcomeController {

    @GetMapping("/")
    public Map<String, Object> welcome() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Welcome to Instagram Clone API");
        response.put("apiVersion", "1.0");
        response.put("endpoints", new String[] {
            "/api/users",
            "/api/posts",
            "/api/comments",
            "/api/likes"
        });
        return response;
    }
}
