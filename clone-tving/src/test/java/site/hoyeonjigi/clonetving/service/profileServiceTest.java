package site.hoyeonjigi.clonetving.service;

import org.junit.jupiter.api.Test;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import static org.junit.jupiter.api.Assertions.assertEquals;
import site.hoyeonjigi.clonetving.domain.ProfileEntity;
import site.hoyeonjigi.clonetving.domain.UserEntity;
import site.hoyeonjigi.clonetving.dto.UpdateProfileDto;
import site.hoyeonjigi.clonetving.mapper.ProfileMapper;
import site.hoyeonjigi.clonetving.repository.ProfileRepository;
import site.hoyeonjigi.clonetving.repository.UserRepository;

@SpringBootTest
public class profileServiceTest {

    @Autowired
    ProfileMapper profileMapper;

    @Autowired
    ProfileService profileService;

    @Autowired
    ProfileRepository profileRepository;

    @Autowired
    UserRepository userRepository;

    @Test
    public void testUpdateProfile(){
        UpdateProfileDto updateProfileDto = new UpdateProfileDto();
        updateProfileDto.setUpdateProfileName("updateTest");
        updateProfileDto.setImageName("기본1");
        updateProfileDto.setChild(true);
        updateProfileDto.setProfileName("test");
        updateProfileDto.setUserId("abc123");

        profileMapper.updateProfile(updateProfileDto);
        
    }

    @Test
    void deleteProfileTest(){
        profileService.deleteProfile("abc123", "테스트2");
        UserEntity user = userRepository.findById("abc123").orElse(null);
        ProfileEntity profile = profileRepository.findByUserAndProfileName(user, "테스트").orElse(null);
        assertEquals(profile,null);
    }
}
