package site.hoyeonjigi.clonetving.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class JsonWebTokenDto {
    //JWT 인증 타입 : Bearer 사용
    private String grantType;
    private String accessToken;
    private String refreshToken;
}
