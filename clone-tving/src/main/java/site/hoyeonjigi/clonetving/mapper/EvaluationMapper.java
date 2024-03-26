package site.hoyeonjigi.clonetving.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import site.hoyeonjigi.clonetving.dto.EvaluationDto;
import java.util.List;

@Mapper
public interface EvaluationMapper {
    int save(@Param("userId")String userId, @Param("dto")EvaluationDto evaluationDto);
    EvaluationDto findEvaluation(@Param("userId")String userId, @Param("profileName")String profileName, @Param("contentId")String contentId);
    int delete(@Param("userId")String userId, @Param("profileName")String profileName ,@Param("contentId")String contentId);
    List<EvaluationDto> findByContentId(@Param("contentId") String contentId ,@Param("offset") int offset);
}
