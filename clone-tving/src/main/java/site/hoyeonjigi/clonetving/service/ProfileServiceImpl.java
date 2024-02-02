package site.hoyeonjigi.clonetving.service;

import java.util.List;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.hoyeonjigi.clonetving.domain.ProfileEntity;
import site.hoyeonjigi.clonetving.domain.ProfileImageEntity;
import site.hoyeonjigi.clonetving.domain.RecentViewEntity;
import site.hoyeonjigi.clonetving.domain.UserEntity;
import site.hoyeonjigi.clonetving.dto.RegistProfileDto;
import site.hoyeonjigi.clonetving.repository.ProfileImageRepository;
import site.hoyeonjigi.clonetving.repository.ProfileRepository;
import site.hoyeonjigi.clonetving.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService{

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final ProfileImageRepository profileImageRepository;


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
}
