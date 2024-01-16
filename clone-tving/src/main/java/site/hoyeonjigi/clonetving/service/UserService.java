package site.hoyeonjigi.clonetving.service;

import site.hoyeonjigi.clonetving.dto.JsonWebTokenDto;
import site.hoyeonjigi.clonetving.dto.UserRegisterRequestDto;

public interface UserService {
    JsonWebTokenDto login(String userId, String userPassword) throws Exception;

    void register(UserRegisterRequestDto userRegisterRequestDto) throws Exception;
}
