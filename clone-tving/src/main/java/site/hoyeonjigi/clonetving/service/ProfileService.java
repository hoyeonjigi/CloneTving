package site.hoyeonjigi.clonetving.service;

import site.hoyeonjigi.clonetving.dto.ProfileDto;
import site.hoyeonjigi.clonetving.dto.RegistProfileDto;
import site.hoyeonjigi.clonetving.dto.UpdateProfileDto;

import java.util.List;


public interface ProfileService {
    String registProfile(RegistProfileDto profile);
    List<ProfileDto> selectProfileByUserId(String userId);
    String updateProfile(UpdateProfileDto profile);
    String deleteProfile(String userId, String profileName);
}
