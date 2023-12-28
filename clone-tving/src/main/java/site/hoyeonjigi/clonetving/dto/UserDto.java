package site.hoyeonjigi.clonetving.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor 
@Builder
public class UserDto {

    private String userId;
    private String userPassword;
    private String userEmail;
    private boolean adultStatus;
    private boolean privacyAgreement;
    private boolean smsAgreement;
    private boolean emailAgreement;
    private List<ProfileDto> profiles = new ArrayList<ProfileDto>();
}
