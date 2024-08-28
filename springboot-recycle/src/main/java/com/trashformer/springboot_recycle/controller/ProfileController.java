package com.trashformer.springboot_recycle.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.trashformer.springboot_recycle.entity.KakaoUserEntity;
import com.trashformer.springboot_recycle.service.KakaoUserService;
import com.trashformer.springboot_recycle.util.JwtUtil;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class ProfileController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private KakaoUserService kakaoUserService;

    @PostMapping("/oauth/kakao/callback")
    public Map<String, String> handleKakaoCallback(@RequestBody Map<String, String> requestData) {
        String code = requestData.get("code");

        // 엑세스 토큰 요청
        String clientId = "dcedd1709d6d717e342a5c8ecea26356"; // 여기에 자신의 앱 REST API 키를 입력하세요.
        String redirectUri = "http://localhost:3000/login/oauth2/callback/kakao";

        String tokenRequestUrl = "https://kauth.kakao.com/oauth/token"
                + "?grant_type=authorization_code"
                + "&client_id=" + clientId
                + "&redirect_uri=" + redirectUri
                + "&code=" + code;

        HttpHeaders tokenHeaders = new HttpHeaders();
        tokenHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<String> tokenRequestEntity = new HttpEntity<>(tokenHeaders);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(tokenRequestUrl, tokenRequestEntity, Map.class);

        String accessToken = (String) tokenResponse.getBody().get("access_token");

        //////////////////////////////////////위에는 엑세스토큰 받아오는거 밑에는 정보 받아오는거////////////////////////////////////

        // 사용자 정보 요청
        HttpHeaders profileHeaders = new HttpHeaders();
        profileHeaders.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> profileEntity = new HttpEntity<>(profileHeaders);
        ResponseEntity<Map> profileResponse = restTemplate.postForEntity("https://kapi.kakao.com/v2/user/me", profileEntity, Map.class);

        // 응답에서 필요한 정보 추출
        Map<String, Object> kakaoAccount = (Map<String, Object>) profileResponse.getBody().get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        String email = (String) kakaoAccount.get("email");
        String nickname = (String) profile.get("nickname");
        String profileImageUrl = (String) profile.getOrDefault("profile_image_url", "https://example.com/default-profile-image.png");

        // DB에 사용자 정보 저장 또는 기존 사용자 반환
        KakaoUserEntity user = kakaoUserService.saveUser(email, nickname, profileImageUrl);

        // JWT 생성
        String jwt = jwtUtil.createJwt(user.getEmail(), user.getNickname(), user.getProfileImageUrl());

        // 결과 반환
        Map<String, String> result = new HashMap<>();
        result.put("jwt", jwt);

        return result;
    }

    @PostMapping("/parseJwt")
    public Map<String, String> parseJwt(@RequestBody Map<String, String> requestData) {
        String jwt = requestData.get("jwt");
        jwtUtil.getDataFromJwt(jwt);

        // 결과 반환
        Map<String, String> result = new HashMap<>();
        // 필요 시 result에 추가 데이터를 넣을 수 있습니다.

        return result;
    }
}