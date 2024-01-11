package site.hoyeonjigi.clonetving.dto;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor 
@Builder
public class ProfileDto {

    private String profileName;
    private UserDto user;
    private String profileImage;
    private boolean child;
    private ArrayList<RecentViewDto> recentviews = new ArrayList<>();
}
