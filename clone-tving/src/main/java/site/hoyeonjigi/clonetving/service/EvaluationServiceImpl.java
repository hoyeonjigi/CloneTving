package site.hoyeonjigi.clonetving.service;

import java.util.List;
import java.util.Optional;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.hoyeonjigi.clonetving.domain.EvaluationEntity;
import site.hoyeonjigi.clonetving.domain.UserEntity;
import site.hoyeonjigi.clonetving.dto.ContentByEvaluationDto;
import site.hoyeonjigi.clonetving.dto.EvaluationDto;
import site.hoyeonjigi.clonetving.exception.DuplicateEvaluationException;
import site.hoyeonjigi.clonetving.exception.ResourceNotFoundException;
import site.hoyeonjigi.clonetving.mapper.EvaluationMapper;
import site.hoyeonjigi.clonetving.repository.ContentRepository;
import site.hoyeonjigi.clonetving.repository.ProfileRepository;
import site.hoyeonjigi.clonetving.repository.UserRepository;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class EvaluationServiceImpl implements EvaluationService {

    private final EvaluationMapper evaluationMapper;
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final ContentRepository contentRepository;

    @Override
    @Transactional
    public EvaluationDto registerEvaluation(String userId, EvaluationDto evaluationDto) throws Exception {
        UserEntity user = userRepository.findById(userId).get();
        if (profileRepository.findByUserAndProfileName(user, evaluationDto.getProfileName()).isEmpty()) {
            throw new ResourceNotFoundException("프로필이 없습니다");
        }
        if (contentRepository.findByContentId(evaluationDto.getContentId()).isEmpty()) {
            throw new ResourceNotFoundException("콘텐츠가 없습니다");
        }
        EvaluationDto findEvaluation = evaluationMapper.findEvaluation(userId, evaluationDto.getProfileName(),
                evaluationDto.getContentId());
        if (findEvaluation != null) {
            throw new DuplicateEvaluationException("동일한 평가가 있습니다");
        }
        evaluationDto.setRatingDate(LocalDateTime.now());
        int rowsAffected = evaluationMapper.save(userId, evaluationDto);
        if (rowsAffected > 0) {
            return evaluationDto;
        }
        throw new Exception("서버오류");
    }

    @Override
    public void deleteEvaluation(String userId, String profileName, String contentId) {
        UserEntity user = userRepository.findById(userId).get();
        if (profileRepository.findByUserAndProfileName(user, profileName).isEmpty()) {
            throw new ResourceNotFoundException("프로필이 없습니다");
        }
        EvaluationDto findEvaluation = evaluationMapper.findEvaluation(userId, profileName, contentId);
        if (findEvaluation == null) {
            throw new ResourceNotFoundException("평가가 없습니다");
        }
        evaluationMapper.delete(userId, profileName, contentId);
    }

    @Override
    public ContentByEvaluationDto evaluationByContentId(String contentId, int page) {

        if (contentRepository.findByContentId(contentId).isEmpty()) {
            throw new ResourceNotFoundException("콘텐츠가 없습니다");
        }
        int offset = page * 5;
        List<EvaluationDto> evaluationList = evaluationMapper.findByContentId(contentId, offset);
        if(evaluationList.isEmpty()){
            throw new ResourceNotFoundException("평가가 없습니다");
        }
        Map<String, Object> stats = evaluationMapper.findEvaluationStatsByContentId(contentId);
        log.info("Count ={}, avg ={}", stats.get("evaluationCount"), stats.get("avg"));
        Long evaluationCount = (Long) stats.get("evaluationCount");
        double avg = (double) stats.get("avg");
        avg = Math.round(avg * 10) / 10.0;
        ContentByEvaluationDto dto = new ContentByEvaluationDto(evaluationCount, avg, evaluationList);

        return dto;
    }
}
