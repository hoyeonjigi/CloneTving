package site.hoyeonjigi.clonetving.dto;

import lombok.*;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor 
@ToString
public class ContentByEvaluationDto {
    private Long evaluationCount;
    private double avg;
    List<EvaluationDto> evaluationList;
}
