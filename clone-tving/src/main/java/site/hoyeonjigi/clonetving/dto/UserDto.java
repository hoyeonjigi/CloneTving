package site.hoyeonjigi.clonetving.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.hoyeonjigi.clonetving.domain.UserEntity;

@Getter
@NoArgsConstructor
@AllArgsConstructor 
@Builder
public class UserDto {

    private String userId;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String userPassword;
    private String userEmail;
    private boolean adultStatus;
    private boolean privacyAgreement;
    private boolean smsAgreement;
    private boolean emailAgreement;
    @Builder.Default
    private List<String> profiles = new ArrayList<String>();

    public UserDto (UserEntity userEntity){
        this.userId = userEntity.getUserId();
        this.userPassword = userEntity.getUserPassword();
        this.userEmail = userEntity.getUserEmail();
        this.adultStatus = userEntity.isAdultStatus();
        this.privacyAgreement = userEntity.isPrivacyAgreement();
        this.smsAgreement = userEntity.isSmsAgreement();
        this.emailAgreement = userEntity.isEmailAgreement();
        this.profiles = userEntity.getProfiles().stream()
                .map(o -> o.getProfileName()).toList();                                                         
    }
}
