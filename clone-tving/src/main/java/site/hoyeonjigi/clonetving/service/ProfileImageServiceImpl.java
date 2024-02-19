package site.hoyeonjigi.clonetving.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import site.hoyeonjigi.clonetving.domain.ProfileImageEntity;
import site.hoyeonjigi.clonetving.dto.ProfileImageDto;
import site.hoyeonjigi.clonetving.repository.ProfileImageRepository;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ProfileImageServiceImpl implements ProfileImageService{
    
    private final ProfileImageRepository profileImageRepository;

    @Override
    public List<ProfileImageDto> findProfileImageList() {
        List<ProfileImageDto> profileImageDto = null;
        List<ProfileImageEntity> profileImages = profileImageRepository.findAll();
        profileImageDto = profileImages.stream().map(o -> new ProfileImageDto(o)).collect(Collectors.toList());
        return profileImageDto;
    }
}
