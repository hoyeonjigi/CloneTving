package site.hoyeonjigi.clonetving.mapper;

import org.apache.ibatis.annotations.Mapper;
import site.hoyeonjigi.clonetving.dto.UpdateProfileDto;

@Mapper
public interface ProfileMapper {
    int updateProfile(UpdateProfileDto UpdateProfileDto);
}
