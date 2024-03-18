package site.hoyeonjigi.clonetving.dto;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import site.hoyeonjigi.clonetving.domain.EvaluationEntity;
import site.hoyeonjigi.clonetving.domain.ProfileEntity;

@Getter
@NoArgsConstructor
@AllArgsConstructor 
@ToString
public class EvaluationDto {

    private String profileName;
    private String contentId;
    private float starRating;
    private String review;
    private String ratingDate;
}
