package site.hoyeonjigi.clonetving.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import java.net.URLDecoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.assertj.core.api.Assertions.assertThat;
import site.hoyeonjigi.clonetving.domain.ProfileEntity;
import site.hoyeonjigi.clonetving.domain.UserEntity;
import site.hoyeonjigi.clonetving.dto.ProfileDto;
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
        updateProfileDto.setUpdateProfileName("유호연");
        updateProfileDto.setImageName("yumi_01");
        updateProfileDto.setChild(true);
        updateProfileDto.setProfileName("변경테스트 1");
        profileMapper.updateProfile("test001",updateProfileDto); 
        ProfileDto profileDto = profileMapper.selectProfile("유호연", "test001"); 
        assertThat(profileDto.getProfileName()).isEqualTo(updateProfileDto.getUpdateProfileName());
    }

    @Test
    @DisplayName("프로필 삭제 테스트")
    void deleteProfileTest() throws Exception{
        profileService.deleteProfile("test001", URLDecoder.decode("유호연","UTF-8"));
        UserEntity user = userRepository.findById("test001").orElse(null);
        ProfileEntity profile = profileRepository.findByUserAndProfileName(user, "유호연").orElse(null);
        assertEquals(profile,null);
    }
}
