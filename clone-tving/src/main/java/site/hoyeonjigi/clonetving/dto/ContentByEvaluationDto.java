package site.hoyeonjigi.clonetving.dto;

import lombok.*;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor 
@ToString
public class ContentByEvaluationDto {
    private int evaluationCount;
    private double avg;
    List<EvaluationDto> evaluationList;
    static class EvaluationDto{
        private String profileName;
        private String contentId;
        private float starRating;
        private String review;
        private String ratingDate;
    }

}
