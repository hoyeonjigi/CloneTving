package site.hoyeonjigi.clonetving.service;

import site.hoyeonjigi.clonetving.dto.ProfileDto;
import site.hoyeonjigi.clonetving.dto.RegistProfileDto;
import site.hoyeonjigi.clonetving.dto.UpdateProfileDto;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface ProfileService {
    ProfileDto registProfile(String userId ,RegistProfileDto profile);
    String updateProfile(UpdateProfileDto updateProfile);
    List<ProfileDto> selectProfile(String userId);
    String deleteProfile(String userId, String profileName) throws UnsupportedEncodingException;
}
