package site.hoyeonjigi.clonetving.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

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
    public void updateProfileTest(){
        UpdateProfileDto updateProfileDto = new UpdateProfileDto();
        updateProfileDto.setUpdateProfileName("updateTest");
        updateProfileDto.setImageName("기본1");
        updateProfileDto.setChild(true);
        updateProfileDto.setProfileName("test");
        updateProfileDto.setUserId("abc123");

        profileMapper.updateProfile(updateProfileDto);
        
    }

    @Test
    @DisplayName("프로필 삭제 테스트")
    void deleteProfileTest() throws UnsupportedEncodingException{
        profileService.deleteProfile("abc123", URLDecoder.decode("test","UTF-8"));
        UserEntity user = userRepository.findById("abc123").orElse(null);
        ProfileEntity profile = profileRepository.findByUserAndProfileName(user, "테스트123").orElse(null);
        assertEquals(profile,null);
    }
}
