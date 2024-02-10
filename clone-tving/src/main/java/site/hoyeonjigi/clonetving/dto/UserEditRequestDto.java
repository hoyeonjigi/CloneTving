package site.hoyeonjigi.clonetving.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor 
@Builder
public class UserEditRequestDto {
    private String userEmail;
    private boolean adultStatus;
    private boolean privacyAgreement;
    private boolean smsAgreement;
    private boolean emailAgreement;
}
