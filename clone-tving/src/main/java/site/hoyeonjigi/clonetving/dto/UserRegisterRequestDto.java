package site.hoyeonjigi.clonetving.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor 
@Builder
public class UserRegisterRequestDto {
    private String userId;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String userPassword;
    private String userEmail;
    private boolean adultStatus;
    private boolean privacyAgreement;
    private boolean smsAgreement;
    private boolean emailAgreement;
}