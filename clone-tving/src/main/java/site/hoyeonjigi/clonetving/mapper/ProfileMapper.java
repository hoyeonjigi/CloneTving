package site.hoyeonjigi.clonetving.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import site.hoyeonjigi.clonetving.dto.ProfileDto;
import site.hoyeonjigi.clonetving.dto.UpdateProfileDto;

@Mapper
public interface ProfileMapper {
    int updateProfile(@Param("userId")String userId ,@Param("updateProfileDto") UpdateProfileDto UpdateProfileDto);
    int deleteProfile(@Param("userId")String userId, @Param("profileName")String profileName);
    ProfileDto selectProfile(@Param("profileName")String profileName, @Param("userId")String userId);

}
