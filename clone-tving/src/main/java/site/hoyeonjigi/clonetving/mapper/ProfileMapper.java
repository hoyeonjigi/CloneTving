package site.hoyeonjigi.clonetving.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import site.hoyeonjigi.clonetving.dto.UpdateProfileDto;

@Mapper
public interface ProfileMapper {
    int updateProfile(UpdateProfileDto UpdateProfileDto);
    int deleteProfile(@Param("userId")String userId, @Param("profileName")String profileName);
}
