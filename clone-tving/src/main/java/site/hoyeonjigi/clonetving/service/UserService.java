package site.hoyeonjigi.clonetving.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import jakarta.servlet.http.HttpServletRequest;
import site.hoyeonjigi.clonetving.common.TokenNotValidateException;
import site.hoyeonjigi.clonetving.dto.JsonWebTokenDto;
import site.hoyeonjigi.clonetving.dto.UserRegisterRequestDto;

public interface UserService {
    JsonWebTokenDto login(String userId, String userPassword) throws UsernameNotFoundException;

    JsonWebTokenDto tokenRefresh(HttpServletRequest request) throws UsernameNotFoundException, TokenNotValidateException;

    void register(UserRegisterRequestDto userRegisterRequestDto) throws RuntimeException;

    void edit(UserRegisterRequestDto userRegisterRequestDto);

    void delete(String userId);

    
}
