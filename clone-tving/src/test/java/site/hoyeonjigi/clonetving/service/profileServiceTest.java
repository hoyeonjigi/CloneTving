package site.hoyeonjigi.clonetving.service;

import org.junit.jupiter.api.Test;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import site.hoyeonjigi.clonetving.dto.UpdateProfileDto;
import site.hoyeonjigi.clonetving.mapper.ProfileMapper;

@SpringBootTest
public class profileServiceTest {

    @Autowired
    ProfileMapper profileMapper;

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
}
