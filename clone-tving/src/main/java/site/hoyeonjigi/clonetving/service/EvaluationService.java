package site.hoyeonjigi.clonetving.service;

import site.hoyeonjigi.clonetving.dto.EvaluationDto;
import java.util.List;

public interface EvaluationService {
    EvaluationDto registerEvaluation(String userId, EvaluationDto evaluationDto) throws Exception;
    void deleteEvaluation(String userId, String profileName, String contentId);
    List<EvaluationDto> evaluationByContentId(String contentId, int offset);
}
