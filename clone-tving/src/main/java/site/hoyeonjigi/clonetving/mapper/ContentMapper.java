package site.hoyeonjigi.clonetving.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import site.hoyeonjigi.clonetving.dto.ContentDto;

@Mapper
public interface ContentMapper {
    List<ContentDto> getContentByTitle(@Param("InitialConsonantQuery")String InitialConsonantQuery,
                                                        @Param("offset") int offset);
}
