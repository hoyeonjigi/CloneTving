package site.hoyeonjigi.clonetving.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import site.hoyeonjigi.clonetving.domain.ProfileEntity;
import site.hoyeonjigi.clonetving.domain.ProfileImageEntity;
import site.hoyeonjigi.clonetving.domain.RecentViewEntity;
import site.hoyeonjigi.clonetving.domain.UserEntity;

@SpringBootTest
public class ProfileRepositoryTest {
    
    @Autowired
    ProfileRepository profileRepository;
    
    @Autowired
    UserRepository userRepository;

    @Autowired
    ProfileImageRepository profileImageRepository;

    @Test
    void testSaveProfile(){
        ProfileEntity saveProfileEntity = saveProfile("abc123", "1001", "테스트", false);
    }

    @Test
    ProfileEntity saveProfile(String userId, String profileImageId, String profileName, boolean child){
        UserEntity userEntity = findUser(userId);
        ProfileImageEntity profileImageEntity = findProfileImage(profileImageId);
        ProfileEntity buildProfileEntity = buildProfile(profileName, userEntity, profileImageEntity, child);
        ProfileEntity saveProfileEntity = profileRepository.save(buildProfileEntity);
        return saveProfileEntity;
    }

    @Test
    ProfileEntity buildProfile(String profileName , UserEntity user, ProfileImageEntity profileImage, boolean child){
        List<RecentViewEntity> recentViewEntities = null;
        ProfileEntity profileEntity = ProfileEntity.builder()
                                            .profileName(profileName)
                                            .user(user)
                                            .profileImage(profileImage)
                                            .child(child)
                                            .recentviews(recentViewEntities).build();
        return profileEntity;
    }

    @Test
    UserEntity findUser(String userId){
        UserEntity userEntity = userRepository.findById(userId).orElse(null);
        return userEntity;
    }

    @Test
    ProfileImageEntity findProfileImage(String profileImageId){
        ProfileImageEntity profileImage = profileImageRepository.findByImageId(profileImageId);
        return profileImage;
    }

    @Test
    void findUser2(){
        UserEntity userEntity = userRepository.findById("abc123").orElse(null);
        assertEquals("abc123", userEntity.getUserId());
    }

}
