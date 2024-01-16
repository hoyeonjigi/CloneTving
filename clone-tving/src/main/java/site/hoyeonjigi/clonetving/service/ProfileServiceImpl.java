package site.hoyeonjigi.clonetving.service;

import java.util.List;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.hoyeonjigi.clonetving.domain.ProfileEntity;
import site.hoyeonjigi.clonetving.domain.ProfileImageEntity;
import site.hoyeonjigi.clonetving.domain.RecentViewEntity;
import site.hoyeonjigi.clonetving.domain.UserEntity;
import site.hoyeonjigi.clonetving.dto.ProfileDto;
import site.hoyeonjigi.clonetving.dto.RegistProfileDto;
import site.hoyeonjigi.clonetving.dto.UpdateProfileDto;
import site.hoyeonjigi.clonetving.repository.ProfileImageRepository;
import site.hoyeonjigi.clonetving.repository.ProfileRepository;
import site.hoyeonjigi.clonetving.repository.UserRepository;
import java.util.stream.Collectors;

@Service
public class ProfileServiceImpl implements ProfileService{

    @Autowired
    UserRepository userRepository;

    @Autowired 
    ProfileRepository profileRepository;

    @Autowired
    ProfileImageRepository profileImageRepository;


    @Override
    @Transactional
    public String registProfile(RegistProfileDto profile) {
        UserEntity userEntity = userRepository.findById(profile.getUserId()).orElse(null);

        if(userEntity == null){
            return createErrorMessage("not found user");
        }
        
        if(isDuplicateProfileName(profile.getUserId(), profile.getProfileName())){
            return createErrorMessage("duplicate profileName");
        }

        ProfileImageEntity profileImageEntity = profileImageRepository.findByImageName(profile.getImageName());
        ProfileEntity saveProfileEntity = insertProfileEntity(profile.getProfileName(), userEntity, profileImageEntity, profile.getChild());
        return createSuccessMessage(saveProfileEntity.getUser().getUserId(), saveProfileEntity.getProfileName(),
                                    saveProfileEntity.getProfileImage().getImageName(),saveProfileEntity.isChild(),"regist success");
        
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

    String createSuccessMessage(String userId, String profileName, String profileImageName, boolean child, String message){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success",true);
        jsonObject.put("userId",userId);
        jsonObject.put("profileImageName",profileImageName);
        jsonObject.put("child",child);
        jsonObject.put("message",message);
        String jsonString = jsonObject.toString();
        return jsonString;
    }

    String createErrorMessage(String message){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success",false);
        jsonObject.put("message",message);
        String jsonString = jsonObject.toString();
        return jsonString;
    }

    @Override
    public List<ProfileDto> selectProfileByUserId(String userId) {
        UserEntity userEntity = userRepository.findById(userId).orElse(null);
        List<ProfileEntity> profileEntities = null;
        List<ProfileDto> profileDtos = null;
        if(userEntity == null){
            return null;
        }
        profileEntities = profileRepository.findByUser(userEntity);
        profileDtos = profileEntities.stream().map(o->new ProfileDto(o)).collect(Collectors.toList());
        return profileDtos;
    }

    @Override
    @Transactional
    public String updateProfile(UpdateProfileDto profile) {

        UserEntity userEntity = userRepository.findById(profile.getUserId()).orElse(null);
        //유저를 찾을 수 없을때
        if(userEntity == null){
            return createErrorMessage("not found user");
        }
        Optional<ProfileEntity> profileEntity = profileRepository.findByUserAndProfileName(userEntity, profile.getProfileName());
        ProfileEntity updateProfileEntity = profileEntity.orElse(null);
        
        //프로필을 찾을 수 없을때
        if(updateProfileEntity == null){
            return createErrorMessage("not found profile");
        }

        //프로필 이름을 변경할때 
        if(profile.getUpdateProfileName() != null){
            if(isDuplicateProfileName(profile.getUserId(), profile.getUpdateProfileName())){
                return createErrorMessage("duplicate profile");
            }
            else{
                updateProfileEntity.setProfileName(profile.getUpdateProfileName());
                if(profile.getChild()!=null){
                    updateProfileEntity.setChild(profile.getChild());
                }
                if(profile.getImageName()!=null){
                    ProfileImageEntity profileImageEntity = profileImageRepository.findByImageName(profile.getImageName());
                    updateProfileEntity.setProfileImage(profileImageEntity);
                }
            }
        }
        else{
            if(profile.getChild() != null){
                updateProfileEntity.setChild(profile.getChild());
            }
            if(profile.getImageName() != null){
                ProfileImageEntity profileImageEntity = profileImageRepository.findByImageName(profile.getImageName());
                updateProfileEntity.setProfileImage(profileImageEntity);
            }
        }
        profileRepository.save(updateProfileEntity);
        return createSuccessMessage(updateProfileEntity.getUser().getUserId(), updateProfileEntity.getProfileName(),
            updateProfileEntity.getProfileImage().getImageName(), updateProfileEntity.isChild(), "success");
    }

    @Override
    @Transactional
    public String deleteProfile(String userId, String profileName) {
        UserEntity userEntity = userRepository.findById(userId).orElse(null);
        Optional<ProfileEntity> profile = profileRepository.findByUserAndProfileName(userEntity, profileName);
        if(userEntity == null){
            return createErrorMessage("not found user");
        }
        if(profile.isEmpty()){
            return createErrorMessage("not found profile");
        }
        ProfileEntity profileEntity = profile.orElse(null);
        profileRepository.deleteByUserAndProfileName(userEntity, profileName);
        return createSuccessMessage(profileEntity.getUser().getUserId(), profileEntity.getProfileName(),
            profileEntity.getProfileImage().getImageName(), profileEntity.isChild(), "delete success");
    }

}
