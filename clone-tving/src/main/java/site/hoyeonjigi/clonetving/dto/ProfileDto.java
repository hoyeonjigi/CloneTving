package site.hoyeonjigi.clonetving.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.hoyeonjigi.clonetving.domain.ProfileEntity;

@Getter
@NoArgsConstructor
@AllArgsConstructor 
@Builder
public class ProfileDto {

    private String profileName;
    private String userId;
    private String profileImageUrl;
    private boolean child;

    public ProfileDto(ProfileEntity profileEntity){
        this.profileName = profileEntity.getProfileName();
        this.userId = profileEntity.getUser().getUserId();
        this.profileImageUrl = profileEntity.getProfileImage().getImageUrl();
        this.child = profileEntity.isChild();
    }
}
