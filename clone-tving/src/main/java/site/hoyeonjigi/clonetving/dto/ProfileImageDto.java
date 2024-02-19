package site.hoyeonjigi.clonetving.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import site.hoyeonjigi.clonetving.domain.ProfileImageEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor 
public class ProfileImageDto {
    
    private String profileImageId;
    private String profileImageName;
    private String image_url;
    private String category;

    public ProfileImageDto(ProfileImageEntity profileImageEntity){
        this.profileImageId = profileImageEntity.getImageId();
        this.profileImageName = profileImageEntity.getImageName();
        this.image_url = profileImageEntity.getImageUrl();
        this.category = profileImageEntity.getCategory();
    }
}
