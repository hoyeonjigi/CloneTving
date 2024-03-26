package site.hoyeonjigi.clonetving.service;

import java.util.List;
import java.util.Optional;
import java.net.URLDecoder;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.hoyeonjigi.clonetving.domain.ProfileEntity;
import site.hoyeonjigi.clonetving.domain.ProfileImageEntity;
import site.hoyeonjigi.clonetving.domain.RecentViewEntity;
import site.hoyeonjigi.clonetving.domain.UserEntity;
import site.hoyeonjigi.clonetving.dto.ProfileDto;
import site.hoyeonjigi.clonetving.dto.RegistProfileDto;
import site.hoyeonjigi.clonetving.dto.UpdateProfileDto;
import site.hoyeonjigi.clonetving.exception.DuplicateProfileNameException;
import site.hoyeonjigi.clonetving.exception.ResourceNotFoundException;
import site.hoyeonjigi.clonetving.mapper.ProfileMapper;
import site.hoyeonjigi.clonetving.repository.ProfileImageRepository;
import site.hoyeonjigi.clonetving.repository.ProfileRepository;
import site.hoyeonjigi.clonetving.repository.UserRepository;
import java.util.stream.Collectors;


@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService{

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final ProfileImageRepository profileImageRepository;
    private final ProfileMapper profileMapper;

    @Override
    @Transactional
    public ProfileDto registProfile(String userId, RegistProfileDto profile) {
        UserEntity userEntity = userRepository.findById(userId).orElse(null);
        log.info("UserEntity = {}", userEntity);
        if(userEntity == null){
            throw new IllegalArgumentException("해당 회원이 존재하지 않습니다.");
        }
        
        if(isDuplicateProfileName(userId, profile.getProfileName())){
            throw new DuplicateProfileNameException("동일한 프로필 이름이 존재합니다");
        }

        ProfileImageEntity profileImageEntity = profileImageRepository.findByImageName(profile.getImageName());
        ProfileEntity saveProfileEntity = insertProfileEntity(profile.getProfileName(), userEntity, profileImageEntity, profile.getChild());
        ProfileDto profileDto = new ProfileDto(saveProfileEntity);
        return profileDto;
        
    }
    
    boolean isDuplicateProfileName(String userId, String profileName){
        Optional<UserEntity> user = userRepository.findByUserId(userId);
        Optional<ProfileEntity> profileEntity = profileRepository.findByUserAndProfileName(user.get(), profileName);
        if(profileEntity.isPresent()){
            return true;
        }
        else{
            return false;
        }
    }

    ProfileEntity insertProfileEntity(String profileName, UserEntity user, ProfileImageEntity profileImage, boolean child){
        ProfileEntity profileEntity = profileRepository.save(buildProfileEntity(profileName, user, profileImage, child));
        return profileEntity;
    }

    ProfileEntity buildProfileEntity(String profileName, UserEntity user, ProfileImageEntity profileImage, boolean child){
        List<RecentViewEntity> recentViewEntities = null;
        ProfileEntity profileEntity = ProfileEntity.builder()
                                            .profileName(profileName)
                                            .user(user)
                                            .profileImage(profileImage)
                                            .child(child)
                                            .recentviews(recentViewEntities).build();
        return profileEntity;
    }

    @Override
    @Transactional
    public ProfileDto updateProfile(String userId, UpdateProfileDto updateProfile) throws Exception {
        UserEntity userEntity = userRepository.findById(userId).orElse(null);
        if(userEntity == null){
            throw new ResourceNotFoundException("해당 유저가 존재하지 않습니다");
        }
        if(profileRepository.findByUserAndProfileName(userEntity, updateProfile.getProfileName()).isEmpty()){
            throw new ResourceNotFoundException("프로필이 존재하지 않습니다");
        }
        if(isDuplicateProfileName(userId, updateProfile.getUpdateProfileName())){
            throw new DuplicateProfileNameException("동일한 프로필 이름이 존재합니다");
        }
        int rowAffected = profileMapper.updateProfile(userId,updateProfile);
        if(rowAffected > 0){
            ProfileDto profileDto = null;

            if(updateProfile.getUpdateProfileName() != null){
                profileDto = profileMapper.selectProfile(updateProfile.getUpdateProfileName(), userId);
            }
            else{
                profileDto = profileMapper.selectProfile(updateProfile.getProfileName(), userId);
            }

            return profileDto;
        }
        throw new Exception("서버 오류");
    }

    @Override
    @Transactional
    public List<ProfileDto> selectProfile(String userId) {
        List<ProfileEntity> profileEntities = null;
        List<ProfileDto> profileDtos = null;
        UserEntity user = userRepository.findByUserId(userId).orElse(null);
        if(user == null){
            throw new ResourceNotFoundException("해당 유저가 존재하지 않습니다");
        }
        profileEntities = profileRepository.findByUser(user);
        profileDtos = profileEntities.stream().map(o->new ProfileDto(o)).collect(Collectors.toList());
        return profileDtos;
    }

    @Override
    @Transactional
    public String deleteProfile(String userId, String profileName) throws Exception {
        String decodeUserId = URLDecoder.decode(userId, "UTF-8");
        String decodeProfileName = URLDecoder.decode(profileName, "UTF-8");
        UserEntity user = userRepository.findById(decodeUserId).orElse(null);
        if(user == null){
            throw new ResourceNotFoundException("해당 유저가 존재하지 않습니다");
        }
        ProfileEntity profile = profileRepository.findByUserAndProfileName(user, decodeProfileName).orElse(null);
        if(profile == null){
            throw new ResourceNotFoundException("프로필이 존재하지 않습니다");
        }
        int rowAffected = profileMapper.deleteProfile(decodeUserId, decodeProfileName);
        if(rowAffected > 0){
            return "프로필 삭제 완료";
        }
        throw new Exception("서버 오류");
    }
}
