package site.hoyeonjigi.clonetving.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.hoyeonjigi.clonetving.domain.EvaluationEntity;

@Getter
@NoArgsConstructor
@AllArgsConstructor 
@Builder
public class EvaluationDto {

    private String profile;
    private String content;
    private float starRating;
    private String review;
    private Date ratingDate;

    public EvaluationDto (EvaluationEntity evaluationEntity) {
        this.profile = evaluationEntity.getProfile().getProfileName();
        this.content = evaluationEntity.getContent().getContentId();
        this.starRating = evaluationEntity.getStarRating();
        this.review = evaluationEntity.getReview();
        this.ratingDate = evaluationEntity.getRatingDate();
    }
}
