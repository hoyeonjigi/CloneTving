package site.hoyeonjigi.clonetving.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import jakarta.servlet.http.HttpServletRequest;
import site.hoyeonjigi.clonetving.common.TokenNotValidateException;
import site.hoyeonjigi.clonetving.dto.JsonWebTokenDto;
import site.hoyeonjigi.clonetving.dto.UserDto;
import site.hoyeonjigi.clonetving.dto.UserEditPasswordRequestDto;
import site.hoyeonjigi.clonetving.dto.UserEditRequestDto;
import site.hoyeonjigi.clonetving.dto.UserRegisterRequestDto;

public interface UserService {
    JsonWebTokenDto login(String userId, String userPassword) throws UsernameNotFoundException;

    JsonWebTokenDto tokenRefresh(HttpServletRequest request) throws UsernameNotFoundException, TokenNotValidateException;

    void register(UserRegisterRequestDto userRegisterRequestDto) throws RuntimeException;

    UserDto editInfo(String userId, UserEditRequestDto userEditRequestDto) throws IllegalArgumentException;

    void editPassword(String userId, UserEditPasswordRequestDto userEditPasswordRequestDto) throws IllegalArgumentException;

    void delete(String userId) throws IllegalArgumentException;

    UserDto inquireUserInfo(String userId) throws IllegalArgumentException;
}
