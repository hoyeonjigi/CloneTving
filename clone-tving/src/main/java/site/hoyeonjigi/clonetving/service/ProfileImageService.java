package site.hoyeonjigi.clonetving.service;

import java.util.List;

import site.hoyeonjigi.clonetving.dto.ProfileImageDto;

public interface ProfileImageService {
    List<ProfileImageDto> findProfileImageList();
}
