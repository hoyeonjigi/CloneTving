package site.hoyeonjigi.clonetving.service;

import site.hoyeonjigi.clonetving.dto.ProfileDto;
import site.hoyeonjigi.clonetving.dto.RegistProfileDto;
import site.hoyeonjigi.clonetving.dto.UpdateProfileDto;
import java.util.List;

public interface ProfileService {
    String registProfile(RegistProfileDto profile);
    String updateProfile(UpdateProfileDto updateProfile);
    List<ProfileDto> selectProfile(String userId);
}
